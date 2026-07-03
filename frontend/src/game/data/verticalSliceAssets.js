export const VERTICAL_SLICE_ASSETS = [
  { key: 'asset-player-base', path: '/assets/vertical-slice/characters/player_customizable_base.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 42, displayHeight: 56, fallbackPath: '/assets/vertical-slice/characters/player_customizable_base.svg' },
  { key: 'asset-npc-datu', path: '/assets/vertical-slice/npcs/npc_NPC000001_datu_magsalin.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 42, displayHeight: 56, fallbackPath: '/assets/vertical-slice/npcs/npc_NPC000001_datu_magsalin.svg' },
  { key: 'asset-npc-babaylan', path: '/assets/vertical-slice/npcs/npc_NPC000582_babaylan_lira_dalisay.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 42, displayHeight: 56, fallbackPath: '/assets/vertical-slice/npcs/npc_NPC000582_babaylan_lira_dalisay.svg' },
  { key: 'asset-npc-store', path: '/assets/vertical-slice/npcs/npc_NPC000301_general_store.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 42, displayHeight: 56, fallbackPath: '/assets/vertical-slice/npcs/npc_NPC000301_general_store.svg' },
  { key: 'asset-nilalang-aghoy', path: '/assets/vertical-slice/nilalang/nilalang_MON0038_aghoy.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 48, displayHeight: 48, fallbackPath: '/assets/vertical-slice/nilalang/nilalang_MON0038_aghoy.svg' },
  { key: 'asset-nilalang-duwende', path: '/assets/vertical-slice/nilalang/nilalang_MON0032_duwende.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 48, displayHeight: 48, fallbackPath: '/assets/vertical-slice/nilalang/nilalang_MON0032_duwende.svg' },
  { key: 'asset-nilalang-ungo', path: '/assets/vertical-slice/nilalang/nilalang_MON0028_ungo.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 50, displayHeight: 50, fallbackPath: '/assets/vertical-slice/nilalang/nilalang_MON0028_ungo.svg' },
  { key: 'asset-nilalang-batibat', path: '/assets/vertical-slice/nilalang/boss_MON0007_batibat.png', type: 'spritesheet', columns: 3, rows: 4, expectedWidth: 768, expectedHeight: 1024, displayWidth: 76, displayHeight: 76, fallbackPath: '/assets/vertical-slice/nilalang/boss_MON0007_batibat.svg' },
  { key: 'asset-tileset-barangay', path: '/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.svg', width: 256, height: 256 },
  { key: 'asset-tileset-forest', path: '/assets/vertical-slice/tilesets/tileset_balete_forest.svg', width: 256, height: 256 },
  { key: 'asset-tileset-shrine', path: '/assets/vertical-slice/tilesets/tileset_spirit_shrine.svg', width: 256, height: 256 },
  { key: 'asset-ui-interaction', path: '/assets/vertical-slice/ui/interaction_marker.svg', width: 48, height: 48 },
  { key: 'asset-ui-save', path: '/assets/vertical-slice/ui/save_point.svg', width: 56, height: 56 },
  { key: 'asset-ui-collision', path: '/assets/vertical-slice/ui/collision_debug_tile.svg', width: 48, height: 48 },
  { key: 'asset-item-healing-herb', path: '/assets/vertical-slice/items/icon_ITM000001_healing_herb.svg', width: 48, height: 48 },
  { key: 'asset-item-sacred-river-water', path: '/assets/vertical-slice/items/icon_ITM000003_sacred_river_water.svg', width: 48, height: 48 },
  { key: 'asset-equipment-bolo', path: '/assets/vertical-slice/equipment/icon_EQP000001_bolo.svg', width: 48, height: 48 },
  { key: 'asset-equipment-kris', path: '/assets/vertical-slice/equipment/icon_EQP000003_kris.svg', width: 48, height: 48 },
  { key: 'asset-map-preview-barangay', path: '/assets/vertical-slice/maps/preview_barangay_san_isidro.svg', width: 256, height: 256 },
]

export const PLAYER_ASSET_KEY = 'asset-player-base'
export const SPRITE_DIRECTIONS = ['down', 'left', 'right', 'up']

export function assetLoaderType(asset) {
  return asset.path.toLowerCase().endsWith('.svg') ? 'svg' : 'image'
}

export function spriteAssets() {
  return VERTICAL_SLICE_ASSETS.filter((asset) => asset.type === 'spritesheet')
}

export function spriteFrameName(direction, step = 0) {
  return `${direction}-${step}`
}

export function spriteIdleFrame(direction = 'down') {
  return spriteFrameName(direction, 0)
}

export function spriteWalkAnimationKey(assetKey, direction) {
  return `${assetKey}-walk-${direction}`
}

export function spriteSourceFrameSize(asset, source) {
  const width = Math.floor(source.width / asset.columns)
  const height = Math.floor(source.height / asset.rows)
  return { width, height }
}

export function assetByKey(key) {
  return VERTICAL_SLICE_ASSETS.find((asset) => asset.key === key)
}

export function objectAssetKey(object) {
  if (object.type === 'save') return 'asset-ui-save'
  if (object.type === 'item') return 'asset-item-healing-herb'
  if (object.type === 'transition') return 'asset-ui-interaction'
  if (object.type === 'boss' && object.id === 'MON0007') return 'asset-nilalang-batibat'
  if (object.type === 'encounter' && object.id === 'MON0032') return 'asset-nilalang-duwende'
  if (object.type === 'encounter' && object.id === 'MON0028') return 'asset-nilalang-ungo'
  if (object.type === 'encounter' && object.id === 'MON0038') return 'asset-nilalang-aghoy'
  if (object.type === 'npc' && object.id === 'NPC000001') return 'asset-npc-datu'
  if (object.type === 'npc' && (object.id === 'NPC000002' || object.id === 'NPC000582')) return 'asset-npc-babaylan'
  if (object.type === 'npc' && object.id === 'NPC000301') return 'asset-npc-store'
  if (object.type === 'npc') return 'asset-ui-interaction'
  return null
}
