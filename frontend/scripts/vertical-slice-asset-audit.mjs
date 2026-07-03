import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { VERTICAL_SLICE_ASSETS } from '../src/game/data/verticalSliceAssets.js'

const publicRoot = join(process.cwd(), 'public')

function filePathFor(assetPath) {
  return join(publicRoot, assetPath.replace(/^\//, ''))
}

function pngSize(path) {
  if (!path.endsWith('.png')) return null
  const buffer = readFileSync(path)
  if (buffer.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') return null
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

const rows = VERTICAL_SLICE_ASSETS.map((asset) => {
  const absolute = filePathFor(asset.path)
  const exists = existsSync(absolute)
  const size = exists ? pngSize(absolute) : null
  const expected = asset.expectedWidth && asset.expectedHeight ? `${asset.expectedWidth}x${asset.expectedHeight}` : `${asset.width ?? '-'}x${asset.height ?? '-'}`
  const actual = size ? `${size.width}x${size.height}` : exists ? 'non-png or svg' : 'missing'
  const pngPreferred = asset.type === 'spritesheet' || asset.path.includes('/tilesets/') || asset.path.includes('/items/') || asset.path.includes('/equipment/') || asset.path.includes('/maps/')
  const extensionOk = !pngPreferred || asset.path.endsWith('.png')
  const sizeOk = !size || !asset.expectedWidth || (size.width === asset.expectedWidth && size.height === asset.expectedHeight)
  return {
    key: asset.key,
    file: asset.path,
    format: asset.path.split('.').at(-1),
    exists: exists ? 'yes' : 'no',
    expected,
    actual,
    status: exists && extensionOk && sizeOk ? 'ok' : exists && extensionOk ? 'review size' : exists ? 'review format' : 'missing',
  }
})

console.table(rows)

const failures = rows.filter((row) => row.status === 'missing')
if (failures.length > 0) {
  process.exitCode = 1
}
