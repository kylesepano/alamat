import Phaser from 'phaser'
import { gameBridge } from '../bridges/ReactPhaserBridge'
import { PLAYER_ASSET_KEY, assetByKey, battleAssetKeyForActor, battleAttackAnimationKey, battleBackgroundAssetKey, battleBackgroundOverlayPath, battleIdleAnimationKey, spriteIdleFrame, vfxAnimationKey } from '../data/verticalSliceAssets'
import { battleForMonster } from '../data/verticalSliceBattles'
import { skillById, skillMotionType, skillVfxAssetKey } from '../data/combatRuntimeData'
import { BattleRuntime } from '../systems/BattleRuntime'

export class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene')
  }

  init(data) {
    this.monsterIds = data.monster_ids?.length ? data.monster_ids : [data.monster_id]
    this.monsters = this.monsterIds.map((monsterId) => battleForMonster(monsterId))
    this.monster = this.monsters[0]
    this.worldLocationId = data.location_id
    this.playerName = data.player_name
    this.companion = data.companion ?? null
    this.progression = data.progression ?? null
    this.inventory = data.inventory ?? null
    this.equipmentStats = data.equipmentStats ?? {}
    this.playerHp = data.player_hp ?? null
    this.playerSkills = data.player_skills ?? null
    this.randomEncounter = Boolean(data.random)
  }

  create() {
    this.state = BattleRuntime.create(this.monsters, this.playerName, this.companion, this.progression, this.inventory, this.equipmentStats, this.playerHp, this.playerSkills)
    this.drawArena()
    this.cleanupAction = gameBridge.on('command:battle-action', ({ action }) => this.handleAction(action))
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanupAction?.())
    this.emitUpdate()
  }

  drawArena() {
    this.add.rectangle(480, 320, 960, 640, 0x11180f)
    const backgroundKey = battleBackgroundAssetKey(this.worldLocationId)
    if (this.textures.exists(backgroundKey)) {
      this.add.image(480, 320, backgroundKey).setDisplaySize(880, 520).setAlpha(0.82)
      this.add.rectangle(480, 320, 880, 520).setFillStyle(0x000000, 0).setStrokeStyle(2, 0xd8b765, 0.35)
    } else {
      this.add.rectangle(480, 320, 880, 520, 0x263447, 0.65).setStrokeStyle(2, 0xd8b765, 0.35)
    }
    this.addBattleBackgroundOverlay()
    this.add.text(48, 36, this.monster.battleType === 'boss' ? 'Shrine Battle' : 'Wild Encounter', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#f7d98b',
    })
    this.add.text(48, 62, this.monsters.length > 1 ? `${this.monster.title} and another presence` : this.monster.title, {
      fontFamily: 'Arial',
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#fff6df',
    })

    this.playerSprite = this.createBattleActorSprite(250, 365, PLAYER_ASSET_KEY, 'right')

    if (this.companion) {
      this.companionSprite = this.createBattleActorSprite(170, 300, this.companion.assetKey, 'right', this.companion.battleScale ?? 0.9)
    }

    const enemyPositions = this.monsters.length > 1
      ? [{ x: 650, y: 240 }, { x: 760, y: 315 }]
      : [{ x: 690, y: 265 }]
    this.enemySprites = this.monsters.map((monster, index) => {
      const sprite = this.createBattleActorSprite(enemyPositions[index].x, enemyPositions[index].y, monster.assetKey, 'left', monster.battleScale ?? 1)
      sprite.setDepth(5 + index)
      return sprite
    })
    this.enemySprite = this.enemySprites[0]

    this.playerHpBar = this.add.rectangle(210, 470, 220, 14, 0x61c47c).setOrigin(0, 0.5)
    this.enemyHpBars = this.monsters.map((monster, index) => this.add.rectangle(600, 130 + index * 44, 240, 14, 0xbd4c5f).setOrigin(0, 0.5))
    this.playerHpText = this.add.text(210, 490, '', { fontFamily: 'Arial', fontSize: '14px', color: '#fff6df' })
    this.enemyHpTexts = this.monsters.map((monster, index) => this.add.text(600, 150 + index * 44, '', { fontFamily: 'Arial', fontSize: '14px', color: '#fff6df' }))
    if (this.companion) {
      this.companionHpBar = this.add.rectangle(95, 385, 180, 12, 0x82a7a6).setOrigin(0, 0.5)
      this.companionHpText = this.add.text(95, 402, '', { fontFamily: 'Arial', fontSize: '13px', color: '#fff6df' })
    }
    this.logText = this.add.text(70, 520, '', {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#d9ceb7',
      wordWrap: { width: 820 },
      lineSpacing: 5,
    })
    this.refreshArena()
  }

  addBattleBackgroundOverlay() {
    const overlayPath = battleBackgroundOverlayPath(this.worldLocationId)
    if (!overlayPath || !this.add.dom) return

    const overlay = document.createElement('img')
    overlay.src = overlayPath
    overlay.alt = ''
    overlay.draggable = false
    overlay.style.width = '880px'
    overlay.style.height = '520px'
    overlay.style.objectFit = 'cover'
    overlay.style.pointerEvents = 'none'
    overlay.style.userSelect = 'none'
    overlay.style.opacity = '0.9'

    this.add.dom(480, 320, overlay).setDepth(1)
  }

  createBattleActorSprite(x, y, assetKey, direction, scale = 1) {
    const battleKey = battleAssetKeyForActor(assetKey)
    const battleAsset = battleKey ? assetByKey(battleKey) : null
    if (battleKey && battleAsset && this.textures.exists(battleKey)) {
      const sprite = this.add.sprite(x, y, battleKey, 0)
        .setDisplaySize(battleAsset.displayWidth * scale, battleAsset.displayHeight * scale)
        .setDepth(5)
      sprite.setFlipX(Boolean(battleAsset.nativeFacing && battleAsset.nativeFacing !== direction))
      sprite.anims.play(battleIdleAnimationKey(battleKey), true)
      sprite.setData('battleAssetKey', battleKey)
      return sprite
    }

    const asset = assetByKey(assetKey)
    const sprite = this.add.sprite(x, y, assetKey, spriteIdleFrame(direction))
      .setDisplaySize(asset.displayWidth * scale, asset.displayHeight * scale)
      .setDepth(5)
    return sprite
  }

  handleAction(action) {
    let actorKey = null
    let skillId = null
    let actionTargetSprite = null
    if (this.state.turn === 'player') {
      if (action?.startsWith('skill:')) {
        const [, selectedSkillId, targetId = null] = action.split(':')
        const skill = skillById(selectedSkillId)
        actorKey = 'player'
        skillId = selectedSkillId
        actionTargetSprite = skill.targetType === 'Self'
          ? this.playerSprite
          : skill.targetType === 'Ally'
            ? this.friendlyTargetSprite(targetId, 'player')
            : this.targetEnemySprite(targetId)
        BattleRuntime.playerSkill(this.state, skillId, targetId)
      }
      if (action?.startsWith('item:')) {
        const [, itemId, targetId = 'player'] = action.split(':')
        BattleRuntime.playerItem(this.state, itemId, targetId)
      }
      if (action === 'guard') BattleRuntime.playerGuard(this.state)
      if (action === 'flee') BattleRuntime.playerFlee(this.state, this.monster.fleeBlocked)
    } else if (this.state.turn === 'companion') {
      if (action?.startsWith('companion-skill:')) {
        const [, selectedSkillId, targetId = null] = action.split(':')
        const skill = skillById(selectedSkillId)
        actorKey = 'companion'
        skillId = selectedSkillId
        actionTargetSprite = skill.targetType === 'Ally'
          ? this.friendlyTargetSprite(targetId, 'companion')
          : skill.targetType === 'Self'
            ? this.companionSprite
            : this.targetEnemySprite(targetId)
        BattleRuntime.companionSkill(this.state, skillId, targetId)
      }
    } else {
      return
    }
    if (actorKey && skillId) this.animateBattleAction(actorKey, skillId, actionTargetSprite)
    this.refreshArena()
    this.emitUpdate()

    if (this.state.phase === 'ended') {
      this.finishAfterDelay()
      return
    }

    if (this.state.turn !== 'enemy') return

    this.time.delayedCall(650, () => {
      this.animateEnemyPhase()
      BattleRuntime.enemyAct(this.state)
      this.refreshArena()
      this.emitUpdate()
      if (this.state.phase === 'ended') this.finishAfterDelay()
    })
  }

  refreshArena() {
    const playerRatio = this.state.player.hp / this.state.player.maxHp
    this.playerHpBar.width = Math.max(1, 220 * playerRatio)
    this.playerHpText.setText(`${this.state.player.name} HP ${this.state.player.hp}/${this.state.player.maxHp}`)
    for (const [index, enemy] of (this.state.enemies ?? [this.state.enemy]).entries()) {
      const enemyRatio = enemy.hp / enemy.maxHp
      this.enemyHpBars[index].width = Math.max(1, 240 * enemyRatio)
      this.enemyHpTexts[index].setText(`${enemy.name} HP ${enemy.hp}/${enemy.maxHp}`)
      this.enemySprites[index].setAlpha(enemy.hp > 0 ? 1 : 0.35)
    }
    if (this.state.companion && this.companionHpBar && this.companionHpText) {
      const companionRatio = this.state.companion.hp / this.state.companion.maxHp
      this.companionHpBar.width = Math.max(1, 180 * companionRatio)
      this.companionHpText.setText(`${this.state.companion.name} HP ${this.state.companion.hp}/${this.state.companion.maxHp}`)
    }
    this.logText.setText(this.state.log.join('\n'))
  }

  animateBattleAction(actorKey, skillId, actionTargetSprite = null) {
    const actorSprite = actorKey === 'companion' ? this.companionSprite : this.playerSprite
    const targetSprite = actionTargetSprite ?? this.targetEnemySprite()
    this.animateBattleSpriteAction(actorSprite, targetSprite, skillId)
  }

  animateProjectile(actorSprite, targetSprite, skillId, side = 'ally') {
    const vfxKey = skillVfxAssetKey(skillId)
    if (vfxKey && this.textures.exists(vfxKey)) {
      const originOffset = side === 'enemy' ? -34 : 34
      const targetOffset = side === 'enemy' ? 25 : -25
      const projectile = this.add.sprite(actorSprite.x + originOffset, actorSprite.y - 18, vfxKey, 0)
        .setDisplaySize(96, 96)
        .setDepth(20)
        .setFlipX(side === 'enemy')
      projectile.anims.play(vfxAnimationKey(vfxKey))
      this.tweens.add({
        targets: projectile,
        x: targetSprite.x + targetOffset,
        y: targetSprite.y - 15,
        duration: 650,
        ease: 'Sine.easeInOut',
        onComplete: () => projectile.destroy(),
      })
      return
    }
    const skill = skillById(skillId)
    const projectileColors = {
      Earth: 0xc08a4b,
      Forest: 0x7bc96f,
      Water: 0x65c8ff,
      Dream: 0xb58cff,
      Beast: 0xe0a24d,
    }
    const projectile = this.add.circle(actorSprite.x + (side === 'enemy' ? -34 : 34), actorSprite.y - 18, 7, projectileColors[skill.damageType] ?? 0xf7d98b)
      .setDepth(20)
    this.tweens.add({
      targets: projectile,
      x: targetSprite.x + (side === 'enemy' ? 25 : -25),
      y: targetSprite.y - 15,
      alpha: 0.2,
      duration: 650,
      ease: 'Sine.easeInOut',
      onComplete: () => projectile.destroy(),
    })
  }

  playImpactVfx(skillId, targetSprite) {
    const vfxKey = skillVfxAssetKey(skillId)
    if (!vfxKey || !targetSprite || !this.textures.exists(vfxKey)) return
    const effect = this.add.sprite(targetSprite.x, targetSprite.y - 12, vfxKey, 0)
      .setDisplaySize(132, 132)
      .setDepth(25)
    effect.anims.play(vfxAnimationKey(vfxKey))
    effect.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => effect.destroy())
  }

  targetEnemySprite(targetEnemyId = null) {
    const enemies = this.state.enemies ?? [this.state.enemy]
    const selectedIndex = targetEnemyId ? enemies.findIndex((enemy) => enemy.hp > 0 && (enemy.id === targetEnemyId || enemy.monster_id === targetEnemyId)) : -1
    const index = selectedIndex >= 0 ? selectedIndex : enemies.findIndex((enemy) => enemy.hp > 0)
    return this.enemySprites[Math.max(0, index)] ?? this.enemySprite
  }

  friendlyTargetSprite(targetId = null, actorKey = 'player') {
    if (targetId === 'player') return this.playerSprite
    if (targetId === 'companion' && this.companionSprite) return this.companionSprite
    if (actorKey === 'companion') return this.playerSprite
    return this.companionSprite ?? this.playerSprite
  }

  animateEnemyPhase() {
    const enemies = this.state.enemies ?? [this.state.enemy]
    let delay = 0
    for (const [index, enemy] of enemies.entries()) {
      if (enemy.hp <= 0) continue
      const enemySprite = this.enemySprites[index]
      const skillId = BattleRuntime.chooseEnemySkill(enemy, this.state.round)
      const targetSprite = this.chooseEnemyVisualTarget()
      this.time.delayedCall(delay, () => this.animateBattleSpriteAction(enemySprite, targetSprite, skillId, 'enemy'))
      delay += 180
    }
  }

  chooseEnemyVisualTarget() {
    if (this.state.companion?.hp > 0 && this.state.round % 2 === 0) return this.companionSprite
    return this.playerSprite
  }

  animateBattleSpriteAction(actorSprite, targetSprite, skillId, side = 'ally') {
    if (!actorSprite || !targetSprite) return
    const motion = skillMotionType(skillId)
    if (motion !== 'support') this.playActorAttackAnimation(actorSprite)
    if (motion === 'melee') {
      const startX = actorSprite.x
      const startY = actorSprite.y
      const xOffset = side === 'enemy' ? 78 : -78
      this.tweens.add({
        targets: actorSprite,
        x: targetSprite.x + xOffset,
        y: targetSprite.y + 18,
        duration: 320,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onYoyo: () => this.playImpactVfx(skillId, targetSprite),
        onComplete: () => actorSprite.setPosition(startX, startY),
      })
      return
    }
    if (motion === 'projectile' || motion === 'impact') {
      this.animateProjectile(actorSprite, targetSprite, skillId, side)
      return
    }
    const supportSprite = targetSprite ?? actorSprite
    this.playImpactVfx(skillId, supportSprite)
    this.tweens.add({
      targets: supportSprite,
      scale: supportSprite.scale * 1.08,
      duration: 300,
      yoyo: true,
      ease: 'Sine.easeInOut',
    })
  }

  playActorAttackAnimation(actorSprite) {
    const battleKey = actorSprite.getData('battleAssetKey')
    if (!battleKey) return
    const attackKey = battleAttackAnimationKey(battleKey)
    const idleKey = battleIdleAnimationKey(battleKey)
    if (!this.anims.exists(attackKey)) return
    actorSprite.anims.play(attackKey, true)
    actorSprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      if (this.anims.exists(idleKey)) actorSprite.anims.play(idleKey, true)
    })
  }

  finishAfterDelay() {
    this.time.delayedCall(1000, () => {
      const world = this.scene.get('WorldScene')
      const rewards = world.completeBattle?.({
        result: this.state.result,
        monster_id: this.monster.monster_id,
        defeated_monster_ids: (this.state.enemies ?? [this.state.enemy]).map((enemy) => enemy.monster_id),
        victoryFlag: this.monster.victoryFlag,
        battleType: this.monster.battleType,
        inventory: this.state.inventory,
        player_hp: this.state.player.hp,
        player_max_hp: this.state.player.maxHp,
        companion_id: this.state.companion?.id,
        companion_hp: this.state.companion?.hp,
        random: this.randomEncounter,
      })
      gameBridge.emit('battle:ended', {
        result: this.state.result,
        monster_id: this.monster.monster_id,
        name: this.monsters.map((monster) => monster.name).join(' + '),
        rewards,
      })
      this.scene.stop()
      this.scene.resume('WorldScene')
    })
  }

  emitUpdate() {
    gameBridge.emit('battle:update', {
      monster: this.monster,
      monsters: this.monsters,
      state: structuredClone(this.state),
    })
  }
}
