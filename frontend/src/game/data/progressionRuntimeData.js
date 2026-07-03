import { addInventoryItem, itemById } from './inventoryRuntimeData.js'
import { ACTIVE_SKILL_SLOT_LIMIT } from './combatRuntimeData.js'

export const LEVEL_THRESHOLDS = [
  { level: 1, totalXp: 0 },
  { level: 2, totalXp: 80 },
  { level: 3, totalXp: 180 },
  { level: 4, totalXp: 320 },
  { level: 5, totalXp: 520 },
]

export const PLAYER_CLASS_TRACKS = {
  manlalakbay: {
    id: 'manlalakbay',
    name: 'Manlalakbay',
    description: 'A flexible traveler path focused on survival, observation, and respectful bonds.',
    skillUnlocks: [
      { level: 1, skillId: 'basic_strike', label: 'Basic Strike' },
      { level: 1, skillId: 'steady_guard', label: 'Steady Guard' },
      { level: 2, skillId: 'river_cut', label: 'River Cut' },
      { level: 3, skillId: 'woven_resolve', label: 'Woven Resolve' },
      { level: 4, skillId: 'balangay_drive', label: 'Balangay Drive' },
    ],
  },
}

export const BATTLE_REWARDS = {
  MON0032: {
    xp: 24,
    currencies: { pilak: 8 },
    itemRewards: [
      { id: 'mound_pebble', quantity: 1 },
      { id: 'tiny_clay_charm', quantity: 1 },
    ],
    notes: 'Duwende leaves small signs around the path rather than belongings to loot.',
  },
  MON0028: {
    xp: 36,
    currencies: { pilak: 12 },
    itemRewards: [
      { id: 'canopy_fur', quantity: 1 },
      { id: 'drum_bark', quantity: 1 },
    ],
    notes: 'The forest canopy grows quiet after the Ungo retreats.',
  },
  MON0038: {
    xp: 22,
    currencies: { pilak: 6 },
    itemRewards: [
      { id: 'leaf_basket_fiber', quantity: 1 },
      { id: 'shortcut_twig', quantity: 1 },
    ],
    notes: 'Aghoy leaves a harmless token as trust begins to grow.',
  },
  MON0007: {
    xp: 80,
    currencies: { pilak: 30 },
    itemRewards: [
      { id: 'nightmare_bark', quantity: 1 },
      { id: 'old_housepost_splinter', quantity: 1 },
    ],
    notes: 'The shrine air clears. This victory can unlock story-gated bonding.',
    uniqueFlag: 'rewarded_MON0007',
  },
}

export function rewardForBattle(monsterId) {
  return BATTLE_REWARDS[monsterId] ?? { xp: 10, currencies: {}, itemRewards: [], notes: 'The path settles.' }
}

export function applyBattleRewards(save, { result, monster_id }) {
  if (result !== 'victory') {
    return {
      result,
      monster_id,
      xp: 0,
      currencies: {},
      fieldDrops: [],
      levelBefore: save.progression.level,
      levelAfter: save.progression.level,
      levelUp: false,
      notes: result === 'fled' ? 'No rewards gained after retreating.' : 'No rewards gained after defeat.',
    }
  }

  const reward = rewardForBattle(monster_id)
  if (reward.uniqueFlag && save.world.story_flags.includes(reward.uniqueFlag)) {
    const repeatXp = Math.ceil(reward.xp * 0.35)
    const levelBefore = save.progression.level
    save.progression.total_xp += repeatXp
    save.progression.xp = save.progression.total_xp
    save.progression.level = levelForXp(save.progression.total_xp)
    const skillUnlocks = applySkillUnlocks(save)
    const summary = {
      result,
      monster_id,
      xp: repeatXp,
      currencies: {},
      fieldDrops: [],
      levelBefore,
      levelAfter: save.progression.level,
      levelUp: save.progression.level > levelBefore,
      skillUnlocks,
      notes: 'Unique boss rewards were already claimed. Reduced practice XP gained.',
    }
    save.progression.reward_log.unshift({ ...summary, acquired_at: new Date().toISOString() })
    save.progression.reward_log = save.progression.reward_log.slice(0, 20)
    return {
      ...summary,
    }
  }

  const levelBefore = save.progression.level
  save.progression.total_xp += reward.xp
  save.progression.xp = save.progression.total_xp
  save.progression.level = levelForXp(save.progression.total_xp)
  const skillUnlocks = applySkillUnlocks(save)

  for (const [currency, amount] of Object.entries(reward.currencies)) {
    save.progression.currencies[currency] = (save.progression.currencies[currency] ?? 0) + amount
  }

  const fieldDrops = reward.itemRewards.map((itemReward) => {
    addInventoryItem(save, itemReward.id, itemReward.quantity)
    const item = itemById(itemReward.id)
    return `${item?.name ?? itemReward.id} x${itemReward.quantity}`
  })

  for (const drop of fieldDrops) {
    save.progression.field_log.push({
      source_id: monster_id,
      name: drop,
      type: 'inventory_reward',
      acquired_at: new Date().toISOString(),
    })
  }

  if (reward.uniqueFlag && !save.world.story_flags.includes(reward.uniqueFlag)) {
    save.world.story_flags.push(reward.uniqueFlag)
  }

  const summary = {
    result,
    monster_id,
    xp: reward.xp,
    currencies: reward.currencies,
    fieldDrops,
    itemRewards: reward.itemRewards,
    levelBefore,
    levelAfter: save.progression.level,
    levelUp: save.progression.level > levelBefore,
    skillUnlocks,
    notes: reward.notes,
  }
  save.progression.reward_log.unshift({ ...summary, acquired_at: new Date().toISOString() })
  save.progression.reward_log = save.progression.reward_log.slice(0, 20)
  return summary
}

export function levelForXp(totalXp) {
  return LEVEL_THRESHOLDS.reduce((level, threshold) => totalXp >= threshold.totalXp ? threshold.level : level, 1)
}

export function nextLevelThreshold(level) {
  return LEVEL_THRESHOLDS.find((threshold) => threshold.level === level + 1) ?? null
}

export function playerStatsForProgression(progression, equipmentStats = {}) {
  const levelBonus = Math.max(0, (progression?.level ?? 1) - 1)
  return {
    maxHp: 96 + levelBonus * 10 + (equipmentStats.maxHp ?? 0),
    attack: 17 + levelBonus * 2 + (equipmentStats.attack ?? 0),
    defense: 8 + levelBonus + (equipmentStats.defense ?? 0),
    speed: 10 + (equipmentStats.speed ?? 0),
  }
}

export function applySkillUnlocks(save) {
  const track = PLAYER_CLASS_TRACKS[save.progression.class_id] ?? PLAYER_CLASS_TRACKS.manlalakbay
  const newlyUnlocked = []
  save.progression.unlocked_skills ??= ['basic_strike', 'steady_guard']
  save.progression.skill_unlock_log ??= []
  for (const unlock of track.skillUnlocks) {
    if (unlock.level > save.progression.level) continue
    if (save.progression.unlocked_skills.includes(unlock.skillId)) continue
    save.progression.unlocked_skills.push(unlock.skillId)
    save.progression.active_skills ??= []
    if (save.progression.active_skills.length < ACTIVE_SKILL_SLOT_LIMIT) {
      save.progression.active_skills.push(unlock.skillId)
    }
    const entry = {
      skill_id: unlock.skillId,
      name: unlock.label,
      level: unlock.level,
      unlocked_at: new Date().toISOString(),
    }
    save.progression.skill_unlock_log.unshift(entry)
    newlyUnlocked.push(entry)
  }
  save.progression.skill_unlock_log = save.progression.skill_unlock_log.slice(0, 20)
  return newlyUnlocked
}

export function classTrackForProgression(progression) {
  return PLAYER_CLASS_TRACKS[progression?.class_id] ?? PLAYER_CLASS_TRACKS.manlalakbay
}

export function playerActiveSkills(save) {
  const unlocked = save.progression.unlocked_skills ?? ['basic_strike', 'steady_guard']
  const source = save.progression.active_skills?.length ? save.progression.active_skills : unlocked
  save.progression.active_skills = normalizeSkillLoadout(source, unlocked)
  return save.progression.active_skills
}

export function togglePlayerActiveSkill(save, skillId) {
  const unlocked = save.progression.unlocked_skills ?? []
  if (!unlocked.includes(skillId)) return { ok: false, message: 'Skill is not learned.' }
  const active = playerActiveSkills(save)
  if (active.includes(skillId)) {
    if (active.length <= 1) return { ok: false, message: 'At least one active skill is required.' }
    save.progression.active_skills = active.filter((id) => id !== skillId)
    return { ok: true, message: `${skillId} moved to reserve.` }
  }
  if (active.length >= ACTIVE_SKILL_SLOT_LIMIT) return { ok: false, message: `Only ${ACTIVE_SKILL_SLOT_LIMIT} active skills are allowed.` }
  save.progression.active_skills = [...active, skillId]
  return { ok: true, message: `${skillId} added to active skills.` }
}

export function normalizeSkillLoadout(sourceSkills = [], unlockedSkills = []) {
  const normalized = []
  for (const skillId of sourceSkills) {
    if (normalized.length >= ACTIVE_SKILL_SLOT_LIMIT) break
    if (!unlockedSkills.includes(skillId) || normalized.includes(skillId)) continue
    normalized.push(skillId)
  }
  if (!normalized.length && unlockedSkills.length) {
    normalized.push(unlockedSkills[0])
  }
  return normalized
}
