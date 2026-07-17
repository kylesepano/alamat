export const GAME_WIDTH = 960
export const GAME_HEIGHT = 640
export const TILE_SIZE = 48
export const PLAYER_SPEED = 180
export const SAVE_KEY = 'alamat_milestone_1_save'

export const DEFAULT_SAVE = {
  save_version: '1.1.0',
  player: {
    name: '',
    appearance: {
      body: 'body_01',
      hair: 'hair_01',
      outfit: 'forest',
    },
  },
  world: {
    location_id: 'WLOC000001',
    x: 360,
    y: 408,
    story_flags: [],
    dialogue_choices: {},
  },
  player_state: {
    hp: null,
    spawn: {
      location_id: 'WLOC000001',
      x: 360,
      y: 360,
    },
  },
  companions: {
    active_companion_id: null,
    party_slots: [null],
    collection: [],
    bond_state: {},
    runtime: {},
    progression: {},
    equipment: {},
  },
  battles: {
    wins: {},
    losses: {},
    fled: {},
  },
  progression: {
    level: 1,
    xp: 0,
    total_xp: 0,
    class_id: 'manlalakbay',
    unlocked_skills: ['basic_strike', 'steady_guard'],
    active_skills: ['basic_strike', 'steady_guard'],
    skill_unlock_log: [],
    stat_points: 0,
    allocated_stats: {
      maxHp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
    },
    currencies: {
      pilak: 0,
    },
    field_log: [],
    reward_log: [],
  },
  inventory: {
    items: {
      healing_herb: 2,
    },
    equipment: [],
  },
  equipment: {
    slots: {
      weapon: null,
      armor: null,
      accessory: null,
    },
  },
  quests: {
    tracked_id: null,
    active: {},
    completed: {},
    log: [],
  },
}
