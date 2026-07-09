import { ACTIVE_SKILL_SLOT_LIMIT } from './combatRuntimeData'
import { equipmentById } from './inventoryRuntimeData'
import { normalizeSkillLoadout } from './progressionRuntimeData'

export const COMPANION_STAT_POINT_GRANTS_PER_LEVEL = 2

export const COMPANION_STAT_POINT_VALUES = {
  maxHp: 4,
  attack: 1,
  defense: 1,
  speed: 1,
}

export const COMPANION_DEFINITIONS = {
  MON0038: {
    monster_id: 'MON0038',
    name: 'Aghoy',
    role: 'Support',
    assetKey: 'asset-nilalang-aghoy',
    battleScale: 0.9,
    unlockMethod: 'story_gated_trust',
    requiredTrust: 60,
    requiredFlags: ['defeated_MON0007'],
    skills: ['aghoy_guiding_rustle'],
    bondPrompt: 'Aghoy watches you quietly. The forest path feels less afraid than before.',
    baseStats: { maxHp: 72, attack: 12, defense: 7, speed: 13 },
    growth: { maxHp: 8, attack: 1, defense: 1, speed: 1 },
    skillTree: [
      { level: 1, skillId: 'leaf_tap', label: 'Leaf Tap' },
      { level: 2, skillId: 'hidden_basket_gift', label: 'Hidden Basket Gift' },
      { level: 3, skillId: 'aghoy_guiding_rustle', label: 'Guiding Rustle' },
    ],
    equipmentSlots: ['charm', 'keepsake'],
  },
}

export const COMPANION_LEVEL_THRESHOLDS = [
  { level: 1, totalXp: 0 },
  { level: 2, totalXp: 70 },
  { level: 3, totalXp: 160 },
  { level: 4, totalXp: 300 },
  { level: 5, totalXp: 480 },
]

export function companionDefinition(monsterId) {
  return COMPANION_DEFINITIONS[monsterId] ?? null
}

export function activeCompanion(save) {
  const definition = companionDefinition(save.companions.active_companion_id)
  if (!definition) return null
  ensureCompanionRuntime(save, definition.monster_id)
  const progression = companionProgressionState(save, definition.monster_id)
  const stats = companionStatsForSave(save, definition.monster_id)
  const runtime = save.companions.runtime[definition.monster_id]
  return {
    ...definition,
    level: progression.level,
    total_xp: progression.total_xp,
    hp: Math.min(runtime.hp ?? stats.maxHp, stats.maxHp),
    maxHp: stats.maxHp,
    attack: stats.attack,
    defense: stats.defense,
    speed: stats.speed,
    skills: companionUnlockedSkills(save, definition.monster_id),
  }
}

export function companionBondState(save, monsterId) {
  return save.companions.bond_state[monsterId] ?? {
    monster_id: monsterId,
    trust: 0,
    eligible: false,
    bonded: false,
    discovered: false,
  }
}

export function canBondCompanion(save, monsterId) {
  const definition = companionDefinition(monsterId)
  if (!definition) return false
  const state = companionBondState(save, monsterId)
  const hasFlags = definition.requiredFlags.every((flag) => save.world.story_flags.includes(flag))
  return state.trust >= definition.requiredTrust && hasFlags && !state.bonded
}

export function applyTrustFromBattle(save, { result, monster_id }) {
  const definition = companionDefinition(monster_id)
  if (!definition || result !== 'victory') return null

  const current = companionBondState(save, monster_id)
  const nextTrust = Math.min(100, current.trust + 35)
  const next = {
    ...current,
    discovered: true,
    trust: nextTrust,
  }
  save.companions.bond_state[monster_id] = next
  refreshBondEligibility(save, monster_id)
  return save.companions.bond_state[monster_id]
}

export function refreshBondEligibility(save, monsterId) {
  const definition = companionDefinition(monsterId)
  if (!definition) return null
  const current = companionBondState(save, monsterId)
  const hasFlags = definition.requiredFlags.every((flag) => save.world.story_flags.includes(flag))
  const next = {
    ...current,
    eligible: current.trust >= definition.requiredTrust && hasFlags && !current.bonded,
  }
  save.companions.bond_state[monsterId] = next
  return next
}

export function refreshAllBondEligibility(save) {
  for (const monsterId of Object.keys(COMPANION_DEFINITIONS)) {
    refreshBondEligibility(save, monsterId)
  }
  return save
}

export function bondCompanion(save, monsterId) {
  if (!canBondCompanion(save, monsterId)) return save

  const current = companionBondState(save, monsterId)
  save.companions.bond_state[monsterId] = {
    ...current,
    eligible: false,
    bonded: true,
    trust: Math.max(current.trust, 60),
  }

  if (!save.companions.collection.includes(monsterId)) {
    save.companions.collection.push(monsterId)
  }
  save.companions.active_companion_id = monsterId
  save.companions.party_slots[0] = monsterId
  ensureCompanionRuntime(save, monsterId)
  if (!save.world.story_flags.includes(`bonded_${monsterId}`)) {
    save.world.story_flags.push(`bonded_${monsterId}`)
  }
  return save
}

export function companionLevelForXp(totalXp) {
  return COMPANION_LEVEL_THRESHOLDS.reduce((level, threshold) => totalXp >= threshold.totalXp ? threshold.level : level, 1)
}

export function nextCompanionLevelThreshold(level) {
  return COMPANION_LEVEL_THRESHOLDS.find((threshold) => threshold.level === level + 1) ?? null
}

export function companionProgressionState(save, monsterId) {
  save.companions.progression ??= {}
  const definition = companionDefinition(monsterId)
  if (!definition) return null
  save.companions.progression[monsterId] ??= {
    level: 1,
    xp: 0,
    total_xp: 0,
    unlocked_skills: definition.skillTree.filter((unlock) => unlock.level <= 1).map((unlock) => unlock.skillId),
    active_skills: definition.skillTree.filter((unlock) => unlock.level <= 1).map((unlock) => unlock.skillId),
    skill_unlock_log: [],
    stat_points: 0,
    allocated_stats: { maxHp: 0, attack: 0, defense: 0, speed: 0 },
  }
  save.companions.progression[monsterId].active_skills ??= save.companions.progression[monsterId].unlocked_skills.slice(0, ACTIVE_SKILL_SLOT_LIMIT)
  save.companions.progression[monsterId].stat_points ??= 0
  save.companions.progression[monsterId].allocated_stats = {
    maxHp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    ...save.companions.progression[monsterId].allocated_stats,
  }
  return save.companions.progression[monsterId]
}

export function companionStatsForSave(save, monsterId) {
  const definition = companionDefinition(monsterId)
  const progression = companionProgressionState(save, monsterId)
  const levelBonus = Math.max(0, (progression?.level ?? 1) - 1)
  const allocated = progression?.allocated_stats ?? {}
  const equipmentStats = companionEquipmentStatTotals(save, monsterId)
  return {
    maxHp: definition.baseStats.maxHp + levelBonus * definition.growth.maxHp + (allocated.maxHp ?? 0) * COMPANION_STAT_POINT_VALUES.maxHp + (equipmentStats.maxHp ?? 0),
    attack: definition.baseStats.attack + levelBonus * definition.growth.attack + (allocated.attack ?? 0) * COMPANION_STAT_POINT_VALUES.attack + (equipmentStats.attack ?? 0),
    defense: definition.baseStats.defense + levelBonus * definition.growth.defense + (allocated.defense ?? 0) * COMPANION_STAT_POINT_VALUES.defense + (equipmentStats.defense ?? 0),
    speed: definition.baseStats.speed + levelBonus * definition.growth.speed + (allocated.speed ?? 0) * COMPANION_STAT_POINT_VALUES.speed + (equipmentStats.speed ?? 0),
  }
}

export function companionUnlockedSkills(save, monsterId) {
  return companionActiveSkills(save, monsterId)
}

export function ensureCompanionRuntime(save, monsterId) {
  save.companions.runtime ??= {}
  save.companions.equipment ??= {}
  const stats = companionStatsForSave(save, monsterId)
  save.companions.runtime[monsterId] ??= { hp: stats.maxHp }
  save.companions.equipment[monsterId] ??= { charm: null, keepsake: null }
  save.companions.runtime[monsterId].hp = Math.min(save.companions.runtime[monsterId].hp ?? stats.maxHp, stats.maxHp)
  return save.companions.runtime[monsterId]
}

export function setCompanionHp(save, monsterId, hp) {
  const runtime = ensureCompanionRuntime(save, monsterId)
  const stats = companionStatsForSave(save, monsterId)
  runtime.hp = Math.max(0, Math.min(stats.maxHp, hp ?? stats.maxHp))
  return runtime
}

export function reviveCompanionsAtBalon(save) {
  for (const monsterId of save.companions.collection ?? []) {
    const stats = companionStatsForSave(save, monsterId)
    setCompanionHp(save, monsterId, stats.maxHp)
  }
  return save
}

export function applyCompanionBattleRewards(save, { result, monster_id, xp = 0 }) {
  const activeId = save.companions.active_companion_id
  if (result !== 'victory' || !activeId) return null
  const progression = companionProgressionState(save, activeId)
  const definition = companionDefinition(activeId)
  const gainedXp = Math.max(1, Math.round(xp * 0.75))
  const levelBefore = progression.level
  progression.total_xp += gainedXp
  progression.xp = progression.total_xp
  progression.level = companionLevelForXp(progression.total_xp)
  const statPointsGained = grantCompanionStatPoints(save, activeId, levelBefore)

  const skillUnlocks = []
  for (const unlock of definition.skillTree) {
    if (unlock.level > progression.level) continue
    if (progression.unlocked_skills.includes(unlock.skillId)) continue
    progression.unlocked_skills.push(unlock.skillId)
    progression.active_skills ??= []
    if (progression.active_skills.length < ACTIVE_SKILL_SLOT_LIMIT) {
      progression.active_skills.push(unlock.skillId)
    }
    const entry = {
      skill_id: unlock.skillId,
      name: unlock.label,
      level: unlock.level,
      unlocked_at: new Date().toISOString(),
    }
    progression.skill_unlock_log.unshift(entry)
    skillUnlocks.push(entry)
  }
  progression.skill_unlock_log = progression.skill_unlock_log.slice(0, 20)
  ensureCompanionRuntime(save, activeId)
  return {
    monster_id,
    companion_id: activeId,
    xp: gainedXp,
    levelBefore,
    levelAfter: progression.level,
    levelUp: progression.level > levelBefore,
    statPointsGained,
    skillUnlocks,
  }
}

export function grantCompanionStatPoints(save, monsterId, previousLevel) {
  const progression = companionProgressionState(save, monsterId)
  const levelsGained = Math.max(0, progression.level - previousLevel)
  if (levelsGained <= 0) return 0
  const points = levelsGained * COMPANION_STAT_POINT_GRANTS_PER_LEVEL
  progression.stat_points = (progression.stat_points ?? 0) + points
  progression.allocated_stats ??= { maxHp: 0, attack: 0, defense: 0, speed: 0 }
  return points
}

export function allocateCompanionStat(save, monsterId, stat) {
  if (!Object.hasOwn(COMPANION_STAT_POINT_VALUES, stat)) return { ok: false, message: 'Unknown companion stat.' }
  const progression = companionProgressionState(save, monsterId)
  if (!progression) return { ok: false, message: 'Companion unavailable.' }
  if ((progression.stat_points ?? 0) <= 0) return { ok: false, message: 'No companion stat points available.' }
  progression.allocated_stats ??= { maxHp: 0, attack: 0, defense: 0, speed: 0 }
  progression.allocated_stats[stat] = (progression.allocated_stats[stat] ?? 0) + 1
  progression.stat_points -= 1
  const stats = companionStatsForSave(save, monsterId)
  save.companions.runtime ??= {}
  save.companions.runtime[monsterId] ??= { hp: stats.maxHp }
  save.companions.runtime[monsterId].hp = Math.min(save.companions.runtime[monsterId].hp ?? stats.maxHp, stats.maxHp)
  const label = stat === 'maxHp' ? 'HP' : stat.toUpperCase()
  return { ok: true, message: `${label} increased for ${companionDefinition(monsterId)?.name ?? monsterId}.` }
}

export function companionEquipmentStatTotals(save, monsterId) {
  const equipment = save.companions.equipment?.[monsterId] ?? {}
  return Object.values(equipment).reduce((stats, equipmentId) => {
    const item = equipmentById(equipmentId)
    if (!item) return stats
    for (const [stat, amount] of Object.entries(item.stats ?? {})) {
      stats[stat] = (stats[stat] ?? 0) + amount
    }
    return stats
  }, {})
}

export function equipCompanionItem(save, monsterId, equipmentId) {
  const definition = companionDefinition(monsterId)
  const equipment = equipmentById(equipmentId)
  if (!definition || !equipment || equipment.target !== 'companion') return false
  if (!definition.equipmentSlots.includes(equipment.slot)) return false
  if (!save.inventory.equipment.includes(equipmentId)) return false
  ensureCompanionRuntime(save, monsterId)
  save.companions.equipment[monsterId][equipment.slot] = equipmentId
  const stats = companionStatsForSave(save, monsterId)
  save.companions.runtime[monsterId].hp = Math.min(save.companions.runtime[monsterId].hp ?? stats.maxHp, stats.maxHp)
  return true
}

export function companionActiveSkills(save, monsterId) {
  const progression = companionProgressionState(save, monsterId)
  const unlocked = progression?.unlocked_skills ?? ['leaf_tap']
  const source = progression?.active_skills?.length ? progression.active_skills : unlocked
  progression.active_skills = normalizeSkillLoadout(source, unlocked)
  return progression.active_skills
}

export function toggleCompanionActiveSkill(save, monsterId, skillId) {
  const progression = companionProgressionState(save, monsterId)
  if (!progression?.unlocked_skills.includes(skillId)) return { ok: false, message: 'Companion skill is not learned.' }
  const active = companionActiveSkills(save, monsterId)
  if (active.includes(skillId)) {
    if (active.length <= 1) return { ok: false, message: 'At least one companion skill is required.' }
    progression.active_skills = active.filter((id) => id !== skillId)
    return { ok: true, message: `${skillId} moved to companion reserve.` }
  }
  if (active.length >= ACTIVE_SKILL_SLOT_LIMIT) return { ok: false, message: `Only ${ACTIVE_SKILL_SLOT_LIMIT} companion skills are allowed.` }
  progression.active_skills = [...active, skillId]
  return { ok: true, message: `${skillId} added to companion active skills.` }
}

export function unequipCompanionItem(save, monsterId, slot) {
  const definition = companionDefinition(monsterId)
  if (!definition || !definition.equipmentSlots.includes(slot)) return false
  ensureCompanionRuntime(save, monsterId)
  save.companions.equipment[monsterId][slot] = null
  const stats = companionStatsForSave(save, monsterId)
  save.companions.runtime[monsterId].hp = Math.min(save.companions.runtime[monsterId].hp ?? stats.maxHp, stats.maxHp)
  return true
}
