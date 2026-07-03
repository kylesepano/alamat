export const PLAYER_BATTLE_TEMPLATE = {
  id: 'PLAYER',
  name: 'Manlalakbay',
  maxHp: 96,
  attack: 17,
  defense: 8,
  speed: 10,
  skills: [
    'basic_strike',
    'steady_guard',
  ],
}

export const VERTICAL_SLICE_BATTLES = {
  MON0032: {
    monster_id: 'MON0032',
    name: 'Duwende',
    title: 'Duwende tracks',
    assetKey: 'asset-nilalang-duwende',
    battleType: 'wild',
    maxHp: 72,
    attack: 13,
    defense: 8,
    speed: 9,
    skills: [
      'mound_pebble',
      'underfloor_mischief',
    ],
    victoryFlag: 'battle_won_MON0032',
  },
  MON0028: {
    monster_id: 'MON0028',
    name: 'Ungo',
    title: 'Ungo encounter',
    assetKey: 'asset-nilalang-ungo',
    battleType: 'wild',
    maxHp: 96,
    attack: 18,
    defense: 10,
    speed: 11,
    skills: [
      'canopy_crash',
      'wild_drum_chestbeat',
    ],
    victoryFlag: 'battle_won_MON0028',
  },
  MON0038: {
    monster_id: 'MON0038',
    name: 'Aghoy',
    title: 'Aghoy rustle',
    assetKey: 'asset-nilalang-aghoy',
    battleType: 'wild',
    maxHp: 64,
    attack: 11,
    defense: 7,
    speed: 13,
    skills: [
      'leaf_tap',
      'hidden_basket_gift',
    ],
    victoryFlag: 'battle_won_MON0038',
    trustHint: 'This Nilalang may become a future companion once the story unlocks bonding.',
  },
  MON0007: {
    monster_id: 'MON0007',
    name: 'Batibat',
    title: 'Batibat presence',
    assetKey: 'asset-nilalang-batibat',
    battleType: 'boss',
    maxHp: 144,
    attack: 22,
    defense: 13,
    speed: 6,
    skills: [
      'weight_of_the_old_post',
      'housepost_nightmare',
    ],
    victoryFlag: 'defeated_MON0007',
    fleeBlocked: true,
  },
}

export function battleForMonster(monsterId) {
  return VERTICAL_SLICE_BATTLES[monsterId] ?? VERTICAL_SLICE_BATTLES.MON0032
}
