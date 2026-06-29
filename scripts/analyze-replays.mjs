import { readFile, writeFile } from 'node:fs/promises'
import W3GReplay from 'w3gjs'

const REPLAYS_FILE = new URL('../public/replays.json', import.meta.url)
const OUTPUT_FILE = new URL('../public/replay-analysis.json', import.meta.url)

const raceNames = {
  H: 'Human',
  O: 'Orc',
  U: 'Undead',
  N: 'Night Elf',
  R: 'Random',
}

const formatDuration = (milliseconds) => {
  if (!Number.isFinite(milliseconds)) return null
  const totalSeconds = Math.round(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

const summarizeCounts = (summary = {}) =>
  Object.entries(summary)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([id, count]) => ({ id, count }))

const summarizeOrder = (order = []) =>
  order.map((entry) => ({
    id: entry.id,
    ms: entry.ms,
    time: formatDuration(entry.ms),
  }))

const summarizePlayer = (player) => ({
  id: player.id,
  name: player.name,
  teamId: player.teamid,
  color: player.color,
  race: raceNames[player.race] || player.race || null,
  raceDetected: raceNames[player.raceDetected] || player.raceDetected || null,
  apm: player.apm,
  heroCount: player.heroCount,
  heroes: (player.heroes || []).map((hero) => ({
    id: hero.id,
    level: hero.level,
    abilities: hero.abilities,
  })),
  actions: player.actions
    ? {
        assigngroup: player.actions.assigngroup,
        rightclick: player.actions.rightclick,
        basic: player.actions.basic,
        buildtrain: player.actions.buildtrain,
        ability: player.actions.ability,
        item: player.actions.item,
        select: player.actions.select,
        selecthotkey: player.actions.selecthotkey,
        removeunit: player.actions.removeunit,
        subgroup: player.actions.subgroup,
        esc: player.actions.esc,
      }
    : null,
  apmTimeline: player.actions?.timed || [],
  topUnits: summarizeCounts(player.units?.summary),
  topBuildings: summarizeCounts(player.buildings?.summary),
  topItems: summarizeCounts(player.items?.summary),
  order: {
    buildings: summarizeOrder(player.buildings?.order),
    units: summarizeOrder(player.units?.order),
    items: summarizeOrder(player.items?.order),
    upgrades: summarizeOrder(player.upgrades?.order),
  },
})

const analyzeReplay = async (replay) => {
  if (replay.filetype !== 'w3g') {
    return {
      id: replay.id,
      status: 'skipped',
      reason: `w3gjs parses .w3g; this replay is .${replay.filetype}`,
    }
  }

  try {
    const parser = new W3GReplay()
    const result = await parser.parse(replay.localPath)

    return {
      id: replay.id,
      status: 'parsed',
      sourceFile: replay.localPath,
      parseTime: result.parseTime,
      gameName: result.gamename,
      type: result.type,
      matchup: result.matchup,
      version: result.version,
      buildNumber: result.buildNumber,
      duration: result.duration,
      durationLabel: formatDuration(result.duration),
      winningTeamId: result.winningTeamId,
      map: result.map,
      settings: result.settings,
      chatCount: result.chat?.length || 0,
      chat: (result.chat || []).map((message) => ({
        playerName: message.playerName,
        playerId: message.playerId,
        message: message.message,
        mode: message.mode,
        timeMS: message.timeMS,
        time: formatDuration(message.timeMS),
      })),
      players: (result.players || []).map(summarizePlayer),
    }
  } catch (error) {
    return {
      id: replay.id,
      status: 'failed',
      sourceFile: replay.localPath,
      reason: error.message,
    }
  }
}

const replayCache = JSON.parse(await readFile(REPLAYS_FILE, 'utf8'))
const output = {
  generatedAt: new Date().toISOString(),
  parser: 'w3gjs',
  players: {},
}

for (const [slug, playerData] of Object.entries(replayCache.players)) {
  console.log(`Analyzing ${slug}...`)
  output.players[slug] = {}

  for (const replay of playerData.replays) {
    const result = await analyzeReplay(replay)
    output.players[slug][replay.id] = result
    console.log(`${replay.id}: ${result.status}`)
  }
}

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`)
console.log(`Wrote ${OUTPUT_FILE.pathname}`)
