import { TILE_SIZE } from '../config/gameConstants'

const baseObjects = [
  { type: 'save', id: 'SAVE_START', label: 'Save Point', x: 2, y: 2 },
  { type: 'npc', id: 'NPC000001', label: 'Datu Magsalin', x: 7, y: 6, dialogue: 'Welcome home. Walk the paths first; the land teaches before it tests.' },
  { type: 'npc', id: 'NPC000002', label: 'Lira Lakandula', x: 11, y: 8, dialogue: 'Try speaking with villagers and reading signs. Not every lesson is a battle.' },
  { type: 'item', id: 'ITM000001', label: 'Healing Herb', x: 15, y: 10, flag: 'picked_itm000001' },
  { type: 'transition', id: 'TO_MARKET', label: 'To Marketplace', x: 18, y: 7, target: 'WLOC000002', targetX: 3, targetY: 7 },
]

export const VERTICAL_SLICE_MAPS = {
  WLOC000001: {
    id: 'WLOC000001',
    name: 'Laguna Starter Barangay',
    zoneName: 'Barangay San Isidro',
    width: 22,
    height: 15,
    ground: 0x536d38,
    accent: 0x7a9b57,
    blocked: [
      ...rect(0, 0, 22, 1), ...rect(0, 14, 22, 1), ...rect(0, 0, 1, 15), ...rect(21, 0, 1, 15),
      ...rect(4, 3, 3, 2), ...rect(13, 3, 4, 2), ...rect(8, 11, 7, 2), ...rect(1, 9, 3, 3),
    ],
    decorations: [
      { kind: 'house', x: 4, y: 3, w: 3, h: 2 },
      { kind: 'hall', x: 13, y: 3, w: 4, h: 2 },
      { kind: 'rice', x: 8, y: 11, w: 7, h: 2 },
    ],
    objects: baseObjects,
  },
  WLOC000002: {
    id: 'WLOC000002',
    name: 'Laguna Marketplace',
    zoneName: 'Barangay San Isidro',
    width: 22,
    height: 15,
    ground: 0x6f5b3f,
    accent: 0xc69b54,
    blocked: [
      ...rect(0, 0, 22, 1), ...rect(0, 14, 22, 1), ...rect(0, 0, 1, 15), ...rect(21, 0, 1, 15),
      ...rect(6, 4, 3, 2), ...rect(12, 4, 3, 2), ...rect(6, 10, 9, 1),
    ],
    decorations: [
      { kind: 'stall', x: 6, y: 4, w: 3, h: 2 },
      { kind: 'forge', x: 12, y: 4, w: 3, h: 2 },
    ],
    objects: [
      { type: 'npc', id: 'NPC000301', label: 'General Store', x: 5, y: 7, dialogue: 'The shelves are modest, but a traveler should never enter the forest empty-handed.' },
      { type: 'npc', id: 'NPC000481', label: 'Blacksmith', x: 15, y: 7, dialogue: 'A blade is only as steady as the hand that carries it.' },
      { type: 'transition', id: 'TO_BARANGAY', label: 'To Barangay', x: 2, y: 7, target: 'WLOC000001', targetX: 17, targetY: 7 },
      { type: 'transition', id: 'TO_CHAPEL', label: 'To Chapel Courtyard', x: 19, y: 7, target: 'WLOC000003', targetX: 3, targetY: 7 },
    ],
  },
  WLOC000003: {
    id: 'WLOC000003',
    name: 'Laguna Chapel Courtyard',
    zoneName: 'Barangay San Isidro',
    width: 22,
    height: 15,
    ground: 0x4f665e,
    accent: 0xb8b08a,
    blocked: [
      ...rect(0, 0, 22, 1), ...rect(0, 14, 22, 1), ...rect(0, 0, 1, 15), ...rect(21, 0, 1, 15),
      ...rect(9, 3, 5, 4), ...rect(4, 10, 3, 2), ...rect(16, 10, 2, 2),
    ],
    decorations: [
      { kind: 'chapel', x: 9, y: 3, w: 5, h: 4 },
      { kind: 'garden', x: 4, y: 10, w: 3, h: 2 },
    ],
    objects: [
      { type: 'npc', id: 'NPC000004', label: 'Mayumi Bagwis', x: 7, y: 8, dialogue: 'Many prayers share this courtyard. ALAMAT asks us to listen before naming what is true.' },
      { type: 'npc', id: 'NPC000582', label: 'Babaylan Lira Dalisay', x: 15, y: 8, dialogue: 'Nilalang are not prizes. If one walks beside you someday, earn that trust.' },
      { type: 'transition', id: 'TO_MARKET', label: 'To Marketplace', x: 2, y: 7, target: 'WLOC000002', targetX: 18, targetY: 7 },
      { type: 'transition', id: 'TO_FOREST', label: 'To Balete Forest', x: 19, y: 7, target: 'WLOC000004', targetX: 3, targetY: 7 },
    ],
  },
  WLOC000004: {
    id: 'WLOC000004',
    name: 'Laguna Balete Forest',
    zoneName: 'Balete Forest',
    width: 24,
    height: 16,
    ground: 0x263f2d,
    accent: 0x4f7d4b,
    blocked: [
      ...rect(0, 0, 24, 1), ...rect(0, 15, 24, 1), ...rect(0, 0, 1, 16), ...rect(23, 0, 1, 16),
      ...rect(7, 3, 4, 3), ...rect(14, 9, 5, 2), ...rect(4, 11, 3, 2), ...rect(18, 3, 2, 4),
    ],
    decorations: [
      { kind: 'balete', x: 7, y: 3, w: 4, h: 3 },
      { kind: 'roots', x: 14, y: 9, w: 5, h: 2 },
    ],
    objects: [
      { type: 'encounter', id: 'MON0032', label: 'Duwende tracks', x: 5, y: 5 },
      { type: 'encounter', id: 'MON0028', label: 'Ungo encounter', x: 12, y: 11 },
      { type: 'encounter', id: 'MON0038', label: 'Aghoy rustle', x: 17, y: 6 },
      { type: 'npc', id: 'NPC000008', label: 'Kidlat Balagtas', x: 4, y: 8, dialogue: 'The old tree is restless. Step lightly, and do not mock the mound paths.' },
      { type: 'transition', id: 'TO_CHAPEL', label: 'To Chapel', x: 2, y: 7, target: 'WLOC000003', targetX: 18, targetY: 7 },
      { type: 'transition', id: 'TO_SHRINE', label: 'To Spirit Threshold', x: 21, y: 8, target: 'WLOC000009', targetX: 3, targetY: 8 },
    ],
  },
  WLOC000009: {
    id: 'WLOC000009',
    name: 'Laguna Spirit Realm Threshold',
    zoneName: 'Spirit Shrine',
    width: 22,
    height: 15,
    ground: 0x263447,
    accent: 0x82a7a6,
    blocked: [
      ...rect(0, 0, 22, 1), ...rect(0, 14, 22, 1), ...rect(0, 0, 1, 15), ...rect(21, 0, 1, 15),
      ...rect(9, 2, 4, 3), ...rect(7, 9, 8, 2), ...rect(3, 4, 2, 2), ...rect(17, 4, 2, 2),
    ],
    decorations: [
      { kind: 'shrine', x: 9, y: 2, w: 4, h: 3 },
      { kind: 'threshold', x: 7, y: 9, w: 8, h: 2 },
    ],
    objects: [
      { type: 'save', id: 'SAVE_SHRINE', label: 'Shrine Save Point', x: 3, y: 11 },
      { type: 'boss', id: 'MON0007', label: 'Batibat presence', x: 11, y: 7 },
      { type: 'npc', id: 'MON0040', label: 'Umalagad Echo', x: 16, y: 10, dialogue: 'A companion is not claimed here. It arrives only when trust has somewhere to stand.' },
      { type: 'transition', id: 'TO_FOREST', label: 'To Balete Forest', x: 2, y: 8, target: 'WLOC000004', targetX: 20, targetY: 8 },
    ],
  },
}

export function tileToWorld(tile) {
  return tile * TILE_SIZE + TILE_SIZE / 2
}

function rect(x, y, w, h) {
  return Array.from({ length: w * h }, (_, index) => ({ x: x + (index % w), y: y + Math.floor(index / w) }))
}
