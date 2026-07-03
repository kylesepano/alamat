import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const assetRoot = path.join(root, 'frontend', 'public', 'assets', 'vertical-slice')

const actors = [
  ['characters/player_customizable_base.svg', '#d8b765', 'traveler'],
  ['npcs/npc_NPC000001_datu_magsalin.svg', '#38bdf8', 'elder'],
  ['npcs/npc_NPC000582_babaylan_lira_dalisay.svg', '#a78bfa', 'guide'],
  ['npcs/npc_NPC000301_general_store.svg', '#f59e0b', 'shop'],
  ['nilalang/nilalang_MON0038_aghoy.svg', '#61c47c', 'aghoy'],
  ['nilalang/nilalang_MON0032_duwende.svg', '#c69b54', 'duwende'],
  ['nilalang/nilalang_MON0028_ungo.svg', '#ef7d57', 'ungo'],
  ['nilalang/boss_MON0007_batibat.svg', '#bd4c5f', 'batibat'],
]

const simpleAssets = [
  ['tilesets/tileset_barangay_san_isidro.svg', '#7a9b57', 'tiles'],
  ['tilesets/tileset_balete_forest.svg', '#4f7d4b', 'tiles'],
  ['tilesets/tileset_spirit_shrine.svg', '#82a7a6', 'tiles'],
  ['ui/interaction_marker.svg', '#f7d98b', 'star'],
  ['ui/save_point.svg', '#6db6ff', 'save'],
  ['ui/collision_debug_tile.svg', '#ff4d4d', 'debug'],
  ['items/icon_ITM000001_healing_herb.svg', '#22c55e', 'item'],
  ['items/icon_ITM000003_sacred_river_water.svg', '#38bdf8', 'item'],
  ['equipment/icon_EQP000001_bolo.svg', '#c69b54', 'blade'],
  ['equipment/icon_EQP000003_kris.svg', '#d8b765', 'blade'],
  ['maps/preview_barangay_san_isidro.svg', '#82a7a6', 'map'],
]

for (const [relativePath, color, motif] of actors) {
  write(relativePath, actorSheet(color, motif))
}

for (const [relativePath, color, motif] of simpleAssets) {
  write(relativePath, simplePlaceholder(color, motif))
}

console.log(`Reset ${actors.length + simpleAssets.length} vertical-slice SVG placeholder assets.`)

function write(relativePath, contents) {
  const target = path.join(assetRoot, relativePath)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents)
}

function actorSheet(color, motif) {
  const cells = []
  const directions = ['down', 'left', 'right', 'up']
  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      cells.push(actorCell(column * 256, row * 256, color, motif, directions[row], column))
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024" viewBox="0 0 768 1024">
  <rect width="768" height="1024" fill="none"/>
  ${cells.join('\n  ')}
</svg>
`
}

function actorCell(x, y, color, motif, direction, step) {
  const lean = step === 1 ? -9 : step === 2 ? 9 : 0
  const arm = step === 1 ? 18 : step === 2 ? -18 : 0
  const sideTurn = direction === 'left' ? -12 : direction === 'right' ? 12 : 0
  const back = direction === 'up'
  const boss = motif === 'batibat'
  const scale = boss ? 1.28 : motif === 'ungo' ? 1.08 : 1
  const headY = 86
  const bodyY = 142
  const footY = 203
  return `<g transform="translate(${x + 128 + sideTurn}, ${y}) scale(${scale}) translate(${-128}, 0)">
    <ellipse cx="${128 + lean * 0.4}" cy="${footY}" rx="42" ry="13" fill="#11180f" opacity="0.18"/>
    <path d="M${96 + lean} ${bodyY + 3} Q128 ${bodyY - 40} ${160 + lean} ${bodyY + 3} L151 ${bodyY + 56} Q128 ${bodyY + 76} ${105} ${bodyY + 56} Z" fill="${color}" stroke="#2a2118" stroke-width="6"/>
    <circle cx="${128 + lean * 0.25}" cy="${headY}" r="${boss ? 44 : 36}" fill="${color}" stroke="#2a2118" stroke-width="6"/>
    <path d="M${95 + lean} ${headY - 7} Q128 ${headY - 40} ${162 + lean} ${headY - 5}" fill="none" stroke="#fff6df" stroke-width="10" stroke-linecap="round" opacity="${back ? 0.25 : 0.65}"/>
    <path d="M${96 + lean} ${bodyY + 22} l${-26 - arm * 0.25} ${24 + arm * 0.2}" stroke="#2a2118" stroke-width="14" stroke-linecap="round"/>
    <path d="M${160 + lean} ${bodyY + 22} l${26 + arm * 0.25} ${24 - arm * 0.2}" stroke="#2a2118" stroke-width="14" stroke-linecap="round"/>
    <path d="M${113 + lean} ${bodyY + 58} l${-16 + arm * 0.18} 34" stroke="#2a2118" stroke-width="15" stroke-linecap="round"/>
    <path d="M${143 + lean} ${bodyY + 58} l${16 - arm * 0.18} 34" stroke="#2a2118" stroke-width="15" stroke-linecap="round"/>
    <circle cx="${motifPosition(motif).x}" cy="${bodyY + motifPosition(motif).y}" r="${motifPosition(motif).r}" fill="#fff6df" opacity="0.82"/>
  </g>`
}

function motifPosition(motif) {
  return {
    traveler: { x: 128, y: 18, r: 8 },
    elder: { x: 145, y: 10, r: 7 },
    guide: { x: 128, y: 7, r: 9 },
    shop: { x: 112, y: 16, r: 7 },
    aghoy: { x: 128, y: 14, r: 10 },
    duwende: { x: 129, y: 24, r: 8 },
    ungo: { x: 128, y: 18, r: 7 },
    batibat: { x: 128, y: 12, r: 11 },
  }[motif] ?? { x: 128, y: 16, r: 8 }
}

function simplePlaceholder(color, motif) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="22" fill="#11180f"/>
  <rect x="14" y="14" width="228" height="228" rx="18" fill="${color}" opacity="0.25" stroke="#d8b765" stroke-width="4"/>
  <circle cx="128" cy="104" r="42" fill="${color}"/>
  <path d="${iconFor(motif)}" fill="#fff6df" opacity="0.95"/>
</svg>
`
}

function iconFor(motif) {
  if (motif === 'tiles' || motif === 'map') return 'M54 70h64v64H54V70zm84 0h64v64h-64V70zM54 154h64v48H54v-48zm84 0h64v48h-64v-48z'
  if (motif === 'blade') return 'M72 184l88-116 28 28-116 88-30 10 10-30z'
  if (motif === 'item') return 'M92 82h72l-8 31c20 13 32 33 32 56 0 36-26 58-60 58s-60-22-60-58c0-23 12-43 32-56l-8-31z'
  if (motif === 'debug') return 'M56 70l24-24 120 120-24 24L56 70zm0 88l24-24 64 64-24 24-64-64z'
  if (motif === 'save') return 'M128 42l44 52v94H84V94l44-52zm-24 82h48v48h-48v-48z'
  return 'M128 48l22 54 58 5-44 38 14 57-50-30-50 30 14-57-44-38 58-5 22-54z'
}
