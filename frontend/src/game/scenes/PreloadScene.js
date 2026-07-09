import Phaser from 'phaser'
import {
  PLAYER_ASSET_KEY,
  SPRITE_DIRECTIONS,
  VERTICAL_SLICE_ASSETS,
  assetLoaderType,
  battleAttackAnimationKey,
  battleIdleAnimationKey,
  battleSpriteAssets,
  spriteSourceFrameSize,
  spriteAssets,
  spriteFrameName,
  spriteWalkAnimationKey,
  tilemapAssets,
  vfxAnimationKey,
  vfxAssets,
} from '../data/verticalSliceAssets'

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    for (const asset of VERTICAL_SLICE_ASSETS) {
      if (asset.type === 'tilemap') {
        this.load.tilemapTiledJSON(asset.key, asset.path)
      } else if (asset.type === 'vfx') {
        this.load.spritesheet(asset.key, asset.path, { frameWidth: asset.frameWidth, frameHeight: asset.frameHeight })
      } else if (asset.type === 'battleSpritesheet') {
        this.load.spritesheet(asset.key, asset.path, { frameWidth: asset.frameWidth, frameHeight: asset.frameHeight })
      } else if (assetLoaderType(asset) === 'svg') {
        this.load.svg(asset.key, asset.path, { width: asset.expectedWidth ?? asset.width, height: asset.expectedHeight ?? asset.height })
      } else {
        this.load.image(asset.key, asset.path)
      }
    }
  }

  create() {
    this.createSpriteSheetFrames()
    this.createSpriteAnimations()
    this.createBattleSpriteAnimations()
    this.createVfxAnimations()
    this.warnIfTilemapsAreMissing()
    this.createGeneratedTextures()
    this.scene.start('WorldScene')
    this.scene.launch('UIScene')
  }

  createSpriteSheetFrames() {
    for (const asset of spriteAssets()) {
      const texture = this.textures.get(asset.key)
      const source = texture.getSourceImage()
      if (!source?.width || !source?.height) continue
      this.warnIfSpriteSheetIsNonstandard(asset, source)

      const { width: frameWidth, height: frameHeight } = spriteSourceFrameSize(asset, source)
      const usableWidth = frameWidth * asset.columns
      const usableHeight = frameHeight * asset.rows
      const offsetX = Math.floor((source.width - usableWidth) / 2)
      const offsetY = Math.floor((source.height - usableHeight) / 2)

      SPRITE_DIRECTIONS.forEach((direction, row) => {
        for (let column = 0; column < asset.columns; column += 1) {
          const frameName = spriteFrameName(direction, column)
          if (!texture.has(frameName)) {
            const crop = spriteFrameBleedCrop(frameWidth, frameHeight)
            texture.add(
              frameName,
              0,
              offsetX + column * frameWidth + crop.x,
              offsetY + row * frameHeight + crop.y,
              frameWidth - crop.x - crop.right,
              frameHeight - crop.y - crop.bottom,
            )
          }
        }
      })
    }
  }

  warnIfSpriteSheetIsNonstandard(asset, source) {
    const hasUnexpectedSize = source.width !== asset.expectedWidth || source.height !== asset.expectedHeight
    const hasUnevenGrid = source.width % asset.columns !== 0 || source.height % asset.rows !== 0
    if (hasUnexpectedSize || hasUnevenGrid) {
      console.warn(
        `[ALAMAT assets] ${asset.key} is ${source.width}x${source.height}. Expected ${asset.expectedWidth}x${asset.expectedHeight} transparent PNG with ${asset.columns}x${asset.rows} equal grid. It will be sliced best-effort, but regenerate for clean animation.`,
      )
    }
  }

  createSpriteAnimations() {
    for (const asset of spriteAssets()) {
      for (const direction of SPRITE_DIRECTIONS) {
        const key = spriteWalkAnimationKey(asset.key, direction)
        if (this.anims.exists(key)) continue
      this.anims.create({
        key,
        frames: [1, 0, 2, 0].map((step) => ({ key: asset.key, frame: spriteFrameName(direction, step) })),
        frameRate: 5,
        repeat: -1,
      })
      }
    }
  }

  createVfxAnimations() {
    for (const asset of vfxAssets()) {
      const key = vfxAnimationKey(asset.key)
      if (this.anims.exists(key)) continue
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(asset.key, { start: 0, end: asset.columns - 1 }),
        frameRate: 8,
        repeat: 0,
      })
    }
  }

  createBattleSpriteAnimations() {
    for (const asset of battleSpriteAssets()) {
      if (!this.textures.exists(asset.key)) continue
      const idleKey = battleIdleAnimationKey(asset.key)
      const attackKey = battleAttackAnimationKey(asset.key)
      if (!this.anims.exists(idleKey)) {
        this.anims.create({
          key: idleKey,
          frames: this.anims.generateFrameNumbers(asset.key, { start: 0, end: 3 }),
          frameRate: 4,
          repeat: -1,
        })
      }
      if (!this.anims.exists(attackKey)) {
        this.anims.create({
          key: attackKey,
          frames: this.anims.generateFrameNumbers(asset.key, { start: 4, end: 7 }),
          frameRate: 8,
          repeat: 0,
        })
      }
    }
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

  warnIfTilemapsAreMissing() {
    for (const asset of tilemapAssets()) {
      if (!this.cache.tilemap.exists(asset.key)) {
        console.warn(`[ALAMAT maps] ${asset.key} did not load from ${asset.path}. Falling back to blockout map rendering.`)
      }
    }
  }
}

function spriteFrameBleedCrop(frameWidth, frameHeight) {
  const edge = Math.max(1, Math.floor(Math.min(frameWidth, frameHeight) * 0.008))
  return {
    x: edge,
    y: 0,
    right: edge,
    bottom: edge,
  }
}
