import Phaser from 'phaser'
import { TILE_SIZE } from '../config/gameConstants'
import { objectAssetKey } from '../data/verticalSliceAssets'
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
      object.label?.destroy()
    })
    this.objects = map.objects.map((object) => {
      const assetKey = objectAssetKey(object)
      const sprite = this.createSprite(object, assetKey)
      const label = this.scene.add.text(sprite.x, sprite.y - 34, labelFor(object.type), { fontFamily: 'Arial', fontSize: '12px', color: '#fff1be', backgroundColor: '#1d2419aa', padding: { x: 4, y: 2 } }).setOrigin(0.5).setDepth(70)
      return { ...object, sprite, label }
    })
  }

  createSprite(object, assetKey) {
    const x = tileToWorld(object.x)
    const y = tileToWorld(object.y)

    if (assetKey && this.scene.textures.exists(assetKey)) {
      const sprite = this.scene.add.image(x, y, assetKey)
      const size = object.type === 'boss' ? TILE_SIZE * 1.3 : TILE_SIZE * 0.9
      sprite.setDisplaySize(size, size)
      sprite.setDepth(55)
      return sprite
    }

    const sprite = this.scene.add.rectangle(x, y, TILE_SIZE * 0.68, TILE_SIZE * 0.68, colorFor(object.type), 0.95)
    sprite.setStrokeStyle(2, 0xfff1be, 0.8)
    return sprite
  }

  update(player) {
    let nearest = null
    let nearestDistance = Infinity
    for (const object of this.objects) {
      const distance = Phaser.Math.Distance.Between(player.x, player.y, object.sprite.x, object.sprite.y)
      object.sprite.setScale(distance < 70 ? 1.12 : 1)
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
  }[type] ?? 'Use'
}
