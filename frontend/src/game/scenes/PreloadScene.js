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
    this.load.on('loaderror', (file) => {
      const asset = VERTICAL_SLICE_ASSETS.find((candidate) => candidate.key === file.key)
      if (asset?.fallback) {
        console.warn(`[ALAMAT assets] ${asset.key} is unavailable. A generated fallback will be used.`)
      }
    })

    for (const asset of VERTICAL_SLICE_ASSETS) {
      if (asset.type === 'tilemap') {
        this.load.tilemapTiledJSON(asset.key, asset.path)
      } else if (asset.type === 'vfx') {
        this.load.spritesheet(asset.key, asset.path, { frameWidth: asset.frameWidth, frameHeight: asset.frameHeight })
      } else if (asset.type === 'battleSpritesheet') {
        this.load.spritesheet(asset.key, asset.path, { frameWidth: asset.frameWidth, frameHeight: asset.frameHeight })
      } else if (assetLoaderType(asset) === 'svg') {
        // The browser image loader fails cleanly on a missing SVG. Phaser's SVG
        // parser can throw while attempting to parse a dev-server 404 response.
        this.load.image(asset.key, asset.path)
      } else {
        this.load.image(asset.key, asset.path)
      }
    }
  }

  create() {
    this.normalizeActorSheetTextures()
    this.createSpriteSheetFrames()
    this.stabilizeSpriteFramePivots()
    this.stabilizeBattleFramePivots()
    this.createSpriteAnimations()
    this.createBattleSpriteAnimations()
    this.createVfxAnimations()
    this.warnIfTilemapsAreMissing()
    this.createGeneratedTextures()
    this.scene.start('WorldScene')
    this.scene.launch('UIScene')
  }

  normalizeActorSheetTextures() {
    for (const asset of [...spriteAssets(), ...battleSpriteAssets()]) {
      if (!this.textures.exists(asset.key)) continue
      const texture = this.textures.get(asset.key)
      const source = texture.getSourceImage()
      const normalized = source ? normalizeActorSheet(source, asset.columns, asset.rows) : null
      if (!normalized) continue

      this.textures.remove(asset.key)
      const normalizedTexture = this.textures.addCanvas(asset.key, normalized)
      if (asset.type !== 'battleSpritesheet') continue

      const frameWidth = normalized.width / asset.columns
      const frameHeight = normalized.height / asset.rows
      for (let row = 0; row < asset.rows; row += 1) {
        for (let column = 0; column < asset.columns; column += 1) {
          normalizedTexture.add(
            row * asset.columns + column,
            0,
            column * frameWidth,
            row * frameHeight,
            frameWidth,
            frameHeight,
          )
        }
      }
    }
  }

  stabilizeSpriteFramePivots() {
    for (const asset of spriteAssets()) {
      if (!this.textures.exists(asset.key)) continue
      const texture = this.textures.get(asset.key)
      const source = texture.getSourceImage()
      const anchors = source ? findSheetAnchors(source, asset.columns, asset.rows) : null
      if (!anchors) continue

      SPRITE_DIRECTIONS.forEach((direction, row) => {
        const referenceFrame = texture.get(spriteFrameName(direction, 0))
        const referenceAnchor = anchors[row]?.[0]
        if (!referenceFrame || !referenceAnchor) return
        const referenceOffset = frameAnchorOffset(referenceFrame, referenceAnchor)

        for (let column = 0; column < asset.columns; column += 1) {
          applyStablePivot(
            texture.get(spriteFrameName(direction, column)),
            anchors[row]?.[column],
            referenceOffset,
          )
        }
      })
    }
  }

  stabilizeBattleFramePivots() {
    for (const asset of battleSpriteAssets()) {
      if (!this.textures.exists(asset.key)) continue
      const texture = this.textures.get(asset.key)
      const source = texture.getSourceImage()
      const anchors = source ? findSheetAnchors(source, asset.columns, asset.rows) : null
      if (!anchors) continue

      const referenceFrame = texture.get(0)
      const referenceAnchor = anchors[0]?.[0]
      if (!referenceFrame || !referenceAnchor) continue
      const referenceOffset = frameAnchorOffset(referenceFrame, referenceAnchor)

      for (let row = 0; row < asset.rows; row += 1) {
        for (let column = 0; column < asset.columns; column += 1) {
          applyStablePivot(texture.get(row * asset.columns + column), anchors[row]?.[column], referenceOffset)
        }
      }
    }
  }

  createSpriteSheetFrames() {
    for (const asset of spriteAssets()) {
      if (!this.textures.exists(asset.key)) continue
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
      if (!this.textures.exists(asset.key)) continue
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
      if (!this.textures.exists(asset.key)) continue
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
    this.createBattleBackgroundFallbacks()

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

  createBattleBackgroundFallbacks() {
    const graphics = this.add.graphics()
    for (const asset of VERTICAL_SLICE_ASSETS.filter((candidate) => candidate.fallback === 'battleBackground')) {
      if (this.textures.exists(asset.key)) continue
      const [sky, ground, accent] = asset.fallbackColors
      const width = asset.width ?? 1280
      const height = asset.height ?? 720

      graphics.clear()
      graphics.fillStyle(sky, 1)
      graphics.fillRect(0, 0, width, height)
      graphics.fillStyle(ground, 1)
      graphics.fillRect(0, Math.floor(height * 0.54), width, Math.ceil(height * 0.46))
      graphics.fillStyle(accent, 0.22)
      graphics.fillEllipse(width / 2, height * 0.78, width * 0.72, height * 0.24)
      graphics.generateTexture(asset.key, width, height)
    }
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

function frameAnchorOffset(frame, anchor) {
  return {
    x: anchor.x - frame.cutX - frame.cutWidth / 2,
    y: anchor.y - frame.cutY - frame.cutHeight / 2,
  }
}

function applyStablePivot(frame, anchor, referenceOffset) {
  if (!frame || !anchor) return
  const pivotX = anchor.x - frame.cutX - referenceOffset.x
  const pivotY = anchor.y - frame.cutY - referenceOffset.y
  frame.customPivot = true
  frame.pivotX = Phaser.Math.Clamp(pivotX / frame.cutWidth, 0, 1)
  frame.pivotY = Phaser.Math.Clamp(pivotY / frame.cutHeight, 0, 1)
}

function findSheetAnchors(source, columns, rows) {
  const canvas = document.createElement('canvas')
  canvas.width = source.width
  canvas.height = source.height
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return null

  try {
    context.drawImage(source, 0, 0)
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    const cellWidth = Math.floor(canvas.width / columns)
    const cellHeight = Math.floor(canvas.height / rows)
    return Array.from({ length: rows }, (_, row) => (
      Array.from({ length: columns }, (_, column) => findMainFigureAnchor(
        pixels,
        canvas.width,
        column * cellWidth,
        row * cellHeight,
        cellWidth,
        cellHeight,
      ))
    ))
  } catch (error) {
    console.warn('[ALAMAT assets] Could not analyze sprite alpha for frame stabilization.', error)
    return null
  }
}

function normalizeActorSheet(source, columns, rows) {
  const input = document.createElement('canvas')
  input.width = source.width
  input.height = source.height
  const inputContext = input.getContext('2d', { willReadFrequently: true })
  if (!inputContext) return null

  try {
    inputContext.drawImage(source, 0, 0)
    const sourceImage = inputContext.getImageData(0, 0, input.width, input.height)
    const components = findAlphaComponents(sourceImage.data, input.width, input.height)
    const cellWidth = Math.floor(input.width / columns)
    const cellHeight = Math.floor(input.height / rows)
    const assigned = Array.from({ length: rows * columns }, () => [])

    for (const component of components) {
      const column = Phaser.Math.Clamp(Math.floor(component.centerX / cellWidth), 0, columns - 1)
      const row = Phaser.Math.Clamp(Math.floor(component.centerY / cellHeight), 0, rows - 1)
      assigned[row * columns + column].push(component)
    }

    const output = document.createElement('canvas')
    output.width = cellWidth * columns
    output.height = cellHeight * rows
    const outputContext = output.getContext('2d')
    if (!outputContext) return null

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        drawNormalizedCell(
          outputContext,
          sourceImage,
          input.width,
          assigned[row * columns + column],
          column * cellWidth,
          row * cellHeight,
          cellWidth,
          cellHeight,
        )
      }
    }
    return output
  } catch (error) {
    console.warn('[ALAMAT assets] Could not normalize actor sprite sheet.', error)
    return null
  }
}

function findAlphaComponents(pixels, width, height) {
  const threshold = 8
  const occupied = new Uint8Array(width * height)
  for (let index = 0; index < occupied.length; index += 1) {
    occupied[index] = pixels[index * 4 + 3] >= threshold ? 1 : 0
  }

  const visited = new Uint8Array(occupied.length)
  const components = []
  for (let index = 0; index < occupied.length; index += 1) {
    if (!occupied[index] || visited[index]) continue
    const component = traceGlobalComponent(occupied, visited, width, height, index)
    if (component.count >= 2) components.push(component)
  }
  return components
}

function traceGlobalComponent(occupied, visited, width, height, firstIndex) {
  const stack = [firstIndex]
  const pixels = []
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  let sumX = 0
  let sumY = 0

  while (stack.length) {
    const index = stack.pop()
    if (visited[index] || !occupied[index]) continue
    visited[index] = 1
    pixels.push(index)
    const x = index % width
    const y = Math.floor(index / width)
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    sumX += x
    sumY += y

    if (x > 0) stack.push(index - 1)
    if (x + 1 < width) stack.push(index + 1)
    if (y > 0) stack.push(index - width)
    if (y + 1 < height) stack.push(index + width)
  }

  return {
    count: pixels.length,
    pixels,
    minX,
    minY,
    maxX,
    maxY,
    centerX: sumX / pixels.length,
    centerY: sumY / pixels.length,
  }
}

function drawNormalizedCell(context, sourceImage, sourceWidth, components, targetX, targetY, cellWidth, cellHeight) {
  if (!components.length) return
  const primary = components.reduce((largest, component) => component.count > largest.count ? component : largest)
  const selected = components.filter((component) => (
    component === primary || (component.count >= 4 && componentGap(component, primary) <= 64)
  ))
  const bounds = selected.reduce((result, component) => ({
    minX: Math.min(result.minX, component.minX),
    minY: Math.min(result.minY, component.minY),
    maxX: Math.max(result.maxX, component.maxX),
    maxY: Math.max(result.maxY, component.maxY),
  }), { minX: sourceImage.width, minY: sourceImage.height, maxX: 0, maxY: 0 })
  const width = bounds.maxX - bounds.minX + 1
  const height = bounds.maxY - bounds.minY + 1
  const isolated = document.createElement('canvas')
  isolated.width = width
  isolated.height = height
  const isolatedContext = isolated.getContext('2d')
  if (!isolatedContext) return
  const isolatedImage = isolatedContext.createImageData(width, height)

  for (const component of selected) {
    for (const sourceIndex of component.pixels) {
      const sourceX = sourceIndex % sourceWidth
      const sourceY = Math.floor(sourceIndex / sourceWidth)
      const destinationIndex = ((sourceY - bounds.minY) * width + sourceX - bounds.minX) * 4
      const sourcePixel = sourceIndex * 4
      isolatedImage.data[destinationIndex] = sourceImage.data[sourcePixel]
      isolatedImage.data[destinationIndex + 1] = sourceImage.data[sourcePixel + 1]
      isolatedImage.data[destinationIndex + 2] = sourceImage.data[sourcePixel + 2]
      isolatedImage.data[destinationIndex + 3] = sourceImage.data[sourcePixel + 3]
    }
  }
  isolatedContext.putImageData(isolatedImage, 0, 0)

  const paddingX = 16
  const paddingTop = 16
  const paddingBottom = 16
  const scale = Math.min(1, (cellWidth - paddingX * 2) / width, (cellHeight - paddingTop - paddingBottom) / height)
  const drawWidth = width * scale
  const drawHeight = height * scale
  const drawX = targetX + (cellWidth - drawWidth) / 2
  const drawY = targetY + cellHeight - paddingBottom - drawHeight
  context.drawImage(isolated, drawX, drawY, drawWidth, drawHeight)
}

function componentGap(a, b) {
  const x = Math.max(0, Math.max(a.minX, b.minX) - Math.min(a.maxX, b.maxX) - 1)
  const y = Math.max(0, Math.max(a.minY, b.minY) - Math.min(a.maxY, b.maxY) - 1)
  return Math.hypot(x, y)
}

function findMainFigureAnchor(pixels, imageWidth, startX, startY, width, height) {
  const threshold = 48
  const occupied = new Uint8Array(width * height)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[((startY + y) * imageWidth + startX + x) * 4 + 3]
      occupied[y * width + x] = alpha >= threshold ? 1 : 0
    }
  }

  const visited = new Uint8Array(occupied.length)
  let largest = null
  for (let index = 0; index < occupied.length; index += 1) {
    if (!occupied[index] || visited[index]) continue
    const component = traceComponent(occupied, visited, width, height, index)
    if (!largest || component.count > largest.count) largest = component
  }
  if (!largest) return null

  const torsoBottom = largest.minY + Math.max(1, Math.floor((largest.maxY - largest.minY + 1) * 0.72))
  let weightedX = 0
  let totalAlpha = 0
  for (let y = largest.minY; y <= torsoBottom; y += 1) {
    for (let x = largest.minX; x <= largest.maxX; x += 1) {
      if (!largest.members.has(y * width + x)) continue
      const alpha = pixels[((startY + y) * imageWidth + startX + x) * 4 + 3]
      weightedX += x * alpha
      totalAlpha += alpha
    }
  }

  return {
    x: startX + (totalAlpha ? weightedX / totalAlpha : (largest.minX + largest.maxX) / 2),
    y: startY + largest.maxY,
  }
}

function traceComponent(occupied, visited, width, height, firstIndex) {
  const stack = [firstIndex]
  const members = new Set()
  let count = 0
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0

  while (stack.length) {
    const index = stack.pop()
    if (visited[index] || !occupied[index]) continue
    visited[index] = 1
    members.add(index)
    count += 1
    const x = index % width
    const y = Math.floor(index / width)
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)

    if (x > 0) stack.push(index - 1)
    if (x + 1 < width) stack.push(index + 1)
    if (y > 0) stack.push(index - width)
    if (y + 1 < height) stack.push(index + width)
  }

  return { count, members, minX, minY, maxX, maxY }
}
