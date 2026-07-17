import Phaser from 'phaser'
import { gameBridge } from '../bridges/ReactPhaserBridge'
import { TILE_SIZE } from '../config/gameConstants'
import { activeCompanion, allocateCompanionStat, applyCompanionBattleRewards, applyTrustFromBattle, bondCompanion, equipCompanionItem, refreshAllBondEligibility, reviveCompanionsAtBalon, setCompanionHp, toggleCompanionActiveSkill, unequipCompanionItem } from '../data/companionRuntimeData'
import { addInventoryItem, buyShopEntry, craftRecipe, equipItem, equipmentStatTotals, itemById, removeInventoryItem, unequipItem } from '../data/inventoryRuntimeData'
import { allocatePlayerStat, applyBattleRewards, playerActiveSkills, playerStatsForProgression, togglePlayerActiveSkill } from '../data/progressionRuntimeData'
import { advanceItemQuest, advanceQuests, ensureQuestState, startQuest } from '../data/questRuntimeData'
import { markStorySceneSeen, shouldPlayStoryScene, storySceneById } from '../data/storyRuntimeData'
import { PLAYER_ASSET_KEY, assetByKey, spriteIdleFrame, spriteWalkAnimationKey, tilemapAssetKey } from '../data/verticalSliceAssets'
import { battleForMonster } from '../data/verticalSliceBattles'
import { VERTICAL_SLICE_MAPS, tileToWorld } from '../data/verticalSliceMaps'
import { CameraController } from '../systems/CameraController'
import { CollisionSystem } from '../systems/CollisionSystem'
import { InteractionSystem } from '../systems/InteractionSystem'
import { PlayerController } from '../systems/PlayerController'
import { SaveSystem } from '../systems/SaveSystem'
import { applyDialogueChoice, dialogueFor } from '../data/dialogueRuntimeData'
import { applyNpcSchedules } from '../data/npcScheduleRuntimeData'

export class WorldScene extends Phaser.Scene {
  constructor() {
    super('WorldScene')
  }

  create() {
    this.debugVisible = false
    this.lastDebugEmit = 0
    this.lastPlayerPosition = null
    this.randomEncounterDistance = 0
    this.randomEncounterGraceUntil = 0
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
    setFootCollisionBody(this.player, 20, 14)
    this.physics.add.collider(this.player, this.collision.group)
    this.lastPlayerPosition = new Phaser.Math.Vector2(this.player.x, this.player.y)
    this.companionFollower = null
    this.companionFollowerId = null
    this.syncCompanionFollower()

    this.playerController = new PlayerController(this, this.player)
    this.cameraController = new CameraController(this, this.player)
    this.cameraController.start()

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
    this.cleanupUnequipItem = gameBridge.on('command:unequip-item', ({ slot }) => this.unequipItem(slot))
    this.cleanupEquipCompanionItem = gameBridge.on('command:equip-companion-item', ({ monster_id, equipment_id }) => this.equipCompanionItem(monster_id, equipment_id))
    this.cleanupUnequipCompanionItem = gameBridge.on('command:unequip-companion-item', ({ monster_id, slot }) => this.unequipCompanionItem(monster_id, slot))
    this.cleanupUseFieldItem = gameBridge.on('command:use-field-item', ({ item_id, target }) => this.useFieldItem(item_id, target))
    this.cleanupAllocatePlayerStat = gameBridge.on('command:allocate-player-stat', ({ stat }) => this.allocatePlayerStat(stat))
    this.cleanupAllocateCompanionStat = gameBridge.on('command:allocate-companion-stat', ({ monster_id, stat }) => this.allocateCompanionStat(monster_id, stat))
    this.cleanupTogglePlayerSkill = gameBridge.on('command:toggle-player-skill', ({ skill_id }) => this.togglePlayerSkill(skill_id))
    this.cleanupToggleCompanionSkill = gameBridge.on('command:toggle-companion-skill', ({ monster_id, skill_id }) => this.toggleCompanionSkill(monster_id, skill_id))
    this.cleanupTrackQuest = gameBridge.on('command:track-quest', ({ quest_id }) => this.trackQuest(quest_id))
    this.cleanupDialogueChoice = gameBridge.on('command:dialogue-choice', ({ entity_id, choice }) => this.handleDialogueChoice(entity_id, choice))
    this.cleanupInteractionUiState = gameBridge.on('ui:interaction-panel', ({ open }) => {
      this.interactionUiOpen = Boolean(open)
      if (this.playerController) this.playerController.locked = this.interactionUiOpen
      if (this.interactionUiOpen) this.forcePlayerIdle()
    })
    this.emitMapChanged()
    this.emitQuestUpdate()
    this.triggerStoryScene('STSC00001')
  }

  update() {
    this.playerController.update()
    this.updateCompanionFollower()
    const active = this.interactions.update(this.player)
    this.updateRandomEncounters()
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
    const didDrawTilemap = this.drawTiledMap(map)

    if (!didDrawTilemap) {
      this.drawTilesetBackground(map)

      for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
          const color = (x + y) % 2 === 0 ? map.ground : map.accent
          const tile = this.add.rectangle(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, color, map.tilesetKey ? 0.24 : 0.82)
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
    }

    const title = this.add.text(16, map.height * TILE_SIZE - 32, `${map.zoneName} / ${map.name}`, {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#fff6df',
      backgroundColor: '#11180fcc',
      padding: { x: 8, y: 4 },
    }).setDepth(80)
    this.objectLabels.push(title)
    const scheduledMap = applyNpcSchedules(map)
    const visibleMap = {
      ...scheduledMap,
      objects: (scheduledMap.objects ?? []).filter((object) => !this.isObjectCleared(object)),
    }
    this.collision.build(this.collisionMapFor(map))
    this.interactions.build(visibleMap)
  }

  drawTilesetBackground(map) {
    if (!map.tilesetKey || !this.textures.exists(map.tilesetKey)) return
    const width = map.width * TILE_SIZE
    const height = map.height * TILE_SIZE
    const texture = this.add.tileSprite(width / 2, height / 2, width, height, map.tilesetKey)
    texture.setAlpha(0.42)
    texture.setDepth(-5)
    this.mapLayer.add(texture)
  }

  drawTiledMap(map) {
    const tilemapKey = tilemapAssetKey(map.id)
    if (!tilemapKey || !this.cache.tilemap.exists(tilemapKey) || !map.tilesetKey || !this.textures.exists(map.tilesetKey)) return false

    const cachedData = this.cache.tilemap.get(tilemapKey)?.data
    if (cachedData?.tilesets?.some((tileset) => tileset.source)) {
      console.warn(`[ALAMAT maps] ${map.id} uses an external tileset. Export with an embedded tileset to enable rendering.`)
      return false
    }

    const embeddedTileset = cachedData?.tilesets?.[0]
    const sourceImage = this.textures.get(map.tilesetKey).getSourceImage()
    if (embeddedTileset && sourceImage
      && (embeddedTileset.imagewidth !== sourceImage.width || embeddedTileset.imageheight !== sourceImage.height)) {
      console.warn(
        `[ALAMAT maps] ${map.id} expects a ${embeddedTileset.imagewidth}x${embeddedTileset.imageheight} tileset, `
        + `but ${map.tilesetKey} is ${sourceImage.width}x${sourceImage.height}. Regenerate the tile catalog and Tiled JSON after normalization.`,
      )
      return false
    }

    let tiledMap
    try {
      tiledMap = this.make.tilemap({ key: tilemapKey })
    } catch (error) {
      console.warn(`[ALAMAT maps] ${map.id} could not be parsed. Falling back to blockout rendering.`, error)
      return false
    }
    const tilesetName = tiledMap.tilesets[0]?.name
    if (!tilesetName) return false

    const tileset = tiledMap.addTilesetImage(tilesetName, map.tilesetKey, TILE_SIZE, TILE_SIZE)
    if (!tileset) return false

    const tileLayers = tiledMap.layers.filter((layer) => layer.name?.toLowerCase() !== 'collision')
    for (const [index, layerData] of tileLayers.entries()) {
      if (layerData.name?.toLowerCase() === 'collision') continue
      let layer
      try {
        layer = tiledMap.createLayer(layerData.name, tileset, 0, 0)
      } catch (error) {
        console.warn(`[ALAMAT maps] Skipping invalid layer ${layerData.name} in ${map.id}.`, error)
        continue
      }
      if (!layer) continue
      layer.setDepth(index)
      layer.setAlpha(layerData.alpha ?? layerData.opacity ?? layerData.properties?.find((property) => property.name === 'alpha')?.value ?? 1)
      this.mapLayer.add(layer)
    }

    return true
  }

  collisionMapFor(map) {
    const tilemapKey = tilemapAssetKey(map.id)
    if (!tilemapKey || !this.cache.tilemap.exists(tilemapKey)) return map

    const tiledData = this.cache.tilemap.get(tilemapKey)?.data
    const collisionLayer = tiledData?.layers?.find((layer) => layer.name === 'Collision' && layer.type === 'objectgroup')
    const blockedRects = (collisionLayer?.objects ?? [])
      .filter((object) => object.visible !== false && (object.width ?? 0) > 0 && (object.height ?? 0) > 0)
      .map((object) => ({
        x: object.x,
        y: object.y,
        width: object.width,
        height: object.height,
      }))

    if (!blockedRects.length) return map
    return {
      ...map,
      blocked: [],
      blockedRects,
    }
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

    if (object.type === 'ambient') {
      const changes = this.advanceQuest({ type: 'inspect', target_id: object.id })
      if (changes.length > 0) {
        SaveSystem.write(this.save)
        gameBridge.emit('save:complete', { save: this.save, message: 'The discovery was added to your quest log.' })
      }
    }

    if (object.type === 'encounter' || object.type === 'boss') {
      this.startBattle(object.id, object.label)
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

    gameBridge.emit('dialogue:open', dialogueFor(object, this.save))
  }

  handleDialogueChoice(entityId, choice) {
    const result = applyDialogueChoice(this.save, entityId, choice)
    if (result.startQuest) startQuest(this.save, result.startQuest)
    if (!result.changed) return
    SaveSystem.write(this.save)
    this.emitQuestUpdate()
    this.interactions?.refreshQuestLabels()
    gameBridge.emit('save:complete', { save: this.save, message: result.startQuest ? 'A new optional quest was added.' : 'Your response was remembered.' })
  }

  changeMap(locationId, x, y) {
    const nextMap = VERTICAL_SLICE_MAPS[locationId]
    if (!nextMap) return
    this.locationId = locationId
    this.currentMap = nextMap
    this.save.world.location_id = locationId
    this.player.setPosition(x, y)
    this.resetCompanionFollowerPosition()
    this.lastPlayerPosition = new Phaser.Math.Vector2(x, y)
    this.randomEncounterDistance = 0
    this.randomEncounterGraceUntil = this.time.now + 1200
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

  completeBattle({ result, monster_id, defeated_monster_ids = null, victoryFlag, inventory, player_hp, player_max_hp, companion_id, companion_hp, random = false }) {
    this.forcePlayerIdle()
    if (inventory?.items) {
      this.save.inventory.items = inventory.items
    }
    this.save.player_state.hp = result === 'defeat' ? player_max_hp : Math.max(1, player_hp ?? this.save.player_state.hp ?? player_max_hp)
    const bucket = result === 'victory' ? 'wins' : result === 'defeat' ? 'losses' : 'fled'
    const battleIds = result === 'victory' && defeated_monster_ids?.length ? defeated_monster_ids : [monster_id]
    for (const battleId of battleIds) {
      this.save.battles[bucket][battleId] = (this.save.battles[bucket][battleId] ?? 0) + 1
    }
    if (!random && result === 'victory' && victoryFlag && !this.save.world.story_flags.includes(victoryFlag)) {
      this.save.world.story_flags.push(victoryFlag)
    }
    const rewardSummaries = result === 'victory'
      ? battleIds.map((battleId) => applyBattleRewards(this.save, { result, monster_id: battleId }))
      : [applyBattleRewards(this.save, { result, monster_id })]
    const rewards = {
      ...rewardSummaries[0],
      monster_id,
      monster_ids: battleIds,
      xp: rewardSummaries.reduce((total, reward) => total + (reward.xp ?? 0), 0),
      currencies: rewardSummaries.reduce((totals, reward) => {
        for (const [currency, amount] of Object.entries(reward.currencies ?? {})) {
          totals[currency] = (totals[currency] ?? 0) + amount
        }
        return totals
      }, {}),
      fieldDrops: rewardSummaries.flatMap((reward) => reward.fieldDrops ?? []),
      itemRewards: rewardSummaries.flatMap((reward) => reward.itemRewards ?? []),
      skillUnlocks: rewardSummaries.flatMap((reward) => reward.skillUnlocks ?? []),
      statPointsGained: rewardSummaries.reduce((total, reward) => total + (reward.statPointsGained ?? 0), 0),
      levelAfter: rewardSummaries.at(-1)?.levelAfter ?? rewardSummaries[0]?.levelAfter,
      levelUp: rewardSummaries.some((reward) => reward.levelUp),
      notes: rewardSummaries.map((reward) => reward.notes).filter(Boolean).join(' '),
    }
    if (companion_id) {
      setCompanionHp(this.save, companion_id, companion_hp)
      rewards.companion = applyCompanionBattleRewards(this.save, { result, monster_id, xp: rewards.xp })
    }
    if (!random && result === 'victory') {
      this.advanceQuest({ type: 'defeat', target_id: monster_id })
      if (monster_id === 'MON0007') this.triggerStoryScene('STSC00004')
      for (const itemReward of rewards.itemRewards ?? []) {
        advanceItemQuest(this.save, itemReward.id)
      }
    }
    for (const battleId of battleIds) {
      const trustState = applyTrustFromBattle(this.save, { result, monster_id: battleId })
      if (trustState?.eligible) {
        gameBridge.emit('companion:eligible', { monster_id: battleId, trust: trustState.trust })
      }
    }
    refreshAllBondEligibility(this.save)
    if (result === 'defeat') {
      this.returnToRespawnPoint()
    }
    if (!random && result === 'victory') {
      this.drawMap(this.currentMap)
    }
    this.randomEncounterDistance = 0
    this.randomEncounterGraceUntil = this.time.now + 1800
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result === 'defeat' ? 'Defeated. Returned to your Balon.' : `${random ? 'Random encounter' : 'Battle'} ${result}: ${monster_id}` })
    gameBridge.emit('battle:rewards', rewards)
    return rewards
  }

  startBattle(monsterId, title = null, random = false, monsterIds = null) {
    this.forcePlayerIdle()
    const encounterMonsterIds = monsterIds?.length ? monsterIds : [monsterId]
    gameBridge.emit('battle:started', {
      monster_id: monsterId,
      monster_ids: encounterMonsterIds,
      title: title ?? battleForMonster(monsterId).title,
      random,
    })
    this.scene.pause()
    this.scene.launch('BattleScene', {
      monster_id: monsterId,
      monster_ids: encounterMonsterIds,
      location_id: this.locationId,
      player_name: this.save.player.name,
      companion: activeCompanion(this.save),
      progression: this.save.progression,
      inventory: this.save.inventory,
      equipmentStats: equipmentStatTotals(this.save),
      player_hp: this.save.player_state.hp,
      player_skills: playerActiveSkills(this.save),
      random,
    })
  }

  updateRandomEncounters() {
    if (this.interactionUiOpen || this.scene.isActive('BattleScene') || this.currentMap.safeZone) return
    if (!this.currentMap.randomEncounterPool?.length || this.time.now < this.randomEncounterGraceUntil) return
    const current = new Phaser.Math.Vector2(this.player.x, this.player.y)
    const distance = Phaser.Math.Distance.BetweenPoints(this.lastPlayerPosition, current)
    this.lastPlayerPosition = current
    if (distance < 1) return
    this.randomEncounterDistance += distance
    if (this.randomEncounterDistance < (this.currentMap.encounterDistance ?? 520)) return
    this.randomEncounterDistance = 0
    if (Phaser.Math.Between(1, 100) > (this.currentMap.encounterChance ?? 24)) return
    const playerLevel = this.save.progression?.level ?? 1
    const eligiblePool = this.currentMap.randomEncounterPool.filter((monsterId) => (battleForMonster(monsterId).minEncounterLevel ?? 1) <= playerLevel)
    const pool = eligiblePool.length ? eligiblePool : this.currentMap.randomEncounterPool.slice(0, 1)
    const monsterId = pool[Phaser.Math.Between(0, pool.length - 1)]
    const monsterIds = [monsterId]
    if (pool.length > 1 && Phaser.Math.Between(1, 100) <= (this.currentMap.pairChance ?? 18)) {
      const secondPool = pool.filter((entry) => entry !== monsterId)
      monsterIds.push(secondPool[Phaser.Math.Between(0, secondPool.length - 1)])
    }
    this.startBattle(monsterId, monsterIds.length > 1 ? 'Wild Nilalang Pair' : 'Wild Nilalang Encounter', true, monsterIds)
  }

  isObjectCleared(object) {
    if (object.type !== 'encounter' && object.type !== 'boss') return false
    const battle = battleForMonster(object.id)
    return Boolean(battle.victoryFlag && this.save.world.story_flags.includes(battle.victoryFlag))
  }

  setRespawnPoint(object) {
    const stats = playerStatsForProgression(this.save.progression, equipmentStatTotals(this.save))
    this.save.player_state.hp = stats.maxHp
    reviveCompanionsAtBalon(this.save)
    this.save.player_state.spawn = {
      location_id: this.locationId,
      x: tileToWorld(object.respawnX ?? object.x),
      y: tileToWorld(object.respawnY ?? object.y),
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
    this.resetCompanionFollowerPosition()
    reviveCompanionsAtBalon(this.save)
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

  unequipItem(slot) {
    const ok = unequipItem(this.save, slot)
    const message = ok ? `Unequipped ${slot}.` : 'Equipment slot unavailable.'
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message })
    gameBridge.emit('economy:message', { ok, message })
  }

  equipCompanionItem(monsterId, equipmentId) {
    const ok = equipCompanionItem(this.save, monsterId, equipmentId)
    const message = ok ? `Equipped ${equipmentId} on ${monsterId}.` : 'Companion equipment unavailable.'
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message })
    gameBridge.emit('economy:message', { ok, message })
  }

  unequipCompanionItem(monsterId, slot) {
    const ok = unequipCompanionItem(this.save, monsterId, slot)
    const message = ok ? `Unequipped ${slot} from ${monsterId}.` : 'Companion equipment slot unavailable.'
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message })
    gameBridge.emit('economy:message', { ok, message })
  }

  useFieldItem(itemId, target = 'player') {
    const item = itemById(itemId)
    const quantity = this.save.inventory.items[itemId] ?? 0
    if (!item || item.category !== 'Consumable' || quantity <= 0) {
      gameBridge.emit('economy:message', { ok: false, message: 'Consumable unavailable.' })
      return
    }
    if (item.effect?.type !== 'heal') {
      gameBridge.emit('economy:message', { ok: false, message: `${item.name} has no field effect yet.` })
      return
    }

    let label = this.save.player.name || 'Player'
    let before = 0
    let after = 0
    if (target === 'companion') {
      const companion = activeCompanion(this.save)
      if (!companion) {
        gameBridge.emit('economy:message', { ok: false, message: 'No active companion to heal.' })
        return
      }
      if (companion.hp <= 0) {
        gameBridge.emit('economy:message', { ok: false, message: `${companion.name} needs a Balon to revive.` })
        return
      }
      before = companion.hp
      after = Math.min(companion.maxHp, companion.hp + item.effect.amount)
      if (after <= before) {
        gameBridge.emit('economy:message', { ok: false, message: `${companion.name} is already healthy.` })
        return
      }
      setCompanionHp(this.save, companion.monster_id, after)
      label = companion.name
    } else {
      const stats = playerStatsForProgression(this.save.progression, equipmentStatTotals(this.save))
      before = Math.max(1, Math.min(stats.maxHp, this.save.player_state.hp ?? stats.maxHp))
      after = Math.min(stats.maxHp, before + item.effect.amount)
      if (after <= before) {
        gameBridge.emit('economy:message', { ok: false, message: `${label} is already healthy.` })
        return
      }
      this.save.player_state.hp = after
    }

    removeInventoryItem(this.save, itemId, 1)
    SaveSystem.write(this.save)
    const message = `${item.name} restored ${after - before} HP to ${label}.`
    gameBridge.emit('save:complete', { save: this.save, message })
    gameBridge.emit('economy:message', { ok: true, message })
  }

  togglePlayerSkill(skillId) {
    const result = togglePlayerActiveSkill(this.save, skillId)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result.message })
    gameBridge.emit('economy:message', result)
  }

  allocatePlayerStat(stat) {
    const result = allocatePlayerStat(this.save, stat)
    const stats = playerStatsForProgression(this.save.progression, equipmentStatTotals(this.save))
    this.save.player_state.hp = Math.min(this.save.player_state.hp ?? stats.maxHp, stats.maxHp)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result.message })
    gameBridge.emit('economy:message', result)
  }

  allocateCompanionStat(monsterId, stat) {
    const result = allocateCompanionStat(this.save, monsterId, stat)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result.message })
    gameBridge.emit('economy:message', result)
  }

  toggleCompanionSkill(monsterId, skillId) {
    const result = toggleCompanionActiveSkill(this.save, monsterId, skillId)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: result.message })
    gameBridge.emit('economy:message', result)
  }

  bondCompanion(monsterId) {
    bondCompanion(this.save, monsterId)
    this.syncCompanionFollower()
    this.resetCompanionFollowerPosition()
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
    this.syncCompanionFollower()
    this.resetCompanionFollowerPosition()
    this.emitMapChanged()
    this.emitQuestUpdate()
    const scene = storySceneById(this.locationId === 'WLOC000004' ? 'STSC00003' : 'STSC00001')
    if (scene && shouldPlayStoryScene(this.save, scene.id)) this.triggerStoryScene(scene.id)
  }

  syncCompanionFollower() {
    const companion = activeCompanion(this.save)
    if (!companion) {
      this.companionFollower?.destroy()
      this.companionFollower = null
      this.companionFollowerId = null
      return
    }

    if (this.companionFollower && this.companionFollowerId === companion.monster_id) return

    this.companionFollower?.destroy()
    const asset = assetByKey(companion.assetKey)
    if (!asset || !this.textures.exists(companion.assetKey)) {
      this.companionFollower = null
      this.companionFollowerId = null
      return
    }

    this.companionFollower = this.physics.add.sprite(this.player.x, this.player.y + 42, companion.assetKey, spriteIdleFrame('down'))
    this.companionFollower.setDisplaySize(asset.displayWidth, asset.displayHeight)
    this.companionFollower.setDepth(58)
    this.companionFollower.body.setAllowGravity(false)
    setFootCollisionBody(this.companionFollower, 18, 12)
    this.companionFollowerId = companion.monster_id
  }

  resetCompanionFollowerPosition() {
    if (!this.companionFollower) return
    this.companionFollower.setPosition(this.player.x, this.player.y + 42)
    this.companionFollower.setVelocity(0, 0)
    this.companionFollower.anims.stop()
    this.companionFollower.setFrame(spriteIdleFrame('down'))
  }

  forcePlayerIdle() {
    this.playerController?.forceIdle()
  }

  updateCompanionFollower() {
    this.syncCompanionFollower()
    if (!this.companionFollower) return

    const facing = this.playerController?.facing ?? 'down'
    const offsets = {
      down: { x: 0, y: -42 },
      up: { x: 0, y: 46 },
      left: { x: 42, y: 0 },
      right: { x: -42, y: 0 },
    }
    const offset = offsets[facing] ?? offsets.down
    const targetX = this.player.x + offset.x
    const targetY = this.player.y + offset.y
    const distance = Phaser.Math.Distance.Between(this.companionFollower.x, this.companionFollower.y, targetX, targetY)

    if (distance > 220) {
      this.companionFollower.setPosition(targetX, targetY)
      this.companionFollower.setVelocity(0, 0)
      return
    }

    if (distance > 6) {
      const angle = Phaser.Math.Angle.Between(this.companionFollower.x, this.companionFollower.y, targetX, targetY)
      const speed = Math.min(210, Math.max(80, distance * 5))
      const dx = targetX - this.companionFollower.x
      const dy = targetY - this.companionFollower.y
      const direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up')
      this.companionFollower.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
      this.companionFollower.anims.play(spriteWalkAnimationKey(this.companionFollower.texture.key, direction), true)
    } else {
      this.companionFollower.setVelocity(0, 0)
      this.companionFollower.anims.stop()
      this.companionFollower.setFrame(spriteIdleFrame(facing))
    }

    this.companionFollower.setDepth(this.companionFollower.y > this.player.y ? 62 : 58)
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
    this.cleanupUnequipItem?.()
    this.cleanupEquipCompanionItem?.()
    this.cleanupUnequipCompanionItem?.()
    this.cleanupUseFieldItem?.()
    this.cleanupAllocatePlayerStat?.()
    this.cleanupAllocateCompanionStat?.()
    this.cleanupTogglePlayerSkill?.()
    this.cleanupToggleCompanionSkill?.()
    this.cleanupTrackQuest?.()
    this.cleanupDialogueChoice?.()
    this.cleanupInteractionUiState?.()
  }
}

function setFootCollisionBody(sprite, visibleWidth, visibleHeight) {
  const frameWidth = sprite.frame.realWidth
  const frameHeight = sprite.frame.realHeight
  const scaleX = Math.abs(sprite.scaleX)
  const scaleY = Math.abs(sprite.scaleY)
  const sourceWidth = Math.round(visibleWidth / scaleX)
  const sourceHeight = Math.round(visibleHeight / scaleY)
  const offsetX = Math.round((frameWidth - sourceWidth) / 2)
  const feetBaseline = frameHeight - 16
  const offsetY = feetBaseline - sourceHeight

  sprite.body.setSize(sourceWidth, sourceHeight).setOffset(offsetX, offsetY)
}
