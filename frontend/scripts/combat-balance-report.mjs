import { BattleRuntime } from '../src/game/systems/BattleRuntime.js'
import { VERTICAL_SLICE_BATTLES } from '../src/game/data/verticalSliceBattles.js'
import { ACTIVE_SKILL_SLOT_LIMIT, skillById } from '../src/game/data/combatRuntimeData.js'

const scenarios = [
  {
    id: 'solo-level-1',
    label: 'Solo Level 1',
    progression: { level: 1, unlocked_skills: ['basic_strike', 'steady_guard'], active_skills: ['basic_strike', 'steady_guard'] },
    equipmentStats: {},
    companion: null,
  },
  {
    id: 'solo-level-3',
    label: 'Solo Level 3',
    progression: {
      level: 3,
      unlocked_skills: ['basic_strike', 'steady_guard', 'river_cut', 'woven_resolve'],
      active_skills: ['basic_strike', 'steady_guard', 'river_cut', 'woven_resolve'],
    },
    equipmentStats: { attack: 3, defense: 2, maxHp: 6, speed: 1 },
    companion: null,
  },
  {
    id: 'bonded-aghoy-level-3',
    label: 'Player L3 + Aghoy L2',
    progression: {
      level: 3,
      unlocked_skills: ['basic_strike', 'steady_guard', 'river_cut', 'woven_resolve'],
      active_skills: ['basic_strike', 'steady_guard', 'river_cut', 'woven_resolve'],
    },
    equipmentStats: { attack: 3, defense: 2, maxHp: 6, speed: 1 },
    companion: {
      monster_id: 'MON0038',
      name: 'Aghoy',
      role: 'Support',
      hp: 84,
      maxHp: 84,
      attack: 13,
      defense: 8,
      speed: 15,
      level: 2,
      skills: ['leaf_tap', 'hidden_basket_gift'].slice(0, ACTIVE_SKILL_SLOT_LIMIT),
    },
  },
  {
    id: 'bonded-aghoy-level-4-geared',
    label: 'Player L4 + Geared Aghoy L3',
    progression: {
      level: 4,
      unlocked_skills: ['basic_strike', 'steady_guard', 'river_cut', 'woven_resolve', 'balangay_drive'],
      active_skills: ['basic_strike', 'steady_guard', 'river_cut', 'woven_resolve', 'balangay_drive'],
    },
    equipmentStats: { attack: 3, defense: 2, maxHp: 6, speed: 1 },
    companion: {
      monster_id: 'MON0038',
      name: 'Aghoy',
      role: 'Support',
      hp: 92,
      maxHp: 92,
      attack: 14,
      defense: 10,
      speed: 16,
      level: 3,
      skills: ['leaf_tap', 'hidden_basket_gift', 'aghoy_guiding_rustle'].slice(0, ACTIVE_SKILL_SLOT_LIMIT),
    },
  },
]

const targets = {
  wild: { minRounds: 2, maxRounds: 5, minPlayerHpPercent: 0.25 },
  boss: { minRounds: 4, maxRounds: 8, minPlayerHpPercent: 0.15 },
}

function chooseSkill(actor, preferSupport = false) {
  const available = actor.skills.filter((skillId) => !BattleRuntime.isOnCooldown(actor, skillId))
  const skills = available.length ? available : actor.skills
  const usable = skills
    .map((skillId) => skillById(skillId))
    .sort((left, right) => {
      if (preferSupport) return Number(right.targetType === 'Self') - Number(left.targetType === 'Self')
      return right.power - left.power
    })
  return usable[0]?.id ?? actor.skills[0]
}

function runBattle(monster, scenario) {
  const playerSkills = scenario.progression.active_skills
  const state = BattleRuntime.create(
    monster,
    'QA Tester',
    scenario.companion,
    scenario.progression,
    { items: {} },
    scenario.equipmentStats,
    null,
    playerSkills,
  )

  let guardUsed = false
  let safety = 0
  while (state.phase !== 'ended' && safety < 40) {
    safety += 1
    if (state.turn === 'player') {
      const playerHpRatio = state.player.hp / state.player.maxHp
      if (!guardUsed && monster.battleType === 'boss' && playerHpRatio < 0.5) {
        guardUsed = true
        BattleRuntime.playerGuard(state)
      } else {
        BattleRuntime.playerSkill(state, chooseSkill(state.player))
      }
    }
    if (state.turn === 'companion') {
      BattleRuntime.companionSkill(state, chooseSkill(state.companion, state.round === 1))
    }
    if (state.turn === 'enemy') {
      BattleRuntime.enemyAct(state)
    }
  }

  return {
    result: state.result ?? 'timeout',
    rounds: state.round,
    playerHp: state.player.hp,
    playerMaxHp: state.player.maxHp,
    companionHp: state.companion?.hp ?? null,
    companionMaxHp: state.companion?.maxHp ?? null,
  }
}

function grade(monster, result) {
  const target = targets[monster.battleType === 'boss' ? 'boss' : 'wild']
  const hpPercent = result.playerHp / result.playerMaxHp
  const warnings = []
  if (result.result !== 'victory') warnings.push('not a victory')
  if (result.rounds < target.minRounds) warnings.push('too short')
  if (result.rounds > target.maxRounds) warnings.push('too long')
  if (hpPercent < target.minPlayerHpPercent) warnings.push('player HP too low')
  return warnings.length ? warnings.join(', ') : 'ok'
}

const rows = []
for (const scenario of scenarios) {
  for (const monster of Object.values(VERTICAL_SLICE_BATTLES)) {
    const result = runBattle(monster, scenario)
    rows.push({
      scenario: scenario.label,
      encounter: monster.name,
      type: monster.battleType,
      result: result.result,
      rounds: result.rounds,
      playerHp: `${result.playerHp}/${result.playerMaxHp}`,
      companionHp: result.companionHp === null ? '-' : `${result.companionHp}/${result.companionMaxHp}`,
      grade: grade(monster, result),
    })
  }
}

console.table(rows)
