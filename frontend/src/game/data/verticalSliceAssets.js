export const VERTICAL_SLICE_ASSETS = [
  { key: 'asset-player-base', path: '/assets/vertical-slice/characters/player_customizable_base.svg', width: 48, height: 64 },
  { key: 'asset-npc-datu', path: '/assets/vertical-slice/npcs/npc_NPC000001_datu_magsalin.svg', width: 48, height: 64 },
  { key: 'asset-npc-babaylan', path: '/assets/vertical-slice/npcs/npc_NPC000582_babaylan_lira_dalisay.svg', width: 48, height: 64 },
  { key: 'asset-npc-store', path: '/assets/vertical-slice/npcs/npc_NPC000301_general_store.svg', width: 48, height: 64 },
  { key: 'asset-nilalang-aghoy', path: '/assets/vertical-slice/nilalang/nilalang_MON0038_aghoy.svg', width: 64, height: 64 },
  { key: 'asset-nilalang-duwende', path: '/assets/vertical-slice/nilalang/nilalang_MON0032_duwende.svg', width: 64, height: 64 },
  { key: 'asset-nilalang-ungo', path: '/assets/vertical-slice/nilalang/nilalang_MON0028_ungo.svg', width: 64, height: 64 },
  { key: 'asset-nilalang-batibat', path: '/assets/vertical-slice/nilalang/boss_MON0007_batibat.svg', width: 96, height: 96 },
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

export function assetLoaderType(asset) {
  return asset.path.toLowerCase().endsWith('.svg') ? 'svg' : 'image'
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
  if (object.type === 'npc' && object.id === 'NPC000582') return 'asset-npc-babaylan'
  if (object.type === 'npc' && object.id === 'NPC000301') return 'asset-npc-store'
  if (object.type === 'npc') return 'asset-ui-interaction'
  return null
}
