import Phaser from 'phaser'
import { gameBridge } from '../bridges/ReactPhaserBridge'

export class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    this.debugText = this.add.text(12, 12, '', {
      fontFamily: 'Consolas, monospace',
      fontSize: '13px',
      color: '#fff4cf',
      backgroundColor: '#11180fcc',
      padding: { x: 8, y: 6 },
    }).setScrollFactor(0).setDepth(1000).setVisible(false)

    this.cleanup = gameBridge.on('debug:update', (payload) => {
      this.debugText.setText([
        `FPS ${Math.round(payload.fps ?? 0)}`,
        `Map ${payload.location_id ?? ''}`,
        `XY ${Math.round(payload.x ?? 0)}, ${Math.round(payload.y ?? 0)}`,
        `Facing ${payload.facing ?? 'down'}`,
        `Collision ${payload.collision_debug ? 'debug' : 'normal'}`,
        `Interact ${payload.active_interactable ?? 'none'}`,
        `Flags ${(payload.story_flags ?? []).join(', ') || 'none'}`,
      ])
      this.debugText.setVisible(Boolean(payload.debug_visible))
    })
  }

  shutdown() {
    this.cleanup?.()
  }
}
