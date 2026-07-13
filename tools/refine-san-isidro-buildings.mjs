import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mapPath = path.join(root, 'frontend/public/data/maps/WLOC000001_barangay_san_isidro.json')
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'))

const layer = (name, type) => {
  const result = map.layers.find((candidate) => candidate.name === name && candidate.type === type)
  if (!result) throw new Error(`Missing ${type} layer: ${name}`)
  return result
}

const upper = layer('Upper Decor', 'tilelayer')
const structures = layer('Structures', 'tilelayer')
const pathLayer = layer('Path', 'tilelayer')
const collision = layer('Collision', 'objectgroup')
const horizontalFlip = (gid) => gid + 0x80000000
const setTile = (target, x, y, gid) => { target.data[y * map.width + x] = gid }

const clearRect = (target, x, y, width, height) => {
  for (let row = y; row < y + height; row += 1) {
    for (let column = x; column < x + width; column += 1) setTile(target, column, row, 0)
  }
}

const setRow = (target, x, y, gids) => gids.forEach((gid, offset) => setTile(target, x + offset, y, gid))

// Home A: two roof courses, a readable facade, and a centered stair.
clearRect(upper, 3, 11, 4, 2)
clearRect(structures, 3, 13, 4, 2)
setRow(upper, 3, 11, [117, 113, 113, 118])
setRow(upper, 3, 12, [horizontalFlip(120), 119, 119, 120])
setRow(structures, 3, 13, [126, 125, 124, 126])
setRow(structures, 3, 14, [128, 128, 123, 128])
for (let x = 5; x <= 7; x += 1) setTile(pathLayer, x, 15, 17)

// Home B uses the same kit but remains a distinct building farther south.
clearRect(upper, 3, 16, 4, 2)
clearRect(structures, 3, 17, 4, 3)
setRow(upper, 3, 16, [117, 113, 113, 118])
setRow(upper, 3, 17, [horizontalFlip(120), 119, 119, 120])
setRow(structures, 3, 18, [126, 125, 124, 126])
setRow(structures, 3, 19, [128, 128, 123, 128])
for (let x = 5; x <= 6; x += 1) setTile(pathLayer, x, 20, 17)

// Barangay hall: one continuous roof silhouette instead of repeated standalone roof cells.
clearRect(upper, 27, 4, 9, 3)
clearRect(structures, 27, 7, 9, 2)
setRow(upper, 27, 4, [133, 129, 129, 129, 129, 129, 129, 129, 134])
setRow(upper, 27, 5, [132, 130, 131, 130, 131, 130, 131, 130, horizontalFlip(132)])
setRow(upper, 27, 6, [horizontalFlip(136), 135, 135, 135, 135, 135, 135, 135, 136])
setRow(structures, 27, 7, [143, 141, 142, 141, 140, 141, 142, 141, horizontalFlip(143)])
setRow(structures, 27, 8, [144, 137, 138, 137, 139, 137, 138, 137, 144])

// Match collision to the rebuilt footprints. Verandas and stairs remain traversable.
collision.objects = collision.objects.filter((object) => ![
  'COL_HALL_BASE_LEFT',
  'COL_HALL_BASE_RIGHT',
  'COL_HOME_B_ROOF_WALL',
  'COL_HOME_B_BASE_LEFT',
  'COL_HOME_B_BASE_RIGHT',
].includes(object.name))

const collisionProperties = (kind) => [
  { name: 'collision_kind', type: 'string', value: kind },
  { name: 'blocks_player', type: 'bool', value: true },
  { name: 'blocks_companion', type: 'bool', value: true },
]

let nextId = Math.max(...map.layers.flatMap((candidate) => candidate.objects ?? []).map((object) => object.id ?? 0)) + 1
const rectangle = (name, x, y, width, height, kind) => ({
  id: nextId++, name, type: 'collision',
  x: x * map.tilewidth, y: y * map.tileheight,
  width: width * map.tilewidth, height: height * map.tileheight,
  rotation: 0, visible: true,
  properties: collisionProperties(kind),
})

collision.objects.push(
  rectangle('COL_HOME_B_ROOF_WALL', 3, 16, 4, 3, 'nipa_house'),
  rectangle('COL_HOME_B_BASE_LEFT', 3, 19, 2, 1, 'nipa_house_foundation'),
  rectangle('COL_HOME_B_BASE_RIGHT', 6, 19, 1, 1, 'nipa_house_foundation'),
)

map.nextobjectid = Math.max(map.nextobjectid ?? 1, nextId)
fs.writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`)

console.log('Refined San Isidro homes, barangay hall, paths, and matching collision.')
