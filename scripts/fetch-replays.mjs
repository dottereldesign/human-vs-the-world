import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import W3GReplay from 'w3gjs'

const API_BASE_URL = 'https://warcraft3.info/api/v1/'
const REPLAYS_API_URL = `${API_BASE_URL}replays/`
const ELO_API_URL = `${API_BASE_URL}stats/elo`
const SOURCE_URL = 'https://warcraft3.info/replays/'
const IMAGE_CDN_URL = 'https://d3upx5peno0o6w.cloudfront.net/'
const OUTPUT_FILE = new URL('../public/replays.json', import.meta.url)
const RANKINGS_FILE = new URL('../public/rankings.json', import.meta.url)
const TOP_HUMANS = 6
const TARGET_YEAR = 2026
const MAX_PAGES_PER_PLAYER = 60
const ALLOWED_MAP_POOL = [
  'Echo Isles',
  'Terenas Stand',
  'Lost Temple',
  'Last Refuge',
  'Tidehunters',
  'Turtle Rock',
  'Autumn Leaves',
  'Northern Isles',
  'Twisted Meadows',
  'Hammerfall',
]
const STREAM_URLS = {
  fortitude: 'https://www.douyu.com/541946',
  sok: 'https://www.twitch.tv/jhw3767',
  chaemiko: 'https://www.twitch.tv/chaeyoung1994',
  infi: 'https://www.douyu.com/255865',
  hawk: 'https://www.twitch.tv/lookhawk',
  leon: 'https://www.twitch.tv/LeonWC3',
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const fileExists = async (fileUrl) => {
  try {
    await access(fileUrl)
    return true
  } catch {
    return false
  }
}

const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const normalizeMapName = (map) =>
  String(map || '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/\bv?\d+(?:\.\d+)*\b/g, '')
    .replace(/\blv\b/g, '')
    .replace(/[^a-z]+/g, ' ')
    .trim()

const allowedMapKeys = new Set(ALLOWED_MAP_POOL.map(normalizeMapName))

const isRandomSpellsMap = (map) => /\brandom spells\b/i.test(String(map || ''))

const isAllowedMap = (map) => allowedMapKeys.has(normalizeMapName(map)) && !isRandomSpellsMap(map)

const replayYear = (replay) => {
  const timestamp = replay.created_at || replay.createdAt
  if (!timestamp) return null
  const year = new Date(timestamp).getUTCFullYear()
  return Number.isFinite(year) ? year : null
}

const isTargetYearReplay = (replay) => replayYear(replay) === TARGET_YEAR

const countryFlag = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) return ''
  return countryCode
    .toUpperCase()
    .split('')
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join('')
}

const requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'User-Agent': 'SnoreCraft local cache updater',
}

const replayPayload = (playerName, page) => ({
  page,
  source_system: 'staff',
  filetype: 'w3g',
  mode: ['1on1'],
  top_replays: false,
  raceOne: 'Human',
  raceTwo: null,
  minimumElo: 0,
  event: '',
  version: '',
  map: '',
  minimumDuration: null,
  maximumDuration: null,
  players: [{ player: playerName, race: 'Human', heroes: [], units: [] }],
})

const formatDuration = (seconds) => {
  if (!Number.isFinite(seconds)) return null
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = String(seconds % 60).padStart(2, '0')
  return `${minutes}:${remainingSeconds}`
}

const normalizeReplay = (replay, rankedPlayer) => {
  const filetype = replay.filetype || 'w3g'
  const localPath = `data/replays/${rankedPlayer.slug}/${replay.id}.${filetype}`
  const image = replay.map_alias?.map?.image
  const mapImage = image?.file_name
    ? {
        url: `${IMAGE_CDN_URL}${image.file_name}`,
        localPath: `/map-images/${image.file_name}`,
        fileName: image.file_name,
        width: image.width,
        height: image.height,
      }
    : null

  return {
    id: replay.id,
    url: `https://warcraft3.info/replays/${replay.id}`,
    downloadUrl: `${REPLAYS_API_URL}${replay.id}/download`,
    localPath,
    verifiedHumanWin: true,
    trackedPlayer: {
      slug: rankedPlayer.slug,
      name: rankedPlayer.name,
      rank: rankedPlayer.rank,
      elo: rankedPlayer.elo,
      country: rankedPlayer.country,
      flag: rankedPlayer.flag,
    },
    createdAt: replay.created_at,
    map: replay.map_alias?.map?.name || replay.map || 'Unknown map',
    mapShort: replay.map_alias?.map?.short || null,
    mapImage,
    duration: replay.duration,
    durationLabel: formatDuration(replay.duration),
    type: replay.type,
    origin: replay.origin,
    filetype,
    version: replay.version === '00' ? '2.00' : replay.version ? `1.${replay.version}` : null,
    downloads: replay.downloads,
    likes: replay.likes_count,
    comments: replay.comments_count,
    players: (replay.players || []).map((player) => ({
      name: player.stats_player?.name || player.player,
      race: player.race,
      country: player.stats_player?.country || null,
      team: player.team,
    })),
  }
}

const isCandidateReplay = (apiReplay) => {
  const mapName = apiReplay.map_alias?.map?.name || apiReplay.map || ''

  return (
    apiReplay.filetype === 'w3g' &&
    apiReplay.type === '1on1' &&
    isTargetYearReplay(apiReplay) &&
    isAllowedMap(mapName)
  )
}

const fetchTopHumans = async () => {
  const params = new URLSearchParams({ modelType: 'App\\Models\\Stats\\StatsPlayer' })
  const response = await fetch(`${ELO_API_URL}?${params}`, {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'SnoreCraft local rankings cache updater',
    },
  })

  if (!response.ok) {
    throw new Error(`Warcraft3.info Elo returned HTTP ${response.status}`)
  }

  const data = await response.json()
  return data.ranking
    .filter((player) => player.main_race === 'Human')
    .slice(0, TOP_HUMANS)
    .map((player) => {
      const slug = slugify(player.name)

      return {
        id: player.id,
        slug,
        rank: player.rank,
        name: player.name,
        elo: player.elo,
        delta: player.delta,
        mainRace: player.main_race,
        country: player.country,
        countryName: player.country_detail?.name || null,
        flag: countryFlag(player.country),
        streamUrl: STREAM_URLS[slug] || null,
        replayPackUrl: `/replay-packs/${slug}-2026-human-wins.zip`,
        lastActivity: player.last_activity,
        liquipedia: player.liquipedia,
        liquipediaUrl: player.liquipedia
          ? `https://liquipedia.net/warcraft/${encodeURIComponent(player.liquipedia.replaceAll(' ', '_'))}`
          : null,
      }
    })
}

const fetchReplayPage = async (rankedPlayer, page) => {
  const response = await fetch(REPLAYS_API_URL, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(replayPayload(rankedPlayer.name, page)),
  })

  if (!response.ok) {
    throw new Error(`Warcraft3.info replays returned HTTP ${response.status} for ${rankedPlayer.name}`)
  }

  return response.json()
}

const downloadReplay = async (replay) => {
  const outputUrl = new URL(`../${replay.localPath}`, import.meta.url)

  if (await fileExists(outputUrl)) {
    return outputUrl
  }

  await mkdir(new URL('./', outputUrl), { recursive: true })

  const response = await fetch(replay.downloadUrl, {
    headers: {
      Accept: 'application/octet-stream',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'SnoreCraft local replay downloader',
    },
  })

  if (!response.ok) {
    throw new Error(`Download failed for replay ${replay.id}: HTTP ${response.status}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(outputUrl, buffer)
  console.log(`Downloaded ${path.basename(replay.localPath)} (${buffer.length} bytes)`)
  return outputUrl
}

const downloadMapImage = async (mapImage) => {
  if (!mapImage) return

  const outputUrl = new URL(`../public${mapImage.localPath}`, import.meta.url)

  if (await fileExists(outputUrl)) return

  await mkdir(new URL('./', outputUrl), { recursive: true })

  const response = await fetch(mapImage.url, {
    headers: {
      Accept: 'image/avif,image/webp,image/png,image/jpeg,image/*,*/*',
      'User-Agent': 'SnoreCraft local map thumbnail cache updater',
    },
  })

  if (!response.ok) {
    throw new Error(`Map image download failed for ${mapImage.fileName}: HTTP ${response.status}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(outputUrl, buffer)
  console.log(`Downloaded ${mapImage.localPath} (${buffer.length} bytes)`)
}

const targetTeamId = (apiReplay, rankedPlayer) => {
  const target = (apiReplay.players || []).find(
    (player) =>
      player.race === 'Human' &&
      (player.stats_player?.id === rankedPlayer.id ||
        player.stats_player?.name === rankedPlayer.name ||
        player.player === rankedPlayer.name),
  )

  return Number.isFinite(target?.team) ? target.team - 1 : null
}

const replayIsVerifiedWin = async (replay, apiReplay, rankedPlayer) => {
  const targetTeam = targetTeamId(apiReplay, rankedPlayer)
  if (!Number.isFinite(targetTeam)) return false

  await downloadReplay(replay)

  try {
    const parsed = await new W3GReplay().parse(replay.localPath)
    return parsed.winningTeamId === targetTeam
  } catch (error) {
    console.warn(`Could not parse replay ${replay.id}: ${error.message}`)
    return false
  }
}

const fetchWinningReplaysForPlayer = async (rankedPlayer, seenReplayIds) => {
  const wins = []
  let total = 0

  for (let page = 1; page <= MAX_PAGES_PER_PLAYER; page += 1) {
    console.log(`Fetching ${rankedPlayer.name} replay page ${page}...`)
    const data = await fetchReplayPage(rankedPlayer, page)
    total = data.total || total
    const apiReplays = data.data || []

    if (!apiReplays.length) break

    const years = apiReplays.map(replayYear).filter(Number.isFinite)
    const pageIsOlderThanTargetYear = years.length > 0 && years.every((year) => year < TARGET_YEAR)

    for (const apiReplay of apiReplays) {
      if (seenReplayIds.has(apiReplay.id)) continue
      if (!isCandidateReplay(apiReplay)) continue

      const replay = normalizeReplay(apiReplay, rankedPlayer)
      const isWin = await replayIsVerifiedWin(replay, apiReplay, rankedPlayer)
      await delay(500)

      if (!isWin) continue

      await downloadMapImage(replay.mapImage)
      seenReplayIds.add(replay.id)
      wins.push(replay)
      console.log(`Accepted ${rankedPlayer.name} 2026 Human win ${wins.length}: ${replay.id}`)
    }

    if (pageIsOlderThanTargetYear) break

    await delay(1250)
  }

  return { total, replays: wins }
}

const rankings = await fetchTopHumans()

await writeFile(
  RANKINGS_FILE,
  `${JSON.stringify(
    {
      source: 'https://warcraft3.info/stats/elo_ranking',
      fetchedAt: new Date().toISOString(),
      race: 'Human',
      rankingBasis: 'Warcraft3.info Elo ranking',
      players: rankings,
    },
    null,
    2,
  )}\n`,
)
console.log(`Wrote ${RANKINGS_FILE.pathname}`)

const output = {
  source: SOURCE_URL,
  fetchedAt: new Date().toISOString(),
  cachePolicy:
    'Manual refresh via npm run update:replays. Top 6 Human Elo players, all deduped 2026 verified 1v1 .w3g Human wins on the allowed map pool.',
  year: TARGET_YEAR,
  allowedMaps: ALLOWED_MAP_POOL,
  players: {},
}

const seenReplayIds = new Set()

for (const [index, rankedPlayer] of rankings.entries()) {
  console.log(`Collecting Human wins for #${rankedPlayer.rank} ${rankedPlayer.name}...`)
  output.players[rankedPlayer.slug] = await fetchWinningReplaysForPlayer(rankedPlayer, seenReplayIds)
  if (index < rankings.length - 1) await delay(1750)
}

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`)
console.log(`Wrote ${OUTPUT_FILE.pathname}`)
