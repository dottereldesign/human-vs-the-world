import './style.css'
import bnetLogo from './assets/bnetlogo.png'
import humanIcon from './assets/race-human-icon.png'
import nightElfIcon from './assets/race-night-elf-icon.png'
import orcIcon from './assets/race-orc-icon.png'
import chaemikoImage from './assets/chaemiko-card.png'
import douyuLogo from './assets/stream-douyu-logo.png'
import playerEarningsBgImage from './assets/player-earnings-bg-img.png'
import infiFireballVideo from './assets/infi-card-fireball-effect.webm'
import fortitudeImage from './assets/fortitude-card.png'
import hawkImage from './assets/hawk-card.png'
import humanVsTheWorldLogo from './assets/site-logo-human-vs-the-world.png'
import infiImage from './assets/infi-card.png'
import leonImage from './assets/leon-card.png'
import liquipediaLogo from './assets/liquipedia-logo.png'
import sokImage from './assets/sok-card.png'
import twitchLogo from './assets/stream-twitch-logo.svg'
import undeadIcon from './assets/race-undead-icon.png'
import wc3IconManifest from './wc3-icon-manifest.json'
import {
  buildings as wc3Buildings,
  items as wc3Items,
  units as wc3Units,
  upgrades as wc3Upgrades,
} from '../node_modules/w3gjs/dist/esm/mappings.js'

const showLocalSandbox = import.meta.env.DEV

const fallbackRankedPlayers = [
  {
    slug: 'fortitude',
    name: 'Fortitude',
    realName: 'Xu Yuxing',
    flag: '🇨🇳',
    countryName: 'China',
    rank: 3,
    elo: 2662,
    streamUrl: 'https://www.douyu.com/541946',
    liquipediaUrl: 'https://liquipedia.net/warcraft/Fortitude',
    replayPackUrl: 'replay-packs/fortitude-2026-human-wins.zip',
  },
  {
    slug: 'sok',
    name: 'Sok',
    realName: 'Jung Ho-wook',
    flag: '🇰🇷',
    countryName: 'South Korea',
    city: 'Sokcho',
    rank: 11,
    elo: 2571,
    streamUrl: 'https://www.twitch.tv/jhw3767',
    liquipediaUrl: 'https://liquipedia.net/warcraft/Sok',
    replayPackUrl: 'replay-packs/sok-2026-human-wins.zip',
  },
  {
    slug: 'chaemiko',
    name: 'Chaemiko',
    realName: 'Moon Chae-young',
    flag: '🇰🇷',
    countryName: 'South Korea',
    rank: 12,
    elo: 2504,
    streamUrl: 'https://www.twitch.tv/chaeyoung1994',
    liquipediaUrl: 'https://liquipedia.net/warcraft/Chaemiko',
    replayPackUrl: 'replay-packs/chaemiko-2026-human-wins.zip',
  },
  {
    slug: 'infi',
    name: 'Infi',
    realName: 'Wang Xuwen',
    flag: '🇨🇳',
    countryName: 'China',
    city: 'Shangluo, Shaanxi',
    rank: 16,
    elo: 2455,
    streamUrl: 'https://www.douyu.com/255865',
    liquipediaUrl: 'https://liquipedia.net/warcraft/Infi',
    replayPackUrl: 'replay-packs/infi-2026-human-wins.zip',
  },
  {
    slug: 'hawk',
    name: 'HawK',
    realName: 'Sergey Shcherbakov',
    flag: '🇷🇺',
    countryName: 'Russia',
    city: 'Aleksandrov',
    rank: 24,
    elo: 2341,
    streamUrl: 'https://www.twitch.tv/lookhawk',
    liquipediaUrl: 'https://liquipedia.net/warcraft/HawK',
    replayPackUrl: 'replay-packs/hawk-2026-human-wins.zip',
  },
  {
    slug: 'leon',
    name: 'Leon',
    realName: 'Leon Hoge',
    flag: '🇩🇪',
    countryName: 'Germany',
    rank: 26,
    elo: 2333,
    streamUrl: 'https://www.twitch.tv/LeonWC3',
    liquipediaUrl: 'https://liquipedia.net/warcraft/Leon',
    replayPackUrl: 'replay-packs/leon-2026-human-wins.zip',
  },
]

let replayCache = null
let replayCacheError = null
let replayAnalysis = null
let mapDropTables = null
let rankingsCache = null
let liquipediaEarnings = null
let replaySearch = ''
let playerFilter = 'all'
let mapFilter = 'all'
let heroFilter = 'all'
let matchupFilter = 'all'
let replayPage = 1
let selectedReplayKey = null
let replayTheaterKey = null
let replayTheaterPlaying = false
let replayTheaterElapsedMs = 0
let replayTheaterTimer = null
let replayModalTab = 'overview'
let appInfoOpen = false
let appInfoTab = 'sources'
let warsmashEmbedRequested = false
let warsmashOnboardingPlatform = 'unknown'
let warsmashAssetEdition = ['legacy', 'reforged'].includes(localStorage.getItem('wc3-warsmash-selected-edition'))
  ? localStorage.getItem('wc3-warsmash-selected-edition')
  : 'legacy'
let reforgedSandbox = {
  checked: false,
  preparing: false,
  ready: false,
  build: '',
  fileCount: 0,
  totalGb: '0.00',
  error: '',
}
let warsmashAutoStage = {
  running: false,
  done: 0,
  total: 0,
  bytes: 0,
  totalBytes: 0,
  currentName: '',
  error: '',
}
let playerCardIntroPlayed = false
let playerCardIntroTimer = null
let logoIntroPlayed = false
let logoIntroTimer = null
const REPLAYS_PER_PAGE = 25
const replayModalTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'apm', label: 'APM' },
  { id: 'build', label: 'Build Order' },
  { id: 'upgrades', label: 'Upgrades' },
  { id: 'items-bought', label: 'Items Bought' },
  { id: 'items-found', label: 'Items Found' },
  { id: 'chat', label: 'Chatlog' },
  { id: 'actions', label: 'Actions' },
]
const appInfoTabs = [
  { id: 'sources', label: 'Data Sources' },
  { id: 'analyze', label: 'Analyze Tabs' },
  { id: 'updates', label: 'Keeping Updated' },
  { id: 'features', label: 'Next Features' },
  { id: 'renderer', label: 'Game Renderer' },
  { id: 'github', label: 'GitHub' },
]

const wc3IdLabels = {
  Hamg: 'Archmage',
  Hblm: 'Blood Mage',
  Hmkg: 'Mountain King',
  Hpal: 'Paladin',
  Edem: 'Demon Hunter',
  Ekee: 'Keeper of the Grove',
  Emoo: 'Priestess of the Moon',
  Ewar: 'Warden',
  Obla: 'Blademaster',
  Ofar: 'Far Seer',
  Oshd: 'Shadow Hunter',
  Otch: 'Tauren Chieftain',
  Udea: 'Death Knight',
  Udre: 'Dreadlord',
  Ulic: 'Lich',
  Ucrl: 'Crypt Lord',
  Nbrn: 'Dark Ranger',
  Nbst: 'Beastmaster',
  Nfir: 'Firelord',
  Npbm: 'Pandaren Brewmaster',
  Nplh: 'Pit Lord',
  Ntin: 'Tinker',
  Nalc: 'Goblin Alchemist',
  Nngs: 'Naga Sea Witch',
  hpea: 'Peasant',
  hfoo: 'Footman',
  hrif: 'Rifleman',
  hkni: 'Knight',
  hmpr: 'Priest',
  hsor: 'Sorceress',
  hmtm: 'Mortar Team',
  hgry: 'Gryphon Rider',
  hmil: 'Militia',
  halt: 'Altar of Kings',
  hhou: 'Farm',
  hbar: 'Barracks',
  hbla: 'Blacksmith',
  hvlt: 'Arcane Vault',
  hwtw: 'Scout Tower',
  hatw: 'Arcane Tower',
  hctw: 'Cannon Tower',
  hkee: 'Keep',
  hcas: 'Castle',
  hars: 'Arcane Sanctum',
  hgra: 'Gryphon Aviary',
  Rhri: 'Long Rifles',
  Rhra: 'Rifle Armor',
  Rhpt: 'Priest Training',
  Rhst: 'Sorceress Training',
  Rhla: 'Animal War Training',
  bspd: 'Boots of Speed',
  shea: 'Scroll of Healing',
}

const itemGoldCosts = {
  ajen: null,
  belv: null,
  bspd: 250,
  clsd: null,
  cnob: null,
  dust: 75,
  gcel: null,
  hslv: 100,
  mcri: 50,
  moon: 50,
  ocor: 375,
  oli2: 375,
  oslo: null,
  oven: 375,
  pams: 100,
  penr: null,
  phea: 150,
  pghe: 400,
  pinv: 100,
  plcl: 70,
  pman: 200,
  pnvl: 150,
  prvt: 350,
  rag1: null,
  rat6: null,
  rat9: null,
  rde2: null,
  rde4: null,
  rin1: null,
  rnec: 150,
  rnsp: null,
  shas: 50,
  shea: 250,
  skul: 50,
  spre: 50,
  spro: 150,
  sreg: 100,
  ssan: 250,
  stel: 150,
  stwp: 350,
  tgrh: 600,
  tret: 300,
  tsct: 30,
  will: null,
  wneg: 200,
}

const upgradeGoldCosts = {
  Rhpt: [100, 100],
  Rhst: [100, 100],
  Rhme: [125, 150, 175],
  Rhar: [125, 150, 175],
  Rhra: [125, 150, 175],
  Rhri: [75],
  Rhlh: [100, 200],
  Rhla: [125],
  Rhde: [150],
  Rhac: [100],
  Rhhb: [125],
  Rhfs: [50],
  Rhfc: [150],
  Rhpm: [50],
  Rhgb: [150],
  Rhse: [50],
  Rhfl: [50],
}

const dropItemGroups = {
  YiI0: { label: 'Permanent L0', items: ['rnsp'] },
  YiI1: { label: 'Permanent L1', items: ['clsd', 'rst1', 'rin1', 'rag1'] },
  YiI2: { label: 'Permanent L2', items: ['cnob', 'rat6', 'gcel'] },
  YiI3: { label: 'Permanent L3', items: ['rat9', 'penr', 'prvt', 'rde2', 'rlif', 'evtl'] },
  YiI4: { label: 'Permanent L4', items: ['afac', 'kpin', 'lhst', 'brac', 'sbch', 'rwiz'] },
  YiI5: { label: 'Permanent L5', items: ['ajen', 'bgst', 'belv', 'ratc', 'clfm', 'crys', 'hval', 'hcun', 'lgdh', 'mcou', 'ciri'] },
  YiI6: { label: 'Permanent L6', items: ['spsh', 'desc', 'odef', 'pmna', 'rhth', 'ssil'] },
  YjI0: { label: 'Charged L0', items: ['vamp'] },
  YjI1: { label: 'Charged L1', items: [] },
  YjI2: { label: 'Charged L2', items: ['pnvl'] },
  YjI3: { label: 'Charged L3', items: ['pghe', 'pnvu', 'pgma', 'pomn', 'sror'] },
  YjI4: { label: 'Charged L4', items: ['ankh', 'fgsk', 'hlst', 'mnst'] },
  YjI5: { label: 'Charged L5', items: ['pres', 'sres', 'fgfh', 'fgrg'] },
  YjI6: { label: 'Charged L6', items: ['wild', 'fgdg', 'shar'] },
  YkI0: { label: 'Power-up L0', items: [] },
  YkI1: { label: 'Power-up L1', items: ['manh', 'tdex', 'tint', 'tstr'] },
  YkI2: { label: 'Power-up L2', items: [] },
  YkI3: { label: 'Power-up L3', items: [] },
  YkI5: { label: 'Power-up L5', items: ['tpow', 'tdx2', 'tin2', 'tst2'] },
}

const dropGroupByItemId = Object.entries(dropItemGroups).reduce((groups, [groupId, group]) => {
  group.items.forEach((itemId) => {
    groups[itemId] = { id: groupId, label: group.label, poolSize: group.items.length }
  })
  return groups
}, {})

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const allowedMapPool = [
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

const normalizeMapName = (map) =>
  String(map || '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/\bv?\d+(?:\.\d+)*\b/g, '')
    .replace(/\blv\b/g, '')
    .replace(/[^a-z]+/g, ' ')
    .trim()

const allowedMapKeys = new Set(allowedMapPool.map(normalizeMapName))

const isRandomSpellsMap = (map) => /\brandom spells\b/i.test(String(map || ''))

const isAllowedMap = (map) => allowedMapKeys.has(normalizeMapName(map)) && !isRandomSpellsMap(map)

const getActiveRoute = () => {
  const slug = window.location.hash.replace('#/', '')
  if (!slug) return { type: 'all' }
  if (slug === 'builds') return { type: 'builds' }
  if (slug === 'player-earnings' || slug === 'human-money') return { type: 'player-earnings' }
  if (slug === 'statistics') return { type: 'statistics' }
  if (showLocalSandbox && slug === 'renderer') return { type: 'renderer' }
  if (showLocalSandbox && slug === 'wc3-replay-viewer') return { type: 'wc3-replay-viewer' }
  if (showLocalSandbox && slug === 'w3gjs') return { type: 'w3gjs' }
  if (slug === 'resources') return { type: 'resources' }
  const player = getRankedPlayers().find((candidate) => candidate.slug === slug)
  return player ? { type: 'player', player } : { type: 'all' }
}

const normalizePublicPath = (value) => {
  if (!value || typeof value !== 'string') return value
  return value.startsWith('/') ? value.slice(1) : value
}

const getRankedPlayers = () =>
  (rankingsCache?.players || fallbackRankedPlayers).map((player) => ({
    ...player,
    replayPackUrl: normalizePublicPath(player.replayPackUrl),
  }))

const getReplayData = (slug) => replayCache?.players?.[slug] || { total: 0, replays: [] }

const getAnalysis = (slug, replayId) => replayAnalysis?.players?.[slug]?.[replayId] || null

const getPlayerEarnings = (player) => {
  const playerKey = String(player.name || '').toLowerCase()
  const leaderboard = liquipediaEarnings?.players || []
  const leaderboardMatch = leaderboard.find(
    (entry) =>
      String(entry.name || '').toLowerCase() === playerKey ||
      String(entry.liquipediaId || '').toLowerCase() === playerKey ||
      String(entry.page || '').toLowerCase() === playerKey,
  )

  if (leaderboardMatch) return leaderboardMatch

  const featured = liquipediaEarnings?.featured || {}
  return featured[player.slug] || featured[player.name?.toLowerCase()] || null
}

const getReplayByKey = (key) => {
  if (!key) return null
  const [slug, replayId] = key.split(':')
  const replay = getReplayData(slug).replays.find((candidate) => String(candidate.id) === String(replayId))
  if (!replay) return null

  const player = getRankedPlayers().find((candidate) => candidate.slug === slug)
  return {
    ...replay,
    sourceSlug: slug,
    sourceName: player?.name || replay.sourceName || slug,
    sourceFlag: player?.flag || replay.sourceFlag || '',
  }
}

const cleanWc3Label = (label) => String(label || '').replace(/^[a-z]+_/, '')

const baseLabelForId = (id) => {
  const label = wc3IdLabels[id] || wc3Units[id] || wc3Buildings[id] || wc3Upgrades[id] || wc3Items[id]
  return cleanWc3Label(label || id || 'Unknown')
}

const labelForId = (id) => `${baseLabelForId(id)}${id ? ` (${id})` : ''}`

const getItemPriceLabel = (id) => {
  if (itemGoldCosts[id] === null) return 'Drop / no shop price'
  return itemGoldCosts[id] ? `${itemGoldCosts[id]} gold` : 'Price unknown'
}

const isKnownShopItem = (id) => Number.isFinite(itemGoldCosts[id])

const formatGold = (value) => `${formatInteger(value)} gold`

const getUpgradeGoldCost = (id, occurrence = 1) => {
  const costs = upgradeGoldCosts[id]
  if (!costs) return null
  return costs[Math.min(Math.max(occurrence, 1), costs.length) - 1] ?? null
}

const addUpgradeOccurrences = (items) => {
  const counts = {}
  return items.map((item) => {
    counts[item.id] = (counts[item.id] || 0) + 1
    return {
      ...item,
      occurrence: counts[item.id],
      goldCost: getUpgradeGoldCost(item.id, counts[item.id]),
    }
  })
}

const summarizeGold = (items, getCost) => {
  const summary = items.reduce(
    (total, item) => {
      const cost = getCost(item)
      if (Number.isFinite(cost)) total.gold += cost
      else total.unknown += 1
      return total
    },
    { gold: 0, unknown: 0 },
  )

  return summary
}

const renderGoldSummary = ({ label, gold, unknown = 0 }) => {
  const unknownText = unknown ? ` · ${unknown} unknown` : ''
  return `<em class="timeline-total">${escapeHtml(label)}: ${escapeHtml(formatGold(gold))}${escapeHtml(unknownText)}</em>`
}

const getAnalysisMapDropTable = (analysis) => {
  const mapSha1 = analysis?.map?.checksumSha1
  return mapSha1 ? mapDropTables?.maps?.[mapSha1] || null : null
}

const getDropOdds = (id, analysis) => {
  const group = dropGroupByItemId[id]
  if (!group) return null

  const mapDropTable = getAnalysisMapDropTable(analysis)
  const mapGroup = mapDropTable?.dropGroups?.[group.id]
  if (!mapGroup) return null

  const poolSize = group.poolSize || 0
  const rollChance = Number.isFinite(mapGroup.chance) ? mapGroup.chance : 100
  if (!poolSize || !rollChance) return null

  const chance = rollChance / poolSize
  return {
    chance,
    groupId: group.id,
    groupLabel: group.label,
    poolSize,
    rolls: mapGroup.rolls || 0,
    mapFile: mapDropTable.file,
  }
}

const formatPercent = (value) => {
  if (!Number.isFinite(value)) return 'unknown'
  return `${value.toFixed(value < 10 ? 1 : 0)}%`
}

const getDropTableLabel = (id, analysis) => {
  const odds = getDropOdds(id, analysis)
  if (odds) return `${odds.groupLabel} (${odds.poolSize} outcomes)`
  if (dropGroupByItemId[id]) return 'Drop group known; map table not extracted'
  return itemGoldCosts[id] === null ? 'Drop group unknown' : 'Shop item / drop source unknown'
}

const getDropChanceLabel = (id, analysis) => {
  const odds = getDropOdds(id, analysis)
  if (!odds) return 'Chance: not available'
  return `Chance: ${formatPercent(odds.chance)} per ${odds.groupLabel} roll`
}

const renderWc3ObjectIcon = (id, label = labelForId(id)) => {
  const icon = wc3IconManifest[id]

  if (!icon) {
    return `<span class="wc3-object-icon is-empty" aria-hidden="true">${escapeHtml(String(id || '?').slice(0, 1))}</span>`
  }

  return `<img class="wc3-object-icon" src="${escapeHtml(normalizePublicPath(icon))}" alt="${escapeHtml(label)}" loading="lazy" />`
}

const renderHeroBadge = (hero, { compact = false } = {}) => {
  const heroId = typeof hero === 'string' ? hero : hero?.id
  if (!heroId) return ''

  const level = typeof hero === 'string' ? null : hero?.level
  const levelLabel = Number.isFinite(level) && level > 0 ? ` · L${level}` : ''
  return `
    <span class="hero-badge ${compact ? 'is-compact' : ''}">
      ${renderWc3ObjectIcon(heroId)}
      <span>${escapeHtml(baseLabelForId(heroId))}${escapeHtml(levelLabel)}</span>
    </span>
  `
}

const formatInteger = (value) => (Number.isFinite(value) ? new Intl.NumberFormat('en').format(value) : '0')

const getStreamPlatform = (url) => {
  if (!url) return { key: 'stream', label: 'Stream', short: 'St' }

  let host = ''
  try {
    host = new URL(url).hostname.toLowerCase()
  } catch {
    return { key: 'stream', label: 'Stream', short: 'St' }
  }

  if (host.includes('twitch.tv')) return { key: 'twitch', label: 'Twitch', short: 'Tw', icon: twitchLogo }
  if (host.includes('douyu.com')) return { key: 'douyu', label: 'Douyu', short: 'DY', icon: douyuLogo }
  if (host.includes('youtube.com') || host.includes('youtu.be')) return { key: 'youtube', label: 'YouTube', short: 'YT' }
  if (host.includes('bilibili.com')) return { key: 'bilibili', label: 'Bilibili', short: 'B' }

  return { key: 'stream', label: 'Stream', short: 'St' }
}

const downloadIcon = () => `
  <span class="service-icon service-icon-download" aria-hidden="true">
    <svg class="action-icon" viewBox="0 0 24 24">
      <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" />
    </svg>
  </span>
`

const gameIconPaths = {
  house: '<path fill="currentColor" d="M256 19.27L25.637 249.638L19.27 256L32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73l12.73-12.73l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z"/>',
  scroll: '<path fill="currentColor" d="M103.432 17.844a87 87 0 0 0-3.348.08q-3.822.163-7.604.678c-20.167 2.747-39.158 13.667-52.324 33.67c-24.613 37.4 2.194 98.025 56.625 98.025c.536 0 1.058-.012 1.583-.022v.704h60.565c-10.758 31.994-30.298 66.596-52.448 101.43a283 283 0 0 0-6.29 10.406l34.878 35.733l-56.263 9.423c-32.728 85.966-27.42 182.074 48.277 182.074v-.002l9.31.066c23.83-.57 46.732-4.298 61.325-12.887c4.174-2.458 7.63-5.237 10.467-8.42h-32.446c-20.33 5.95-40.8-6.94-47.396-25.922c-8.956-25.77 7.52-52.36 31.867-60.452a55.6 55.6 0 0 1 17.565-2.834v-.406h178.33c-.57-44.403 16.35-90.125 49.184-126c23.955-26.176 42.03-60.624 51.3-94.846l-41.225-24.932l38.272-6.906l-43.37-25.807l52.131-8.85c-5.232-39.134-28.84-68.113-77.37-68.113c-43.878 7.526-162.908 10.556-235.678 3.762c-14.888-6.763-30.547-10.723-45.908-10.652m.464 18.703c13.137.043 27.407 3.804 41.247 10.63l.033-.07c4.667 4.735 8.542 9.737 11.68 14.985H82.92l10.574 14.78c10.608 14.83 19.803 31.99 21.09 42.024c.643 5.017-.11 7.167-1.814 8.836c-1.705 1.67-6.228 3.875-15.99 3.875c-40.587 0-56.878-44.952-41.012-69.06C66.238 46.64 79.582 39.22 95.002 37.12a64 64 0 0 1 8.894-.573M118.5 80.78h46.28c4.275 15.734 3.656 33.07-.544 51.51H131.52c1.9-5.027 2.268-10.574 1.6-15.77c-1.527-11.913-7.405-24.065-14.62-35.74m101.553 317.095c6.44 6.84 11.192 15.31 13.37 24.914c3.797 16.736 3.092 31.208-1.767 43.204c-4.526 11.175-12.576 19.79-22.29 26h237.19c14.448 0 24.887-5.678 32.2-14.318c7.312-8.64 11.2-20.514 10.705-32.352a47.7 47.7 0 0 0-2.407-13.18l-69.91-8.205l42.017-20.528c-8.32-3.442-18.64-5.537-31.375-5.537H220.053zm-42.668.506a37 37 0 0 0-3.457.153a34.8 34.8 0 0 0-7.824 1.63c-15.11 5.02-25.338 21.54-20.11 36.583c3.673 10.57 15.347 17.71 25.654 13.938l1.555-.57h43.354c.946-6.36.754-13.882-1.358-23.192c-3.71-16.358-20.543-28.483-37.815-28.54z"/>',
  coins: '<path fill="currentColor" d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8c10.07 19.3 35.53 30.4 71.22 30.4c35.69.1 80.29-11.2 124.19-34c44-22.9 78.8-53 99.2-82.2c20.5-29.2 25.9-56.4 15.9-75.8c-10.1-19.3-35.5-30.49-71.2-30.49m91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3c-22.6 32.3-59.5 63.8-105.7 87.8c-46.2 24.1-93.1 36.2-132.5 36.2c-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5c35.7 0 80.3-11.2 124.2-34.1c44-22.8 78.8-52.9 99.2-82.2c20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7c-18.9 27.1-47.8 53.4-83.6 75.4c11.1 1.2 22.7 1.8 34.5 1.8c49.5 0 94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9s-17.4-43.4-49.1-59.9c-16.1-8.4-35.7-15.3-57.6-20m106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31c-35 18.2-82.2 29.1-134.3 29.1c-21.2 0-41.6-1.8-60.7-5.2c-23.2 11.7-46.5 20.4-68.9 26.1c1.2.7 2.4 1.3 3.7 2c31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z"/>',
  chart: '<path fill="currentColor" d="M23 23v466h466v-18H41v-82.184l85.854-57.234l70.023 70.022l65.133-260.536L387.28 203.7l67.79-107.97l19.317 11.858l6.102-71.1l-60.644 37.616l19.884 12.207l-59.01 93.99l-130.732-65.366l-62.865 251.462l-57.98-57.978L41 367.184V23z"/>',
  crystal: '<path fill="currentColor" d="M254.563 20.75c-42.96 0-85.918 16.387-118.688 49.156c-65.54 65.54-65.852 172.15-.313 237.688c65.54 65.54 172.15 65.226 237.688-.313c65.54-65.538 65.54-171.835 0-237.374c-32.77-32.77-75.728-49.156-118.688-49.156zm-.157 18.47a149.3 149.3 0 0 1 74.313 19.968c-13.573-3.984-26.266-2.455-34.22 5.5c-14.437 14.437-7.796 44.485 14.813 67.093c22.608 22.61 52.625 29.22 67.062 14.782c8.523-8.522 9.706-22.468 4.594-37.125c36.352 57.684 29.586 134.6-20.69 184.875c-29.158 29.16-67.353 43.773-105.56 43.813c9.436-2.3 17.762-6.732 24.436-13.406c28.885-28.886 15.64-88.954-29.594-134.19c-45.234-45.233-105.302-58.51-134.187-29.624c-4.052 4.052-7.266 8.723-9.688 13.875c3.092-33.537 17.473-66.222 43.157-91.905c29.198-29.2 67.384-43.737 105.562-43.656zM386.97 319.28c-.205.206-.39.422-.595.626c-72.78 72.78-191.252 73.155-264.03.375c-.278-.275-.54-.565-.814-.842c-11.987 9.483-18.81 20.384-18.81 32c0 36.523 67.315 66.125 151.343 66.125s152.093-29.6 152.093-66.125c0-11.68-6.97-22.637-19.187-32.157zm39.717 54.564c-22.225 32.29-91.192 55.906-172.625 55.906c-81.172 0-149.954-23.46-172.406-55.594c-12.638 11.3-19.72 24.052-19.72 37.563c.002 46.928 85.546 85.03 192.064 85.03s192.97-38.1 192.97-85.03c0-13.637-7.313-26.498-20.283-37.876z"/>',
  castle: '<path fill="currentColor" d="M254.25 15.344c-132.537 0-240.188 107.62-240.188 240.156c0 132.537 107.65 240.188 240.188 240.188S494.406 388.038 494.406 255.5S386.786 15.344 254.25 15.344m0 18.687c122.436 0 221.47 99.034 221.47 221.47c0 65.65-28.465 124.583-73.75 165.125V238.75l14-22.78h-7.595L364 101.5l-43.813 114.47h-8.156l14.595 22.78v33.875h-36.813v-88.188l14.625-22.78h-7.593l-44.406-114.47l-44.375 114.47h-7.594l14.03 22.78v123.22h-37.375v-18.094l14.594-22.782h-8.19l-43.78-114.467L95.344 266.78H87.75l14.03 22.783V416.25C59.25 375.9 32.75 318.83 32.75 255.5c0-122.436 99.064-221.47 221.5-221.47zm1.094 160.532h18.687v36.344h-18.686v-36.344zm110.156 87.97h18.688v36.312H365.5V282.53zm-246.656 22.03h18.687v36.344h-18.686v-36.344zm50.875 29.407h18.686v36.342H169.72V333.97zm170.81 30.5h18.69v36.342h-18.69z"/>',
  processor: '<path fill="currentColor" d="M228.844 32.22v114.218h17.687V32.218h-17.686zm-108.25.624c-15.507 0-28.094 12.586-28.094 28.093S105.087 89 120.594 89c12.655 0 23.34-8.372 26.844-19.875h44.937v77.313h17.688v-95H147.03c-3.888-10.837-14.262-18.593-26.436-18.593zm193.25 0c-15.507 0-28.063 12.586-28.063 28.093c0 12.124 7.677 22.45 18.44 26.376v59.124h17.655V87.844c11.596-3.452 20.063-14.193 20.063-26.906c0-15.508-12.587-28.094-28.094-28.094zM266.124 92.5v53.938h17.657V92.5h-17.655zm188.532 4.03c-15.507 0-28.094 12.588-28.094 28.095c0 13.083 8.948 24.074 21.063 27.188v27.468h-92.938v17.657h110.624v-46.342c10.223-4.192 17.407-14.233 17.407-25.97c0-15.507-12.557-28.094-28.064-28.094zM30.187 123.657v17.688H96.75v55.594h62.814V179.28h-45.126v-55.624zm147.032 40.47v159.718h159.81v-159.72H177.22zm17.56 15.655h17.657v78.595l32.407 32.406h75.28v17.658H237.5l-2.594-2.594l-10.75-10.75c-1.033 7.385-7.36 13.062-15.03 13.062c-8.392 0-15.19-6.796-15.19-15.187c0-7.682 5.696-13.98 13.095-15l-9.655-9.658l-2.594-2.593V179.78zm54.94.157h17.686v55.313h52.53l.002 17.688H249.72v-73zM53.124 217.375v89.969c-11.49 3.512-19.844 14.198-19.844 26.844c0 15.505 12.557 28.093 28.064 28.093s28.093-12.587 28.093-28.092c0-12.195-7.79-22.564-18.656-26.438v-72.72h88.782v-17.655H53.124zm301.563 0v17.656h53.968v-17.655h-53.97zm99.968 21.97c-10.898 0-20.342 6.21-25 15.28h-74.97l.002 17.688H427c2.325 13.168 13.824 23.187 27.656 23.187c15.507 0 28.063-12.588 28.063-28.094s-12.557-28.062-28.064-28.062zm-349.062 15.28v17.688h53.97v-17.688zm17.156 36.47v84.217c-11.498 3.513-19.875 14.2-19.875 26.844c0 15.506 12.587 28.094 28.094 28.094c15.506 0 28.06-12.588 28.06-28.094c0-12.194-7.766-22.564-18.624-26.437v-66.94h19.156v-17.686h-36.81zm231.938 0v17.686h45.156v95.283c-11.323 3.624-19.53 14.26-19.53 26.78c-.002 15.506 12.585 28.063 28.092 28.063s28.063-12.557 28.063-28.062c0-12.32-7.935-22.778-18.97-26.563V291.095h-62.814zM192.375 341.53v54.033h17.688V341.53zm36.47 0v86.564c-11.013 3.794-18.94 14.233-18.94 26.53c0 15.506 12.588 28.095 28.095 28.095s28.063-12.59 28.063-28.095c0-12.53-8.203-23.14-19.532-26.75V341.53zm37.28 0v54.033h17.688l-.032-54.032h-17.655zm38.094 0v140.064h17.655V341.53H304.22z"/>',
  compass: '<path fill="currentColor" d="m203.97 23l-18.032 4.844l11.656 43.468c-25.837 8.076-50.32 21.653-71.594 40.75L94.53 80.594l-13.218 13.22l31.376 31.374c-19.467 21.125-33.414 45.53-41.813 71.343l-42.313-11.343l-4.843 18.063l42.25 11.313c-6.057 27.3-6.157 55.656-.345 83L23.72 308.78l4.843 18.064l41.812-11.22a193.3 193.3 0 0 0 31.25 59.876l-29.97 52.688l-16.81 29.593l29.56-16.842l52.657-29.97a193.3 193.3 0 0 0 60.094 31.407l-11.22 41.844l18.033 4.81l11.218-41.905a195.7 195.7 0 0 0 83-.375l11.312 42.28l18.063-4.81l-11.344-42.376c25.812-8.4 50.217-22.315 71.342-41.78l31.375 31.373l13.22-13.218l-31.47-31.47a193.3 193.3 0 0 0 40.72-71.563l43.53 11.657l4.813-18.063l-43.625-11.686a195.7 195.7 0 0 0-.344-82.063l43.97-11.78l-4.813-18.063L440.908 197c-6.73-20.866-17.08-40.79-31.032-58.844l29.97-52.656l16.842-29.563l-29.593 16.844l-52.656 29.97c-17.998-13.875-37.874-24.198-58.657-30.906l11.783-44L309.5 23l-11.78 43.97c-27-5.925-55.02-6.05-82.064-.376zm201.56 85L297.25 298.313l-.75.437l-40.844-40.875l-148.72 148.72l-2.186 1.25l109.125-191.75l41.78 41.78L405.532 108zm-149.686 10.594c21.858 0 43.717 5.166 63.594 15.47l-116.625 66.342l-2.22 1.28l-1.28 2.22l-66.25 116.406c-26.942-52.04-18.616-117.603 25.03-161.25c26.99-26.988 62.38-40.468 97.75-40.468zm122.72 74.594c26.994 52.054 18.67 117.672-25.002 161.343c-43.66 43.662-109.263 52.005-161.312 25.033l116.438-66.282l2.25-1.25l1.25-2.25l66.375-116.592z"/>',
  search: '<path fill="currentColor" d="M333.78 20.188c-39.97 0-79.96 15.212-110.405 45.656c-58.667 58.667-60.796 152.72-6.406 213.97l-15.782 15.748l13.25 13.25l15.75-15.78c61.248 54.39 155.3 52.26 213.968-6.407c60.887-60.886 60.888-159.894 0-220.78C413.713 35.4 373.753 20.187 333.78 20.187zm0 18.562c35.15 0 70.285 13.44 97.158 40.313c53.745 53.745 53.744 140.6 0 194.343c-51.526 51.526-133.46 53.643-187.5 6.375l.218-.217c-2.35-2.05-4.668-4.17-6.906-6.407c-2.207-2.206-4.288-4.496-6.313-6.812l-.218.22c-47.27-54.04-45.152-135.976 6.374-187.502C263.467 52.19 298.63 38.75 333.78 38.75m0 18.813c-30.31 0-60.63 11.6-83.81 34.78c-46.362 46.362-46.362 121.234 0 167.594c10.14 10.142 21.632 18.077 33.905 23.782c-24.91-19.087-40.97-49.133-40.97-82.94c0-15.323 3.292-29.888 9.22-43c-4.165 20.485.44 40.88 14.47 54.907c24.583 24.585 68.744 20.318 98.624-9.562s34.146-74.04 9.56-98.625a52.4 52.4 0 0 0-7.655-6.313c45.13 8.648 79.954 46.345 84.25 92.876c4.44-35.07-6.82-71.726-33.813-98.72c-23.18-23.18-53.47-34.78-83.78-34.78zM176.907 297.688L42.094 432.5l34.562 34.563L211.47 332.25zM40 456.813L24 472.78L37.22 486l15.968-16z"/>',
}

const gameIcon = (name, className = '') => `
  <svg class="game-icon ${className}" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    ${gameIconPaths[name] || gameIconPaths.crystal}
  </svg>
`

const analyzeIcon = () => `
  <span class="analyze-icon" aria-hidden="true">
    <svg viewBox="0 0 20 20" focusable="false">
      <circle cx="8.5" cy="8.5" r="4.75" />
      <path d="m12.25 12.25 4 4" />
    </svg>
  </span>
`

const serviceBadge = ({ key, short, icon }, label) => `
  <span class="service-icon service-icon-${escapeHtml(key)}" aria-hidden="true">
    ${icon ? `<img src="${icon}" alt="" loading="lazy" />` : escapeHtml(short)}
  </span>
  <span class="action-label">${escapeHtml(label)}</span>
`

const renderStreamAction = (player) => {
  if (!player.streamUrl) {
    return '<span class="is-disabled"><span class="service-icon service-icon-stream" aria-hidden="true">St</span><span class="action-label">Stream</span></span>'
  }

  const platform = getStreamPlatform(player.streamUrl)
  return `
    <a href="${escapeHtml(player.streamUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(player.name)} ${escapeHtml(platform.label)} stream">
      ${serviceBadge(platform, platform.label)}
    </a>
  `
}

const renderLiquipediaAction = (player) => {
  if (!player.liquipediaUrl) {
    return `<span class="is-disabled"><span class="service-icon service-icon-liquipedia" aria-hidden="true"><img src="${liquipediaLogo}" alt="" loading="lazy" /></span><span class="action-label">Liquipedia</span></span>`
  }

  return `
    <a href="${escapeHtml(player.liquipediaUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(player.name)} on Liquipedia">
      ${serviceBadge({ key: 'liquipedia', short: 'LP', icon: liquipediaLogo }, 'Liquipedia')}
    </a>
  `
}

const renderPlayerRealName = (player) => {
  if (!player.realName) return ''

  return `<p class="player-card-real-name">${escapeHtml(player.realName)}</p>`
}

const renderPlayerCardPortrait = (player) => {
  const playerImages = {
    chaemiko: chaemikoImage,
    fortitude: fortitudeImage,
    hawk: hawkImage,
    infi: infiImage,
    leon: leonImage,
    sok: sokImage,
  }
  const playerImage = playerImages[player.slug]

  if (playerImage) {
    return `<img class="player-card-image" src="${playerImage}" alt="${escapeHtml(player.name)}" loading="lazy" />`
  }

  return `<span>${escapeHtml(player.flag)}</span>`
}

const renderPlayerCardEffect = (player) => {
  if (player.slug !== 'infi') return ''

  return `
    <video class="player-card-effect player-card-fireball" autoplay loop muted playsinline preload="metadata" aria-hidden="true">
      <source src="${infiFireballVideo}" type="video/webm" />
    </video>
  `
}

const getAllReplays = () => {
  if (!replayCache) return []

  return getRankedPlayers().flatMap((player) =>
    getReplayData(player.slug).replays
      .filter((replay) => isAllowedMap(replay.map))
      .map((replay) => ({
        ...replay,
        sourceSlug: player.slug,
        sourceName: player.name,
        sourceFlag: player.flag,
      })),
  )
}

const getMapOptions = () => {
  const maps = [...new Set(getAllReplays().map((replay) => replay.map).filter(Boolean))]
  return maps.sort((a, b) => a.localeCompare(b))
}

const normalizeRace = (race) => {
  const normalized = String(race || '')
    .toLowerCase()
    .replaceAll(' ', '')
    .replaceAll('_', '')
    .replaceAll('-', '')

  const raceMap = {
    h: 'Human',
    human: 'Human',
    o: 'Orc',
    orc: 'Orc',
    u: 'Undead',
    undead: 'Undead',
    n: 'Night Elf',
    nightelf: 'Night Elf',
  }

  return raceMap[normalized] || race || 'Unknown'
}

const getRankedReplayPlayer = (replay) =>
  (replay.players || []).find((player) => player.name?.toLowerCase() === replay.sourceName?.toLowerCase()) || replay.players?.[0] || null

const getOrderedReplayPlayers = (replay) => {
  const rankedPlayer = getRankedReplayPlayer(replay)
  if (!rankedPlayer) return replay.players || []

  return [
    rankedPlayer,
    ...(replay.players || []).filter((player) => player !== rankedPlayer),
  ]
}

const getMatchupKey = (replay) => {
  const players = getOrderedReplayPlayers(replay)
  if (players.length < 2) return ''

  const leftRace = normalizeRace(players[0].race)
  const rightRace = normalizeRace(players[1].race)

  return `${leftRace} vs ${rightRace}`
}

const getMatchupOptions = () => {
  const matchups = [...new Set(getAllReplays().map(getMatchupKey).filter(Boolean))]
  return matchups.sort((a, b) => {
    const aHuman = a.startsWith('Human vs') ? 0 : 1
    const bHuman = b.startsWith('Human vs') ? 0 : 1
    return aHuman - bHuman || a.localeCompare(b)
  })
}

const getReplayAnalysis = (replay) => getAnalysis(replay.sourceSlug, replay.id)

const humanHeroIds = ['Hamg', 'Hmkg', 'Hpal', 'Hblm']

const isHumanParsedPlayer = (player) => normalizeRace(player?.raceDetected || player?.race) === 'Human'

const incrementStat = (stats, id, amount = 1) => {
  if (!id || !Number.isFinite(amount)) return
  stats.set(id, (stats.get(id) || 0) + amount)
}

const incrementCountItems = (stats, items = []) => {
  items.forEach((item) => incrementStat(stats, item.id, Number(item.count) || 0))
}

const getStatsEntries = (stats, limit = 8) =>
  [...stats.entries()]
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || labelForId(a[0]).localeCompare(labelForId(b[0])))
    .slice(0, limit)

const getHumanReplayStats = () => {
  const heroPicks = new Map(humanHeroIds.map((id) => [id, 0]))
  const firstHeroPicks = new Map(humanHeroIds.map((id) => [id, 0]))
  const boughtItems = new Map()
  const foundItems = new Map()
  const unitCounts = new Map()
  const buildingCounts = new Map()
  const upgradeCounts = new Map()
  const mapCounts = new Map()
  const matchupCounts = new Map()
  let humanGames = 0
  let parsedReplays = 0
  let totalApm = 0
  let apmSamples = 0
  let totalItemActions = 0
  let knownBoughtGold = 0
  let unknownBoughtPrices = 0

  getAllReplays().forEach((replay) => {
    const analysis = getAnalysis(replay.sourceSlug, replay.id)
    if (analysis?.status !== 'parsed') return

    parsedReplays += 1
    const humanPlayers = (analysis.players || []).filter(isHumanParsedPlayer)
    if (!humanPlayers.length) return

    incrementStat(mapCounts, replay.map || analysis.map?.name || 'Unknown map')
    incrementStat(matchupCounts, getMatchupKey(replay) || 'Unknown matchup')

    humanPlayers.forEach((player) => {
      humanGames += 1
      if (Number.isFinite(player.apm)) {
        totalApm += player.apm
        apmSamples += 1
      }
      totalItemActions += player.actions?.item || 0

      const heroes = player.heroes || []
      heroes.forEach((hero) => {
        if (humanHeroIds.includes(hero.id)) incrementStat(heroPicks, hero.id)
      })
      if (humanHeroIds.includes(heroes[0]?.id)) incrementStat(firstHeroPicks, heroes[0].id)

      ;(player.order?.items || []).forEach((item) => {
        if (isKnownShopItem(item.id)) {
          incrementStat(boughtItems, item.id)
          knownBoughtGold += itemGoldCosts[item.id] || 0
        } else {
          incrementStat(foundItems, item.id)
          if (itemGoldCosts[item.id] !== null) unknownBoughtPrices += 1
        }
      })

      incrementCountItems(unitCounts, player.topUnits)
      incrementCountItems(buildingCounts, player.topBuildings)
      ;(player.order?.upgrades || []).forEach((upgrade) => incrementStat(upgradeCounts, upgrade.id))
    })
  })

  return {
    heroPicks,
    firstHeroPicks,
    boughtItems,
    foundItems,
    unitCounts,
    buildingCounts,
    upgradeCounts,
    mapCounts,
    matchupCounts,
    humanGames,
    parsedReplays,
    averageApm: apmSamples ? Math.round(totalApm / apmSamples) : 0,
    totalItemActions,
    knownBoughtGold,
    unknownBoughtPrices,
  }
}

const getReplayStartingHeroIds = (replay) => {
  const analysis = getReplayAnalysis(replay)
  return (analysis?.players || []).map((player) => player.heroes?.[0]?.id).filter(Boolean)
}

const getStartingHeroOptions = () => {
  const heroes = new Map()

  getAllReplays().forEach((replay) => {
    getReplayStartingHeroIds(replay).forEach((heroId) => {
      if (!heroes.has(heroId)) heroes.set(heroId, baseLabelForId(heroId))
    })
  })

  return [...heroes.entries()]
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([value, label]) => ({ value, label, iconId: value }))
}

const getMatchup = (replay) =>
  getOrderedReplayPlayers(replay)
    .map((player) => `${player.name}${player.race ? ` (${player.race})` : ''}`)
    .join(' vs ')

const getRaceIcon = (race) => {
  const normalized = String(race || '')
    .toLowerCase()
    .replaceAll(' ', '')
    .replaceAll('_', '')
    .replaceAll('-', '')

  const iconMap = {
    h: humanIcon,
    human: humanIcon,
    o: orcIcon,
    orc: orcIcon,
    u: undeadIcon,
    undead: undeadIcon,
    n: nightElfIcon,
    nightelf: nightElfIcon,
  }

  if (!iconMap[normalized]) return null
  return iconMap[normalized]
}

const getParsedPlayerForMatchup = (player, index, parsedPlayers) => {
  if (!parsedPlayers.length) return null

  const exactName = parsedPlayers.find((parsedPlayer) => parsedPlayer.name?.toLowerCase() === player.name?.toLowerCase())
  if (exactName) return exactName

  const sameRace = parsedPlayers.filter((parsedPlayer) => normalizeRace(parsedPlayer.race || parsedPlayer.raceDetected) === normalizeRace(player.race))
  if (sameRace.length === 1) return sameRace[0]

  return parsedPlayers[index] || null
}

const renderPlayerTooltip = (parsedPlayer) => {
  if (!parsedPlayer) return ''

  const battlenetName = parsedPlayer.name || 'Unknown'
  const apm = parsedPlayer.apm ? `${parsedPlayer.apm} APM` : 'APM unavailable'
  const heroes = (parsedPlayer.heroes || []).slice(0, 3)

  return `
    <span class="matchup-tooltip" role="tooltip">
      <span>${escapeHtml(battlenetName)}</span>
      <strong>${escapeHtml(apm)}</strong>
      ${
        heroes.length
          ? `<span class="matchup-tooltip-heroes">${heroes.map((hero) => renderHeroBadge(hero, { compact: true })).join('')}</span>`
          : ''
      }
    </span>
  `
}

const renderMatchupWithIcons = (replay, parsedPlayers = []) =>
  getOrderedReplayPlayers(replay)
    .map((player, index) => {
      const icon = getRaceIcon(player.race)
      const parsedPlayer = getParsedPlayerForMatchup(player, index, parsedPlayers)

      return `
        <span class="matchup-player" tabindex="0">
          ${icon ? `<img src="${icon}" alt="${escapeHtml(player.race)}" loading="lazy" />` : ''}
          <span>${escapeHtml(player.name)}</span>
          ${renderPlayerTooltip(parsedPlayer)}
        </span>
      `
    })
    .join('<span class="versus">vs</span>')

const renderMetricPill = (label, value) => `
  <div class="analysis-pill">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value ?? 'Unknown')}</strong>
  </div>
`

const renderOverviewTab = (replay, analysis) => {
  if (!analysis || analysis.status !== 'parsed') {
    return `
      <div class="analysis-empty">
        <strong>Analysis unavailable</strong>
        <span>${escapeHtml(analysis?.reason || 'Run npm run analyze:replays to parse this replay.')}</span>
      </div>
    `
  }

  return `
    <div class="analysis-overview">
      <div class="analysis-pill-grid">
        ${renderMetricPill('Map', replay.map)}
        ${renderMetricPill('Duration', analysis.durationLabel)}
        ${renderMetricPill('Matchup', analysis.matchup)}
        ${renderMetricPill('Patch', analysis.version)}
        ${renderMetricPill('Game', analysis.gameName)}
        ${renderMetricPill('Chat', `${analysis.chatCount || 0} messages`)}
      </div>
      <div class="analysis-player-grid">
        ${(analysis.players || [])
          .map(
            (player) => `
              <div class="analysis-player-card">
                <span class="analysis-player-meta">${escapeHtml(player.raceDetected || player.race || 'Unknown race')}</span>
                <strong>${escapeHtml(player.name || 'Unknown')}</strong>
                <div class="analysis-stat-line">
                  <span>${escapeHtml(player.apm || 0)} APM</span>
                  <span>${escapeHtml(player.heroCount || 0)} heroes</span>
                </div>
                <div class="analysis-heroes">
                  ${(player.heroes || [])
                    .map((hero) => renderHeroBadge(hero))
                    .join('')}
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </div>
  `
}

const renderApmTab = (analysis) => {
  const players = analysis?.players || []
  const chartPlayers = players.map((player) => ({
    ...player,
    chartApmTimeline: (player.apmTimeline || []).slice(1, -1),
  }))
  const maxApm = Math.max(...chartPlayers.flatMap((player) => player.chartApmTimeline || []), 1)

  if (!chartPlayers.some((player) => player.chartApmTimeline?.length)) {
    return '<div class="analysis-empty"><strong>No APM timeline</strong><span>Run the updated replay analyzer to generate APM buckets.</span></div>'
  }

  const chartWidth = 720
  const chartHeight = 280
  const padding = { top: 26, right: 28, bottom: 36, left: 44 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom
  const roundedMaxApm = Math.max(100, Math.ceil(maxApm / 50) * 50)
  const longestTimeline = Math.max(...chartPlayers.map((player) => player.chartApmTimeline?.length || 0), 1)
  const getPoint = (apm, index, total) => {
    const x = padding.left + (total <= 1 ? innerWidth / 2 : (index / (total - 1)) * innerWidth)
    const y = padding.top + innerHeight - (Math.min(apm, roundedMaxApm) / roundedMaxApm) * innerHeight
    return { x, y }
  }
  const getSmoothPath = (points) => {
    if (!points.length) return ''
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

    return points.reduce((path, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`
      const previous = points[index - 1]
      const midX = (previous.x + point.x) / 2
      const midY = (previous.y + point.y) / 2
      return `${path} Q ${previous.x} ${previous.y} ${midX} ${midY}`
    }, '') + ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`
  }
  const gridValues = [roundedMaxApm, Math.round(roundedMaxApm * 0.75), Math.round(roundedMaxApm * 0.5), Math.round(roundedMaxApm * 0.25), 0]
  const timeLabels = [0, Math.floor((longestTimeline - 1) / 2), longestTimeline - 1].filter((value, index, list) => list.indexOf(value) === index)

  return `
    <div class="apm-chart">
      <div class="apm-chart-header">
        <div>
          <strong>APM Flow</strong>
          <span>Action pressure over time</span>
        </div>
        <div class="apm-legend">
          ${chartPlayers
            .map(
              (player, index) => `
                <span class="apm-legend-item apm-series-${index + 1}">
                  <i aria-hidden="true"></i>
                  ${escapeHtml(player.name || 'Unknown')} · ${escapeHtml(player.apm || 0)} avg
                </span>
              `,
            )
            .join('')}
        </div>
      </div>
      <div class="apm-line-chart">
        <svg viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="APM line chart comparing players over time" preserveAspectRatio="none">
          <defs>
            <linearGradient id="apm-series-gradient-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#48A0C7" />
              <stop offset="100%" stop-color="#E8F8FF" />
            </linearGradient>
            <linearGradient id="apm-series-gradient-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#F4C76A" />
              <stop offset="100%" stop-color="#FFF3BF" />
            </linearGradient>
            <filter id="apm-glow" x="-25%" y="-80%" width="150%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          ${gridValues
            .map((value) => {
              const y = padding.top + innerHeight - (value / roundedMaxApm) * innerHeight
              return `
                <g class="apm-grid-line">
                  <line x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" />
                  <text x="${padding.left - 12}" y="${y + 4}">${value}</text>
                </g>
              `
            })
            .join('')}
          ${timeLabels
            .map((bucket) => {
              const x = padding.left + (longestTimeline <= 1 ? innerWidth / 2 : (bucket / (longestTimeline - 1)) * innerWidth)
              return `<text class="apm-time-label" x="${x}" y="${chartHeight - 10}">${bucket === 0 ? 'Start' : `${bucket}m`}</text>`
            })
            .join('')}
          ${chartPlayers
            .map((player, index) => {
              const values = player.chartApmTimeline || []
              const points = values.map((apm, pointIndex) => getPoint(Number(apm) || 0, pointIndex, values.length))
              const path = getSmoothPath(points)

              return `
                <g class="apm-series apm-series-${index + 1}">
                  <path class="apm-line apm-line-glow" d="${path}" />
                  <path class="apm-line" d="${path}" />
                  ${points
                    .map(
                      (point, pointIndex) => `
                        <circle class="apm-point" cx="${point.x}" cy="${point.y}" r="3.2">
                          <title>${escapeHtml(player.name || 'Player')} · ${escapeHtml(values[pointIndex])} APM · ${pointIndex}m</title>
                        </circle>
                      `,
                    )
                    .join('')}
                </g>
              `
            })
            .join('')}
        </svg>
      </div>
      <div class="apm-summary-grid">
        ${chartPlayers
        .map(
          (player) => `
            <div class="apm-summary-card">
              <span>${escapeHtml(player.name || 'Unknown')}</span>
              <strong>${escapeHtml(player.apm || 0)} APM</strong>
              <em>Peak ${escapeHtml(Math.max(...(player.chartApmTimeline || [0])))} · Low ${escapeHtml(Math.min(...(player.chartApmTimeline || [0])))}</em>
            </div>
          `,
        )
        .join('')}
      </div>
    </div>
  `
}

const getPlayerTimeline = (player, groups) =>
  groups
    .flatMap(([type, order]) =>
      (order || []).map((entry) => ({
        ...entry,
        type,
        playerName: player.name,
        race: player.raceDetected || player.race,
      })),
    )
    .sort((a, b) => (a.ms || 0) - (b.ms || 0))

const renderTimelineRow = (item, detail = `${item.type}`) => `
  <div class="build-order-row">
    <span>${escapeHtml(item.time || '0:00')}</span>
    <div class="timeline-object">
      ${renderWc3ObjectIcon(item.id)}
      <strong>${escapeHtml(labelForId(item.id))}</strong>
    </div>
    <em>${escapeHtml(detail)}</em>
  </div>
`

const renderFoundItemRow = (item, analysis) => `
  <div class="build-order-row item-found-row">
    <span>${escapeHtml(item.time || '0:00')}</span>
    <div class="timeline-object">
      ${renderWc3ObjectIcon(item.id)}
      <strong>${escapeHtml(labelForId(item.id))}</strong>
    </div>
    <em>
      <span>Found / dropped</span>
      <small>${escapeHtml(getDropTableLabel(item.id, analysis))}</small>
      <small>${escapeHtml(getDropChanceLabel(item.id, analysis))}</small>
    </em>
  </div>
`

const renderTimelineColumns = ({ analysis, title, emptyMessage, getItems, renderRow = renderTimelineRow, renderSummary = null }) => {
  const players = analysis?.players || []
  const hasItems = players.some((player) => getItems(player).length)

  if (!hasItems) {
    return `<div class="analysis-empty"><strong>${escapeHtml(title)} unavailable</strong><span>${escapeHtml(emptyMessage)}</span></div>`
  }

  return `
    <div class="timeline-columns">
      ${players
        .map((player) => {
          const items = getItems(player)
          const summary = renderSummary ? renderSummary(player, items) : ''

          return `
            <section class="timeline-player-column">
              <header>
                <span>${escapeHtml(player.raceDetected || player.race || 'Unknown race')}</span>
                <strong>${escapeHtml(player.name || 'Unknown')}</strong>
                ${summary}
              </header>
              <div class="build-order-list">
                ${items.length ? items.map(renderRow).join('') : '<div class="timeline-empty">No entries parsed</div>'}
              </div>
            </section>
          `
        })
        .join('')}
    </div>
  `
}

const renderBuildTab = (analysis) => {
  return renderTimelineColumns({
    analysis,
    title: 'Build order',
    emptyMessage: 'Run the updated replay analyzer to generate unit and building timeline data.',
    getItems: (player) =>
      getPlayerTimeline(player, [
        ['Building', player.order?.buildings],
        ['Unit', player.order?.units],
      ]),
  })
}

const renderUpgradesTab = (analysis) => {
  return renderTimelineColumns({
    analysis,
    title: 'Upgrades',
    emptyMessage: 'No upgrades were parsed for this replay.',
    getItems: (player) => addUpgradeOccurrences(getPlayerTimeline(player, [['Upgrade', player.order?.upgrades]])),
    renderRow: (item) => renderTimelineRow(item, Number.isFinite(item.goldCost) ? formatGold(item.goldCost) : 'Cost unknown'),
    renderSummary: (player, items) => {
      const summary = summarizeGold(items, (item) => item.goldCost)
      return renderGoldSummary({ label: 'Known gold spent', gold: summary.gold, unknown: summary.unknown })
    },
  })
}

const renderItemsBoughtTab = (analysis) => {
  return renderTimelineColumns({
    analysis,
    title: 'Items bought',
    emptyMessage: 'No shop-price items were parsed for this replay.',
    getItems: (player) => getPlayerTimeline(player, [['Item', player.order?.items]]).filter((item) => isKnownShopItem(item.id)),
    renderSummary: (player, items) => {
      const summary = summarizeGold(items, (item) => itemGoldCosts[item.id])
      return renderGoldSummary({ label: 'Total spent', gold: summary.gold, unknown: summary.unknown })
    },
    renderRow: (item) => {
      const odds = getDropOdds(item.id, analysis)
      const detail = odds ? `${getItemPriceLabel(item.id)} · ${formatPercent(odds.chance)} ${odds.groupLabel} drop` : getItemPriceLabel(item.id)
      return renderTimelineRow(item, detail)
    },
  })
}

const renderItemsFoundTab = (analysis) => {
  return renderTimelineColumns({
    analysis,
    title: 'Items found',
    emptyMessage: 'No no-shop-price items were parsed for this replay.',
    getItems: (player) => getPlayerTimeline(player, [['Item', player.order?.items]]).filter((item) => !isKnownShopItem(item.id)),
    renderRow: (item) => renderFoundItemRow(item, analysis),
  })
}

const renderChatTab = (analysis) => {
  const chat = analysis?.chat || []

  if (!chat.length) {
    return '<div class="analysis-empty"><strong>No chat messages</strong><span>This replay has no parsed player chat.</span></div>'
  }

  return `
    <div class="chatlog-list">
      ${chat
        .map(
          (message) => `
            <div class="chatlog-row">
              <span>${escapeHtml(message.time || '0:00')}</span>
              <strong>${escapeHtml(message.playerName || 'Unknown')}</strong>
              <p>${escapeHtml(message.message || '')}</p>
            </div>
          `,
        )
        .join('')}
    </div>
  `
}

const renderCountList = (items = []) =>
  items.length
    ? items.map((item) => `<span>${escapeHtml(labelForId(item.id))} × ${escapeHtml(item.count)}</span>`).join('')
    : '<span>None parsed</span>'

const renderActionsTab = (analysis) => {
  const players = analysis?.players || []

  if (!players.length) {
    return '<div class="analysis-empty"><strong>No action data</strong><span>Run the updated replay analyzer to generate action data.</span></div>'
  }

  return `
    <div class="actions-grid">
      ${players
        .map(
          (player) => `
            <div class="actions-card">
              <strong>${escapeHtml(player.name || 'Unknown')}</strong>
              <div class="action-counts">
                ${Object.entries(player.actions || {})
                  .map(([key, value]) => `<span><em>${escapeHtml(key)}</em>${escapeHtml(formatInteger(value || 0))}</span>`)
                  .join('')}
              </div>
              <div class="analysis-list-block">
                <small>Top Units</small>
                ${renderCountList(player.topUnits)}
              </div>
              <div class="analysis-list-block">
                <small>Top Buildings</small>
                ${renderCountList(player.topBuildings)}
              </div>
              <div class="analysis-list-block">
                <small>Top Items</small>
                ${renderCountList(player.topItems)}
              </div>
            </div>
          `,
        )
        .join('')}
    </div>
  `
}

const renderReplayModalTab = (replay, analysis) => {
  if (replayModalTab === 'apm') return renderApmTab(analysis)
  if (replayModalTab === 'build') return renderBuildTab(analysis)
  if (replayModalTab === 'upgrades') return renderUpgradesTab(analysis)
  if (replayModalTab === 'items-bought') return renderItemsBoughtTab(analysis)
  if (replayModalTab === 'items-found') return renderItemsFoundTab(analysis)
  if (replayModalTab === 'chat') return renderChatTab(analysis)
  if (replayModalTab === 'actions') return renderActionsTab(analysis)
  return renderOverviewTab(replay, analysis)
}

const renderReplayModal = () => {
  const replay = getReplayByKey(selectedReplayKey)
  if (!replay) return ''

  const analysis = getAnalysis(replay.sourceSlug, replay.id)
  const parsedPlayers = analysis?.status === 'parsed' ? analysis.players : []
  const activeTab = replayModalTabs.some((tab) => tab.id === replayModalTab) ? replayModalTab : 'overview'

  return `
    <div class="analysis-modal-shell" role="presentation" data-modal-close>
      <section class="analysis-modal" role="dialog" aria-modal="true" aria-label="Replay analysis">
        <header class="analysis-modal-header">
          <div>
            <span>${escapeHtml(replay.sourceFlag)} ${escapeHtml(replay.sourceName)}</span>
            <h2>${escapeHtml(replay.map)}</h2>
            <div class="analysis-modal-matchup">${renderMatchupWithIcons(replay, parsedPlayers)}</div>
          </div>
          <button class="analysis-close" type="button" aria-label="Close replay analysis" data-modal-close>×</button>
        </header>
        <nav class="analysis-tabs" aria-label="Replay analysis tabs">
          ${replayModalTabs
            .map(
              (tab) => `
                <button class="${tab.id === activeTab ? 'is-active' : ''}" type="button" data-analysis-tab="${escapeHtml(tab.id)}">
                  ${escapeHtml(tab.label)}
                </button>
              `,
            )
            .join('')}
        </nav>
        <div class="analysis-modal-body">
          ${renderReplayModalTab(replay, { ...analysis, players: parsedPlayers })}
        </div>
      </section>
    </div>
  `
}

const formatReplayClock = (ms = 0) => {
  const totalSeconds = Math.max(0, Math.floor(Number(ms || 0) / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

const getReplayTheaterEvents = (analysis) => {
  if (!analysis || analysis.status !== 'parsed') return []

  const playerEvents = (analysis.players || []).flatMap((player) => {
    const heroEvents = (player.heroes || []).map((hero) => ({
      id: hero.id,
      ms: 0,
      time: '0:00',
      type: 'Hero',
      playerName: player.name,
      race: player.raceDetected || player.race,
      detail: hero.level ? `Level ${hero.level}` : 'Hero',
    }))

    return [
      ...heroEvents,
      ...getPlayerTimeline(player, [
        ['Building', player.order?.buildings],
        ['Unit', player.order?.units],
        ['Upgrade', addUpgradeOccurrences(player.order?.upgrades || [])],
        ['Item', player.order?.items],
      ]).map((item) => ({
        ...item,
        playerName: player.name,
        detail:
          item.type === 'Item'
            ? getItemPriceLabel(item.id)
            : item.type === 'Upgrade' && Number.isFinite(item.goldCost)
              ? formatGold(item.goldCost)
              : item.type,
      })),
    ]
  })

  const chatEvents = (analysis.chat || []).map((message) => ({
    id: 'chat',
    ms: message.timeMS || 0,
    time: message.time || formatReplayClock(message.timeMS || 0),
    type: 'Chat',
    playerName: message.playerName || 'Observer',
    detail: message.message || '',
  }))

  return [...playerEvents, ...chatEvents].sort((a, b) => (a.ms || 0) - (b.ms || 0))
}

const closeReplayTheater = () => {
  replayTheaterKey = null
  replayTheaterPlaying = false
  replayTheaterElapsedMs = 0
  if (replayTheaterTimer) {
    clearInterval(replayTheaterTimer)
    replayTheaterTimer = null
  }
  render()
}

const openReplayTheater = (key) => {
  replayTheaterKey = key
  replayTheaterElapsedMs = 0
  replayTheaterPlaying = false
  if (replayTheaterTimer) {
    clearInterval(replayTheaterTimer)
    replayTheaterTimer = null
  }
  render()
}

const toggleReplayTheaterPlayback = () => {
  const replay = getReplayByKey(replayTheaterKey)
  const analysis = replay ? getAnalysis(replay.sourceSlug, replay.id) : null
  const duration = analysis?.duration || 0

  replayTheaterPlaying = !replayTheaterPlaying
  if (replayTheaterTimer) {
    clearInterval(replayTheaterTimer)
    replayTheaterTimer = null
  }

  if (!replayTheaterPlaying) {
    render()
    return
  }

  replayTheaterTimer = setInterval(() => {
    replayTheaterElapsedMs += 1000
    if (duration && replayTheaterElapsedMs >= duration) {
      replayTheaterElapsedMs = duration
      replayTheaterPlaying = false
      clearInterval(replayTheaterTimer)
      replayTheaterTimer = null
    }
    render()
  }, 1000)
  render()
}

const renderReplayTheater = () => {
  const replay = getReplayByKey(replayTheaterKey)
  if (!replay) return ''

  const analysis = getAnalysis(replay.sourceSlug, replay.id)
  const parsedPlayers = analysis?.status === 'parsed' ? analysis.players : []
  const events = getReplayTheaterEvents(analysis)
  const duration = analysis?.duration || replay.duration || Math.max(...events.map((event) => event.ms || 0), 0)
  const progress = duration ? Math.min(100, Math.max(0, (replayTheaterElapsedMs / duration) * 100)) : 0
  const visibleEvents = events.filter((event) => (event.ms || 0) <= replayTheaterElapsedMs).slice(-18)
  const upcomingEvents = events.filter((event) => (event.ms || 0) > replayTheaterElapsedMs).slice(0, 18)

  return `
    <div class="replay-theater-shell" role="presentation" data-theater-close>
      <section class="replay-theater" role="dialog" aria-modal="true" aria-label="Replay theater">
        <header class="replay-theater-header">
          <div>
            <p class="eyebrow">Replay Theater Bridge</p>
            <h2>${escapeHtml(replay.sourceFlag)} ${escapeHtml(replay.sourceName)} on ${escapeHtml(replay.map)}</h2>
            <div class="analysis-modal-matchup">${renderMatchupWithIcons(replay, parsedPlayers)}</div>
          </div>
          <button class="analysis-close" type="button" aria-label="Close replay theater" data-theater-close>×</button>
        </header>
        <div class="replay-theater-body">
          <section class="replay-theater-map">
            ${
              replay.mapImage?.localPath
                ? `<img src="${escapeHtml(normalizePublicPath(replay.mapImage.localPath))}" alt="${escapeHtml(replay.map)} map thumbnail" />`
                : `<div class="map-placeholder" aria-hidden="true">${escapeHtml(replay.mapShort || 'WC3')}</div>`
            }
            <div class="replay-theater-map-overlay">
              <span>${escapeHtml(analysis?.version ? `Patch ${analysis.version}` : replay.version || 'Patch unknown')}</span>
              <strong>${escapeHtml(analysis?.durationLabel || replay.durationLabel || formatReplayClock(duration))}</strong>
              <small>${escapeHtml(replay.localPath || analysis?.sourceFile || '')}</small>
            </div>
          </section>
          <section class="replay-theater-controls">
            <div class="replay-theater-clock">
              <strong>${escapeHtml(formatReplayClock(replayTheaterElapsedMs))}</strong>
              <span>${escapeHtml(analysis?.durationLabel || formatReplayClock(duration))}</span>
            </div>
            <div class="replay-theater-progress" aria-label="Replay progress">
              <span style="width: ${progress.toFixed(2)}%;"></span>
            </div>
            <div class="replay-theater-buttons">
              <button type="button" data-theater-play>${replayTheaterPlaying ? 'Pause' : 'Play parsed timeline'}</button>
              <button type="button" data-theater-reset>Restart</button>
              <button class="replay-analysis-button" type="button" data-replay-detail="${escapeHtml(`${replay.sourceSlug}:${replay.id}`)}">Open Analysis Tabs</button>
            </div>
          </section>
          <div class="replay-theater-columns">
            <section>
              <h3>Played</h3>
              <div class="replay-theater-event-list">
                ${
                  visibleEvents.length
                    ? visibleEvents.map(renderReplayTheaterEvent).join('')
                    : '<div class="timeline-empty">Press play to advance the parsed replay timeline.</div>'
                }
              </div>
            </section>
            <section>
              <h3>Next Events</h3>
              <div class="replay-theater-event-list">
                ${
                  upcomingEvents.length
                    ? upcomingEvents.map(renderReplayTheaterEvent).join('')
                    : '<div class="timeline-empty">No more parsed events.</div>'
                }
              </div>
            </section>
          </div>
        </div>
        <footer class="replay-theater-note">
          This is the first replay bridge: parsed replay events with scrub-style playback. Full in-engine camera/unit simulation still needs the Warsmash command playback bridge.
        </footer>
      </section>
    </div>
  `
}

const renderReplayTheaterEvent = (event) => `
  <div class="replay-theater-event">
    <span>${escapeHtml(event.time || formatReplayClock(event.ms || 0))}</span>
    <div>
      <strong>${escapeHtml(event.type === 'Chat' ? event.playerName : labelForId(event.id))}</strong>
      <small>${escapeHtml(event.type === 'Chat' ? event.detail : `${event.playerName || 'Player'} · ${event.detail || event.type}`)}</small>
    </div>
  </div>
`

const matchesSearch = (replay) => {
  if (!replaySearch) return true
  const haystack = [
    replay.map,
    replay.mapShort,
    replay.type,
    replay.origin,
    replay.filetype,
    replay.version,
    getMatchup(replay),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(replaySearch.toLowerCase())
}

const matchesFilters = (replay) => {
  const playerMatches = playerFilter === 'all' || replay.sourceSlug === playerFilter
  const mapMatches = mapFilter === 'all' || replay.map === mapFilter
  const heroMatches = heroFilter === 'all' || getReplayStartingHeroIds(replay).includes(heroFilter)
  const matchupMatches = matchupFilter === 'all' || getMatchupKey(replay) === matchupFilter

  return playerMatches && mapMatches && heroMatches && matchupMatches && matchesSearch(replay)
}

const getFilteredReplays = () =>
  getAllReplays()
    .filter(matchesFilters)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))

const clampReplayPage = (totalPages) => {
  replayPage = Math.min(Math.max(replayPage, 1), Math.max(totalPages, 1))
}

const getVisiblePageNumbers = (currentPage, totalPages) => {
  const pages = new Set([1, totalPages])
  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page >= 1 && page <= totalPages) pages.add(page)
  }

  return [...pages].sort((a, b) => a - b)
}

const renderPaginationControls = (totalReplays, totalPages) => {
  if (totalPages <= 1) {
    return `<div class="replay-pagination is-simple"><span>${totalReplays} replay${totalReplays === 1 ? '' : 's'}</span></div>`
  }

  const start = (replayPage - 1) * REPLAYS_PER_PAGE + 1
  const end = Math.min(replayPage * REPLAYS_PER_PAGE, totalReplays)
  const pages = getVisiblePageNumbers(replayPage, totalPages)
  let previousPage = 0

  return `
    <nav class="replay-pagination" aria-label="Replay pagination">
      <span class="pagination-summary">${start}-${end} of ${totalReplays}</span>
      <div class="pagination-controls">
        <button class="pagination-button" type="button" data-page="${replayPage - 1}" ${replayPage === 1 ? 'disabled' : ''}>Prev</button>
        ${pages
          .map((page) => {
            const gap = previousPage && page - previousPage > 1 ? '<span class="pagination-gap">...</span>' : ''
            previousPage = page
            return `${gap}<button class="pagination-button ${page === replayPage ? 'is-active' : ''}" type="button" data-page="${page}" ${page === replayPage ? 'aria-current="page"' : ''}>${page}</button>`
          })
          .join('')}
        <button class="pagination-button" type="button" data-page="${replayPage + 1}" ${replayPage === totalPages ? 'disabled' : ''}>Next</button>
      </div>
    </nav>
  `
}

const renderReplayRows = (replays) => {
  if (replayCacheError) {
    return `
      <div class="empty-state">
        <strong>Replay cache unavailable</strong>
        <span>${escapeHtml(replayCacheError)}</span>
      </div>
    `
  }

  if (!replayCache) {
    return `
      <div class="empty-state">
        <strong>Loading replay cache</strong>
        <span>Reading local data from public/replays.json</span>
      </div>
    `
  }

  if (!replays.length) {
    return `
      <div class="empty-state">
        <strong>No matching replays</strong>
        <span>Try another map, player, race, or search term.</span>
      </div>
    `
  }

  return replays
    .map((replay) => {
      const date = replay.createdAt ? dateFormatter.format(new Date(replay.createdAt)) : 'Unknown date'
      const analysis = getAnalysis(replay.sourceSlug, replay.id)
      const parsedPlayers = analysis?.status === 'parsed' ? analysis.players : []
      const durationLabel = analysis?.durationLabel || replay.durationLabel

      return `
        <article class="replay-row" data-replay-detail="${escapeHtml(`${replay.sourceSlug}:${replay.id}`)}" role="button" tabindex="0" aria-label="Analyze ${escapeHtml(replay.map)} replay">
          <div class="replay-map">
            ${
              replay.mapImage?.localPath
                ? `<img src="${escapeHtml(normalizePublicPath(replay.mapImage.localPath))}" alt="${escapeHtml(replay.map)} map thumbnail" loading="lazy" />`
                : `<div class="map-placeholder" aria-hidden="true">${escapeHtml(replay.mapShort || 'WC3')}</div>`
            }
            <div>
              <span>${escapeHtml(date)}</span>
              <strong>${escapeHtml(replay.map)}</strong>
              <small>${escapeHtml(replay.sourceFlag)} ${escapeHtml(replay.sourceName)}</small>
            </div>
          </div>
          <div class="replay-match">
            <div class="replay-matchup">${renderMatchupWithIcons(replay, parsedPlayers)}</div>
            <div class="replay-actions">
              ${durationLabel ? `<span class="replay-duration">${escapeHtml(durationLabel)}</span>` : ''}
              <a href="${replay.downloadUrl}" target="_blank" rel="noreferrer">Download</a>
            </div>
          </div>
          <button class="replay-analysis-button" type="button" data-replay-detail="${escapeHtml(`${replay.sourceSlug}:${replay.id}`)}">
            ${analyzeIcon()}
            <span>Analyze</span>
          </button>
        </article>
      `
    })
    .join('')
}

const renderReplayPager = () => {
  if (replayCacheError || !replayCache) {
    return `
      <section class="replay-list" aria-label="Recent replay rows">
        ${renderReplayRows([])}
      </section>
    `
  }

  const replays = getFilteredReplays()
  const totalPages = Math.ceil(replays.length / REPLAYS_PER_PAGE)
  clampReplayPage(totalPages)
  const pageStart = (replayPage - 1) * REPLAYS_PER_PAGE
  const visibleReplays = replays.slice(pageStart, pageStart + REPLAYS_PER_PAGE)

  return `
    <section class="replay-list" aria-label="Recent replay rows">
      ${renderReplayRows(visibleReplays)}
    </section>
    ${replays.length ? renderPaginationControls(replays.length, Math.max(totalPages, 1)) : ''}
  `
}

const allLink = (className = '') => `
  <a class="${className}" href="#/" data-page-link>
    ${gameIcon('house')}
    <span>Home</span>
  </a>
`

const buildsLink = (className = '') => `
  <span class="${className} is-disabled" aria-disabled="true">
    ${gameIcon('scroll')}
    <span>Builds</span>
    <small>Coming soon</small>
  </span>
`

const playerEarningsLink = (className = '') => `
  <a class="${className}" href="#/player-earnings" data-page-link>
    ${gameIcon('coins')}
    <span>Player Earnings</span>
  </a>
`

const statisticsLink = (className = '') => `
  <a class="${className}" href="#/statistics" data-page-link>
    ${gameIcon('chart')}
    <span>Statistics</span>
  </a>
`

const rendererLink = (className = '') => `
  <a class="${className}" href="#/renderer" data-page-link>
    ${gameIcon('crystal')}
    <span>Renderer Test</span>
  </a>
`

const wc3ReplayViewerLink = (className = '') => `
  <a class="${className}" href="#/wc3-replay-viewer" data-page-link>
    ${gameIcon('castle')}
    <span>Warsmash</span>
  </a>
`

const w3gjsLink = (className = '') => `
  <a class="${className}" href="#/w3gjs" data-page-link>
    ${gameIcon('processor')}
    <span>w3gjs</span>
  </a>
`

const resourcesLink = (className = '') => `
  <a class="${className}" href="#/resources" data-page-link>
    ${gameIcon('compass')}
    <span>Resources</span>
  </a>
`

const renderFilterDropdown = ({ id, label, value, options }) => {
  const selectedOption = options.find((option) => option.value === value) || options[0]

  return `
    <div class="filter-control dropdown-filter" data-filter="${escapeHtml(id)}">
      <span class="filter-label" id="${escapeHtml(id)}-label">${escapeHtml(label)}</span>
      <button class="filter-dropdown-button" id="${escapeHtml(id)}" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${escapeHtml(id)}-label ${escapeHtml(id)}">
        <span>${selectedOption.iconId ? renderWc3ObjectIcon(selectedOption.iconId, selectedOption.label) : ''}${escapeHtml(selectedOption.label)}</span>
        <span class="dropdown-chevron" aria-hidden="true"></span>
      </button>
      <div class="filter-dropdown-menu" role="listbox" aria-labelledby="${escapeHtml(id)}-label">
        ${options
          .map(
            (option) => `
              <button class="filter-dropdown-option ${option.value === value ? 'is-selected' : ''}" type="button" role="option" aria-selected="${option.value === value}" data-value="${escapeHtml(option.value)}">
                <span>${option.iconId ? renderWc3ObjectIcon(option.iconId, option.label) : ''}${escapeHtml(option.label)}</span>
              </button>
            `,
          )
          .join('')}
      </div>
    </div>
  `
}

const renderFilterControls = () => `
  <section class="filters" aria-label="Replay filters">
    <div class="quick-filter">
      <label for="replay-search">Search replays</label>
      <input id="replay-search" type="search" value="${escapeHtml(replaySearch)}" placeholder="Search map, opponent, patch..." />
    </div>
    <div class="filter-popover">
      <button class="filters-toggle" type="button" aria-expanded="false" aria-controls="advanced-filters">
        <span>Filters</span>
        <span class="dropdown-chevron" aria-hidden="true"></span>
      </button>
      <div class="filter-popover-panel" id="advanced-filters">
        ${renderFilterDropdown({
          id: 'map-filter',
          label: 'Map',
          value: mapFilter,
          options: [
            { value: 'all', label: 'All maps' },
            ...getMapOptions().map((map) => ({ value: map, label: map })),
          ],
        })}
        ${renderFilterDropdown({
          id: 'hero-filter',
          label: 'Starting hero',
          value: heroFilter,
          options: [
            { value: 'all', label: 'All heroes' },
            ...getStartingHeroOptions(),
          ],
        })}
        ${renderFilterDropdown({
          id: 'matchup-filter',
          label: 'Matchup',
          value: matchupFilter,
          options: [
            { value: 'all', label: 'All matchups' },
            ...getMatchupOptions().map((matchup) => ({ value: matchup, label: matchup })),
          ],
        })}
      </div>
    </div>
  </section>
`

const renderRankingStreamAction = (player) => {
  if (!player.streamUrl) return '<span class="ranking-stream is-empty" aria-hidden="true"></span>'

  const platform = getStreamPlatform(player.streamUrl)
  return `
    <a class="ranking-stream" href="${escapeHtml(player.streamUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(player.name)} ${escapeHtml(platform.label)} stream">
      <span class="service-icon service-icon-${escapeHtml(platform.key)}" aria-hidden="true">
        ${platform.icon ? `<img src="${platform.icon}" alt="" loading="lazy" />` : escapeHtml(platform.short)}
      </span>
    </a>
  `
}

const renderRankingsSidebar = () => `
  <aside class="rankings-sidebar" aria-label="Human rankings">
    <div class="rankings-header">
      <span>WC3 HU Rankings</span>
      <small>Top ${getRankedPlayers().length}</small>
    </div>
    <div class="rankings-list">
      ${getRankedPlayers()
        .map(
          (player) => `
            <div class="ranking-row ${playerFilter === player.slug ? 'is-selected' : ''}" data-player-filter="${escapeHtml(player.slug)}" role="button" tabindex="0" aria-pressed="${playerFilter === player.slug}">
              <span class="ranking-rank">#${player.rank}</span>
              <span class="ranking-player">
                <span aria-hidden="true">${player.flag}</span>
                <strong>${escapeHtml(player.name)}</strong>
              </span>
              <span class="ranking-elo">${player.elo}</span>
              ${renderRankingStreamAction(player)}
            </div>
          `,
        )
        .join('')}
    </div>
  </aside>
`

const renderMedalBorder = (medalClass) => {
  if (!medalClass) return ''

  return `
    <svg class="medal-border" aria-hidden="true" focusable="false">
      <rect class="medal-border-glow" x="0" y="0" width="100%" height="100%" rx="6" ry="6" pathLength="1" />
      <rect class="medal-border-line" x="0" y="0" width="100%" height="100%" rx="6" ry="6" pathLength="1" />
    </svg>
  `
}

const renderPlayerCards = () => `
  <section class="player-card-region ${playerCardIntroPlayed ? '' : 'with-card-intro'}" aria-label="Top Human player cards">
    <div class="player-card-strip">
      ${getRankedPlayers()
        .map((player, index) => {
          const medalClass = ['is-gold', 'is-silver', 'is-bronze'][index] || ''
          const cardDelay = index * 760
          const borderDelay = index < 3 ? cardDelay + 520 : 0
          const earnings = getPlayerEarnings(player)

          return `
            <article class="player-card ${medalClass}" style="--card-delay: ${cardDelay}ms; --border-delay: ${borderDelay}ms;">
              ${renderMedalBorder(medalClass)}
              <div class="player-card-portrait ${['chaemiko', 'fortitude', 'hawk', 'infi', 'leon', 'sok'].includes(player.slug) ? 'has-player-image' : ''}">
                ${renderPlayerCardPortrait(player)}
                ${renderPlayerCardEffect(player)}
              </div>
              <div class="player-card-body">
                <div class="player-card-summary">
                  <span class="player-card-rank">#${player.rank} · ${player.elo} Elo</span>
                  <h2 class="player-card-name">
                    <span aria-hidden="true">${escapeHtml(player.flag)}</span>
                    <span>${escapeHtml(player.name)}</span>
                  </h2>
                  ${earnings ? `<p class="player-card-earnings">${escapeHtml(earnings.earningsLabel)}</p>` : ''}
                  ${renderPlayerRealName(player)}
                </div>
                <div class="player-card-actions">
                  ${renderStreamAction(player)}
                  ${renderLiquipediaAction(player)}
                  <a class="download-pack" href="${escapeHtml(player.replayPackUrl || `replay-packs/${player.slug}-2026-human-wins.zip`)}" download aria-label="Download ${escapeHtml(player.name)} 2026 Human wins replay pack">
                    ${downloadIcon()}
                    <span class="action-label download-pack-label">
                      <span>Download Latest</span>
                      <strong>Replay Pack</strong>
                    </span>
                  </a>
                </div>
              </div>
            </article>
          `
        })
        .join('')}
    </div>
  </section>
`

const renderHomePage = () => `
  ${renderPlayerCards()}

  <div class="home-layout">
    ${renderRankingsSidebar()}
    <section class="replay-column" aria-label="Human replay wins">
      ${renderFilterControls()}

      <div class="replay-pager">
        ${renderReplayPager()}
      </div>
    </section>
  </div>
`

const renderBuildsPage = () => `
  <section class="builds-page" aria-label="Builds"></section>
`

const renderRendererPage = () => {
  const testReplay = getAllReplays().find((replay) => replay.mapImage?.localPath && getAnalysis(replay.sourceSlug, replay.id)?.status === 'parsed') || getAllReplays()[0]
  const analysis = testReplay ? getAnalysis(testReplay.sourceSlug, testReplay.id) : null
  const parsedPlayers = analysis?.status === 'parsed' ? analysis.players : []
  const date = testReplay?.createdAt ? dateFormatter.format(new Date(testReplay.createdAt)) : 'Unknown date'

  return `
    <section class="renderer-page" aria-label="Renderer test">
      <header class="renderer-header">
        <div>
          <p class="eyebrow">Experimental</p>
          <h1>Renderer Test</h1>
          <p class="subline">One replay target for testing a browser-based WC3 replay viewer inside this app.</p>
        </div>
      </header>

      <div class="renderer-layout">
        <section class="renderer-stage" aria-label="Renderer preview">
          ${
            testReplay?.mapImage?.localPath
              ? `<img src="${escapeHtml(normalizePublicPath(testReplay.mapImage.localPath))}" alt="${escapeHtml(testReplay.map)} map thumbnail" loading="lazy" />`
              : `<div class="renderer-placeholder">WC3</div>`
          }
          <div class="renderer-stage-overlay">
            <span>Renderer bridge pending</span>
            <strong>${escapeHtml(testReplay?.map || 'Waiting for replay data')}</strong>
            <small>${testReplay ? 'First milestone: visual timeline and map-aware replay playback.' : 'Load replay cache to select a test file.'}</small>
          </div>
        </section>

        <aside class="renderer-test-card">
          <p class="eyebrow">Test replay</p>
          ${
            testReplay
              ? `
                <h2>${escapeHtml(testReplay.sourceFlag)} ${escapeHtml(testReplay.sourceName)} on ${escapeHtml(testReplay.map)}</h2>
                <dl>
                  <div><dt>Date</dt><dd>${escapeHtml(date)}</dd></div>
                  <div><dt>Replay ID</dt><dd>${escapeHtml(testReplay.id)}</dd></div>
                  <div><dt>Local file</dt><dd><code>${escapeHtml(testReplay.localPath)}</code></dd></div>
                  <div><dt>Players</dt><dd>${renderMatchupWithIcons(testReplay, parsedPlayers)}</dd></div>
                </dl>
                <div class="renderer-actions">
                  <button class="replay-analysis-button" type="button" data-replay-detail="${escapeHtml(`${testReplay.sourceSlug}:${testReplay.id}`)}">
                    ${analyzeIcon()}
                    <span>Open Analysis</span>
                  </button>
                  <a href="${escapeHtml(testReplay.downloadUrl)}" target="_blank" rel="noreferrer">Download replay</a>
                </div>
              `
              : '<p>No replay cache loaded yet.</p>'
          }
        </aside>
      </div>

      <section class="renderer-research">
        <article>
          <h2>Local wc3v Adapter</h2>
          <p>Run <code>npm run wc3v:setup</code>, then <code>npm run wc3v:serve</code>. The frame below points at the local wc3v client so we can develop the renderer beside this app without copying its code into our bundle.</p>
        </article>
        <article>
          <h2>Data Requirement</h2>
          <p>wc3v needs extracted Warcraft III data such as unit balance, icons, and map caches. That keeps Blizzard assets private on your machine and out of this repo.</p>
        </article>
        <article>
          <h2>First Target</h2>
          <p>Use the selected local replay as the first test case. Once wc3v has its data setup, the next step is passing this replay into wc3v automatically instead of manually downloading/uploading it.</p>
        </article>
      </section>

      <section class="renderer-embed" aria-label="Embedded wc3v client">
        <div class="renderer-embed-header">
          <div>
            <p class="eyebrow">wc3v local client</p>
            <h2>Embedded Viewer</h2>
          </div>
          <a href="http://127.0.0.1:8080/viewer?r=hvtw-hammerfall&hvtw=1" target="_blank" rel="noreferrer">Open wc3v</a>
        </div>
        <iframe title="wc3v local replay viewer" src="http://127.0.0.1:8080/viewer?r=hvtw-hammerfall&hvtw=1" loading="lazy"></iframe>
      </section>
    </section>
  `
}

const getWarsmashAssetSummary = () => {
  try {
    const index = JSON.parse(localStorage.getItem('w3AssetsIndex') || '[]')
    const fileCount = Array.isArray(index) ? index.length : 0
    const mpqCount = Array.isArray(index) ? index.filter((entry) => String(entry?.p || '').toLowerCase().endsWith('.mpq')).length : 0
    const mapCount = Array.isArray(index)
      ? index.filter((entry) => /\.(w3x|w3m)$/i.test(String(entry?.p || ''))).length
      : 0
    const totalBytes = Array.isArray(index) ? index.reduce((sum, entry) => sum + Number(entry?.s || 0), 0) : 0
    const edition = localStorage.getItem('wc3-warsmash-staged-edition') || 'legacy'
    return {
      ready: localStorage.getItem('w3AssetsReady') === '1' && fileCount > 0 && edition === warsmashAssetEdition,
      edition,
      fileCount,
      mpqCount,
      mapCount,
      totalMb: (totalBytes / 1048576).toFixed(1),
    }
  } catch {
    return { ready: false, edition: 'legacy', fileCount: 0, mpqCount: 0, mapCount: 0, totalMb: '0.0' }
  }
}

const getWarsmashInstallHints = () => {
  if (warsmashOnboardingPlatform === 'windows') {
    return {
      platform: 'Windows',
      primary: 'C:\\Program Files\\Warcraft III',
      secondary: 'C:\\Program Files (x86)\\Warcraft III',
      pickerHint: 'In the folder picker, paste the path into the address bar if it does not open there automatically.',
    }
  }

  return {
    platform: 'macOS',
    primary: '/Applications/Warcraft III (Legacy)',
    secondary: '/Applications/Warcraft III',
    pickerHint: 'In the folder picker, press Cmd+Shift+G, paste the path, then choose the Warcraft III folder.',
  }
}

const warsmashPatchSupport = {
  reforged: '2.0.4.23745',
  legacy: '1.29.2.9232',
}

const warsmashEditionOptions = [
  {
    id: 'legacy',
    label: 'Legacy MPQ',
    build: warsmashPatchSupport.legacy,
    status: 'Playable now',
    note: 'Current Warsmash web path mounts classic MPQs and loose maps from this install.',
  },
  {
    id: 'reforged',
    label: 'Reforged',
    build: warsmashPatchSupport.reforged,
    status: 'Experimental CASC test',
    note: 'Latest Reforged uses CASC assets. This app now has an experimental browser-worker CASC mount path backed by the private sandbox.',
  },
]

const ensureOpfsDir = async (parent, parts) => {
  let dir = parent
  for (const part of parts) {
    dir = await dir.getDirectoryHandle(part, { create: true })
  }
  return dir
}

const clearWarsmashOpfs = async () => {
  const root = await navigator.storage.getDirectory()
  for (const name of ['w3', 'extracted']) {
    try {
      await root.removeEntry(name, { recursive: true })
    } catch {
      // Missing entries are fine.
    }
  }
}

const stageDetectedWarsmashInstall = async (edition = warsmashAssetEdition) => {
  if (warsmashAutoStage.running) return
  warsmashAutoStage = { running: true, done: 0, total: 0, bytes: 0, totalBytes: 0, currentName: 'Reading local install...', error: '' }
  render()

  try {
    const manifestResponse = await fetch(`/wc3-local-assets/manifest?edition=${encodeURIComponent(edition)}`, { cache: 'no-store' })
    if (!manifestResponse.ok) {
      const payload = await manifestResponse.json().catch(() => ({}))
      throw new Error(payload.error || 'No local MPQ-style Warcraft III install was detected.')
    }
    const manifest = await manifestResponse.json()
    const files = Array.isArray(manifest.files) ? manifest.files : []
    if (!files.length) throw new Error('Detected install did not include MPQ/map files Warsmash can use.')

    warsmashAutoStage = {
      running: true,
      done: 0,
      total: files.length,
      bytes: 0,
      totalBytes: Number(manifest.totalBytes || 0),
      currentName: `Preparing ${manifest.root || 'local install'}`,
      error: '',
    }
    render()

    await clearWarsmashOpfs()
    const storage = await navigator.storage.getDirectory()
    const w3 = await storage.getDirectoryHandle('w3', { create: true })
    const index = []
    let done = 0
    let bytes = 0

    for (const file of files) {
      const relPath = String(file.path || '')
      if (!relPath) continue
      const response = await fetch(`/wc3-local-assets/file?edition=${encodeURIComponent(edition)}&path=${encodeURIComponent(relPath)}`)
      if (!response.ok) throw new Error(`Failed to read ${relPath}`)
      const blob = await response.blob()
      const parts = relPath.split('/').filter(Boolean)
      const dir = await ensureOpfsDir(w3, parts.slice(0, -1))
      const handle = await dir.getFileHandle(parts[parts.length - 1], { create: true })
      const writable = await handle.createWritable()
      await writable.write(blob)
      await writable.close()

      done += 1
      bytes += blob.size
      index.push({ p: relPath, s: blob.size })
      warsmashAutoStage = {
        running: true,
        done,
        total: files.length,
        bytes,
        totalBytes: Number(manifest.totalBytes || bytes),
        currentName: relPath,
        error: '',
      }
      if (done === files.length || done % 3 === 0) render()
    }

    localStorage.setItem('w3AssetsReady', '1')
    localStorage.setItem('w3AssetsCount', String(index.length))
    localStorage.setItem('w3AssetsIndex', JSON.stringify(index))
    localStorage.setItem('w3AssetsSource', manifest.root || 'detected local install')
    localStorage.setItem('wc3-warsmash-staged-edition', edition)
    localStorage.setItem('wc3-warsmash-selected-edition', edition)
    warsmashAutoStage = { running: false, done, total: files.length, bytes, totalBytes: Number(manifest.totalBytes || bytes), currentName: 'Ready', error: '' }
    render()
  } catch (error) {
    warsmashAutoStage = {
      ...warsmashAutoStage,
      running: false,
      error: error instanceof Error ? error.message : String(error),
    }
    render()
  }
}

const loadReforgedSandboxStatus = async () => {
  try {
    const response = await fetch('/wc3-reforged-sandbox/manifest', { cache: 'no-store' })
    if (!response.ok) {
      reforgedSandbox = { ...reforgedSandbox, checked: true, ready: false, error: '' }
      return
    }
    const manifest = await response.json()
    reforgedSandbox = {
      checked: true,
      preparing: false,
      ready: true,
      build: manifest.build || '',
      fileCount: Number(manifest.fileCount || 0),
      totalGb: ((Number(manifest.totals?.bytes || 0)) / 1073741824).toFixed(2),
      error: '',
    }
  } catch (error) {
    reforgedSandbox = {
      ...reforgedSandbox,
      checked: true,
      preparing: false,
      ready: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

const prepareReforgedSandbox = async () => {
  if (reforgedSandbox.preparing) return
  reforgedSandbox = { ...reforgedSandbox, preparing: true, error: '' }
  render()

  try {
    const response = await fetch('/wc3-reforged-sandbox/prepare', { cache: 'no-store' })
    const manifest = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(manifest.error || 'Failed to prepare Reforged sandbox.')
    reforgedSandbox = {
      checked: true,
      preparing: false,
      ready: true,
      build: manifest.build || '',
      fileCount:
        Number(manifest.totals?.configFiles || 0) +
        Number(manifest.totals?.indexFiles || 0) +
        Number(manifest.totals?.dataFiles || 0),
      totalGb: ((Number(manifest.totals?.bytes || 0)) / 1073741824).toFixed(2),
      error: '',
    }
  } catch (error) {
    reforgedSandbox = {
      ...reforgedSandbox,
      checked: true,
      preparing: false,
      ready: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
  render()
}

const renderWc3ReplayViewerPage = () => {
  const preferredReplay = getAllReplays().find((replay) => String(replay.id) === '137397')
  const testReplay = preferredReplay || getAllReplays().find((replay) => getAnalysis(replay.sourceSlug, replay.id)?.status === 'parsed') || getAllReplays()[0]
  const analysis = testReplay ? getAnalysis(testReplay.sourceSlug, testReplay.id) : null
  const parsedPlayers = analysis?.status === 'parsed' ? analysis.players : []
  const date = testReplay?.createdAt ? dateFormatter.format(new Date(testReplay.createdAt)) : 'Unknown date'
  const testReplayKey = testReplay ? `${testReplay.sourceSlug}:${testReplay.id}` : ''
  const warsmashPlayUrl = `/play/?menu=1&assets=${encodeURIComponent(warsmashAssetEdition)}&replay=${encodeURIComponent(testReplayKey)}&autostart=1`
  const warsmashAssetsUrl = '/assets/'
  const assetSummary = getWarsmashAssetSummary()
  const installHints = getWarsmashInstallHints()
  const currentEdition = warsmashEditionOptions.find((option) => option.id === warsmashAssetEdition) || warsmashEditionOptions[0]
  const selectedEditionPlayable = currentEdition.id === 'legacy'
  const engineReady = selectedEditionPlayable ? assetSummary.ready : reforgedSandbox.ready
  const renderReforgedSandboxPanel = () => {
    if (warsmashAssetEdition !== 'reforged') return ''

    return `
      <div class="wc3-reforged-sandbox ${reforgedSandbox.ready ? 'is-ready' : ''} ${reforgedSandbox.error ? 'is-error' : ''}">
        <div>
          <span>Private Reforged sandbox</span>
          <strong>${reforgedSandbox.ready ? `Ready · ${escapeHtml(reforgedSandbox.build || warsmashPatchSupport.reforged)}` : 'Not prepared yet'}</strong>
          <small>${
            reforgedSandbox.ready
              ? `${escapeHtml(formatInteger(reforgedSandbox.fileCount))} CASC files indexed, ${escapeHtml(reforgedSandbox.totalGb)} GB referenced read-only.`
              : 'Creates .wc3-assets/reforged/manifest.json and indexes your Reforged CASC data without modifying the install.'
          }</small>
          ${reforgedSandbox.error ? `<small>${escapeHtml(reforgedSandbox.error)}</small>` : ''}
        </div>
        <button type="button" data-reforged-prepare ${reforgedSandbox.preparing ? 'disabled' : ''}>
          ${reforgedSandbox.preparing ? 'Preparing...' : reforgedSandbox.ready ? 'Refresh Sandbox' : 'Prepare Reforged Sandbox'}
        </button>
      </div>
    `
  }
  const stagePct = warsmashAutoStage.totalBytes
    ? Math.min(100, (warsmashAutoStage.bytes / warsmashAutoStage.totalBytes) * 100)
    : 0
  const stageStatus = warsmashAutoStage.running
    ? `${warsmashAutoStage.done}/${warsmashAutoStage.total} ${(warsmashAutoStage.bytes / 1048576).toFixed(1)} / ${(warsmashAutoStage.totalBytes / 1048576).toFixed(1)} MB`
    : ''
  const renderWarsmashStage = () => {
    if (warsmashEmbedRequested) {
      return `
        <iframe title="Warsmash WC3 engine" src="${warsmashPlayUrl}" loading="lazy" allow="screen-wake-lock; fullscreen; autoplay"></iframe>
      `
    }

    return `
      <div class="wc3-viewer-offline">
        <p class="eyebrow">${engineReady ? 'Ready' : 'One-time setup'}</p>
        <h2>${engineReady ? 'Start Engine Test' : 'Connect Warcraft III'}</h2>
        <p>${
          engineReady
            ? selectedEditionPlayable
              ? `Warcraft III assets are staged locally: ${assetSummary.fileCount} files, ${assetSummary.mpqCount} MPQs, ${assetSummary.mapCount} maps, ${assetSummary.totalMb} MB. This boots Warsmash against the selected test replay target; full .w3g playback still needs the replay bridge.`
              : `Reforged CASC sandbox is indexed locally for build ${reforgedSandbox.build || warsmashPatchSupport.reforged}. This attempts the new browser-worker CASC mount path; full .w3g playback still needs the replay bridge.`
            : selectedEditionPlayable
              ? 'The viewer needs your own legacy Warcraft III MPQ install for the current Warsmash web engine path. The browser stores it once, then reuses the local cache.'
              : 'Your Reforged install is detected. Prepare the private sandbox to let the embedded Warsmash worker try the new CASC mount path.'
        }</p>
        <div class="wc3-version-picker" role="radiogroup" aria-label="Warcraft III version">
          ${warsmashEditionOptions
            .map(
              (option) => `
                <button class="${option.id === warsmashAssetEdition ? 'is-selected' : ''}" type="button" role="radio" aria-checked="${option.id === warsmashAssetEdition}" data-warsmash-edition="${escapeHtml(option.id)}">
                  <strong>${escapeHtml(option.label)}</strong>
                  <span>${escapeHtml(option.build)}</span>
                  <small>${escapeHtml(option.status)}</small>
                </button>
              `,
            )
            .join('')}
        </div>
        <div class="wc3-viewer-offline-actions">
          ${
            engineReady
              ? `
                <button class="warsmash-start-button" type="button" data-warsmash-watch="${escapeHtml(testReplayKey)}">
                  ${analyzeIcon()}
                  <span>${selectedEditionPlayable ? 'Start Engine Test' : 'Start Reforged Engine Test'}</span>
                </button>
                <a href="${warsmashAssetsUrl}" target="_blank" rel="noreferrer">Manage Assets</a>
              `
              : `
                <button class="is-primary" type="button" data-warsmash-auto-stage ${warsmashAutoStage.running || !selectedEditionPlayable ? 'disabled' : ''}>
                  ${warsmashAutoStage.running ? 'Staging Detected Install...' : 'Auto Stage Detected Install'}
                </button>
                <a href="${warsmashAssetsUrl}" target="_blank" rel="noreferrer">Manual Folder Picker</a>
                <button class="replay-analysis-button is-muted" type="button" disabled>
                  ${analyzeIcon()}
                  <span>Play unlocks after setup</span>
                </button>
              `
          }
        </div>
        ${renderReforgedSandboxPanel()}
        ${
          warsmashAutoStage.running || warsmashAutoStage.error
            ? `
              <div class="wc3-auto-stage-status ${warsmashAutoStage.error ? 'is-error' : ''}">
                ${
                  warsmashAutoStage.running
                    ? `<div class="wc3-auto-stage-bar"><span style="width: ${stagePct.toFixed(1)}%;"></span></div><strong>${escapeHtml(stageStatus)}</strong><small>${escapeHtml(warsmashAutoStage.currentName)}</small>`
                    : `<strong>Auto staging failed</strong><small>${escapeHtml(warsmashAutoStage.error)}</small>`
                }
              </div>
            `
            : ''
        }
        <div class="wc3-install-hint">
          <span>Suggested ${escapeHtml(installHints.platform)} folder</span>
          <code>${escapeHtml(currentEdition.id === 'legacy' ? installHints.primary : installHints.secondary)}</code>
          <small>${escapeHtml(currentEdition.note)}</small>
          <small>${selectedEditionPlayable ? `Auto stage uses the detected local MPQ-style install. Use the manual picker only if auto stage fails. ${installHints.pickerHint}` : 'The sandbox is read-only and local. The new CASC worker path can now be tested; replay playback still needs the command bridge.'}</small>
        </div>
      </div>
      <div class="renderer-stage-overlay">
        <span>Setup order</span>
        <strong>${engineReady ? 'Click Start' : selectedEditionPlayable ? 'Stage assets first' : 'Prepare sandbox first'}</strong>
        <small>${engineReady ? 'Boots the engine now; full in-engine .w3g playback is not implemented in Warsmash yet.' : selectedEditionPlayable ? 'Use Auto Stage Detected Install. It avoids copying the huge Reforged folder.' : 'Prepare the read-only Reforged sandbox, then start the new CASC worker path.'}</small>
      </div>
    `
  }

  return `
    <section class="renderer-page wc3-viewer-page" aria-label="WC3 replay viewer">
      <header class="renderer-header">
        <div>
          <p class="eyebrow">Warsmash engine spike</p>
          <h1>WC3 Replay Viewer</h1>
          <p class="subline">A local test page for booting the Warsmash browser engine and opening our parsed test replay while the full replay-playback bridge is built.</p>
        </div>
      </header>

      <div class="renderer-layout">
        <section class="renderer-stage wc3-viewer-stage" aria-label="Warsmash browser engine">
          ${renderWarsmashStage()}
        </section>

        <aside class="renderer-test-card">
          <p class="eyebrow">Test replay</p>
          ${
            testReplay
              ? `
                <h2>${escapeHtml(testReplay.sourceFlag)} ${escapeHtml(testReplay.sourceName)} on ${escapeHtml(testReplay.map)}</h2>
                <dl>
                  <div><dt>Date</dt><dd>${escapeHtml(date)}</dd></div>
                  <div><dt>Replay ID</dt><dd>${escapeHtml(testReplay.id)}</dd></div>
                  <div><dt>Local replay</dt><dd><code>${escapeHtml(testReplay.localPath)}</code></dd></div>
                  <div><dt>Selected version</dt><dd>${escapeHtml(currentEdition.label)} · ${escapeHtml(currentEdition.status)}</dd></div>
                  <div><dt>Assets status</dt><dd>${engineReady ? selectedEditionPlayable ? `Ready: ${assetSummary.fileCount} files staged` : `Sandbox ready: ${reforgedSandbox.fileCount} CASC files` : selectedEditionPlayable ? 'Setup required' : 'Prepare Reforged sandbox'}</dd></div>
                  <div><dt>Suggested folder</dt><dd><code>${escapeHtml(currentEdition.id === 'legacy' ? installHints.primary : installHints.secondary)}</code></dd></div>
                  <div><dt>Players</dt><dd>${renderMatchupWithIcons(testReplay, parsedPlayers)}</dd></div>
                </dl>
                <div class="renderer-actions">
                  <button class="replay-analysis-button" type="button" data-replay-detail="${escapeHtml(`${testReplay.sourceSlug}:${testReplay.id}`)}">
                    ${analyzeIcon()}
                    <span>Open Analysis</span>
                  </button>
                  ${
                    engineReady
                      ? `<button class="warsmash-start-button" type="button" data-warsmash-watch="${escapeHtml(testReplayKey)}">${analyzeIcon()}<span>${selectedEditionPlayable ? 'Start Engine Test' : 'Start Reforged Engine Test'}</span></button>`
                      : `<button type="button" data-warsmash-auto-stage ${warsmashAutoStage.running || !selectedEditionPlayable ? 'disabled' : ''}>${warsmashAutoStage.running ? 'Staging Detected Install...' : selectedEditionPlayable ? 'Auto Stage Detected Install' : 'Reforged Support Pending'}</button>`
                  }
                  <a href="${warsmashPlayUrl}" target="_blank" rel="noreferrer">Open Standalone Viewer</a>
                </div>
              `
              : '<p>No replay cache loaded yet.</p>'
          }
        </aside>
      </div>

      <section class="renderer-research">
        <article>
          <h2>What This Tests</h2>
          <p>This page boots the Warsmash browser engine from the same local Vite origin and keeps our selected replay beside it as the target case. The first proof is engine boot with local WC3 assets; replay command playback comes after that.</p>
        </article>
        <article>
          <h2>Why Legacy First</h2>
          <p>The detected legacy install has classic MPQs and stock maps, matching the Warsmash branch's current web asset path better than modern Reforged CASC files.</p>
        </article>
        <article>
          <h2>Replay Gap</h2>
          <p>Warsmash exposes a WC3 menu and map engine path. The <code>View Replay</code> button now hands off to this app's parsed Replay Theater; full deterministic <code>.w3g</code> simulation still needs a deeper engine command bridge.</p>
        </article>
        <article>
          <h2>Patch Support</h2>
          <p>Your Reforged install is detected as <code>${warsmashPatchSupport.reforged}</code>. The worker now has an experimental CASC mount path, while legacy remains available through classic MPQs from <code>${warsmashPatchSupport.legacy}</code>.</p>
        </article>
        <article>
          <h2>What A Fork Needs</h2>
          <p>To play latest-patch replays in-engine, we need a browser-safe CASC data source, map/object-data compatibility for 2.x, a <code>.w3g</code> command feeder, deterministic simulation checks, and controls that drive the engine clock.</p>
        </article>
      </section>

      <section class="renderer-embed wc3-viewer-steps" aria-label="WC3 replay viewer setup">
        <div class="renderer-embed-header">
          <div>
            <p class="eyebrow">Simple setup</p>
            <h2>What To Click</h2>
          </div>
          <a href="https://github.com/ErikSom/WarsmashModEngine/tree/HTML" target="_blank" rel="noreferrer">Warsmash HTML</a>
        </div>
        <div class="wc3-viewer-command-grid">
          <div class="${assetSummary.ready ? 'is-done' : 'is-current'}"><span>1</span><strong>Set up install</strong><small>Click Auto Stage Detected Install. It streams the local MPQ install into browser storage and remembers it.</small></div>
          <div class="${assetSummary.ready ? 'is-current' : ''}"><span>2</span><strong>Return here</strong><small>The page detects the staged assets automatically when you come back.</small></div>
          <div><span>3</span><strong>Start engine</strong><small>Click Start Engine Test. This boots the engine beside the selected test replay card.</small></div>
          <div><span>4</span><strong>Replay bridge</strong><small>Click View Replay in the engine menu to open the parsed Replay Theater. Native in-engine replay playback still needs the Warsmash command bridge.</small></div>
        </div>
      </section>
    </section>
  `
}

const renderStatisticsMetric = (label, value, note = '') => `
  <article class="statistics-metric">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
    ${note ? `<small>${escapeHtml(note)}</small>` : ''}
  </article>
`

const renderStatisticsObjectRows = (entries, emptyMessage = 'No parsed data yet') =>
  entries.length
    ? entries
        .map(
          ([id, count]) => `
            <div class="statistics-object-row">
              <span>${renderWc3ObjectIcon(id)}${escapeHtml(cleanWc3Label(labelForId(id)).replace(` (${id})`, ''))}</span>
              <strong>${escapeHtml(formatInteger(count))}</strong>
            </div>
          `,
        )
        .join('')
    : `<div class="analysis-empty"><strong>${escapeHtml(emptyMessage)}</strong></div>`

const renderStatisticsTextRows = (entries, emptyMessage = 'No parsed data yet') =>
  entries.length
    ? entries
        .map(
          ([label, count]) => `
            <div class="statistics-text-row">
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(formatInteger(count))}</strong>
            </div>
          `,
        )
        .join('')
    : `<div class="analysis-empty"><strong>${escapeHtml(emptyMessage)}</strong></div>`

const renderStatisticsPage = () => {
  const stats = getHumanReplayStats()
  const humanGames = stats.humanGames || 1
  const boughtEntries = getStatsEntries(stats.boughtItems, 10)
  const foundEntries = getStatsEntries(stats.foundItems, 8)

  return `
    <section class="statistics-page" aria-label="Replay statistics">
      <header class="statistics-header">
        <div>
          <p class="eyebrow">Parsed replay data</p>
          <h1>Statistics</h1>
          <p class="subline">Aggregated from Human player-games in the replay analysis cache.</p>
        </div>
      </header>

      <div class="statistics-metrics" aria-label="Replay data summary">
        ${renderStatisticsMetric('Parsed replays', formatInteger(stats.parsedReplays), 'Allowed map pool only')}
        ${renderStatisticsMetric('Human player-games', formatInteger(stats.humanGames), 'One Human player in most rows')}
        ${renderStatisticsMetric('Average Human APM', formatInteger(stats.averageApm), 'Parsed APM samples')}
        ${renderStatisticsMetric('Item actions', formatInteger(stats.totalItemActions), 'Buys, uses, and item commands')}
      </div>

      <section class="statistics-panel statistics-hero-panel">
        <div class="statistics-panel-header">
          <div>
            <p class="eyebrow">Human heroes</p>
            <h2>Pick Rate</h2>
          </div>
          <span>${escapeHtml(formatInteger(stats.humanGames))} Human games</span>
        </div>
        <div class="statistics-hero-grid">
          ${humanHeroIds
            .map((heroId) => {
              const picks = stats.heroPicks.get(heroId) || 0
              const firstPicks = stats.firstHeroPicks.get(heroId) || 0
              const pickRate = stats.humanGames ? (picks / humanGames) * 100 : 0
              const firstRate = stats.humanGames ? (firstPicks / humanGames) * 100 : 0

              return `
                <article class="statistics-hero-card">
                  <div>
                    ${renderWc3ObjectIcon(heroId)}
                    <h3>${escapeHtml(baseLabelForId(heroId))}</h3>
                  </div>
                  <dl>
                    <div><dt>Picked</dt><dd>${escapeHtml(formatInteger(picks))}</dd></div>
                    <div><dt>Pick rate</dt><dd>${escapeHtml(formatPercent(pickRate))}</dd></div>
                    <div><dt>First hero</dt><dd>${escapeHtml(formatInteger(firstPicks))}</dd></div>
                    <div><dt>First rate</dt><dd>${escapeHtml(formatPercent(firstRate))}</dd></div>
                  </dl>
                </article>
              `
            })
            .join('')}
        </div>
      </section>

      <div class="statistics-grid">
        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Shop purchases</p>
              <h2>Items Bought</h2>
            </div>
            <span>${escapeHtml(formatGold(stats.knownBoughtGold))}</span>
          </div>
          <div class="statistics-list">
            ${renderStatisticsObjectRows(boughtEntries, 'No shop purchases found')}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Non-shop item events</p>
              <h2>Items Found</h2>
            </div>
            <span>${escapeHtml(formatInteger([...stats.foundItems.values()].reduce((sum, count) => sum + count, 0)))}</span>
          </div>
          <div class="statistics-list">
            ${renderStatisticsObjectRows(foundEntries, 'No non-shop item events found')}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Parser limitation</p>
              <h2>Items Sold</h2>
            </div>
          </div>
          <div class="statistics-unavailable">
            <strong>Not available yet</strong>
            <p>The current replay parser exposes item command counts and item obtain/buy events, but not a reliable sold-item event. We should add a parser-level sell detector before showing sold stats.</p>
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Army</p>
              <h2>Most Trained Units</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${renderStatisticsObjectRows(getStatsEntries(stats.unitCounts, 10), 'No unit stats found')}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Tech and base</p>
              <h2>Buildings</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${renderStatisticsObjectRows(getStatsEntries(stats.buildingCounts, 10), 'No building stats found')}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Research</p>
              <h2>Upgrades</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${renderStatisticsObjectRows(getStatsEntries(stats.upgradeCounts, 10), 'No upgrade stats found')}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Map pool</p>
              <h2>Most Common Maps</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${renderStatisticsTextRows(getStatsEntries(stats.mapCounts, 8), 'No map stats found')}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Matchups</p>
              <h2>Opponent Spread</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${renderStatisticsTextRows(getStatsEntries(stats.matchupCounts, 8), 'No matchup stats found')}
          </div>
        </section>
      </div>
    </section>
  `
}

const getW3gjsMagicStats = () => {
  const replays = getAllReplays()
  const parsed = replays
    .map((replay) => ({ replay, analysis: getAnalysis(replay.sourceSlug, replay.id) }))
    .filter((entry) => entry.analysis?.status === 'parsed')
  const versionCounts = new Map()
  const mapCounts = new Map()
  const actionCounts = new Map()
  let chatMessages = 0
  let parsedPlayers = 0
  let eventCount = 0
  let apmTotal = 0
  let apmSamples = 0

  parsed.forEach(({ replay, analysis }) => {
    incrementStat(versionCounts, analysis.version || replay.version || 'Unknown')
    incrementStat(mapCounts, replay.map || analysis.map?.file || 'Unknown map')
    chatMessages += analysis.chat?.length || 0
    eventCount += analysis.chat?.length || 0

    ;(analysis.players || []).forEach((player) => {
      parsedPlayers += 1
      if (Number.isFinite(player.apm)) {
        apmTotal += player.apm
        apmSamples += 1
      }
      Object.entries(player.actions || {}).forEach(([key, value]) => {
        incrementStat(actionCounts, key, value || 0)
      })
      eventCount += (player.heroes || []).length
      eventCount += (player.order?.buildings || []).length
      eventCount += (player.order?.units || []).length
      eventCount += (player.order?.upgrades || []).length
      eventCount += (player.order?.items || []).length
    })
  })

  return {
    totalReplays: replays.length,
    parsedReplays: parsed.length,
    parsedPlayers,
    eventCount,
    chatMessages,
    averageApm: apmSamples ? Math.round(apmTotal / apmSamples) : 0,
    versionCounts,
    mapCounts,
    actionCounts,
  }
}

const renderW3gjsActionRows = (entries) =>
  entries.length
    ? entries
        .map(
          ([label, count]) => `
            <div class="w3gjs-action-row">
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(formatInteger(count))}</strong>
            </div>
          `,
        )
        .join('')
    : '<div class="analysis-empty"><strong>No action data parsed yet</strong></div>'

const renderW3gjsEventRows = (events) =>
  events.length
    ? events
        .map(
          (event) => `
            <div class="w3gjs-event-row">
              <span>${escapeHtml(event.time || formatReplayClock(event.ms || 0))}</span>
              <div>
                <strong>${escapeHtml(event.type === 'Chat' ? event.playerName : labelForId(event.id))}</strong>
                <small>${escapeHtml(event.type === 'Chat' ? event.detail : `${event.playerName || 'Player'} · ${event.detail || event.type}`)}</small>
              </div>
            </div>
          `,
        )
        .join('')
    : '<div class="analysis-empty"><strong>No timeline events parsed yet</strong></div>'

const renderW3gjsPage = () => {
  const stats = getW3gjsMagicStats()
  const testReplay =
    getAllReplays().find((replay) => String(replay.id) === '137397') ||
    getAllReplays().find((replay) => getAnalysis(replay.sourceSlug, replay.id)?.status === 'parsed') ||
    getAllReplays()[0]
  const analysis = testReplay ? getAnalysis(testReplay.sourceSlug, testReplay.id) : null
  const parsedPlayers = analysis?.status === 'parsed' ? analysis.players : []
  const events = getReplayTheaterEvents(analysis)
  const firstEvents = events.slice(0, 12)
  const midGameEvents = events.filter((event) => (event.ms || 0) >= 180000).slice(0, 12)
  const actionEntries = getStatsEntries(stats.actionCounts, 12)
  const versionEntries = getStatsEntries(stats.versionCounts, 4)
  const mapEntries = getStatsEntries(stats.mapCounts, 6)

  return `
    <section class="w3gjs-page" aria-label="w3gjs replay parser showcase">
      <header class="w3gjs-hero">
        <div>
          <p class="eyebrow">Replay parser lab</p>
          <h1>w3gjs</h1>
          <p class="subline">This is the part that is already real: local <code>.w3g</code> parsing for metadata, players, races, heroes, APM, actions, build orders, upgrades, items, chat, and map references.</p>
          <div class="w3gjs-hero-actions">
            <a href="https://github.com/PBug90/w3gjs" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://pbug90.github.io/wc3-replay-parser-web/" target="_blank" rel="noreferrer">Browser demo</a>
            <a href="https://pbug90.github.io/w3gjs/" target="_blank" rel="noreferrer">API docs</a>
          </div>
        </div>
        <aside class="w3gjs-code-card">
          <span>High-level API</span>
          <pre><code>import W3GReplay from "w3gjs";

const parser = new W3GReplay();
const result = await parser.parse("replay.w3g");</code></pre>
        </aside>
      </header>

      <div class="statistics-metrics w3gjs-metrics" aria-label="w3gjs parsed data summary">
        ${renderStatisticsMetric('Replay files', formatInteger(stats.totalReplays), 'From the local replay cache')}
        ${renderStatisticsMetric('Parsed replays', formatInteger(stats.parsedReplays), 'Built from w3gjs output')}
        ${renderStatisticsMetric('Parsed players', formatInteger(stats.parsedPlayers), 'Names, races, teams, APM')}
        ${renderStatisticsMetric('Timeline events', formatInteger(stats.eventCount), 'Builds, units, items, heroes, chat')}
      </div>

      <section class="w3gjs-showcase">
        <div class="w3gjs-replay-card">
          <p class="eyebrow">Selected replay</p>
          ${
            testReplay
              ? `
                <h2>${escapeHtml(testReplay.sourceFlag)} ${escapeHtml(testReplay.sourceName)} on ${escapeHtml(testReplay.map)}</h2>
                <div class="analysis-modal-matchup">${renderMatchupWithIcons(testReplay, parsedPlayers)}</div>
                <dl>
                  <div><dt>Game</dt><dd>${escapeHtml(analysis?.gameName || 'Unknown')}</dd></div>
                  <div><dt>Patch</dt><dd>${escapeHtml(analysis?.version || testReplay.version || 'Unknown')}</dd></div>
                  <div><dt>Build</dt><dd>${escapeHtml(analysis?.buildNumber || 'Unknown')}</dd></div>
                  <div><dt>Duration</dt><dd>${escapeHtml(analysis?.durationLabel || testReplay.durationLabel || 'Unknown')}</dd></div>
                  <div><dt>Map file</dt><dd><code>${escapeHtml(analysis?.map?.file || testReplay.map || 'Unknown')}</code></dd></div>
                  <div><dt>Local file</dt><dd><code>${escapeHtml(testReplay.localPath || analysis?.sourceFile || '')}</code></dd></div>
                </dl>
                <button class="replay-analysis-button" type="button" data-replay-detail="${escapeHtml(`${testReplay.sourceSlug}:${testReplay.id}`)}">
                  ${analyzeIcon()}
                  <span>Open Full Analysis Tabs</span>
                </button>
              `
              : '<p>No replay cache loaded yet.</p>'
          }
        </div>

        <div class="w3gjs-parser-card">
          <p class="eyebrow">What it can power</p>
          <h2>Magic We Can Build</h2>
          <div class="w3gjs-feature-grid">
            <span>Opening detection</span>
            <span>APM spikes</span>
            <span>Hero progression</span>
            <span>Item economy</span>
            <span>Build-order search</span>
            <span>Patch checks</span>
            <span>Chat markers</span>
            <span>Replay importer</span>
          </div>
        </div>
      </section>

      <div class="w3gjs-grid">
        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Minute-by-minute</p>
              <h2>APM Fingerprint</h2>
            </div>
            <span>${escapeHtml(formatInteger(stats.averageApm))} avg APM</span>
          </div>
          ${renderApmTab({ ...analysis, players: parsedPlayers })}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Event stream</p>
              <h2>First 12 Events</h2>
            </div>
          </div>
          <div class="w3gjs-event-list">
            ${renderW3gjsEventRows(firstEvents)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Mid game</p>
              <h2>After 3 Minutes</h2>
            </div>
          </div>
          <div class="w3gjs-event-list">
            ${renderW3gjsEventRows(midGameEvents)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Commands</p>
              <h2>Action Types</h2>
            </div>
          </div>
          <div class="w3gjs-action-list">
            ${renderW3gjsActionRows(actionEntries)}
          </div>
        </section>

        <section class="statistics-panel w3gjs-wide-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Build extraction</p>
              <h2>Opening Build Order</h2>
            </div>
          </div>
          ${renderBuildTab({ ...analysis, players: parsedPlayers })}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Items</p>
              <h2>Shop Purchases</h2>
            </div>
          </div>
          ${renderItemsBoughtTab({ ...analysis, players: parsedPlayers })}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Items</p>
              <h2>Creep Drops / Found</h2>
            </div>
          </div>
          ${renderItemsFoundTab({ ...analysis, players: parsedPlayers })}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Patch spread</p>
              <h2>Parsed Versions</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${renderStatisticsTextRows(versionEntries, 'No versions parsed')}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Map references</p>
              <h2>Common Maps</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${renderStatisticsTextRows(mapEntries, 'No maps parsed')}
          </div>
        </section>
      </div>
    </section>
  `
}

const wc3ResourceGroups = [
  {
    title: 'Ladder / Stats',
    links: [
      { label: 'W3Champions', href: 'https://w3champions.com/' },
      { label: 'W3Champions Rankings', href: 'https://w3champions.com/Rankings' },
      { label: 'Warcraft3.info Elo', href: 'https://warcraft3.info/stats/elo_ranking' },
      { label: 'Liquipedia Rankings', href: 'https://liquipedia.net/warcraft/Portal:Statistics' },
    ],
  },
  {
    title: 'Replays / Matches',
    links: [
      { label: 'Warcraft3.info Replays', href: 'https://warcraft3.info/replays/' },
      { label: 'WC3V', href: 'https://wc3v.com/' },
      { label: 'W3Champions Matches', href: 'https://w3champions.com/Matches' },
      { label: 'Back2Warcraft VODs', href: 'https://www.youtube.com/@Back2Warcraft' },
    ],
  },
  {
    title: 'News / Wikis',
    links: [
      { label: 'Warcraft3.info', href: 'https://warcraft3.info/' },
      { label: 'Liquipedia Warcraft', href: 'https://liquipedia.net/warcraft/Main_Page' },
      { label: 'Back2Warcraft', href: 'https://www.back2warcraft.com/' },
      { label: 'Blizzard WC3 Forums', href: 'https://us.forums.blizzard.com/en/warcraft3/' },
    ],
  },
  {
    title: 'Community / Discord',
    links: [
      { label: 'WC3 Gym Discord', href: 'https://discord.gg/7HUyQAKQ8p' },
      { label: 'Back2Warcraft Discord', href: 'https://discord.gg/56YEYfpy52' },
      { label: 'WC3 Gym', href: 'https://warcraft-gym.com/' },
      { label: 'Warcraft 3 Reddit', href: 'https://www.reddit.com/r/WC3/' },
    ],
  },
  {
    title: 'Maps / Modding',
    links: [
      { label: 'Hive Workshop', href: 'https://www.hiveworkshop.com/' },
      { label: 'Hive Maps', href: 'https://www.hiveworkshop.com/repositories/maps.564/' },
      { label: 'Hive Models', href: 'https://www.hiveworkshop.com/repositories/models.530/' },
      { label: 'WC3 Maps', href: 'https://wc3maps.com/' },
      { label: 'Epic War', href: 'https://www.epicwar.com/' },
      { label: 'WC3 Icons', href: 'https://wc3icons.coffbox.win/' },
    ],
  },
  {
    title: 'GitHub',
    links: [
      { label: 'w3gjs', href: 'https://github.com/PBug90/w3gjs', updated: 'Updated Jun 15, 2026' },
      { label: 'wc3v', href: 'https://github.com/jblanchette/wc3v', updated: 'Updated Jun 27, 2026' },
      { label: 'warcrumb', href: 'https://github.com/efskap/warcrumb', updated: 'Updated Nov 17, 2020' },
      { label: 'w3rs', href: 'https://github.com/aesteve/w3rs', updated: 'Updated Aug 7, 2022' },
      { label: 'War3Net', href: 'https://github.com/Drake53/War3Net', updated: 'Updated Jun 27, 2026' },
      { label: 'Warsmash', href: 'https://github.com/Retera/WarsmashModEngine', updated: 'Updated Jun 27, 2026' },
      { label: 'Warsmash HTML', href: 'https://github.com/ErikSom/WarsmashModEngine/tree/HTML', updated: 'Updated May 11, 2026' },
      { label: 'W3Champions website', href: 'https://github.com/w3champions/website', updated: 'Updated Jun 25, 2026' },
      { label: 'wc3maptranslator', href: 'https://github.com/ChiefOfGxBxL/WC3MapTranslator', updated: 'Updated Dec 21, 2025' },
    ],
  },
]

const getFaviconUrl = (href) => {
  try {
    const url = new URL(href)
    return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url.origin)}&sz=64`
  } catch {
    return ''
  }
}

const renderResourceCard = (group) => `
  <section class="resources-card">
    <header>
      <p class="eyebrow">${escapeHtml(group.title)}</p>
    </header>
    <div class="resources-link-list">
      ${group.links
        .map(
          (link) => `
            <a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">
              <img src="${escapeHtml(getFaviconUrl(link.href))}" alt="" loading="lazy" onerror="this.remove()" />
              <span>${escapeHtml(link.label)}</span>
              ${link.updated ? `<em>${escapeHtml(link.updated)}</em>` : ''}
              <small>${escapeHtml(link.href.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</small>
            </a>
          `,
        )
        .join('')}
    </div>
  </section>
`

const renderResourcesPage = () => `
  <section class="resources-page" aria-label="Warcraft III resources">
    <header class="resources-header">
      <div>
        <p class="eyebrow">Warcraft III directory</p>
        <h1>Resources</h1>
        <p class="subline">Active Warcraft III hubs, tooling, replay libraries, and community references for building the Human vs The World knowledge base.</p>
      </div>
    </header>
    <div class="resources-grid">
      ${wc3ResourceGroups.map(renderResourceCard).join('')}
    </div>
  </section>
`

const renderHumanMoneyPage = () => {
  const players = liquipediaEarnings?.players || []

  return `
    <section class="money-page" aria-label="Player earnings">
      <header class="money-header">
        <div>
          <p class="eyebrow">All-time leaderboard</p>
          <h1>Player Earnings</h1>
          <p class="subline">The all-time prize money leaderboard for Human players.</p>
        </div>
        <div class="money-header-art" aria-hidden="true">
          <img src="${playerEarningsBgImage}" alt="" />
        </div>
      </header>
      <div class="money-table" role="table" aria-label="Human earnings leaderboard">
        <div class="money-row is-heading" role="row">
          <span>Rank</span>
          <span>Player</span>
          <span>Country</span>
          <span>Race</span>
          <span>Earnings</span>
        </div>
        ${
          players.length
            ? players
                .map(
                  (player) => `
                    <div class="money-row" role="row">
                      <span>#${escapeHtml(player.rank)}</span>
                      <strong class="money-player-name">
                        <img src="${humanIcon}" alt="" aria-hidden="true" />
                        <span>${escapeHtml(player.name)}</span>
                      </strong>
                      <span>${escapeHtml(player.flag || '')} ${escapeHtml(player.country || 'Unknown')}</span>
                      <span>${escapeHtml(player.race || 'Human')}</span>
                      <strong class="money-amount">${escapeHtml(player.earningsLabel)}</strong>
                    </div>
                  `,
                )
                .join('')
            : '<div class="analysis-empty"><strong>Earnings unavailable</strong><span>Run the Liquipedia earnings fetch script to generate the local cache.</span></div>'
        }
      </div>
      <p class="money-note">${escapeHtml(liquipediaEarnings?.scope || '')}</p>
    </section>
  `
}

const refreshReplayResults = () => {
  const replayPager = document.querySelector('.replay-pager')

  if (replayPager) {
    replayPager.innerHTML = renderReplayPager()
    setupPaginationControls()
    setupReplayAnalysisControls()
  }
}

const resetReplayPage = () => {
  replayPage = 1
}

const updatePlayerSelectionUi = () => {
  document.querySelectorAll('[data-player-filter]').forEach((element) => {
    const isSelected = element.dataset.playerFilter === playerFilter
    element.classList.toggle('is-selected', isSelected)
    element.setAttribute('aria-pressed', String(isSelected))
    element.closest('.player-card')?.classList.toggle('is-selected', isSelected)
    if (element.classList.contains('ranking-row')) element.classList.toggle('is-selected', isSelected)
  })
}

const setPlayerFilter = (slug) => {
  playerFilter = playerFilter === slug ? 'all' : slug
  resetReplayPage()
  updatePlayerSelectionUi()
  refreshReplayResults()
}

const closeFilterDropdowns = (except = null) => {
  document.querySelectorAll('.dropdown-filter.is-open').forEach((dropdown) => {
    if (dropdown === except) return
    dropdown.classList.remove('is-open')
    dropdown.querySelector('.filter-dropdown-button')?.setAttribute('aria-expanded', 'false')
  })
}

const closeFilterPopover = () => {
  const popover = document.querySelector('.filter-popover')
  if (!popover) return
  popover.classList.remove('is-open')
  popover.querySelector('.filters-toggle')?.setAttribute('aria-expanded', 'false')
  closeFilterDropdowns()
}

const rerenderFilters = () => {
  const filters = document.querySelector('.filters')
  if (!filters) return
  filters.outerHTML = renderFilterControls()
  setupFilterControls()
}

const setupPaginationControls = () => {
  document.querySelectorAll('.pagination-button[data-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const page = Number(button.dataset.page)
      if (!Number.isFinite(page) || button.disabled || page === replayPage) return

      replayPage = page
      refreshReplayResults()
      document.querySelector('.replay-column')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  })
}

const closeReplayModal = () => {
  selectedReplayKey = null
  replayModalTab = 'overview'
  render()
}

const setupReplayAnalysisControls = () => {
  document.querySelectorAll('.replay-row[data-replay-detail]').forEach((row) => {
    row.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return
      selectedReplayKey = row.dataset.replayDetail
      replayModalTab = 'overview'
      render()
    })

    row.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      if (event.target.closest('a, button')) return
      event.preventDefault()
      selectedReplayKey = row.dataset.replayDetail
      replayModalTab = 'overview'
      render()
    })
  })

  document.querySelectorAll('.replay-analysis-button[data-replay-detail]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      selectedReplayKey = button.dataset.replayDetail
      replayModalTab = 'overview'
      render()
    })
  })

  document.querySelectorAll('[data-analysis-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      replayModalTab = button.dataset.analysisTab || 'overview'
      render()
    })
  })

  document.querySelectorAll('[data-modal-close]').forEach((element) => {
    element.addEventListener('click', (event) => {
      if (event.target !== element) return
      closeReplayModal()
    })
  })

  document.querySelectorAll('[data-theater-close]').forEach((element) => {
    element.addEventListener('click', (event) => {
      if (event.target !== element) return
      closeReplayTheater()
    })
  })

  document.querySelector('[data-theater-play]')?.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleReplayTheaterPlayback()
  })

  document.querySelector('[data-theater-reset]')?.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    replayTheaterElapsedMs = 0
    replayTheaterPlaying = false
    if (replayTheaterTimer) {
      clearInterval(replayTheaterTimer)
      replayTheaterTimer = null
    }
    render()
  })
}

const setupPlayerFilterTriggers = () => {
  document.querySelectorAll('[data-player-filter]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      if (event.target.closest('.ranking-stream')) return
      setPlayerFilter(trigger.dataset.playerFilter)
    })

    trigger.addEventListener('keydown', (event) => {
      if (trigger.tagName === 'BUTTON') return
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      setPlayerFilter(trigger.dataset.playerFilter)
    })
  })
}

const setupFilterControls = () => {
  const searchInput = document.querySelector('#replay-search')
  if (!searchInput) return

  searchInput.addEventListener('input', (event) => {
    replaySearch = event.target.value
    resetReplayPage()
    refreshReplayResults()
  })

  const popover = document.querySelector('.filter-popover')
  const toggle = document.querySelector('.filters-toggle')

  toggle?.addEventListener('click', (event) => {
    event.stopPropagation()
    const isOpen = popover?.classList.toggle('is-open') || false
    toggle.setAttribute('aria-expanded', String(isOpen))
    if (!isOpen) closeFilterDropdowns()
  })

  popover?.addEventListener('click', (event) => {
    event.stopPropagation()
  })

  document.querySelectorAll('.dropdown-filter').forEach((dropdown) => {
    const button = dropdown.querySelector('.filter-dropdown-button')
    const filterId = dropdown.dataset.filter

    button?.addEventListener('click', (event) => {
      event.stopPropagation()
      const isOpen = dropdown.classList.toggle('is-open')
      closeFilterDropdowns(dropdown)
      button.setAttribute('aria-expanded', String(isOpen))
    })

    dropdown.querySelectorAll('.filter-dropdown-option').forEach((option) => {
      option.addEventListener('click', () => {
        const value = option.dataset.value || 'all'

        if (filterId === 'map-filter') mapFilter = value
        if (filterId === 'hero-filter') heroFilter = value
        if (filterId === 'matchup-filter') matchupFilter = value

        resetReplayPage()
        closeFilterDropdowns()
        rerenderFilters()
        refreshReplayResults()
      })
    })
  })
}

const setupPlayerCardCarousel = () => {
  const carousel = document.querySelector('.player-card-strip')
  if (!carousel) return

  let isDown = false
  let startX = 0
  let scrollLeft = 0
  let dragged = false

  carousel.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return
    if (event.target.closest('a, button, input, select, textarea, label')) {
      isDown = false
      dragged = false
      return
    }

    isDown = true
    dragged = false
    startX = event.clientX
    scrollLeft = carousel.scrollLeft
    carousel.classList.add('is-dragging')
    carousel.setPointerCapture(event.pointerId)
  })

  carousel.addEventListener('pointermove', (event) => {
    if (!isDown) return
    const delta = event.clientX - startX
    if (Math.abs(delta) > 4) dragged = true
    carousel.scrollLeft = scrollLeft - delta
  })

  const endDrag = (event) => {
    if (!isDown) return
    isDown = false
    carousel.classList.remove('is-dragging')
    if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId)
  }

  carousel.addEventListener('pointerup', endDrag)
  carousel.addEventListener('pointercancel', endDrag)
  carousel.addEventListener(
    'click',
    (event) => {
      if (!dragged) return
      event.preventDefault()
      event.stopPropagation()
      dragged = false
    },
    true,
  )
}

const renderInfoLinks = (links) => `
  <ul class="app-info-link-list">
    ${links
      .map(
        (link) => `
          <li>
            <a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>
            <span>${escapeHtml(link.description)}</span>
          </li>
        `,
      )
      .join('')}
  </ul>
`

const renderInfoFeatureList = (items) => `
  <ul class="app-info-feature-list">
    ${items.map((item) => `<li>${item}</li>`).join('')}
  </ul>
`

const renderAppInfoTabContent = () => {
  if (appInfoTab === 'analyze') {
    return `
      <section>
        <h3>Analyze Tabs</h3>
        <p>Overview summarizes map, matchup, duration, winner data, and parsed player metadata.</p>
        <p>APM shows per-player action pace over the replay timeline.</p>
        <p>Build Order, Upgrades, Items Bought, and Items Found are parsed from replay events and enriched with known labels, icons, gold costs, and drop odds where available.</p>
        <p>Chatlog lists parsed chat messages. Actions shows action-type totals by player.</p>
      </section>
      <section>
        <h3>Better Analysis Ideas</h3>
        ${renderInfoFeatureList([
          'Opening classifier: auto-label fast expansion, rifle caster, tower rush, one-base tech, and other Human build families.',
          'Timing benchmarks: compare hero levels, expansions, tech, shop purchases, and first fights against the player average.',
          'Mistake detector: surface idle Town Hall time, late shop, delayed lumber tech, supply blocks, and missed upgrades.',
          'Matchup-specific filters: Human vs Orc, Undead, Night Elf, and mirror dashboards with different KPIs.',
        ])}
      </section>
    `
  }

  if (appInfoTab === 'updates') {
    return `
      <section>
        <h3>Keeping It Updated</h3>
        <p>Use scheduled, cached update jobs with rate limits instead of live scraping. Store fetched pages with timestamps, revalidate only changed sources, and keep a manual refresh command for development.</p>
        <p>Prefer official APIs, static dumps, GitHub-hosted data, or locally extracted map/replay files. For community sites, use clear user agents, delays, and small batches so the app stays respectful and maintainable.</p>
      </section>
      <section>
        <h3>Update Workflow</h3>
        ${renderInfoFeatureList([
          '<code>npm run update:replays</code> refreshes top Human rankings, replay metadata, replay downloads, and map images from Warcraft3.info.',
          '<code>npm run analyze:replays</code> rebuilds parsed replay summaries from local <code>.w3g</code> files.',
          '<code>npm run update:earnings</code> refreshes cached Liquipedia earnings with polite delays.',
          '<code>npm run build:packs</code> rebuilds downloadable player replay packs from the local replay cache.',
        ])}
      </section>
    `
  }

  if (appInfoTab === 'features') {
    return `
      <section>
        <h3>Good Next Features</h3>
        ${renderInfoFeatureList([
          'Replay importer: drag in a <code>.w3g</code> file, parse it locally, and compare it against the featured Human player database.',
          'In-app replay timeline: scrub through build order, hero levels, army size, item pickups, creeps, and fights without a full game renderer.',
          'Game renderer experiment: embed or integrate a browser Warcraft III engine path so selected replays can be watched inside the app.',
          'Source freshness panel: show when rankings, replays, earnings, map images, icons, and analysis were last updated.',
          'Player matchup dashboards: per-player Human vs Orc, Undead, Night Elf, and mirror win patterns with build recommendations.',
          'Map lab: creep-route overlays, item drop tables, expansion timings, and common Human creep paths per map.',
          'Searchable build library: save notable openings from parsed replays and filter by matchup, map, patch, hero, and timing.',
          'Replay quality score: flag incomplete parses, missing map tables, suspicious metadata, low duration games, and duplicate replay files.',
        ])}
      </section>
    `
  }

  if (appInfoTab === 'renderer') {
    return `
      <section>
        <h3>Can We View Replays Here?</h3>
        <p>Yes, for private local use this is possible as a research project. The app should not bundle Warcraft III game assets; instead it can ask you to point the local app at your own Warcraft III installation or extracted asset folder.</p>
        <p>The closest practical match I found is wc3v: it renders WC3 replays in-browser by parsing replay data, reconstructing units and events, and drawing a 3D map view. Warsmash is still the deeper engine inspiration because it proves Warcraft III-style rendering can run in the browser.</p>
        ${renderInfoLinks([
          {
            label: 'wc3v replay viewer',
            href: 'https://github.com/jblanchette/wc3v',
            description: 'In-browser WC3 replay viewer using parsed replay data and Three.js map rendering; likely the best starting point.',
          },
          {
            label: 'Warsmash HTML branch',
            href: 'https://github.com/ErikSom/WarsmashModEngine/tree/HTML',
            description: 'Browser-focused Warsmash branch to study as inspiration for a renderer experiment.',
          },
          {
            label: 'Warsmash browser demo',
            href: 'https://warsmash.pages.dev/',
            description: 'Live proof that this rendering direction can work in a browser.',
          },
          {
            label: 'Warsmash upstream',
            href: 'https://github.com/Retera/WarsmashModEngine',
            description: 'Engine source and documentation for the asset/data-source model.',
          },
        ])}
      </section>
      <section>
        <h3>Implementation Plan</h3>
        ${renderInfoFeatureList([
          '<strong>Phase 1: renderer test page.</strong> Pick one replay and wire a test route where the viewer can be developed without touching the main replay table.',
          '<strong>Phase 2: wc3v spike.</strong> Test whether wc3v parsing/rendering pieces can be adapted to our local replay cache and Vite app.',
          '<strong>Phase 3: map-aware visual replay.</strong> Render terrain, camera pan/zoom, minimap, starting locations, buildings, units, creep camps, and fight markers.',
          '<strong>Phase 4: local asset setup.</strong> Add a private settings screen where you choose a Warcraft III install or extracted asset folder. Store only the local path in browser storage or a local config file.',
          '<strong>Phase 5: Warsmash engine spike.</strong> Only if we need fuller game simulation, test whether Warsmash can be embedded and controlled through a replay-viewer bridge.',
          '<strong>Phase 6: analysis overlay.</strong> Layer our current insights over playback: build timings, APM spikes, item drops, hero levels, fight markers, and bookmarks.',
        ])}
      </section>
      <section>
        <h3>Hard Parts</h3>
        ${renderInfoFeatureList([
          'A wc3v-style viewer is achievable sooner because it reconstructs replay visualization rather than fully simulating Warcraft III.',
          'Full deterministic replay playback still needs the same map data, object data, patch assumptions, command ordering, and simulation behavior the original game used.',
          'The browser needs access to many local game assets, which is fine for your private machine but should stay out of the repo and production bundle.',
          'Warsmash is inspiration and possibly a base, but it may need adaptation for replay playback rather than only loading/running game content.',
          'A useful first milestone is not full cinematic playback. It is a map-aware replay viewer with scrub controls and analysis overlays.',
        ])}
      </section>
    `
  }

  if (appInfoTab === 'github') {
    return `
      <section>
        <h3>Warcraft III GitHub Repos To Watch</h3>
        ${renderInfoLinks([
          {
            label: 'w3gjs',
            href: 'https://github.com/PBug90/w3gjs',
            description: 'Replay parser already used here; good foundation for deeper timeline and replay metadata features.',
          },
          {
            label: 'WarsmashModEngine',
            href: 'https://github.com/Retera/WarsmashModEngine',
            description: 'Java Warcraft III engine project with an HTML branch/demo path; possible long-term browser replay renderer research.',
          },
          {
            label: 'Warsmash HTML branch',
            href: 'https://github.com/ErikSom/WarsmashModEngine/tree/HTML',
            description: 'The browser-focused fork/branch behind the kind of in-browser WC3 demo we could study.',
          },
          {
            label: 'warsmash.pages.dev',
            href: 'https://warsmash.pages.dev/',
            description: 'Live browser demo showing the engine direction is possible.',
          },
          {
            label: 'War3Net',
            href: 'https://github.com/Drake53/War3Net',
            description: '.NET Warcraft III map, campaign, object data, and replay tooling; useful reference for formats and extraction.',
          },
          {
            label: 'wc3maptranslator',
            href: 'https://github.com/ChiefOfGxBxL/WC3MapTranslator',
            description: 'Warcraft III map translation/parsing utilities that could help with map metadata and object data workflows.',
          },
          {
            label: 'wc3icons',
            href: 'https://wc3icons.coffbox.win/',
            description: 'Icon source used for local units, heroes, buildings, upgrades, and items.',
          },
        ])}
      </section>
    `
  }

  return `
    <section>
      <h3>Data Sources</h3>
      <p>Replays come from the local replay cache generated by the replay fetch script, then filtered to the allowed Human map pool.</p>
      <p>Replay analysis comes from locally parsed <code>.w3g</code> data using <code>w3gjs</code>: players, races, APM, build order, upgrades, shop items, found items, chat, and action counts.</p>
      <p>Map drop odds come from extracted local map drop tables. If a map table is missing, the app still shows found items but avoids inventing a percentage.</p>
      <p>Player earnings are cached locally from Warcraft III earnings pages and filtered to Human player profiles, so the app is not scraping pages during normal browsing.</p>
    </section>
    <section>
      <h3>Source Links</h3>
      ${renderInfoLinks([
        {
          label: 'Warcraft3.info replays',
          href: 'https://warcraft3.info/replays/',
          description: 'Replay search, replay metadata, downloads, map images, and source replay pages.',
        },
        {
          label: 'Warcraft3.info Elo API',
          href: 'https://warcraft3.info/api/v1/stats/elo?modelType=App%5CModels%5CStats%5CStatsPlayer',
          description: 'Top-player ranking source used to find featured Human players.',
        },
        {
          label: 'Liquipedia Warcraft III earnings',
          href: 'https://liquipedia.net/warcraft/Earnings/Total',
          description: 'Prize money cache source, filtered locally to Human player profiles.',
        },
        {
          label: 'Liquipedia Warcraft API',
          href: 'https://liquipedia.net/warcraft/api.php',
          description: 'Used by the earnings script to fetch profile wikitext for race and country metadata.',
        },
        {
          label: 'w3gjs',
          href: 'https://github.com/PBug90/w3gjs',
          description: 'Local replay parser used for analysis tabs.',
        },
        {
          label: 'WC3 Icons',
          href: 'https://wc3icons.coffbox.win/',
          description: 'Icon pack source for local heroes, units, buildings, upgrades, and item art.',
        },
      ])}
    </section>
  `
}

const renderAppInfoPanel = () => `
  <button class="app-info-button" type="button" aria-label="Open app info" aria-expanded="${appInfoOpen}" aria-controls="app-info-panel" data-info-toggle>
    <span aria-hidden="true">i</span>
  </button>
  <aside class="app-info-panel ${appInfoOpen ? 'is-open' : ''}" id="app-info-panel" aria-hidden="${!appInfoOpen}" aria-label="App info">
    <header class="app-info-header">
      <div>
        <p class="eyebrow">App info</p>
        <h2>How It Works</h2>
      </div>
      <button class="app-info-close" type="button" aria-label="Close app info" data-info-close>×</button>
    </header>
    <div class="app-info-tabs" role="tablist" aria-label="App info sections">
      ${appInfoTabs
        .map(
          (tab) => `
            <button class="${tab.id === appInfoTab ? 'is-active' : ''}" type="button" role="tab" aria-selected="${tab.id === appInfoTab}" data-info-tab="${escapeHtml(tab.id)}">
              ${escapeHtml(tab.label)}
            </button>
          `,
        )
        .join('')}
    </div>
    <div class="app-info-body">
      ${renderAppInfoTabContent()}
    </div>
  </aside>
`

const renderSiteFooter = () => `
  <footer class="site-footer">
    <div class="site-footer-inner">
      <span class="footer-bnet-tag" aria-label="Battle.net tag Jamie#12461">
        <img src="${bnetLogo}" alt="" aria-hidden="true" />
        <span>Jamie#12461</span>
      </span>
      <a class="footer-github-link" href="https://github.com/dottereldesign" target="_blank" rel="noreferrer" aria-label="Open dottereldesign on GitHub">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.11-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.4 9.4 0 0 1 12 6.02c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.67-4.56 4.92.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
        <span>dottereldesign</span>
      </a>
      <span class="footer-ai-note">Portrait and visual accent images created with AI-assisted tools.</span>
    </div>
  </footer>
`

const setupAppInfoPanel = () => {
  document.querySelector('[data-info-toggle]')?.addEventListener('click', () => {
    appInfoOpen = !appInfoOpen
    render()
  })

  document.querySelector('[data-info-close]')?.addEventListener('click', () => {
    appInfoOpen = false
    render()
  })

  document.querySelectorAll('[data-info-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      appInfoTab = button.dataset.infoTab || 'sources'
      render()
    })
  })
}

const setupWarsmashViewerControls = () => {
  document.querySelector('[data-warsmash-embed]')?.addEventListener('click', () => {
    warsmashEmbedRequested = true
    render()
  })

  document.querySelectorAll('[data-warsmash-watch]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      selectedReplayKey = null
      replayModalTab = 'overview'
      warsmashEmbedRequested = true
      render()
    })
  })

  document.querySelectorAll('[data-warsmash-edition]').forEach((button) => {
    button.addEventListener('click', () => {
      warsmashAssetEdition = button.dataset.warsmashEdition || 'legacy'
      localStorage.setItem('wc3-warsmash-selected-edition', warsmashAssetEdition)
      warsmashEmbedRequested = false
      render()
    })
  })

  document.querySelectorAll('[data-warsmash-auto-stage]').forEach((button) => {
    button.addEventListener('click', () => {
      stageDetectedWarsmashInstall(warsmashAssetEdition)
    })
  })

  document.querySelector('[data-reforged-prepare]')?.addEventListener('click', () => {
    prepareReforgedSandbox()
  })
}

const detectWarsmashOnboardingPlatform = () => {
  const platform = `${navigator.userAgent || ''} ${navigator.platform || ''}`.toLowerCase()
  warsmashOnboardingPlatform = platform.includes('win') ? 'windows' : 'mac'
}

const render = () => {
  const route = getActiveRoute()

  document.querySelector('#app').innerHTML = `
    <header class="site-header">
      <a class="brand ${logoIntroPlayed ? '' : 'with-logo-intro'}" href="#/" aria-label="Human vs The World home">
        <img src="${humanVsTheWorldLogo}" alt="Human vs The World" />
      </a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu">
        <span class="menu-button-icon" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </header>

    <div class="menu-backdrop" data-menu-close aria-hidden="true"></div>
    <aside class="menu-panel" id="site-menu" aria-hidden="true">
      <div class="menu-panel-inner">
        <p class="eyebrow">Browse</p>
        <nav class="menu-nav" aria-label="Menu">
          ${allLink(route.type === 'all' ? 'is-active' : '')}
          ${buildsLink(route.type === 'builds' ? 'is-active' : '')}
          ${playerEarningsLink(route.type === 'player-earnings' ? 'is-active' : '')}
          ${statisticsLink(route.type === 'statistics' ? 'is-active' : '')}
          ${resourcesLink(route.type === 'resources' ? 'is-active' : '')}
        </nav>
        ${showLocalSandbox ? `<div class="menu-sandbox">
          <p class="eyebrow">Sandbox</p>
          <nav class="menu-sandbox-nav" aria-label="Sandbox experiments">
            ${rendererLink(route.type === 'renderer' ? 'is-active' : '')}
            ${wc3ReplayViewerLink(route.type === 'wc3-replay-viewer' ? 'is-active' : '')}
            ${w3gjsLink(route.type === 'w3gjs' ? 'is-active' : '')}
          </nav>
        </div>` : ''}
      </div>
    </aside>

    <main class="page-shell">
      ${
        route.type === 'builds'
          ? renderBuildsPage()
          : route.type === 'player-earnings'
            ? renderHumanMoneyPage()
            : route.type === 'statistics'
              ? renderStatisticsPage()
              : route.type === 'renderer'
                ? renderRendererPage()
                : route.type === 'wc3-replay-viewer'
                  ? renderWc3ReplayViewerPage()
                  : route.type === 'w3gjs'
                    ? renderW3gjsPage()
                    : route.type === 'resources'
                      ? renderResourcesPage()
                      : renderHomePage()
      }
    </main>
    ${renderSiteFooter()}

    ${renderReplayModal()}
    ${renderReplayTheater()}
    ${renderAppInfoPanel()}
  `

  const header = document.querySelector('.site-header')
  const menu = document.querySelector('.menu-panel')
  const menuBackdrop = document.querySelector('.menu-backdrop')
  const menuButton = document.querySelector('.menu-button')

  const closeMenu = () => {
    menu.classList.remove('is-open')
    menuBackdrop?.classList.remove('is-open')
    menu.setAttribute('aria-hidden', 'true')
    menuButton.setAttribute('aria-expanded', 'false')
    menuButton.setAttribute('aria-label', 'Open menu')
  }

  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open')
    menuBackdrop?.classList.toggle('is-open', isOpen)
    menu.setAttribute('aria-hidden', String(!isOpen))
    menuButton.setAttribute('aria-expanded', String(isOpen))
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
  })

  menuBackdrop?.addEventListener('click', closeMenu)

  document.querySelectorAll('[data-page-link]').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })

  document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)
  updateHeaderScrollState()
  setupFilterControls()
  setupPaginationControls()
  setupReplayAnalysisControls()
  setupPlayerFilterTriggers()
  setupPlayerCardCarousel()
  setupAppInfoPanel()
  setupWarsmashViewerControls()

  if (document.querySelector('.player-card-region.with-card-intro') && !playerCardIntroTimer) {
    playerCardIntroTimer = window.setTimeout(() => {
      playerCardIntroPlayed = true
      document.querySelector('.player-card-region.with-card-intro')?.classList.remove('with-card-intro')
    }, 5200)
  }

  if (document.querySelector('.brand.with-logo-intro') && !logoIntroTimer) {
    logoIntroTimer = window.setTimeout(() => {
      logoIntroPlayed = true
      document.querySelector('.brand.with-logo-intro')?.classList.remove('with-logo-intro')
    }, 1400)
  }
}

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  if (replayTheaterKey) {
    closeReplayTheater()
    return
  }
  if (appInfoOpen) {
    appInfoOpen = false
    render()
    return
  }
  if (selectedReplayKey) {
    closeReplayModal()
    return
  }
  closeFilterPopover()
  const menu = document.querySelector('.menu-panel')
  const menuBackdrop = document.querySelector('.menu-backdrop')
  const menuButton = document.querySelector('.menu-button')
  if (!menu || !menuButton) return
  menu.classList.remove('is-open')
  menuBackdrop?.classList.remove('is-open')
  menu.setAttribute('aria-hidden', 'true')
  menuButton.setAttribute('aria-expanded', 'false')
  menuButton.setAttribute('aria-label', 'Open menu')
})

window.addEventListener('click', () => {
  closeFilterPopover()
})

window.addEventListener('hashchange', () => {
  warsmashEmbedRequested = false
  if (replayTheaterTimer) {
    clearInterval(replayTheaterTimer)
    replayTheaterTimer = null
  }
  replayTheaterKey = null
  replayTheaterPlaying = false
  replayTheaterElapsedMs = 0
  playerFilter = 'all'
  mapFilter = 'all'
  heroFilter = 'all'
  matchupFilter = 'all'
  resetReplayPage()
  render()
})

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin) return
  const data = event.data
  if (!data || typeof data !== 'object' || data.kind !== 'hvtw-replay-request') return
  const replayKey = data.replayKey || ''
  if (!getReplayByKey(replayKey)) return
  selectedReplayKey = null
  replayModalTab = 'overview'
  openReplayTheater(replayKey)
})

window.addEventListener('resize', () => {
  const header = document.querySelector('.site-header')
  if (header) document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)
})

window.addEventListener('focus', () => {
  if (getActiveRoute().type === 'wc3-replay-viewer' && !warsmashEmbedRequested) render()
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && getActiveRoute().type === 'wc3-replay-viewer' && !warsmashEmbedRequested) render()
})

const updateHeaderScrollState = () => {
  document.body.classList.toggle('has-scrolled-header', window.scrollY > 32)
}

window.addEventListener('scroll', updateHeaderScrollState, { passive: true })

const fetchJson = async (path) => {
  const response = await fetch(path, { cache: 'no-store' })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

const boot = async () => {
  detectWarsmashOnboardingPlatform()
  const sandboxStatusPromise = showLocalSandbox ? loadReforgedSandboxStatus() : Promise.resolve(null)
  const [
    replaysResult,
    rankingsResult,
    analysisResult,
    mapDropTablesResult,
    liquipediaEarningsResult,
    sandboxResult,
  ] = await Promise.allSettled([
    fetchJson('replays.json'),
    fetchJson('rankings.json'),
    fetchJson('replay-analysis.json'),
    fetchJson('map-drop-tables.json'),
    fetchJson('liquipedia-human-earnings.json'),
    sandboxStatusPromise,
  ])

  if (replaysResult.status === 'fulfilled') {
    replayCache = replaysResult.value
  } else {
    replayCacheError = replaysResult.reason?.message || 'Replay cache unavailable'
  }

  if (rankingsResult.status === 'fulfilled') rankingsCache = rankingsResult.value
  if (analysisResult.status === 'fulfilled') replayAnalysis = analysisResult.value
  if (mapDropTablesResult.status === 'fulfilled') mapDropTables = mapDropTablesResult.value
  if (liquipediaEarningsResult.status === 'fulfilled') liquipediaEarnings = liquipediaEarningsResult.value
  if (showLocalSandbox && sandboxResult.status === 'rejected') {
    reforgedSandbox = {
      ...reforgedSandbox,
      checked: true,
      ready: false,
      error: sandboxResult.reason?.message || 'Reforged sandbox status unavailable',
    }
  }

  render()
}

boot()
