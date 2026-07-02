import { TILE_SIZE, GAME_HEIGHT, GAME_WIDTH } from '../config/gameConstants'

export class CollisionSystem {
  constructor(scene) {
    this.scene = scene
    this.group = scene.physics.add.staticGroup()
    this.debugGraphics = scene.add.graphics().setDepth(90).setVisible(false)
    this.enabled = false
  }

  build(map) {
    this.group.clear(true, true)
    for (const tile of map.blocked) {
      const blocker = this.scene.add.rectangle(tile.x * TILE_SIZE + TILE_SIZE / 2, tile.y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, 0x000000, 0)
      this.scene.physics.add.existing(blocker, true)
      this.group.add(blocker)
    }
    this.scene.physics.world.setBounds(0, 0, map.width * TILE_SIZE, map.height * TILE_SIZE)
    this.scene.cameras.main.setBounds(0, 0, map.width * TILE_SIZE, map.height * TILE_SIZE)
    this.redraw(map)
  }

  toggle() {
    this.enabled = !this.enabled
    this.debugGraphics.setVisible(this.enabled)
  }

  redraw(map) {
    this.debugGraphics.clear()
    this.debugGraphics.lineStyle(1, 0xffe08a, 0.4)
    for (let x = 0; x <= map.width * TILE_SIZE; x += TILE_SIZE) this.debugGraphics.lineBetween(x, 0, x, map.height * TILE_SIZE)
    for (let y = 0; y <= map.height * TILE_SIZE; y += TILE_SIZE) this.debugGraphics.lineBetween(0, y, map.width * TILE_SIZE, y)
    this.debugGraphics.fillStyle(0xff4d4d, 0.22)
    for (const tile of map.blocked) this.debugGraphics.fillRect(tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    this.debugGraphics.setScrollFactor(1)

    if (map.width * TILE_SIZE < GAME_WIDTH || map.height * TILE_SIZE < GAME_HEIGHT) {
      this.scene.cameras.main.centerOn(map.width * TILE_SIZE / 2, map.height * TILE_SIZE / 2)
    }
  }
}
