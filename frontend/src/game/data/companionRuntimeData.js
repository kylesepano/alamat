export const COMPANION_DEFINITIONS = {
  MON0038: {
    monster_id: 'MON0038',
    name: 'Aghoy',
    role: 'Support',
    assetKey: 'asset-nilalang-aghoy',
    unlockMethod: 'story_gated_trust',
    requiredTrust: 60,
    requiredFlags: ['defeated_MON0007'],
    skills: ['aghoy_guiding_rustle'],
    bondPrompt: 'Aghoy watches you quietly. The forest path feels less afraid than before.',
  },
}

export function companionDefinition(monsterId) {
  return COMPANION_DEFINITIONS[monsterId] ?? null
}

export function activeCompanion(save) {
  return companionDefinition(save.companions.active_companion_id)
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
  if (!save.world.story_flags.includes(`bonded_${monsterId}`)) {
    save.world.story_flags.push(`bonded_${monsterId}`)
  }
  return save
}
