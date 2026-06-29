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

const initScratch = mkdtempSync(path.join(tmpdir(), 'warsmash-cp-'))
const initFile = path.join(initScratch, 'init.gradle')
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

const scratch = mkdtempSync(path.join(tmpdir(), 'warsmash-models-'))

try {
  execFileSync('./gradlew', [':core:classes'], { cwd: warsmashRoot, env, stdio: 'inherit' })
  const classpath = execFileSync('./gradlew', ['-q', ':core:printRuntimeClasspath', '-I', initFile], {
    cwd: warsmashRoot,
    env,
    encoding: 'utf8',
  }).trim()

  const sourcePath = path.join(scratch, 'ReforgedModelSmoke.java')
  writeFileSync(
    sourcePath,
    `import com.etheller.warsmash.datasources.CascDataSource;
import com.hiveworkshop.rms.parsers.mdlx.MdlxModel;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public class ReforgedModelSmoke {
  public static void main(String[] args) throws Exception {
    String root = args[0];
    String[] prefixes = new String[] {
      "war3.w3mod",
      "war3.w3mod\\\\_locales\\\\enus.w3mod"
    };
    CascDataSource source = new CascDataSource(root, prefixes);
    int checked = 0;
    int failures = 0;
    List<String> models = new ArrayList<>();
    String[] preferred = new String[] {
      "units\\\\undead\\\\acolyte\\\\acolyte.mdx",
      "units\\\\nightelf\\\\druidoftheclaw\\\\druidoftheclaw.mdx",
      "buildings\\\\undead\\\\hauntedmine\\\\hauntedmine.mdx",
      "abilities\\\\spells\\\\undead\\\\undeadmine\\\\undeadminecircle.mdx",
      "abilities\\\\spells\\\\undead\\\\unsummon\\\\unsummontarget.mdx",
      "ui\\\\glues\\\\mainmenu\\\\mainmenu3d_exp\\\\mainmenu3d_exp.mdx"
    };
    for (String model : preferred) {
      if (source.has(model)) models.add(model);
    }
    for (String path : source.getListfile()) {
      String lower = path.toLowerCase();
      if (lower.endsWith(".mdx") && !models.contains(path)) {
        models.add(path);
      }
      if (models.size() >= 80) break;
    }
    for (String model : models) {
      try {
        ByteBuffer data = source.read(model);
        new MdlxModel(data);
        checked++;
        System.out.println("OK " + model);
      }
      catch (Throwable t) {
        failures++;
        System.out.println("FAIL " + model + " :: " + t);
        t.printStackTrace(System.out);
      }
    }
    System.out.println("checked=" + checked + " failures=" + failures);
    if (failures > 0) System.exit(2);
  }
}
`,
  )

  execFileSync('javac', ['-cp', classpath, sourcePath], { env, stdio: 'inherit' })
  execFileSync('java', ['-cp', `${scratch}:${classpath}`, 'ReforgedModelSmoke', installRoot], { env, stdio: 'inherit' })
} finally {
  rmSync(initScratch, { recursive: true, force: true })
  rmSync(scratch, { recursive: true, force: true })
}
