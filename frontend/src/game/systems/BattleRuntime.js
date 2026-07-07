import { PLAYER_BATTLE_TEMPLATE } from '../data/verticalSliceBattles.js'
import { ACTIVE_SKILL_SLOT_LIMIT, skillById, statusById } from '../data/combatRuntimeData.js'
import { itemById } from '../data/inventoryRuntimeData.js'
import { playerStatsForProgression } from '../data/progressionRuntimeData.js'

export class BattleRuntime {
  static create(monster, playerName, companion = null, progression = null, inventory = null, equipmentStats = {}, playerHp = null, playerSkills = null) {
    const monsters = Array.isArray(monster) ? monster : [monster]
    const playerStats = playerStatsForProgression(progression, equipmentStats)
    const startingHp = Math.max(1, Math.min(playerStats.maxHp, playerHp ?? playerStats.maxHp))
    const skills = (playerSkills?.length ? playerSkills : PLAYER_BATTLE_TEMPLATE.skills).slice(0, ACTIVE_SKILL_SLOT_LIMIT)
    const enemies = monsters.map((entry, index) => ({
      id: `${entry.monster_id}-${index}`,
      monster_id: entry.monster_id,
      name: monsters.length > 1 ? `${entry.name} ${index + 1}` : entry.name,
      baseName: entry.name,
      hp: entry.maxHp,
      maxHp: entry.maxHp,
      attack: entry.attack,
      defense: entry.defense,
      speed: entry.speed,
      skills: entry.skills,
      cooldowns: {},
      statuses: [],
    }))
    return {
      phase: 'active',
      turn: 'player',
      round: 1,
      player: {
        id: 'PLAYER',
        name: playerName || 'Manlalakbay',
        hp: startingHp,
        maxHp: playerStats.maxHp,
        attack: playerStats.attack,
        defense: playerStats.defense,
        speed: playerStats.speed,
        skills,
        cooldowns: {},
        statuses: [],
      },
      enemy: enemies[0],
      enemies,
      companion: companion
        ? {
            id: companion.monster_id,
            name: companion.name,
            role: companion.role,
            hp: companion.hp,
            maxHp: companion.maxHp,
            attack: companion.attack,
            defense: companion.defense,
            speed: companion.speed,
            level: companion.level,
            skills: companion.skills.slice(0, ACTIVE_SKILL_SLOT_LIMIT),
            cooldowns: {},
            statuses: [],
          }
        : null,
      inventory: {
        items: { ...(inventory?.items ?? {}) },
      },
      log: [monsters.length > 1 ? `Wild ${monsters.map((entry) => entry.name).join(' and ')} step into your path.` : `A wild ${monsters[0].name} steps into your path.`],
      result: null,
    }
  }

  static playerSkill(state, skillId, targetEnemyId = null) {
    if (state.phase === 'ended') return state
    this.tickCooldowns(state.player)
    if (this.isOnCooldown(state.player, skillId)) {
      state.log = [`${skillById(skillId).name} is still recovering.`, ...state.log].slice(0, 6)
      return state
    }
    if (this.consumeTurnSkip(state.player)) {
      state.log = [`${state.player.name} cannot act.`, ...state.log].slice(0, 6)
      this.afterActorAction(state.player)
      state.turn = 'enemy'
      return state
    }
    this.useSkill(state, state.player, this.targetEnemy(state, targetEnemyId), skillId)
    this.syncCurrentEnemy(state)
    if (this.allEnemiesDefeated(state)) return this.end(state, 'victory')
    this.afterActorAction(state.player)
    state.turn = this.companionCanAct(state) ? 'companion' : 'enemy'
    return state
  }

  static playerGuard(state) {
    return this.playerSkill(state, 'steady_guard')
  }

  static playerItem(state, itemId, targetId = 'player') {
    if (state.phase === 'ended') return state
    const item = itemById(itemId)
    const quantity = state.inventory.items[itemId] ?? 0
    if (!item || quantity <= 0) {
      state.log = ['That item is not available.', ...state.log].slice(0, 6)
      return state
    }
    const target = targetId === 'companion' ? state.companion : state.player
    if (!target || target.hp <= 0) {
      state.log = ['That target cannot use the item right now.', ...state.log].slice(0, 6)
      return state
    }
    state.inventory.items[itemId] = quantity - 1
    if (state.inventory.items[itemId] <= 0) delete state.inventory.items[itemId]

    const lines = [`${state.player.name} uses ${item.name} on ${target.name}.`]
    if (item.effect?.type === 'heal') {
      const before = target.hp
      target.hp = Math.min(target.maxHp, target.hp + item.effect.amount)
      lines.push(`Recovered ${target.hp - before} HP.`)
    }
    if (item.effect?.type === 'cleanse') {
      const removed = target.statuses.length
      target.statuses = []
      lines.push(removed > 0 ? 'Harmful effects are calmed.' : 'The water steadies the traveler.')
    }

    this.afterActorAction(state.player)
    state.turn = this.companionCanAct(state) ? 'companion' : 'enemy'
    state.log = [...lines, ...state.log].slice(0, 6)
    return state
  }

  static companionSkill(state, skillId, targetEnemyId = null) {
    if (state.phase === 'ended' || !this.companionCanAct(state)) return state
    this.tickCooldowns(state.companion)
    if (this.isOnCooldown(state.companion, skillId)) {
      state.log = [`${skillById(skillId).name} is still recovering.`, ...state.log].slice(0, 6)
      return state
    }
    if (this.consumeTurnSkip(state.companion)) {
      state.log = [`${state.companion.name} cannot act.`, ...state.log].slice(0, 6)
      this.afterActorAction(state.companion)
      state.turn = 'enemy'
      return state
    }
    this.useSkill(state, state.companion, this.targetEnemy(state, targetEnemyId), skillId, state.player)
    this.syncCurrentEnemy(state)
    if (this.allEnemiesDefeated(state)) return this.end(state, 'victory')
    this.afterActorAction(state.companion)
    state.turn = 'enemy'
    return state
  }

  static playerFlee(state, blocked = false) {
    if (state.phase === 'ended') return state
    if (blocked) {
      state.log = ['The path will not open while this presence remains.', ...state.log].slice(0, 6)
      state.turn = 'enemy'
      return state
    }
    return this.end(state, 'fled')
  }

  static enemyAct(state) {
    if (state.phase === 'ended') return state
    const enemies = this.livingEnemies(state)
    for (const enemy of enemies) {
      this.tickCooldowns(enemy)
      if (this.consumeTurnSkip(enemy)) {
        state.log = [`${enemy.name} cannot act.`, ...state.log].slice(0, 6)
        this.afterActorAction(enemy)
        continue
      }
      const skillId = this.chooseEnemySkill(enemy, state.round)
      const target = this.chooseEnemyTarget(state)
      this.useSkill(state, enemy, target, skillId)
      if (state.player.hp <= 0) return this.end(state, 'defeat')
      this.afterActorAction(enemy)
    }
    this.syncCurrentEnemy(state)
    state.round += 1
    state.turn = 'player'
    return state
  }

  static useSkill(state, actor, target, skillId, selfTargetOverride = null) {
    const skill = skillById(skillId)
    const isSelfTarget = skill.targetType === 'Self'
    const receiver = isSelfTarget ? (selfTargetOverride ?? actor) : target
    const lines = [`${actor.name} uses ${skill.name}.`]

    if (skill.canMiss !== false && !this.roll(`${state.round}-${actor.id}-${skill.id}-accuracy`, skill.accuracy)) {
      state.log = [...lines, 'The action misses.', ...state.log].slice(0, 6)
      this.startCooldown(actor, skill)
      return
    }

    if (skill.power > 0) {
      const damage = this.damage(actor, receiver, skill)
      receiver.hp = Math.max(0, receiver.hp - damage)
      lines.push(`${receiver.name} takes ${damage} ${skill.damageType} damage.`)
      this.removeStatus(receiver, 'guarded')
    }

    if (skill.statusEffectId && this.roll(`${state.round}-${actor.id}-${skill.id}-status`, skill.statusChance)) {
      this.applyStatus(receiver, skill.statusEffectId)
      const status = statusById(skill.statusEffectId)
      lines.push(`${receiver.name} gains ${status.name}.`)
    }

    this.startCooldown(actor, skill)
    state.log = [...lines, ...state.log].slice(0, 6)
  }

  static chooseEnemySkill(actor, round) {
    const available = actor.skills.filter((skillId) => !this.isOnCooldown(actor, skillId))
    if (available.length > 0) return available[(round - 1) % available.length]
    return actor.skills[0]
  }

  static chooseEnemyTarget(state) {
    if (!state.companion || state.companion.hp <= 0) return state.player
    return state.round % 2 === 0 ? state.companion : state.player
  }

  static companionCanAct(state) {
    return Boolean(state.companion && state.companion.hp > 0)
  }

  static livingEnemies(state) {
    const enemies = state.enemies?.length ? state.enemies : [state.enemy]
    return enemies.filter((enemy) => enemy && enemy.hp > 0)
  }

  static currentEnemy(state) {
    const enemy = this.livingEnemies(state)[0] ?? state.enemy
    state.enemy = enemy
    return enemy
  }

  static targetEnemy(state, targetEnemyId = null) {
    const enemies = this.livingEnemies(state)
    const selected = enemies.find((enemy) => enemy.id === targetEnemyId || enemy.monster_id === targetEnemyId)
    state.enemy = selected ?? enemies[0] ?? state.enemy
    return state.enemy
  }

  static syncCurrentEnemy(state) {
    state.enemy = this.livingEnemies(state)[0] ?? state.enemy
  }

  static allEnemiesDefeated(state) {
    return this.livingEnemies(state).length === 0
  }

  static applyStatus(actor, statusId) {
    const status = statusById(statusId)
    if (!status) return
    const existing = actor.statuses.find((item) => item.id === statusId)
    if (existing) {
      existing.remaining = Math.max(existing.remaining, status.duration)
      return
    }
    actor.statuses.push({ id: statusId, name: status.name, remaining: status.duration })
  }

  static consumeTurnSkip(actor) {
    const status = actor.statuses.find((item) => statusById(item.id)?.skipsTurn)
    if (!status) return false
    this.removeStatus(actor, status.id)
    return true
  }

  static afterActorAction(actor) {
    this.tickStatuses(actor)
  }

  static tickCooldowns(actor) {
    for (const skillId of Object.keys(actor.cooldowns)) {
      actor.cooldowns[skillId] = Math.max(0, actor.cooldowns[skillId] - 1)
      if (actor.cooldowns[skillId] === 0) delete actor.cooldowns[skillId]
    }
  }

  static tickStatuses(actor) {
    actor.statuses = actor.statuses
      .map((status) => status.id === 'guarded' ? status : { ...status, remaining: status.remaining - 1 })
      .filter((status) => status.remaining > 0)
  }

  static removeStatus(actor, statusId) {
    actor.statuses = actor.statuses.filter((status) => status.id !== statusId)
  }

  static startCooldown(actor, skill) {
    if (skill.cooldown > 0) actor.cooldowns[skill.id] = skill.cooldown
  }

  static isOnCooldown(actor, skillId) {
    return (actor.cooldowns[skillId] ?? 0) > 0
  }

  static end(state, result) {
    state.phase = 'ended'
    state.turn = 'ended'
    state.result = result
    const messages = {
      victory: 'The opposing Nilalang yield and disappear into the path.',
      defeat: `${state.player.name} is forced back from the encounter.`,
      fled: `${state.player.name} retreats from the encounter.`,
    }
    state.log = [messages[result], ...state.log].slice(0, 6)
    return state
  }

  static damage(actor, target, skill) {
    const attackMultiplier = this.statusMultiplier(actor, 'attackMultiplier')
    const takenMultiplier = this.statusMultiplier(target, 'damageTakenMultiplier')
    const raw = skill.power + (actor.attack ?? 10) * 0.8 * attackMultiplier - target.defense * 0.55
    return Math.max(4, Math.round(raw * takenMultiplier))
  }

  static statusMultiplier(actor, key) {
    return actor.statuses.reduce((total, activeStatus) => {
      const status = statusById(activeStatus.id)
      return total * (status?.modifiers?.[key] ?? 1)
    }, 1)
  }

  static roll(seed, chance) {
    if (chance >= 100) return true
    if (chance <= 0) return false
    let hash = 0
    for (let index = 0; index < seed.length; index += 1) {
      hash = (hash * 31 + seed.charCodeAt(index)) % 100
    }
    return hash < chance
  }
}
