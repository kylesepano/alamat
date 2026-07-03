import Phaser from 'phaser'
import { gameBridge } from '../bridges/ReactPhaserBridge'
import { TILE_SIZE } from '../config/gameConstants'
import { activeCompanion, applyTrustFromBattle, bondCompanion, refreshAllBondEligibility } from '../data/companionRuntimeData'
import { addInventoryItem, buyShopEntry, craftRecipe, equipItem, equipmentStatTotals, itemById } from '../data/inventoryRuntimeData'
import { applyBattleRewards, playerStatsForProgression } from '../data/progressionRuntimeData'
import { advanceItemQuest, advanceQuests, ensureQuestState } from '../data/questRuntimeData'
import { markStorySceneSeen, shouldPlayStoryScene, storySceneById } from '../data/storyRuntimeData'
import { PLAYER_ASSET_KEY, assetByKey, spriteIdleFrame } from '../data/verticalSliceAssets'
import { VERTICAL_SLICE_MAPS, tileToWorld } from '../data/verticalSliceMaps'
import { CameraController } from '../systems/CameraController'
import { CollisionSystem } from '../systems/CollisionSystem'
import { InteractionSystem } from '../systems/InteractionSystem'
import { PlayerController } from '../systems/PlayerController'
import { SaveSystem } from '../systems/SaveSystem'

export class WorldScene extends Phaser.Scene {
  constructor() {
    super('WorldScene')
  }

  create() {
    this.debugVisible = false
    this.lastDebugEmit = 0
    this.interactionUiOpen = false
    this.save = gameBridge.getInitialSave() ?? SaveSystem.load()
    ensureQuestState(this.save)
    this.locationId = this.save.world.location_id
    this.currentMap = VERTICAL_SLICE_MAPS[this.locationId] ?? VERTICAL_SLICE_MAPS.WLOC000001
    this.mapLayer = this.add.container(0, 0)
    this.objectLabels = []
    this.collision = new CollisionSystem(this)
    this.interactions = new InteractionSystem(this)
    this.drawMap(this.currentMap)

    this.player = this.physics.add.sprite(this.save.world.x, this.save.world.y, PLAYER_ASSET_KEY, spriteIdleFrame('down'))
    const playerAsset = assetByKey(PLAYER_ASSET_KEY)
    this.player.setDisplaySize(playerAsset.displayWidth, playerAsset.displayHeight)
    this.player.setDepth(60)
    this.player.setCollideWorldBounds(true)
    this.player.body.setSize(24, 28).setOffset(5, 16)
    this.physics.add.collider(this.player, this.collision.group)

    this.playerController = new PlayerController(this, this.player)
    this.cameraController = new CameraController(this, this.player)
    this.cameraController.start()

    this.input.keyboard.on('keydown-E', () => {
      if (!this.interactionUiOpen) this.interactions.interact()
    })
    this.input.keyboard.on('keydown-SPACE', (event) => {
      event.preventDefault()
      if (!this.interactionUiOpen) this.interactions.interact()
    })
    this.input.keyboard.on('keydown-F5', (event) => {
      event.preventDefault()
      this.saveNow()
    })
    this.input.keyboard.on('keydown-F3', (event) => {
      event.preventDefault()
      this.debugVisible = !this.debugVisible
      this.collision.toggle()
    })

    this.cleanupSave = gameBridge.on('command:save', () => this.saveNow())
    this.cleanupLoad = gameBridge.on('command:load', () => this.loadFromStorage())
    this.cleanupReset = gameBridge.on('command:reset-save', () => this.resetSave())
    this.cleanupBond = gameBridge.on('command:bond-companion', ({ monster_id }) => this.bondCompanion(monster_id))
    this.cleanupBuyShopEntry = gameBridge.on('command:buy-shop-entry', ({ shop_id, entry_index }) => this.buyShopEntry(shop_id, entry_index))
    this.cleanupCraftRecipe = gameBridge.on('command:craft-recipe', ({ recipe_id }) => this.craftRecipe(recipe_id))
    this.cleanupEquipItem = gameBridge.on('command:equip-item', ({ equipment_id }) => this.equipItem(equipment_id))
    this.cleanupTrackQuest = gameBridge.on('command:track-quest', ({ quest_id }) => this.trackQuest(quest_id))
    this.cleanupInteractionUiState = gameBridge.on('ui:interaction-panel', ({ open }) => {
      this.interactionUiOpen = Boolean(open)
    })
    this.emitMapChanged()
    this.emitQuestUpdate()
    this.triggerStoryScene('STSC00001')
  }

  update() {
    this.playerController.update()
    const active = this.interactions.update(this.player)
    if (this.time.now - this.lastDebugEmit < 250) return
    this.lastDebugEmit = this.time.now
    gameBridge.emit('debug:update', {
      debug_visible: this.debugVisible,
      fps: this.game.loop.actualFps,
      location_id: this.locationId,
      x: this.player.x,
      y: this.player.y,
      facing: this.playerController.facing,
      collision_debug: this.collision.enabled,
      active_interactable: active ? `${active.type}:${active.id}` : null,
      story_flags: this.save.world.story_flags,
    })
  }

  drawMap(map) {
    this.mapLayer.removeAll(true)
    this.objectLabels.forEach((label) => label.destroy())
    this.objectLabels = []
    this.cameras.main.setBackgroundColor('#12180f')

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const color = (x + y) % 2 === 0 ? map.ground : map.accent
        const tile = this.add.rectangle(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, color, 0.82)
        tile.setStrokeStyle(1, 0x000000, 0.08)
        this.mapLayer.add(tile)
      }
    }

    for (const deco of map.decorations ?? []) {
      const rect = this.add.rectangle(deco.x * TILE_SIZE + (deco.w * TILE_SIZE) / 2, deco.y * TILE_SIZE + (deco.h * TILE_SIZE) / 2, deco.w * TILE_SIZE, deco.h * TILE_SIZE, 0x1f2718, 0.85)
      rect.setStrokeStyle(2, 0xd8b765, 0.3)
      const label = this.add.text(rect.x, rect.y, deco.kind, { fontFamily: 'Arial', fontSize: '12px', color: '#f7d98b' }).setOrigin(0.5)
      this.mapLayer.add(rect)
      this.objectLabels.push(label)
    }

    const title = this.add.text(16, map.height * TILE_SIZE - 32, `${map.zoneName} / ${map.name}`, {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#fff6df',
      backgroundColor: '#11180fcc',
      padding: { x: 8, y: 4 },
    }).setDepth(80)
    this.objectLabels.push(title)
    this.collision.build(map)
    this.interactions.build(map)
  }

  handleInteraction(object) {
    if (object.type === 'transition') {
      this.changeMap(object.target, tileToWorld(object.targetX), tileToWorld(object.targetY))
      return
    }

    if (object.type === 'save') {
      this.setRespawnPoint(object)
      this.saveNow(`${object.label} restored you and set your respawn point.`)
      gameBridge.emit('interaction:started', { title: object.label, body: 'The deepwell restores your strength. This is now your return point after defeat.' })
      return
    }

    if (object.type === 'item') {
      if (!this.save.world.story_flags.includes(object.flag)) {
        this.save.world.story_flags.push(object.flag)
        addInventoryItem(this.save, 'healing_herb', 1)
        this.advanceQuest({ type: 'collect', target_id: object.id })
        this.advanceQuest({ type: 'item', target_id: 'healing_herb' })
        SaveSystem.write(this.save)
        gameBridge.emit('save:complete', { save: this.save, message: 'Collected Healing Herb.' })
      }
      const item = itemById('healing_herb')
      gameBridge.emit('interaction:started', { title: object.label, body: item ? `${item.name} added to inventory.` : 'Item added to inventory.' })
      return
    }

    if (object.type === 'npc') {
      const changes = this.advanceQuest({ type: 'talk', target_id: object.id })
      if (object.id === 'NPC000582') this.triggerStoryScene('STSC00002')
      if (changes.length > 0) {
        SaveSystem.write(this.save)
        gameBridge.emit('save:complete', { save: this.save, message: changes.at(-1)?.type === 'completed' ? `${changes.at(-1).title} complete.` : 'Quest updated.' })
      }
    }

    if (object.type === 'encounter' || object.type === 'boss') {
      gameBridge.emit('battle:started', {
        monster_id: object.id,
        title: object.label,
      })
      this.scene.pause()
      this.scene.launch('BattleScene', {
        monster_id: object.id,
        location_id: this.locationId,
        player_name: this.save.player.name,
        companion: activeCompanion(this.save),
        progression: this.save.progression,
        inventory: this.save.inventory,
        equipmentStats: equipmentStatTotals(this.save),
        player_hp: this.save.player_state.hp,
      })
      return
    }

    if (object.type === 'npc' && object.id === 'NPC000301') {
      gameBridge.emit('shop:open', { shop_id: 'starter_store', speaker: object.label, text: object.dialogue })
      return
    }

    if (object.type === 'npc' && object.id === 'NPC000481') {
      gameBridge.emit('crafting:open', { station_id: 'barangay_workbench', speaker: object.label, text: object.dialogue })
      return
    }

    gameBridge.emit('dialogue:open', { speaker: object.label, entity_id: object.id, text: object.dialogue })
  }

  changeMap(locationId, x, y) {
    const nextMap = VERTICAL_SLICE_MAPS[locationId]
    if (!nextMap) return
    this.locationId = locationId
    this.currentMap = nextMap
    this.save.world.location_id = locationId
    this.player.setPosition(x, y)
    this.drawMap(nextMap)
    this.emitMapChanged()
    this.advanceQuest({ type: 'reach', target_id: locationId })
    if (locationId === 'WLOC000004') this.triggerStoryScene('STSC00003')
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: `Reached ${nextMap.name}.` })
  }

  saveNow(message = 'Saved current position and story state.') {
    this.save.world.location_id = this.locationId
    this.save.world.x = Math.round(this.player.x)
    this.save.world.y = Math.round(this.player.y)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message })
  }

  completeBattle({ result, monster_id, victoryFlag, inventory, player_hp, player_max_hp }) {
    if (inventory?.items) {
      this.save.inventory.items = inventory.items
    }
    this.save.player_state.hp = result === 'defeat' ? player_max_hp : Math.max(1, player_hp ?? this.save.player_state.hp ?? player_max_hp)
    const bucket = result === 'victory' ? 'wins' : result === 'defeat' ? 'losses' : 'fled'
    this.save.battles[bucket][monster_id] = (this.save.battles[bucket][monster_id] ?? 0) + 1
    if (result === 'victory' && victoryFlag && !this.save.world.story_flags.includes(victoryFlag)) {
      this.save.world.story_flags.push(victoryFlag)
    }
    const rewards = applyBattleRewards(this.save, { result, monster_id })
    if (result === 'victory') {
      this.advanceQuest({ type: 'defeat', target_id: monster_id })
      if (monster_id === 'MON0007') this.triggerStoryScene('STSC00004')
      for (const itemReward of rewards.itemRewards ?? []) {
        advanceItemQuest(this.save, itemReward.id)
      }
    }
    const trustState = applyTrustFromBattle(this.save, { result, monster_id })
    refreshAllBondEligibility(this.save)
    if (trustState?.eligible) {
      gameBridge.emit('companion:eligible', { monster_id, trust: trustState.trust })
    }
    if (result === 'defeat') {
      this.returnToRespawnPoint()
    }
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result === 'defeat' ? 'Defeated. Returned to your Balon.' : `Battle ${result}: ${monster_id}` })
    gameBridge.emit('battle:rewards', rewards)
    return rewards
  }

  setRespawnPoint(object) {
    const stats = playerStatsForProgression(this.save.progression, equipmentStatTotals(this.save))
    this.save.player_state.hp = stats.maxHp
    this.save.player_state.spawn = {
      location_id: this.locationId,
      x: tileToWorld(object.x),
      y: tileToWorld(object.y),
    }
  }

  returnToRespawnPoint() {
    const spawn = this.save.player_state.spawn
    const map = VERTICAL_SLICE_MAPS[spawn.location_id] ?? VERTICAL_SLICE_MAPS.WLOC000001
    this.locationId = map.id
    this.currentMap = map
    this.save.world.location_id = map.id
    this.save.world.x = spawn.x
    this.save.world.y = spawn.y
    this.drawMap(map)
    this.player.setPosition(spawn.x, spawn.y)
    this.emitMapChanged()
    gameBridge.emit('interaction:started', { title: 'Returned to Balon', body: 'You were carried back to your last deepwell. Strength restored.' })
  }

  advanceQuest(event) {
    const changes = advanceQuests(this.save, event)
    if (changes.length > 0) {
      this.emitQuestUpdate(changes)
    }
    return changes
  }

  trackQuest(questId) {
    if (this.save.quests.active[questId]) {
      this.save.quests.tracked_id = questId
      SaveSystem.write(this.save)
      this.emitQuestUpdate()
      gameBridge.emit('save:complete', { save: this.save, message: `Tracking ${questId}.` })
    }
  }

  triggerStoryScene(sceneId) {
    if (!shouldPlayStoryScene(this.save, sceneId)) return null
    const scene = markStorySceneSeen(this.save, sceneId)
    SaveSystem.write(this.save)
    gameBridge.emit('story:scene', scene)
    gameBridge.emit('save:complete', { save: this.save, message: `${scene.title} added to story log.` })
    return scene
  }

  buyShopEntry(shopId, entryIndex) {
    const result = buyShopEntry(this.save, shopId, entryIndex)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result.message })
    gameBridge.emit('economy:message', result)
  }

  craftRecipe(recipeId) {
    const result = craftRecipe(this.save, recipeId)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result.message })
    gameBridge.emit('economy:message', result)
  }

  equipItem(equipmentId) {
    const ok = equipItem(this.save, equipmentId)
    const message = ok ? `Equipped ${equipmentId}.` : 'Equipment unavailable.'
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message })
    gameBridge.emit('economy:message', { ok, message })
  }

  bondCompanion(monsterId) {
    bondCompanion(this.save, monsterId)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: `Bond formed: ${monsterId}` })
    gameBridge.emit('companion:bonded', { monster_id: monsterId })
  }

  loadFromStorage() {
    this.save = SaveSystem.load()
    const map = VERTICAL_SLICE_MAPS[this.save.world.location_id] ?? VERTICAL_SLICE_MAPS.WLOC000001
    this.locationId = map.id
    this.currentMap = map
    ensureQuestState(this.save)
    this.drawMap(map)
    this.player.setPosition(this.save.world.x, this.save.world.y)
    this.emitMapChanged()
    this.emitQuestUpdate()
    const scene = storySceneById(this.locationId === 'WLOC000004' ? 'STSC00003' : 'STSC00001')
    if (scene && shouldPlayStoryScene(this.save, scene.id)) this.triggerStoryScene(scene.id)
  }

  resetSave() {
    SaveSystem.clear()
    window.location.reload()
  }

  emitMapChanged() {
    gameBridge.emit('map:changed', { location_id: this.locationId, name: this.currentMap.name, zone: this.currentMap.zoneName })
  }

  emitQuestUpdate(changes = []) {
    this.interactions?.refreshQuestLabels()
    gameBridge.emit('quest:update', { quests: this.save.quests, changes })
  }

  shutdown() {
    this.cleanupSave?.()
    this.cleanupLoad?.()
    this.cleanupReset?.()
    this.cleanupBond?.()
    this.cleanupBuyShopEntry?.()
    this.cleanupCraftRecipe?.()
    this.cleanupEquipItem?.()
    this.cleanupTrackQuest?.()
    this.cleanupInteractionUiState?.()
  }
}
