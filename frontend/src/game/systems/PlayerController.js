import Phaser from 'phaser'
import { PLAYER_SPEED } from '../config/gameConstants'
import { PLAYER_ASSET_KEY, spriteIdleFrame, spriteWalkAnimationKey } from '../data/verticalSliceAssets'

export class PlayerController {
  constructor(scene, player) {
    this.scene = scene
    this.player = player
    this.keys = scene.input.keyboard.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
      save: 'F5',
      debug: 'F3',
    })
    this.cursors = scene.input.keyboard.createCursorKeys()
    this.facing = 'down'
    this.locked = false
  }

  update() {
    if (this.locked) {
      this.player.setVelocity(0, 0)
      return
    }

    const left = this.cursors.left.isDown || this.keys.left.isDown
    const right = this.cursors.right.isDown || this.keys.right.isDown
    const up = this.cursors.up.isDown || this.keys.up.isDown
    const down = this.cursors.down.isDown || this.keys.down.isDown
    const rawX = Number(right) - Number(left)
    const rawY = Number(down) - Number(up)
    const vx = rawX !== 0 ? rawX : 0
    const vy = rawX === 0 ? rawY : 0
    const vector = new Phaser.Math.Vector2(vx, vy)

    if (vector.length() > 0) {
      vector.scale(PLAYER_SPEED)
      this.player.setVelocity(vector.x, vector.y)
      this.facing = Math.abs(vector.x) > Math.abs(vector.y) ? (vector.x > 0 ? 'right' : 'left') : (vector.y > 0 ? 'down' : 'up')
      this.player.anims.play(spriteWalkAnimationKey(PLAYER_ASSET_KEY, this.facing), true)
    } else {
      this.player.setVelocity(0, 0)
      this.player.anims.stop()
      this.player.setFrame(spriteIdleFrame(this.facing))
    }
  }
}
