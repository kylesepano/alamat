import Phaser from 'phaser'
import { PLAYER_ASSET_KEY, VERTICAL_SLICE_ASSETS, assetLoaderType } from '../data/verticalSliceAssets'

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    for (const asset of VERTICAL_SLICE_ASSETS) {
      if (assetLoaderType(asset) === 'svg') {
        this.load.svg(asset.key, asset.path, { width: asset.width, height: asset.height })
      } else {
        this.load.image(asset.key, asset.path)
      }
    }
  }

  create() {
    this.createGeneratedTextures()
    this.scene.start('WorldScene')
    this.scene.launch('UIScene')
  }

  createGeneratedTextures() {
    if (this.textures.exists(PLAYER_ASSET_KEY)) return

    const graphics = this.add.graphics()
    graphics.fillStyle(0xf0c36a, 1)
    graphics.fillRoundedRect(0, 0, 34, 46, 8)
    graphics.fillStyle(0x29331f, 1)
    graphics.fillRect(8, 10, 18, 10)
    graphics.generateTexture(PLAYER_ASSET_KEY, 34, 46)
    graphics.clear()
    graphics.destroy()
  }
}
