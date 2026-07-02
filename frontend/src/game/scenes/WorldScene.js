import Phaser from 'phaser'
import { gameBridge } from '../bridges/ReactPhaserBridge'
import { TILE_SIZE } from '../config/gameConstants'
import { PLAYER_ASSET_KEY } from '../data/verticalSliceAssets'
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
    this.save = gameBridge.getInitialSave() ?? SaveSystem.load()
    this.locationId = this.save.world.location_id
    this.currentMap = VERTICAL_SLICE_MAPS[this.locationId] ?? VERTICAL_SLICE_MAPS.WLOC000001
    this.mapLayer = this.add.container(0, 0)
    this.objectLabels = []
    this.collision = new CollisionSystem(this)
    this.interactions = new InteractionSystem(this)
    this.drawMap(this.currentMap)

    this.player = this.physics.add.sprite(this.save.world.x, this.save.world.y, PLAYER_ASSET_KEY)
    this.player.setDepth(60)
    this.player.setCollideWorldBounds(true)
    this.player.body.setSize(24, 28).setOffset(5, 16)
    this.physics.add.collider(this.player, this.collision.group)

    this.playerController = new PlayerController(this, this.player)
    this.cameraController = new CameraController(this, this.player)
    this.cameraController.start()

    this.input.keyboard.on('keydown-E', () => this.interactions.interact())
    this.input.keyboard.on('keydown-SPACE', () => this.interactions.interact())
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
    this.emitMapChanged()
  }

  update() {
    this.playerController.update()
    const active = this.interactions.update(this.player)
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
      this.saveNow()
      gameBridge.emit('interaction:started', { title: object.label, body: 'Progress saved.' })
      return
    }

    if (object.type === 'item') {
      if (!this.save.world.story_flags.includes(object.flag)) {
        this.save.world.story_flags.push(object.flag)
      }
      gameBridge.emit('interaction:started', { title: object.label, body: `${object.id} added to the field log. Inventory ownership comes later.` })
      return
    }

    if (object.type === 'encounter' || object.type === 'boss') {
      gameBridge.emit('encounter:preview', {
        monster_id: object.id,
        title: object.label,
        body: object.type === 'boss'
          ? 'A major presence blocks the shrine path. Combat is stubbed for Milestone 1.'
          : 'A wild Nilalang is nearby. Full battle starts in a later milestone.',
      })
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
  }

  saveNow() {
    this.save.world.location_id = this.locationId
    this.save.world.x = Math.round(this.player.x)
    this.save.world.y = Math.round(this.player.y)
    SaveSystem.write(this.save)
    gameBridge.emit('save:complete', { save: this.save, message: 'Saved current position and story state.' })
  }

  loadFromStorage() {
    this.save = SaveSystem.load()
    const map = VERTICAL_SLICE_MAPS[this.save.world.location_id] ?? VERTICAL_SLICE_MAPS.WLOC000001
    this.locationId = map.id
    this.currentMap = map
    this.drawMap(map)
    this.player.setPosition(this.save.world.x, this.save.world.y)
    this.emitMapChanged()
  }

  resetSave() {
    SaveSystem.clear()
    window.location.reload()
  }

  emitMapChanged() {
    gameBridge.emit('map:changed', { location_id: this.locationId, name: this.currentMap.name, zone: this.currentMap.zoneName })
  }

  shutdown() {
    this.cleanupSave?.()
    this.cleanupLoad?.()
    this.cleanupReset?.()
  }
}
