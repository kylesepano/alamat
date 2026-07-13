import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mapPath = path.join(root, 'frontend/public/data/maps/WLOC000001_barangay_san_isidro.json')
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'))

const tileLayer = (name) => {
  const layer = map.layers.find((candidate) => candidate.type === 'tilelayer' && candidate.name === name)
  if (!layer) throw new Error(`Missing tile layer: ${name}`)
  return layer
}

const objectLayer = (name) => {
  const layer = map.layers.find((candidate) => candidate.type === 'objectgroup' && candidate.name === name)
  if (!layer) throw new Error(`Missing object layer: ${name}`)
  return layer
}

const setTile = (layer, x, y, gid) => {
  layer.data[y * map.width + x] = gid
}

const pathLayer = tileLayer('Path')
const decorLayer = tileLayer('Decor')

// Remove the generated fence and well-surround fragments before rebuilding the court.
for (let y = 3; y <= 9; y += 1) {
  for (let x = 3; x <= 11; x += 1) {
    const decorGid = decorLayer.data[y * map.width + x]
    if ((decorGid >= 97 && decorGid <= 112) || (decorGid >= 145 && decorGid <= 155)) {
      setTile(decorLayer, x, y, 0)
    }

    const pathGid = pathLayer.data[y * map.width + x]
    if (pathGid >= 149 && pathGid <= 155) setTile(pathLayer, x, y, 0)
  }
}

// A compact 5x5 plaza: NW/NE/SW/SE corners, horizontal and vertical edges, center fill.
const plazaRows = [
  [52, 50, 50, 50, 53],
  [51, 49, 49, 49, 51],
  [51, 49, 49, 49, 51],
  [51, 49, 49, 49, 51],
  [54, 50, 50, 50, 55],
]

plazaRows.forEach((row, rowOffset) => {
  row.forEach((gid, columnOffset) => setTile(pathLayer, 5 + columnOffset, 4 + rowOffset, gid))
})

// The animated save-point SVG is the well; leave its center clear to avoid double-rendering it.
setTile(decorLayer, 7, 6, 0)

// U-shaped bamboo fence with connected corners and readable end posts; south stays open.
setTile(decorLayer, 4, 3, 99)
for (let x = 5; x <= 9; x += 1) setTile(decorLayer, x, 3, 97)
setTile(decorLayer, 10, 3, 100)
for (let y = 4; y <= 7; y += 1) {
  setTile(decorLayer, 4, y, 98)
  setTile(decorLayer, 10, y, 98)
}
setTile(decorLayer, 4, 8, 112)
setTile(decorLayer, 10, 8, 112)

const collision = objectLayer('Collision')
collision.objects = collision.objects.filter((object) => !object.name.startsWith('COL_BALON_'))

const properties = (kind) => [
  { name: 'collision_kind', type: 'string', value: kind },
  { name: 'blocks_player', type: 'bool', value: true },
  { name: 'blocks_companion', type: 'bool', value: true },
]

let nextId = Math.max(...map.layers.flatMap((layer) => layer.objects ?? []).map((object) => object.id ?? 0)) + 1
const rectangle = (name, x, y, width, height, kind) => ({
  id: nextId++,
  name,
  type: 'collision',
  x: x * map.tilewidth,
  y: y * map.tileheight,
  width: width * map.tilewidth,
  height: height * map.tileheight,
  rotation: 0,
  visible: true,
  properties: properties(kind),
})

collision.objects.push(
  rectangle('COL_BALON_FENCE_NORTH', 4, 3, 7, 1, 'bamboo_fence'),
  rectangle('COL_BALON_FENCE_WEST', 4, 4, 1, 5, 'bamboo_fence'),
  rectangle('COL_BALON_FENCE_EAST', 10, 4, 1, 5, 'bamboo_fence'),
  rectangle('COL_BALON_WELL', 7, 6, 1, 1, 'balon_well'),
)

map.nextobjectid = Math.max(map.nextobjectid ?? 1, nextId)
fs.writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`)

console.log('Refined San Isidro Balon courtyard tiles and collision.')
