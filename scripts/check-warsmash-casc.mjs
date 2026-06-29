import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const projectRoot = path.resolve(new URL('..', import.meta.url).pathname)
const warsmashRoot = path.join(projectRoot, '.codex_deps', 'warsmash-html')
const installRoot = process.argv[2] || process.env.WC3_REFORGED_ROOT || '/Applications/Warcraft III'
const javaHome = process.env.JAVA_HOME || '/opt/homebrew/opt/openjdk@17'
const env = {
  ...process.env,
  JAVA_HOME: javaHome,
  PATH: `${path.join(javaHome, 'bin')}:/opt/homebrew/bin:${process.env.PATH || ''}`,
}

const initFile = path.join(mkdtempSync(path.join(tmpdir(), 'warsmash-cp-')), 'init.gradle')
writeFileSync(
  initFile,
  `allprojects {
  tasks.register('printRuntimeClasspath') {
    doLast {
      if (project.name == 'core') println sourceSets.main.runtimeClasspath.asPath
    }
  }
}
`,
)

const scratch = mkdtempSync(path.join(tmpdir(), 'warsmash-casc-'))

try {
  execFileSync('./gradlew', [':core:classes'], { cwd: warsmashRoot, env, stdio: 'inherit' })
  const classpath = execFileSync('./gradlew', ['-q', ':core:printRuntimeClasspath', '-I', initFile], {
    cwd: warsmashRoot,
    env,
    encoding: 'utf8',
  }).trim()

  const sourcePath = path.join(scratch, 'CascSmoke.java')
  writeFileSync(
    sourcePath,
    `import com.etheller.warsmash.datasources.CascDataSource;
import java.nio.ByteBuffer;

public class CascSmoke {
  public static void main(String[] args) throws Exception {
    String root = args[0];
    String[] prefixes = new String[] {
      "war3.w3mod",
      "war3.w3mod\\\\_locales\\\\enus.w3mod",
      "war3.w3mod\\\\_hd.w3mod",
      "war3.w3mod\\\\_hd.w3mod\\\\_locales\\\\enus.w3mod"
    };
    CascDataSource source = new CascDataSource(root, prefixes);
    try {
      System.out.println("listfile=" + source.getListfile().size());
      String[] probes = {
        "Units\\\\UnitData.slk",
        "Units\\\\HumanUnitFunc.txt",
        "UI\\\\war3skins.txt",
        "filealiases.json"
      };
      for (String probe : probes) {
        boolean has = source.has(probe);
        ByteBuffer data = has ? source.read(probe) : null;
        System.out.println(probe + " has=" + has + " bytes=" + (data == null ? -1 : data.remaining()));
      }
    }
    finally {
      source.close();
    }
  }
}
`,
  )

  execFileSync('javac', ['-cp', classpath, sourcePath], { env, stdio: 'inherit' })
  execFileSync('java', ['-cp', `${scratch}:${classpath}`, 'CascSmoke', installRoot], { env, stdio: 'inherit' })
} finally {
  rmSync(path.dirname(initFile), { recursive: true, force: true })
  rmSync(scratch, { recursive: true, force: true })
}
