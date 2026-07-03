import Phaser from 'phaser'
import { gameBridge } from '../bridges/ReactPhaserBridge'
import { PLAYER_ASSET_KEY, assetByKey, spriteIdleFrame, spriteWalkAnimationKey } from '../data/verticalSliceAssets'
import { battleForMonster } from '../data/verticalSliceBattles'
import { BattleRuntime } from '../systems/BattleRuntime'

export class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene')
  }

  init(data) {
    this.monster = battleForMonster(data.monster_id)
    this.worldLocationId = data.location_id
    this.playerName = data.player_name
    this.companion = data.companion ?? null
    this.progression = data.progression ?? null
    this.inventory = data.inventory ?? null
    this.equipmentStats = data.equipmentStats ?? {}
    this.playerHp = data.player_hp ?? null
  }

  create() {
    this.state = BattleRuntime.create(this.monster, this.playerName, this.companion, this.progression, this.inventory, this.equipmentStats, this.playerHp)
    this.drawArena()
    this.cleanupAction = gameBridge.on('command:battle-action', ({ action }) => this.handleAction(action))
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanupAction?.())
    this.emitUpdate()
  }

  drawArena() {
    this.add.rectangle(480, 320, 960, 640, 0x11180f)
    this.add.rectangle(480, 320, 880, 520, 0x263447, 0.65).setStrokeStyle(2, 0xd8b765, 0.35)
    this.add.rectangle(480, 405, 780, 140, 0x1f2718, 0.8)
    this.add.text(48, 36, this.monster.battleType === 'boss' ? 'Shrine Battle' : 'Wild Encounter', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#f7d98b',
    })
    this.add.text(48, 62, this.monster.title, {
      fontFamily: 'Arial',
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#fff6df',
    })

    const playerAsset = assetByKey(PLAYER_ASSET_KEY)
    this.playerSprite = this.add.sprite(250, 365, PLAYER_ASSET_KEY, spriteIdleFrame('right'))
      .setDisplaySize(playerAsset.displayWidth * 1.8, playerAsset.displayHeight * 1.8)
      .setDepth(5)
    this.playerSprite.anims.play(spriteWalkAnimationKey(PLAYER_ASSET_KEY, 'right'), true)

    if (this.companion) {
      const companionAsset = assetByKey(this.companion.assetKey)
      this.companionSprite = this.add.sprite(170, 300, this.companion.assetKey, spriteIdleFrame('right'))
        .setDisplaySize(companionAsset.displayWidth * 1.35, companionAsset.displayHeight * 1.35)
        .setDepth(5)
      this.companionSprite.anims.play(spriteWalkAnimationKey(this.companion.assetKey, 'right'), true)
    }

    const enemyAsset = assetByKey(this.monster.assetKey)
    this.enemySprite = this.add.sprite(690, 265, this.monster.assetKey, spriteIdleFrame('left'))
      .setDisplaySize(enemyAsset.displayWidth * 2.2, enemyAsset.displayHeight * 2.2)
      .setDepth(5)
    this.enemySprite.anims.play(spriteWalkAnimationKey(this.monster.assetKey, 'left'), true)

    this.playerHpBar = this.add.rectangle(210, 470, 220, 14, 0x61c47c).setOrigin(0, 0.5)
    this.enemyHpBar = this.add.rectangle(600, 130, 240, 14, 0xbd4c5f).setOrigin(0, 0.5)
    this.playerHpText = this.add.text(210, 490, '', { fontFamily: 'Arial', fontSize: '14px', color: '#fff6df' })
    this.enemyHpText = this.add.text(600, 150, '', { fontFamily: 'Arial', fontSize: '14px', color: '#fff6df' })
    this.logText = this.add.text(70, 520, '', {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#d9ceb7',
      wordWrap: { width: 820 },
      lineSpacing: 5,
    })
    this.refreshArena()
  }

  handleAction(action) {
    if (this.state.turn !== 'player') return
    if (action?.startsWith('skill:')) BattleRuntime.playerSkill(this.state, action.replace('skill:', ''))
    if (action?.startsWith('companion-skill:')) BattleRuntime.companionSkill(this.state, action.replace('companion-skill:', ''))
    if (action?.startsWith('item:')) BattleRuntime.playerItem(this.state, action.replace('item:', ''))
    if (action === 'guard') BattleRuntime.playerGuard(this.state)
    if (action === 'flee') BattleRuntime.playerFlee(this.state, this.monster.fleeBlocked)
    this.refreshArena()
    this.emitUpdate()

    if (this.state.phase === 'ended') {
      this.finishAfterDelay()
      return
    }

    this.time.delayedCall(650, () => {
      BattleRuntime.enemyAct(this.state)
      this.refreshArena()
      this.emitUpdate()
      if (this.state.phase === 'ended') this.finishAfterDelay()
    })
  }

  refreshArena() {
    const playerRatio = this.state.player.hp / this.state.player.maxHp
    const enemyRatio = this.state.enemy.hp / this.state.enemy.maxHp
    this.playerHpBar.width = Math.max(1, 220 * playerRatio)
    this.enemyHpBar.width = Math.max(1, 240 * enemyRatio)
    this.playerHpText.setText(`${this.state.player.name} HP ${this.state.player.hp}/${this.state.player.maxHp}`)
    this.enemyHpText.setText(`${this.state.enemy.name} HP ${this.state.enemy.hp}/${this.state.enemy.maxHp}`)
    this.logText.setText(this.state.log.join('\n'))
  }

  finishAfterDelay() {
    this.time.delayedCall(1000, () => {
      const world = this.scene.get('WorldScene')
      const rewards = world.completeBattle?.({
        result: this.state.result,
        monster_id: this.monster.monster_id,
        victoryFlag: this.monster.victoryFlag,
        battleType: this.monster.battleType,
        inventory: this.state.inventory,
        player_hp: this.state.player.hp,
        player_max_hp: this.state.player.maxHp,
      })
      gameBridge.emit('battle:ended', {
        result: this.state.result,
        monster_id: this.monster.monster_id,
        name: this.monster.name,
        rewards,
      })
      this.scene.stop()
      this.scene.resume('WorldScene')
    })
  }

  emitUpdate() {
    gameBridge.emit('battle:update', {
      monster: this.monster,
      state: structuredClone(this.state),
    })
  }
}
