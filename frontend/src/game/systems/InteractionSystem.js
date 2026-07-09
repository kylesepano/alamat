import Phaser from 'phaser'
import { TILE_SIZE } from '../config/gameConstants'
import { isActiveQuestTarget } from '../data/questRuntimeData'
import { assetByKey, objectAssetKey, spriteIdleFrame } from '../data/verticalSliceAssets'
import { tileToWorld } from '../data/verticalSliceMaps'

export class InteractionSystem {
  constructor(scene) {
    this.scene = scene
    this.objects = []
    this.active = null
  }

  build(map) {
    this.objects.forEach((object) => {
      object.sprite.destroy()
      object.labelSprite?.destroy()
    })
    this.objects = map.objects.map((object) => {
      const assetKey = objectAssetKey(object)
      const sprite = this.createSprite(object, assetKey)
      const isQuestTarget = isActiveQuestTarget(this.scene.save, object)
      const labelSprite = this.scene.add.text(sprite.x, sprite.y - 34, isQuestTarget ? 'Quest' : labelFor(object.type), { fontFamily: 'Arial', fontSize: '12px', color: isQuestTarget ? '#11180f' : '#fff1be', backgroundColor: isQuestTarget ? '#d8b765dd' : '#1d2419aa', padding: { x: 4, y: 2 } }).setOrigin(0.5).setDepth(70)
      return { ...object, sprite, labelSprite }
    })
  }

  refreshQuestLabels() {
    for (const object of this.objects) {
      const isQuestTarget = isActiveQuestTarget(this.scene.save, object)
      object.labelSprite.setText(isQuestTarget ? 'Quest' : labelFor(object.type))
      object.labelSprite.setColor(isQuestTarget ? '#11180f' : '#fff1be')
      object.labelSprite.setBackgroundColor(isQuestTarget ? '#d8b765dd' : '#1d2419aa')
    }
  }

  createSprite(object, assetKey) {
    const x = tileToWorld(object.x)
    const y = tileToWorld(object.y)

    if (assetKey && this.scene.textures.exists(assetKey)) {
      const asset = assetByKey(assetKey)
      const frame = asset?.type === 'spritesheet' ? spriteIdleFrame('down') : undefined
      const sprite = asset?.type === 'spritesheet'
        ? this.scene.add.sprite(x, y, assetKey, frame)
        : this.scene.add.image(x, y, assetKey, frame)
      const fallbackSize = object.type === 'boss' ? TILE_SIZE * 1.3 : TILE_SIZE * 0.9
      sprite.baseDisplayWidth = asset?.displayWidth ?? fallbackSize
      sprite.baseDisplayHeight = asset?.displayHeight ?? fallbackSize
      sprite.setDisplaySize(sprite.baseDisplayWidth, sprite.baseDisplayHeight)
      if ((object.type === 'encounter' || object.type === 'boss') && sprite.anims) {
        sprite.anims.play(`${assetKey}-walk-down`, true)
      }
      sprite.setDepth(55)
      return sprite
    }

    const sprite = this.scene.add.rectangle(x, y, TILE_SIZE * 0.68, TILE_SIZE * 0.68, colorFor(object.type), 0.95)
    sprite.setStrokeStyle(2, 0xfff1be, 0.8)
    sprite.baseDisplayWidth = TILE_SIZE * 0.68
    sprite.baseDisplayHeight = TILE_SIZE * 0.68
    return sprite
  }

  update(player) {
    let nearest = null
    let nearestDistance = Infinity
    for (const object of this.objects) {
      const distance = Phaser.Math.Distance.Between(player.x, player.y, object.sprite.x, object.sprite.y)
      if (distance < 76 && distance < nearestDistance) {
        nearest = object
        nearestDistance = distance
      }
    }
    this.active = nearest
    return nearest
  }

  interact() {
    if (!this.active) return
    this.scene.handleInteraction(this.active)
  }
}

function colorFor(type) {
  return {
    npc: 0xd8b765,
    item: 0x61c47c,
    save: 0x6db6ff,
    transition: 0xffffff,
    encounter: 0xc97a45,
    boss: 0xbd4c5f,
    ambient: 0x82a7a6,
  }[type] ?? 0xffffff
}

function labelFor(type) {
  return {
    npc: 'Talk',
    item: 'Item',
    save: 'Save',
    transition: 'Go',
    encounter: 'Wild',
    boss: 'Boss',
    ambient: 'Inspect',
  }[type] ?? 'Use'
}
