# ALAMAT Map Production Prompts

This is the sole canonical source for tilesets, tile catalogs, map JSON, collision, transitions, map previews, location battle backgrounds, animated battle-environment overlays, and placeable map-object assets. Other asset families are indexed in `docs/asset-prompts/README.md`.

## General ChatGPT Map Rule

Paste this rule first in a new ChatGPT conversation, then use one map stage prompt from the relevant location packet below.

```text
Create production map assets for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and traditions. Follow the supplied map ID, gameplay identity, coordinate blueprint, route graph, file manifest, dimensions, tile catalog, prefab contract, object positions, and collision rules exactly. Do not redesign routes, move transitions, invent diagonal movement, bake characters or markers into terrain, or infer collision from decorative art.

Use detailed semi-realistic hand-painted orthogonal top-down 2D art with grounded scale, readable paths, tactile regional materials, humid atmosphere, deep shadow, and restrained color. Avoid chibi decoration, generic medieval-European architecture, cultural mashups, real sacred-symbol copying, text, labels, logos, UI, characters, NPCs, Nilalang, quest markers, visible grids, gutters, and tile seams unless a specific technical stage explicitly requests guides.

Generate only the requested stage and preserve its exact filename, dimensions, grid, layer order, tile IDs, paths, and output format. Tilesets, tile catalogs, compiled Tiled JSON, collision, previews, battle backgrounds, animated overlays, and placeable objects are separate deliverables. Never replace structured JSON or collision with an approximate painted map.
```

## Global Production Contract

- Gameplay uses a strict orthogonal `48x48` grid and four-direction movement.
- Every map packet is ordered: gameplay details, coordinate blueprint, route graph, object placement, collision, tileset, tile catalog, compiled JSON, preview, battle background, overlay, and map objects.
- Every map declares `width`, `height`, `pixel_width = width * 48`, and `pixel_height = height * 48`. Tile layers, collision, camera bounds, and objects use those exact dimensions.
- Every transition sits on an outermost edge tile inside a perimeter-collision aperture. Its destination is one or two safe tiles inside the opposite edge.
- Characters, Nilalang, items, save points, transitions, encounter markers, and quest objects belong in object layers, never baked into tilesets.
- Visual tiles and collision remain independent. Collision comes from the approved blueprint and prefab contract, not from a preview image.
- Use embedded tilesets only. External TSX or TSJ references are unsupported.
- Complete houses, huts, halls, trees, wells, gates, stalls, boats, and landmarks use cataloged multi-tile prefabs with exact matrices and relative collision.

## Shared Normalization Workflow

Use this workflow for every location:

1. Generate one `1254x1254` source PNG arranged as a visually strict `15x15` atlas.
2. Preserve the source in `frontend/public/assets/vertical-slice/tilesets/source/`.
3. Partition the complete source canvas into a proportional `15x15` grid; source cells alternate between 83 and 84 pixels because 1254 is not evenly divisible by 15.
4. Normalize each source cell independently into an exact `48x48` destination cell, producing a `720x720` runtime atlas without cross-cell sampling.
5. Catalog all 225 normalized cells and complete prefab matrices.
6. Compile Tiled JSON from the approved blueprint and catalog.
7. Validate dimensions, layer lengths, collision, transitions, reachability, and companion clearance.
8. Generate preview and battle-environment assets only after the playable JSON is approved.

Never catalog the original `1254x1254` image. Catalog only the normalized `720x720` runtime PNG.

## Shared Battle Environment Standard

- Static background: exact `1280x720` PNG, no actors, UI, text, items, or effects; keep lower actor lanes readable.
- Animated overlay: transparent `1280x720` SVG using inline SMIL only; no raster embeds, JavaScript, external CSS, text, or large opaque shapes.
- Keep animation subtle: mist, water shimmer, leaf drift, smoke, light motes, or fireflies appropriate to the location.

## Shared Placeable Map Object Standard

- Exact `96x96` transparent PNG unless an individual prompt specifies another size.
- Top-down or top-down three-quarter object with a lower-middle interaction footprint and at least 16 pixels transparent padding.
- No painted ground tile, collision guide, interaction ring, quest marker, text, UI, checkerboard, or background.
- Register collision and interaction geometry in map JSON object layers, never in the image.


## WLOC000001 Barangay San Isidro

### Gameplay Identity

- Role: Opening village, tutorial hub, safe zone, and first recurring home base
- Grid: `40x30`
- World size: `1920x1440`
- Tile size: `48x48`
- Movement: four-direction only
- Safe zone: yes
- Random encounters: none
- Primary landmarks: Balon grove, two nipa homes, barangay hall, village plaza, medicinal garden, rice fields, marketplace gate
- Required objects: player spawn, Balon Deepwell, Datu Magsalin, Lira Lakandula, Healing Herb, Marketplace transition

### File Manifest

| Stage | Path |
| --- | --- |
| Original source tileset | `frontend/public/assets/vertical-slice/tilesets/source/tileset_barangay_san_isidro_1254.png` |
| Normalized runtime tileset | `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.png` |
| Tile catalog | `frontend/public/data/maps/tile-catalogs/WLOC000001_barangay_san_isidro_tile_catalog.json` |
| Compiled Tiled JSON | `frontend/public/data/maps/WLOC000001_barangay_san_isidro.json` |
| Map preview | `frontend/public/assets/vertical-slice/maps/preview_barangay_san_isidro.png` |

### Coordinate Blueprint

Coordinates are zero-based tile coordinates. Rectangles use `x,y,width,height`.

| Zone | Bounds | Purpose |
| --- | --- | --- |
| Outer boundary | `0,0,40,30` | Vegetation and fences with only the east marketplace opening |
| Balon grove | `3,3,9,7` | Sheltered save-point pocket with an open south approach |
| Northwest homes | `3,11,10,9` | Two complete nipa-house prefabs and residential lane |
| Barangay hall grounds | `26,3,11,9` | Hall prefab, veranda, forecourt, notice area, and Datu |
| Central plaza | `15,12,11,8` | Open orientation landmark and route junction |
| Medicinal garden | `28,13,9,9` | Lira, Healing Herb, garden beds, and side pocket |
| Rice-field district | `3,21,13,7` | Paddy blocks separated by dikes and harvest paths |
| South arrival commons | `17,22,10,6` | Uncluttered player arrival and tutorial movement area |
| Marketplace gate | `34,23,6,6` | Bent approach extending to the east perimeter |

### Orthogonal Route Graph

Every rectangle below is walkable. Intersections intentionally overlap.

| Route | Walkable cells | Connection |
| --- | --- | --- |
| South arrival road | `19,20,4,9` | Spawn to central plaza |
| Plaza horizontal lane | `13,16,16,4` | Residential and garden branches |
| Plaza northern lane | `18,10,4,6` | Plaza to Balon and hall |
| Balon south branch | `8,8,3,8` | Balon to plaza west |
| Balon east connector | `10,8,10,3` | Balon to northern lane |
| Hall approach | `21,9,9,3` | Northern lane to hall |
| Hall forecourt | `27,9,8,4` | Datu interaction area |
| Residential loop | `10,15,4,8` | Homes to rice-field branch |
| Rice north lane | `7,19,7,3` | Homes to harvest paths |
| Rice return lane | `14,21,4,6` | Rice fields to arrival commons |
| Garden entrance | `28,14,4,4` | Plaza to garden |
| Garden return | `33,18,3,6` | Garden to marketplace approach |
| Marketplace approach | `27,22,9,3` | Arrival commons to gate bend |
| Marketplace gate lane | `34,23,6,6` | Bent route to east-edge trigger |

Required loops:

1. Balon -> northern lane -> plaza -> residential lane -> Balon.
2. Plaza -> garden -> marketplace approach -> arrival commons -> plaza.
3. Plaza -> homes -> rice fields -> arrival commons -> plaza.

### Landmark And Object Placement

| Stable ID | Object | Tile position | Placement rule |
| --- | --- | --- | --- |
| PLAYER_SPAWN | Player spawn | `21,25` | Open arrival commons |
| SAVE_START | Balon Deepwell | `7,6` | Respawn at 7,7, south of well collision |
| NPC000001 | Datu Magsalin | `30,10` | Hall forecourt |
| NPC000002 | Lira Lakandula | `30,17` | Garden entrance |
| ITM000001 | Healing Herb | `34,20` | Reachable garden side pocket |
| TO_MARKET | Marketplace transition | `39,27` | East edge; aperture y 26-28; target WLOC000002 west interior |

### Collision Contract

- Actual bounds are exactly `40x30` tiles and `1920x1440` pixels. Reject out-of-bounds collision.
- Block the perimeter except the explicit edge-transition apertures listed above.
- Every collision object requires `collision_kind`, `blocks_player`, and `blocks_companion`.
- Block complete house and hall solid footprints, but keep stairs and veranda interaction cells open
- Block fenced beds, deep paddy water, mature tree trunks, jars, storage piles, and solid fence segments
- Keep doors, gate lanes, dikes, all route rectangles, and a two-tile companion corridor open
- The marketplace gate roof is walk-under; only posts collide

### Tileset Prompt

- Source upload: `frontend/public/assets/vertical-slice/tilesets/source/tileset_barangay_san_isidro_1254.png`
- Normalized output: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.png`
- Source: `1254x1254`, visually strict `15x15`
- Runtime: exact `720x720`, `225` cells, each `48x48`

```text
Create one production-quality orthogonal top-down 2D tileset for Barangay San Isidro in ALAMAT, a respectful fictional Filipino fantasy RPG. Output one square PNG at exactly 1254x1254 pixels, arranged as a strict visual 15 columns x 15 rows atlas with 225 edge-to-edge cells. The source will be partitioned proportionally and each conceptual cell normalized independently into a 720x720 runtime atlas with exact 48x48 cells. Do not add gutters, grid lines, labels, coordinates, text, logo, UI, characters, NPCs, Nilalang, quest markers, or a baked complete map.

Use a readable top-down classic handheld RPG perspective, stable lighting, consistent scale, and location-specific material language. Required visual families: warm tropical grass and soil, packed-earth roads, plaza stone, rice-paddy and garden families, connected bamboo fences, village props, nipa structures, hall materials, Balon paving, tropical vegetation. Routes support four-direction movement only, so all connected terrain requires horizontal, vertical, 90-degree corners, T-junctions, intersections, and end-caps where applicable.

Reserve contiguous rectangular atlas regions for these complete assembled prefabs: 4x4 compact nipa home; 4x4 alternate nipa hut; 4x4 mature tropical shade tree; 2x4 Balon deep well; 9x5 barangay hall; 4x3 marketplace gate. A prefab must reconstruct as one polished object from its exact cell matrix. Do not fill prefab regions with independent samples, repeated standalone roof cells, disconnected walls, mismatched corners, or chopped tree canopies. Keep doors, stairs, interaction cells, walk-under lanes, and trunk footprints visually obvious. Walkable cells must read open; blocked cells must read solid.

Before generating, repeat the exact source filename, 1254x1254 size, 15x15 visual grid, and map ID WLOC000001. After generation, do not resize manually; use the repository normalization pipeline.
```

### Tile Catalog Prompt

- Attach: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.png`
- Save response: `frontend/public/data/maps/tile-catalogs/WLOC000001_barangay_san_isidro_tile_catalog.json`

```text
Inspect the attached normalized 720x720 Barangay San Isidro runtime tileset. It is a strict 15x15 grid of 225 exact 48x48 cells. Do not inspect the 1254x1254 source and do not redraw the image.

Return valid JSON cataloging every local tile ID 0 through 224. Each tile entry must contain local_id, global_id, row, column, semantic, terrain_group, variant, walkability, recommended_layer, prefab_id, prefab_local_x, and prefab_local_y. Global IDs use firstgid 1, so global_id = local_id + 1. Use null prefab fields for non-prefab cells.

Include a root prefabs array for these required assembled prefabs: 4x4 compact nipa home; 4x4 alternate nipa hut; 4x4 mature tropical shade tree; 2x4 Balon deep well; 9x5 barangay hall; 4x3 marketplace gate. Every prefab entry must contain prefab_id, name, origin_row, origin_column, width, height, exact global-ID tile_matrix, anchor_cell, recommended_layer, interaction_cells, and tile-relative collision_rects. Collision rectangles require x, y, width, height, and collision_kind. Keep doors, stairs, gate openings, walk-under lanes, shallow crossings, and interaction cells out of collision.

The root must contain map_id WLOC000001, tileset_file tileset_barangay_san_isidro.png, source_dimensions 720x720, columns 15, rows 15, tilewidth 48, tileheight 48, firstgid 1, tilecount 225, tiles, and prefabs. Return one JSON code block with no omitted IDs or prose inside it.
```

### Compiled Tiled JSON And Collision Prompt

- Attach normalized tileset: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.png`
- Attach tile catalog: `frontend/public/data/maps/tile-catalogs/WLOC000001_barangay_san_isidro_tile_catalog.json`
- Save response: `frontend/public/data/maps/WLOC000001_barangay_san_isidro.json`

```text
Create one complete Tiled 1.11 and Phaser 3 compatible orthogonal JSON map for WLOC000001 Barangay San Isidro. Use width 40, height 30, tilewidth 48, tileheight 48, pixel_width 1920, and pixel_height 1440. Every tile layer must be a flat uncompressed row-major array of exactly 1200 integers. Use 0 for empty. Do not use base64, compression, chunks, nested row arrays, image layers, or external TSX/TSJ sources.

Embed one tileset with firstgid 1, columns 15, tilecount 225, imagewidth 720, imageheight 720, spacing 0, margin 0, and image ../../assets/vertical-slice/tilesets/tileset_barangay_san_isidro.png. Use only IDs from the attached catalog. Stamp every complete structure by copying its prefab tile_matrix exactly; never stretch it or repeat center cells.

Create tile layers in this exact order: Ground, Ground Detail, Path, Path Detail, Structures, Decor, Upper Decor. Then create object layers in this exact order: Collision, Objects, Transitions, Encounters.

Required zones: Outer boundary=0,0,40,30; Balon grove=3,3,9,7; Northwest homes=3,11,10,9; Barangay hall grounds=26,3,11,9; Central plaza=15,12,11,8; Medicinal garden=28,13,9,9; Rice-field district=3,21,13,7; South arrival commons=17,22,10,6; Marketplace gate=34,23,6,6.
Required walkable route rectangles: South arrival road=19,20,4,9; Plaza horizontal lane=13,16,16,4; Plaza northern lane=18,10,4,6; Balon south branch=8,8,3,8; Balon east connector=10,8,10,3; Hall approach=21,9,9,3; Hall forecourt=27,9,8,4; Residential loop=10,15,4,8; Rice north lane=7,19,7,3; Rice return lane=14,21,4,6; Garden entrance=28,14,4,4; Garden return=33,18,3,6; Marketplace approach=27,22,9,3; Marketplace gate lane=34,23,6,6.
Required object placements: PLAYER_SPAWN Player spawn@21,25 (Open arrival commons); SAVE_START Balon Deepwell@7,6 (Respawn at 7,7, south of well collision); NPC000001 Datu Magsalin@30,10 (Hall forecourt); NPC000002 Lira Lakandula@30,17 (Garden entrance); ITM000001 Healing Herb@34,20 (Reachable garden side pocket); TO_MARKET Marketplace transition@39,27 (East edge; aperture y 26-28; target WLOC000002 west interior).

Author collision from the collision contract in this map packet and the prefab-relative collision rectangles. Use editable axis-aligned rectangles, aligned to the 48x48 grid wherever possible. Derive perimeter collision from the actual 1920x1440 pixel bounds. No rectangle may have x or y below 0, exceed pixel_width or pixel_height, cover a listed route, cover an interaction cell, or close a transition aperture. Every collision object requires stable id and name plus collision_kind, blocks_player, and blocks_companion properties.

Every transition trigger must occupy its listed outermost edge tile and include target_map_id, target_tile_x, target_tile_y, and entry_direction. Destination coordinates must be one or two walkable tiles inside the opposite edge and outside the destination return trigger.

Return the complete JSON in one code block with no comments, placeholders, abbreviations, or omitted arrays. Afterward provide a validation report confirming dimensions, all 1200-entry layer arrays, tile-ID range, prefab matrices, collision bounds, perimeter apertures, transition safety, route-loop connectivity, object reachability, and companion clearance.
```

### Map Preview Prompt

- Replace file: `frontend/public/assets/vertical-slice/maps/preview_barangay_san_isidro.png`
- Exact size: `1920x1440`

```text
Create an orthographic top-down preview of the approved WLOC000001 Barangay San Isidro tilemap, exactly 1920x1440 pixels, representing 40x30 cells at 48x48 scale. Preserve the approved coordinate blueprint, orthogonal route graph, edge-transition positions, prefab footprints, and collision-readable openings. Show branching village paths, two complete homes, barangay hall, rice fields, garden, Balon grove, plaza, and east marketplace gate. Do not redesign the layout or add diagonal movement routes. No labels, text, UI, characters, NPCs, Nilalang, quest markers, collision guides, or visible grid. This is reference art after JSON approval, never a collision source.
```

### battle_background_barangay

- Type: `battle_background`
- Source map: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_encounter.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a Barangay San Isidro opening-village battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable lower battle floor. Warm tropical village edge: packed earth, soft grass, woven fence hints, nipa-style roof silhouettes in the distance, gentle late-afternoon light. Respectful fictional Philippine fantasy tone, clean readable shapes, moderate contrast so chibi sprites and VFX stand out.
```

### battle_background_overlay_barangay

- Type: `battle_background_overlay`
- Source map: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_encounter_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Barangay San Isidro battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add gentle late-afternoon dust motes, soft leaf drift near the edges, and faint warm light shimmer close to the ground. Keep the center and lower battle floor readable for chibi battle sprites. Use respectful fictional Filipino fantasy village atmosphere. The overlay must be subtle and transparent, designed to sit over a painted PNG battle background.
```

## WLOC000002 Barangay Marketplace

### Gameplay Identity

- Role: Safe preparation hub for shopping, equipment, crafting, and route choice
- Grid: `38x28`
- World size: `1824x1344`
- Tile size: `48x48`
- Movement: four-direction only
- Safe zone: yes
- Random encounters: none
- Primary landmarks: general store, blacksmith forge, produce stalls, central arcade, storage pocket, barangay road, chapel gate
- Required objects: player spawn, General Store, Blacksmith, Barangay transition, Chapel Courtyard transition

### File Manifest

| Stage | Path |
| --- | --- |
| Original source tileset | `frontend/public/assets/vertical-slice/tilesets/source/tileset_barangay_marketplace_1254.png` |
| Normalized runtime tileset | `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_marketplace.png` |
| Tile catalog | `frontend/public/data/maps/tile-catalogs/WLOC000002_barangay_marketplace_tile_catalog.json` |
| Compiled Tiled JSON | `frontend/public/data/maps/WLOC000002_barangay_marketplace.json` |
| Map preview | `frontend/public/assets/vertical-slice/maps/preview_barangay_marketplace.png` |

### Coordinate Blueprint

Coordinates are zero-based tile coordinates. Rectangles use `x,y,width,height`.

| Zone | Bounds | Purpose |
| --- | --- | --- |
| Outer boundary | `0,0,38,28` | Stall backs, fences, and buildings with two transition apertures |
| West arrival | `1,18,7,7` | Barangay road arrival and orientation pocket |
| General store | `4,4,10,8` | Complete store prefab and customer apron |
| Central arcade | `8,8,17,12` | Looping market aisles and stall rows |
| Blacksmith forge | `25,4,10,9` | Complete forge prefab and safe work forecourt |
| Produce aisles | `9,20,15,6` | Lower market stalls and side route |
| Storage pocket | `27,17,8,8` | Crates, sacks, and optional inspectable corner |
| Chapel gate | `25,1,9,5` | North-edge threshold reached after a turn |

### Orthogonal Route Graph

Every rectangle below is walkable. Intersections intentionally overlap.

| Route | Walkable cells | Connection |
| --- | --- | --- |
| Barangay entry | `0,21,9,3` | West edge to market loop |
| West aisle | `7,15,4,8` | Entry to north and south aisles |
| Market loop north | `8,8,19,3` | Store to forge |
| Market loop east | `24,8,4,12` | Forge to lower aisle |
| Market loop south | `9,18,18,3` | Lower aisle to west entry |
| Store spur | `4,10,7,3` | Loop to General Store |
| Forge spur | `26,10,8,3` | Loop to Blacksmith |
| Chapel approach | `27,0,5,9` | Offset north-edge exit |
| Storage bend | `27,17,7,3` | Optional storage pocket |

Required loops:

1. West entry -> store -> north arcade -> south arcade -> west entry.
2. North arcade -> forge -> storage bend -> south arcade -> north arcade.

### Landmark And Object Placement

| Stable ID | Object | Tile position | Placement rule |
| --- | --- | --- | --- |
| PLAYER_SPAWN | Player spawn | `2,22` | One tile inside west entry |
| TO_BARANGAY | Barangay transition | `0,22` | West edge; aperture y 21-23; target WLOC000001 east interior |
| NPC000301 | General Store | `9,12` | Store customer apron |
| NPC000481 | Blacksmith | `29,12` | Forge forecourt |
| TO_CHAPEL | Chapel transition | `29,0` | North edge; aperture x 28-30; target WLOC000003 south interior |

### Collision Contract

- Actual bounds are exactly `38x28` tiles and `1824x1344` pixels. Reject out-of-bounds collision.
- Block the perimeter except the explicit edge-transition apertures listed above.
- Every collision object requires `collision_kind`, `blocks_player`, and `blocks_companion`.
- Block stall bodies, counters, forge equipment, furnaces, tables, crate stacks, and solid barriers
- Keep customer aprons, crafting interaction cells, aisle loops, and both transition apertures open
- Use walk-under awnings only when their supports have separate collision

### Tileset Prompt

- Source upload: `frontend/public/assets/vertical-slice/tilesets/source/tileset_barangay_marketplace_1254.png`
- Normalized output: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_marketplace.png`
- Source: `1254x1254`, visually strict `15x15`
- Runtime: exact `720x720`, `225` cells, each `48x48`

```text
Create one production-quality orthogonal top-down 2D tileset for Barangay Marketplace in ALAMAT, a respectful fictional Filipino fantasy RPG. Output one square PNG at exactly 1254x1254 pixels, arranged as a strict visual 15 columns x 15 rows atlas with 225 edge-to-edge cells. The source will be partitioned proportionally and each conceptual cell normalized independently into a 720x720 runtime atlas with exact 48x48 cells. Do not add gutters, grid lines, labels, coordinates, text, logo, UI, characters, NPCs, Nilalang, quest markers, or a baked complete map.

Use a readable top-down classic handheld RPG perspective, stable lighting, consistent scale, and location-specific material language. Required visual families: packed-earth market ground, worn paths, stall floors, woven awnings, counters, forge floor, furnace and anvil pieces, crates, barrels, sacks, display racks, ropes, fences, and quiet market details. Routes support four-direction movement only, so all connected terrain requires horizontal, vertical, 90-degree corners, T-junctions, intersections, and end-caps where applicable.

Reserve contiguous rectangular atlas regions for these complete assembled prefabs: 5x4 general-store stall; 5x4 blacksmith forge; 4x3 produce stall; 4x4 shade tree; 4x3 chapel gate. A prefab must reconstruct as one polished object from its exact cell matrix. Do not fill prefab regions with independent samples, repeated standalone roof cells, disconnected walls, mismatched corners, or chopped tree canopies. Keep doors, stairs, interaction cells, walk-under lanes, and trunk footprints visually obvious. Walkable cells must read open; blocked cells must read solid.

Before generating, repeat the exact source filename, 1254x1254 size, 15x15 visual grid, and map ID WLOC000002. After generation, do not resize manually; use the repository normalization pipeline.
```

### Tile Catalog Prompt

- Attach: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_marketplace.png`
- Save response: `frontend/public/data/maps/tile-catalogs/WLOC000002_barangay_marketplace_tile_catalog.json`

```text
Inspect the attached normalized 720x720 Barangay Marketplace runtime tileset. It is a strict 15x15 grid of 225 exact 48x48 cells. Do not inspect the 1254x1254 source and do not redraw the image.

Return valid JSON cataloging every local tile ID 0 through 224. Each tile entry must contain local_id, global_id, row, column, semantic, terrain_group, variant, walkability, recommended_layer, prefab_id, prefab_local_x, and prefab_local_y. Global IDs use firstgid 1, so global_id = local_id + 1. Use null prefab fields for non-prefab cells.

Include a root prefabs array for these required assembled prefabs: 5x4 general-store stall; 5x4 blacksmith forge; 4x3 produce stall; 4x4 shade tree; 4x3 chapel gate. Every prefab entry must contain prefab_id, name, origin_row, origin_column, width, height, exact global-ID tile_matrix, anchor_cell, recommended_layer, interaction_cells, and tile-relative collision_rects. Collision rectangles require x, y, width, height, and collision_kind. Keep doors, stairs, gate openings, walk-under lanes, shallow crossings, and interaction cells out of collision.

The root must contain map_id WLOC000002, tileset_file tileset_barangay_marketplace.png, source_dimensions 720x720, columns 15, rows 15, tilewidth 48, tileheight 48, firstgid 1, tilecount 225, tiles, and prefabs. Return one JSON code block with no omitted IDs or prose inside it.
```

### Compiled Tiled JSON And Collision Prompt

- Attach normalized tileset: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_marketplace.png`
- Attach tile catalog: `frontend/public/data/maps/tile-catalogs/WLOC000002_barangay_marketplace_tile_catalog.json`
- Save response: `frontend/public/data/maps/WLOC000002_barangay_marketplace.json`

```text
Create one complete Tiled 1.11 and Phaser 3 compatible orthogonal JSON map for WLOC000002 Barangay Marketplace. Use width 38, height 28, tilewidth 48, tileheight 48, pixel_width 1824, and pixel_height 1344. Every tile layer must be a flat uncompressed row-major array of exactly 1064 integers. Use 0 for empty. Do not use base64, compression, chunks, nested row arrays, image layers, or external TSX/TSJ sources.

Embed one tileset with firstgid 1, columns 15, tilecount 225, imagewidth 720, imageheight 720, spacing 0, margin 0, and image ../../assets/vertical-slice/tilesets/tileset_barangay_marketplace.png. Use only IDs from the attached catalog. Stamp every complete structure by copying its prefab tile_matrix exactly; never stretch it or repeat center cells.

Create tile layers in this exact order: Ground, Ground Detail, Path, Path Detail, Structures, Decor, Upper Decor. Then create object layers in this exact order: Collision, Objects, Transitions, Encounters.

Required zones: Outer boundary=0,0,38,28; West arrival=1,18,7,7; General store=4,4,10,8; Central arcade=8,8,17,12; Blacksmith forge=25,4,10,9; Produce aisles=9,20,15,6; Storage pocket=27,17,8,8; Chapel gate=25,1,9,5.
Required walkable route rectangles: Barangay entry=0,21,9,3; West aisle=7,15,4,8; Market loop north=8,8,19,3; Market loop east=24,8,4,12; Market loop south=9,18,18,3; Store spur=4,10,7,3; Forge spur=26,10,8,3; Chapel approach=27,0,5,9; Storage bend=27,17,7,3.
Required object placements: PLAYER_SPAWN Player spawn@2,22 (One tile inside west entry); TO_BARANGAY Barangay transition@0,22 (West edge; aperture y 21-23; target WLOC000001 east interior); NPC000301 General Store@9,12 (Store customer apron); NPC000481 Blacksmith@29,12 (Forge forecourt); TO_CHAPEL Chapel transition@29,0 (North edge; aperture x 28-30; target WLOC000003 south interior).

Author collision from the collision contract in this map packet and the prefab-relative collision rectangles. Use editable axis-aligned rectangles, aligned to the 48x48 grid wherever possible. Derive perimeter collision from the actual 1824x1344 pixel bounds. No rectangle may have x or y below 0, exceed pixel_width or pixel_height, cover a listed route, cover an interaction cell, or close a transition aperture. Every collision object requires stable id and name plus collision_kind, blocks_player, and blocks_companion properties.

Every transition trigger must occupy its listed outermost edge tile and include target_map_id, target_tile_x, target_tile_y, and entry_direction. Destination coordinates must be one or two walkable tiles inside the opposite edge and outside the destination return trigger.

Return the complete JSON in one code block with no comments, placeholders, abbreviations, or omitted arrays. Afterward provide a validation report confirming dimensions, all 1064-entry layer arrays, tile-ID range, prefab matrices, collision bounds, perimeter apertures, transition safety, route-loop connectivity, object reachability, and companion clearance.
```

### Map Preview Prompt

- Replace file: `frontend/public/assets/vertical-slice/maps/preview_barangay_marketplace.png`
- Exact size: `1824x1344`

```text
Create an orthographic top-down preview of the approved WLOC000002 Barangay Marketplace tilemap, exactly 1824x1344 pixels, representing 38x28 cells at 48x48 scale. Preserve the approved coordinate blueprint, orthogonal route graph, edge-transition positions, prefab footprints, and collision-readable openings. Show branching marketplace aisles, complete store and forge, produce stalls, storage pocket, west barangay gate, and offset north chapel gate. Do not redesign the layout or add diagonal movement routes. No labels, text, UI, characters, NPCs, Nilalang, quest markers, collision guides, or visible grid. This is reference art after JSON approval, never a collision source.
```

### battle_background_marketplace

- Type: `battle_background`
- Source map: `WLOC000002`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_marketplace.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a Barangay San Isidro marketplace battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable lower packed-earth battle floor. Midground hints of woven awnings, forge smoke, baskets, crates, and market stalls, all softly pushed back so battle actors remain readable. Warm tropical village craft-market mood, respectful fictional Philippine fantasy tone, moderate contrast, no busy clutter in the combat floor.
```

### battle_background_overlay_marketplace

- Type: `battle_background_overlay`
- Source map: `WLOC000002`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_marketplace_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Barangay Marketplace battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add slow forge smoke wisps in the rear, tiny floating dust motes, and soft warm glints near market awnings. Keep the battle floor clear and avoid busy motion near actors. Respectful fictional Filipino fantasy market mood. The overlay must be transparent and designed to sit over a painted PNG background.
```

## WLOC000003 Chapel Courtyard

### Gameplay Identity

- Role: Safe cultural-context map connecting community traditions to the forest journey
- Grid: `38x28`
- World size: `1824x1344`
- Tile size: `48x48`
- Movement: four-direction only
- Safe zone: yes
- Random encounters: none
- Primary landmarks: central courtyard loop, community building, garden shelter, shared lamps, quiet pocket, forest threshold
- Required objects: player spawn, Mayumi Bagwis, Babaylan Lira Dalisay, Courtyard Garden, Shared Lamps, Marketplace transition, Balete Forest transition

### File Manifest

| Stage | Path |
| --- | --- |
| Original source tileset | `frontend/public/assets/vertical-slice/tilesets/source/tileset_chapel_courtyard_1254.png` |
| Normalized runtime tileset | `frontend/public/assets/vertical-slice/tilesets/tileset_chapel_courtyard.png` |
| Tile catalog | `frontend/public/data/maps/tile-catalogs/WLOC000003_chapel_courtyard_tile_catalog.json` |
| Compiled Tiled JSON | `frontend/public/data/maps/WLOC000003_chapel_courtyard.json` |
| Map preview | `frontend/public/assets/vertical-slice/maps/preview_chapel_courtyard.png` |

### Coordinate Blueprint

Coordinates are zero-based tile coordinates. Rectangles use `x,y,width,height`.

| Zone | Bounds | Purpose |
| --- | --- | --- |
| Outer boundary | `0,0,38,28` | Low walls, vegetation, and two edge openings |
| Marketplace arrival | `1,18,7,7` | West arrival pocket |
| Central courtyard | `11,8,17,13` | Open loop and conversation space |
| Community building | `14,2,10,7` | Complete respectful fictional courtyard structure |
| Garden pocket | `3,7,8,10` | Courtyard Garden quest object |
| Shared-lamp walk | `26,12,7,8` | Lamp object and reflective side route |
| Forest threshold | `32,5,6,8` | East-edge gate and approach |
| Quiet pocket | `5,20,9,6` | Optional lore and rest corner |

### Orthogonal Route Graph

Every rectangle below is walkable. Intersections intentionally overlap.

| Route | Walkable cells | Connection |
| --- | --- | --- |
| Marketplace entry | `0,20,12,3` | West edge to courtyard |
| Courtyard north | `10,7,19,3` | Upper loop |
| Courtyard east | `26,8,3,14` | Eastern loop |
| Courtyard south | `10,19,19,3` | Lower loop |
| Courtyard west | `10,8,3,14` | Western loop |
| Garden branch | `5,10,7,3` | Loop to garden |
| Quiet branch | `8,20,3,6` | Southwest optional pocket |
| Forest approach | `28,7,10,3` | Loop to east-edge threshold |

Required loops:

1. Marketplace entry -> courtyard ring -> garden -> courtyard ring.
2. Courtyard ring -> shared lamps -> quiet pocket -> courtyard ring.

### Landmark And Object Placement

| Stable ID | Object | Tile position | Placement rule |
| --- | --- | --- | --- |
| PLAYER_SPAWN | Player spawn | `2,21` | Inside west arrival |
| TO_MARKET | Marketplace transition | `0,21` | West edge; aperture y 20-22; target WLOC000002 east interior |
| NPC000004 | Mayumi Bagwis | `15,13` | Central courtyard |
| NPC000582 | Babaylan Lira Dalisay | `24,16` | Eastern court |
| AMBIENT_CHAPEL_GARDEN | Courtyard Garden | `7,12` | Garden branch, adjacent interaction cell |
| AMBIENT_CHAPEL_LAMPS | Shared Lamps | `29,17` | Lamp walk, outside collision |
| TO_FOREST | Balete Forest transition | `37,8` | East edge; aperture y 7-9; target WLOC000004 west interior |

### Collision Contract

- Actual bounds are exactly `38x28` tiles and `1824x1344` pixels. Reject out-of-bounds collision.
- Block the perimeter except the explicit edge-transition apertures listed above.
- Every collision object requires `collision_kind`, `blocks_player`, and `blocks_companion`.
- Block building walls, garden borders, low stone borders, benches, solid ornaments, and tree trunks
- Keep the courtyard ring, shared-lamp approach, garden interaction cell, and transition apertures open
- Use respectful fictional mixed influences and no real sacred symbol as collision decoration

### Tileset Prompt

- Source upload: `frontend/public/assets/vertical-slice/tilesets/source/tileset_chapel_courtyard_1254.png`
- Normalized output: `frontend/public/assets/vertical-slice/tilesets/tileset_chapel_courtyard.png`
- Source: `1254x1254`, visually strict `15x15`
- Runtime: exact `720x720`, `225` cells, each `48x48`

```text
Create one production-quality orthogonal top-down 2D tileset for Chapel Courtyard in ALAMAT, a respectful fictional Filipino fantasy RPG. Output one square PNG at exactly 1254x1254 pixels, arranged as a strict visual 15 columns x 15 rows atlas with 225 edge-to-edge cells. The source will be partitioned proportionally and each conceptual cell normalized independently into a 720x720 runtime atlas with exact 48x48 cells. Do not add gutters, grid lines, labels, coordinates, text, logo, UI, characters, NPCs, Nilalang, quest markers, or a baked complete map.

Use a readable top-down classic handheld RPG perspective, stable lighting, consistent scale, and location-specific material language. Required visual families: courtyard grass, connected stone paths, community-building roof and wall materials, garden beds, benches, flowers, low stone borders, woven banners, shared lamps, and quiet ornament tiles. Routes support four-direction movement only, so all connected terrain requires horizontal, vertical, 90-degree corners, T-junctions, intersections, and end-caps where applicable.

Reserve contiguous rectangular atlas regions for these complete assembled prefabs: 7x5 courtyard building; 4x3 shared garden shelter; 4x4 mature courtyard tree; 4x3 forest threshold gate. A prefab must reconstruct as one polished object from its exact cell matrix. Do not fill prefab regions with independent samples, repeated standalone roof cells, disconnected walls, mismatched corners, or chopped tree canopies. Keep doors, stairs, interaction cells, walk-under lanes, and trunk footprints visually obvious. Walkable cells must read open; blocked cells must read solid.

Before generating, repeat the exact source filename, 1254x1254 size, 15x15 visual grid, and map ID WLOC000003. After generation, do not resize manually; use the repository normalization pipeline.
```

### Tile Catalog Prompt

- Attach: `frontend/public/assets/vertical-slice/tilesets/tileset_chapel_courtyard.png`
- Save response: `frontend/public/data/maps/tile-catalogs/WLOC000003_chapel_courtyard_tile_catalog.json`

```text
Inspect the attached normalized 720x720 Chapel Courtyard runtime tileset. It is a strict 15x15 grid of 225 exact 48x48 cells. Do not inspect the 1254x1254 source and do not redraw the image.

Return valid JSON cataloging every local tile ID 0 through 224. Each tile entry must contain local_id, global_id, row, column, semantic, terrain_group, variant, walkability, recommended_layer, prefab_id, prefab_local_x, and prefab_local_y. Global IDs use firstgid 1, so global_id = local_id + 1. Use null prefab fields for non-prefab cells.

Include a root prefabs array for these required assembled prefabs: 7x5 courtyard building; 4x3 shared garden shelter; 4x4 mature courtyard tree; 4x3 forest threshold gate. Every prefab entry must contain prefab_id, name, origin_row, origin_column, width, height, exact global-ID tile_matrix, anchor_cell, recommended_layer, interaction_cells, and tile-relative collision_rects. Collision rectangles require x, y, width, height, and collision_kind. Keep doors, stairs, gate openings, walk-under lanes, shallow crossings, and interaction cells out of collision.

The root must contain map_id WLOC000003, tileset_file tileset_chapel_courtyard.png, source_dimensions 720x720, columns 15, rows 15, tilewidth 48, tileheight 48, firstgid 1, tilecount 225, tiles, and prefabs. Return one JSON code block with no omitted IDs or prose inside it.
```

### Compiled Tiled JSON And Collision Prompt

- Attach normalized tileset: `frontend/public/assets/vertical-slice/tilesets/tileset_chapel_courtyard.png`
- Attach tile catalog: `frontend/public/data/maps/tile-catalogs/WLOC000003_chapel_courtyard_tile_catalog.json`
- Save response: `frontend/public/data/maps/WLOC000003_chapel_courtyard.json`

```text
Create one complete Tiled 1.11 and Phaser 3 compatible orthogonal JSON map for WLOC000003 Chapel Courtyard. Use width 38, height 28, tilewidth 48, tileheight 48, pixel_width 1824, and pixel_height 1344. Every tile layer must be a flat uncompressed row-major array of exactly 1064 integers. Use 0 for empty. Do not use base64, compression, chunks, nested row arrays, image layers, or external TSX/TSJ sources.

Embed one tileset with firstgid 1, columns 15, tilecount 225, imagewidth 720, imageheight 720, spacing 0, margin 0, and image ../../assets/vertical-slice/tilesets/tileset_chapel_courtyard.png. Use only IDs from the attached catalog. Stamp every complete structure by copying its prefab tile_matrix exactly; never stretch it or repeat center cells.

Create tile layers in this exact order: Ground, Ground Detail, Path, Path Detail, Structures, Decor, Upper Decor. Then create object layers in this exact order: Collision, Objects, Transitions, Encounters.

Required zones: Outer boundary=0,0,38,28; Marketplace arrival=1,18,7,7; Central courtyard=11,8,17,13; Community building=14,2,10,7; Garden pocket=3,7,8,10; Shared-lamp walk=26,12,7,8; Forest threshold=32,5,6,8; Quiet pocket=5,20,9,6.
Required walkable route rectangles: Marketplace entry=0,20,12,3; Courtyard north=10,7,19,3; Courtyard east=26,8,3,14; Courtyard south=10,19,19,3; Courtyard west=10,8,3,14; Garden branch=5,10,7,3; Quiet branch=8,20,3,6; Forest approach=28,7,10,3.
Required object placements: PLAYER_SPAWN Player spawn@2,21 (Inside west arrival); TO_MARKET Marketplace transition@0,21 (West edge; aperture y 20-22; target WLOC000002 east interior); NPC000004 Mayumi Bagwis@15,13 (Central courtyard); NPC000582 Babaylan Lira Dalisay@24,16 (Eastern court); AMBIENT_CHAPEL_GARDEN Courtyard Garden@7,12 (Garden branch, adjacent interaction cell); AMBIENT_CHAPEL_LAMPS Shared Lamps@29,17 (Lamp walk, outside collision); TO_FOREST Balete Forest transition@37,8 (East edge; aperture y 7-9; target WLOC000004 west interior).

Author collision from the collision contract in this map packet and the prefab-relative collision rectangles. Use editable axis-aligned rectangles, aligned to the 48x48 grid wherever possible. Derive perimeter collision from the actual 1824x1344 pixel bounds. No rectangle may have x or y below 0, exceed pixel_width or pixel_height, cover a listed route, cover an interaction cell, or close a transition aperture. Every collision object requires stable id and name plus collision_kind, blocks_player, and blocks_companion properties.

Every transition trigger must occupy its listed outermost edge tile and include target_map_id, target_tile_x, target_tile_y, and entry_direction. Destination coordinates must be one or two walkable tiles inside the opposite edge and outside the destination return trigger.

Return the complete JSON in one code block with no comments, placeholders, abbreviations, or omitted arrays. Afterward provide a validation report confirming dimensions, all 1064-entry layer arrays, tile-ID range, prefab matrices, collision bounds, perimeter apertures, transition safety, route-loop connectivity, object reachability, and companion clearance.
```

### Map Preview Prompt

- Replace file: `frontend/public/assets/vertical-slice/maps/preview_chapel_courtyard.png`
- Exact size: `1824x1344`

```text
Create an orthographic top-down preview of the approved WLOC000003 Chapel Courtyard tilemap, exactly 1824x1344 pixels, representing 38x28 cells at 48x48 scale. Preserve the approved coordinate blueprint, orthogonal route graph, edge-transition positions, prefab footprints, and collision-readable openings. Show central courtyard loop, complete community building, side gardens, shared-lamp path, quiet pocket, west market entrance, and east forest threshold. Do not redesign the layout or add diagonal movement routes. No labels, text, UI, characters, NPCs, Nilalang, quest markers, collision guides, or visible grid. This is reference art after JSON approval, never a collision source.
```

### battle_background_chapel_courtyard

- Type: `battle_background`
- Source map: `WLOC000003`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_chapel_courtyard.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a respectful fictional chapel courtyard battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable stone-and-earth lower battle floor. Midground garden edges, courtyard stones, woven banners, and quiet community architecture inspired by mixed historical influences without declaring any real religion as absolute truth. Gentle daylight, clean silhouettes, moderate contrast, leave clear space for sprites and VFX.
```

### battle_background_overlay_chapel_courtyard

- Type: `battle_background_overlay`
- Source map: `WLOC000003`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_chapel_courtyard_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Chapel Courtyard battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add quiet floating pollen, barely moving woven banner hints at the far edges, and soft daylight motes. Keep the scene respectful and fictional, with mixed cultural influences but no real-world religious symbols. Keep the center and lower battle floor clear for sprites and VFX.
```

### Placeable Map Object Prompts

#### quest_object_courtyard_garden

- Type: `quest_map_object`
- Source: `AMBIENT_CHAPEL_GARDEN`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_courtyard_garden.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down chibi RPG map object for a courtyard garden needing gentle care: small native plants, windblown leaves, loose soil, and a subtle shared-space lamp detail. Respectful fictional Filipino fantasy style. No text, marker, character, checkerboard, or background.
```

#### quest_object_shared_lamps

- Type: `quest_map_object`
- Source: `AMBIENT_CHAPEL_LAMPS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_shared_lamps.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down chibi RPG map object showing two modest shared courtyard lamps with unlit wicks and woven/brass details. Culturally neutral common gathering-space object, no exclusive religious symbol, text, character, checkerboard, or background.
```

## WLOC000004 Balete Forest

### Gameplay Identity

- Role: First large danger zone, encounter tutorial, ecology showcase, and shrine approach
- Grid: `56x42`
- World size: `2688x2016`
- Tile size: `48x48`
- Movement: four-direction only
- Safe zone: no
- Random encounters: Duwende, Ungo, Aghoy plus map-appropriate random roster
- Primary landmarks: ancient Balete trees, root maze, firefly clearing, bamboo rise, hidden grove, shrine trail
- Required objects: player spawn, Chapel transition, Kidlat Balagtas, Duwende tracks, Ungo encounter, Aghoy rustle, Aghoy Leaf Tracks, Damaged Roots, Spirit Shrine transition, encounter regions

### File Manifest

| Stage | Path |
| --- | --- |
| Original source tileset | `frontend/public/assets/vertical-slice/tilesets/source/tileset_balete_forest_1254.png` |
| Normalized runtime tileset | `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.png` |
| Tile catalog | `frontend/public/data/maps/tile-catalogs/WLOC000004_balete_forest_tile_catalog.json` |
| Compiled Tiled JSON | `frontend/public/data/maps/WLOC000004_balete_forest.json` |
| Map preview | `frontend/public/assets/vertical-slice/maps/preview_balete_forest.png` |

### Coordinate Blueprint

Coordinates are zero-based tile coordinates. Rectangles use `x,y,width,height`.

| Zone | Bounds | Purpose |
| --- | --- | --- |
| Outer boundary | `0,0,56,42` | Dense forest boundary with west and north apertures |
| Chapel trail | `1,32,10,8` | Safe arrival and warning area |
| Lower forest | `8,25,17,14` | First encounter loop |
| Firefly clearing | `21,25,11,9` | Aghoy story clearing |
| Central Balete | `20,12,16,13` | Ancient tree landmark and route junction |
| Root maze | `3,8,15,18` | Orthogonal root corridors and hidden pockets |
| Bamboo rise | `38,13,13,20` | Narrow but two-tile-wide companion routes |
| Deep shrine approach | `39,1,14,12` | Escalating northern route |
| Hidden grove | `33,31,12,8` | Optional reward and lore pocket |

### Orthogonal Route Graph

Every rectangle below is walkable. Intersections intentionally overlap.

| Route | Walkable cells | Connection |
| --- | --- | --- |
| Chapel entry | `0,34,12,3` | West edge to lower loop |
| Lower loop | `9,30,18,4` | Arrival to clearing |
| West rise | `10,18,4,14` | Lower loop to root maze |
| Root crossing | `10,16,14,4` | Maze to central tree |
| Central south | `20,20,4,12` | Tree to lower loop |
| Central east | `23,14,18,4` | Tree to bamboo rise |
| Clearing loop | `23,24,12,4` | Aghoy clearing route |
| Bamboo descent | `39,15,4,18` | East loop |
| Deep north trail | `41,8,4,9` | Bamboo rise to shrine approach |
| Shrine threshold | `44,0,3,10` | North-edge exit |
| Hidden-grove branch | `31,31,12,3` | Optional side pocket |

Required loops:

1. Chapel trail -> lower loop -> clearing -> central Balete -> chapel trail.
2. Central Balete -> bamboo rise -> hidden grove -> clearing -> central Balete.
3. Root maze -> central Balete -> lower loop -> root maze.

### Landmark And Object Placement

| Stable ID | Object | Tile position | Placement rule |
| --- | --- | --- | --- |
| PLAYER_SPAWN | Player spawn | `2,35` | Inside chapel trail |
| TO_CHAPEL | Chapel transition | `0,35` | West edge; aperture y 34-36; target WLOC000003 east interior |
| NPC000008 | Kidlat Balagtas | `11,29` | Warning point before deeper routes |
| ENCOUNTER_DUWENDE | Duwende tracks | `15,20` | Root-maze branch |
| ENCOUNTER_UNGO | Ungo encounter | `25,17` | Central Balete route |
| ENCOUNTER_AGHOY | Aghoy rustle | `28,27` | Firefly clearing |
| AMBIENT_AGHOY_TRACKS | Aghoy Leaf Tracks | `34,33` | Hidden-grove approach |
| AMBIENT_DAMAGED_ROOTS | Damaged Roots | `39,25` | Bamboo-side route |
| TO_SHRINE | Spirit Shrine transition | `45,0` | North edge; aperture x 44-46; target WLOC000009 south interior |

### Collision Contract

- Actual bounds are exactly `56x42` tiles and `2688x2016` pixels. Reject out-of-bounds collision.
- Block the perimeter except the explicit edge-transition apertures listed above.
- Every collision object requires `collision_kind`, `blocks_player`, and `blocks_companion`.
- Block mature tree trunks, root walls, dense thickets, bamboo masses, large rocks, deep water, and cliff-like edges
- Canopies may be Upper Decor, but only visible trunk/root footprints collide
- Keep all route rectangles at least two tiles wide and preserve three separated encounter regions
- Quest objects and Nilalang markers require adjacent clear interaction cells

### Tileset Prompt

- Source upload: `frontend/public/assets/vertical-slice/tilesets/source/tileset_balete_forest_1254.png`
- Normalized output: `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.png`
- Source: `1254x1254`, visually strict `15x15`
- Runtime: exact `720x720`, `225` cells, each `48x48`

```text
Create one production-quality orthogonal top-down 2D tileset for Balete Forest in ALAMAT, a respectful fictional Filipino fantasy RPG. Output one square PNG at exactly 1254x1254 pixels, arranged as a strict visual 15 columns x 15 rows atlas with 225 edge-to-edge cells. The source will be partitioned proportionally and each conceptual cell normalized independently into a 720x720 runtime atlas with exact 48x48 cells. Do not add gutters, grid lines, labels, coordinates, text, logo, UI, characters, NPCs, Nilalang, quest markers, or a baked complete map.

Use a readable top-down classic handheld RPG perspective, stable lighting, consistent scale, and location-specific material language. Required visual families: moss and leaf floors, connected root paths, firefly clearing terrain, riverbank transitions, Balete root walls, bamboo barriers, rocks, shrubs, hidden-item overlays, and deep-forest details. Routes support four-direction movement only, so all connected terrain requires horizontal, vertical, 90-degree corners, T-junctions, intersections, and end-caps where applicable.

Reserve contiguous rectangular atlas regions for these complete assembled prefabs: 6x6 ancient Balete tree; 4x4 bamboo thicket; 3x3 rock-and-root formation; 4x3 shrine threshold. A prefab must reconstruct as one polished object from its exact cell matrix. Do not fill prefab regions with independent samples, repeated standalone roof cells, disconnected walls, mismatched corners, or chopped tree canopies. Keep doors, stairs, interaction cells, walk-under lanes, and trunk footprints visually obvious. Walkable cells must read open; blocked cells must read solid.

Before generating, repeat the exact source filename, 1254x1254 size, 15x15 visual grid, and map ID WLOC000004. After generation, do not resize manually; use the repository normalization pipeline.
```

### Tile Catalog Prompt

- Attach: `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.png`
- Save response: `frontend/public/data/maps/tile-catalogs/WLOC000004_balete_forest_tile_catalog.json`

```text
Inspect the attached normalized 720x720 Balete Forest runtime tileset. It is a strict 15x15 grid of 225 exact 48x48 cells. Do not inspect the 1254x1254 source and do not redraw the image.

Return valid JSON cataloging every local tile ID 0 through 224. Each tile entry must contain local_id, global_id, row, column, semantic, terrain_group, variant, walkability, recommended_layer, prefab_id, prefab_local_x, and prefab_local_y. Global IDs use firstgid 1, so global_id = local_id + 1. Use null prefab fields for non-prefab cells.

Include a root prefabs array for these required assembled prefabs: 6x6 ancient Balete tree; 4x4 bamboo thicket; 3x3 rock-and-root formation; 4x3 shrine threshold. Every prefab entry must contain prefab_id, name, origin_row, origin_column, width, height, exact global-ID tile_matrix, anchor_cell, recommended_layer, interaction_cells, and tile-relative collision_rects. Collision rectangles require x, y, width, height, and collision_kind. Keep doors, stairs, gate openings, walk-under lanes, shallow crossings, and interaction cells out of collision.

The root must contain map_id WLOC000004, tileset_file tileset_balete_forest.png, source_dimensions 720x720, columns 15, rows 15, tilewidth 48, tileheight 48, firstgid 1, tilecount 225, tiles, and prefabs. Return one JSON code block with no omitted IDs or prose inside it.
```

### Compiled Tiled JSON And Collision Prompt

- Attach normalized tileset: `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.png`
- Attach tile catalog: `frontend/public/data/maps/tile-catalogs/WLOC000004_balete_forest_tile_catalog.json`
- Save response: `frontend/public/data/maps/WLOC000004_balete_forest.json`

```text
Create one complete Tiled 1.11 and Phaser 3 compatible orthogonal JSON map for WLOC000004 Balete Forest. Use width 56, height 42, tilewidth 48, tileheight 48, pixel_width 2688, and pixel_height 2016. Every tile layer must be a flat uncompressed row-major array of exactly 2352 integers. Use 0 for empty. Do not use base64, compression, chunks, nested row arrays, image layers, or external TSX/TSJ sources.

Embed one tileset with firstgid 1, columns 15, tilecount 225, imagewidth 720, imageheight 720, spacing 0, margin 0, and image ../../assets/vertical-slice/tilesets/tileset_balete_forest.png. Use only IDs from the attached catalog. Stamp every complete structure by copying its prefab tile_matrix exactly; never stretch it or repeat center cells.

Create tile layers in this exact order: Ground, Ground Detail, Path, Path Detail, Structures, Decor, Upper Decor. Then create object layers in this exact order: Collision, Objects, Transitions, Encounters.

Required zones: Outer boundary=0,0,56,42; Chapel trail=1,32,10,8; Lower forest=8,25,17,14; Firefly clearing=21,25,11,9; Central Balete=20,12,16,13; Root maze=3,8,15,18; Bamboo rise=38,13,13,20; Deep shrine approach=39,1,14,12; Hidden grove=33,31,12,8.
Required walkable route rectangles: Chapel entry=0,34,12,3; Lower loop=9,30,18,4; West rise=10,18,4,14; Root crossing=10,16,14,4; Central south=20,20,4,12; Central east=23,14,18,4; Clearing loop=23,24,12,4; Bamboo descent=39,15,4,18; Deep north trail=41,8,4,9; Shrine threshold=44,0,3,10; Hidden-grove branch=31,31,12,3.
Required object placements: PLAYER_SPAWN Player spawn@2,35 (Inside chapel trail); TO_CHAPEL Chapel transition@0,35 (West edge; aperture y 34-36; target WLOC000003 east interior); NPC000008 Kidlat Balagtas@11,29 (Warning point before deeper routes); ENCOUNTER_DUWENDE Duwende tracks@15,20 (Root-maze branch); ENCOUNTER_UNGO Ungo encounter@25,17 (Central Balete route); ENCOUNTER_AGHOY Aghoy rustle@28,27 (Firefly clearing); AMBIENT_AGHOY_TRACKS Aghoy Leaf Tracks@34,33 (Hidden-grove approach); AMBIENT_DAMAGED_ROOTS Damaged Roots@39,25 (Bamboo-side route); TO_SHRINE Spirit Shrine transition@45,0 (North edge; aperture x 44-46; target WLOC000009 south interior).

Author collision from the collision contract in this map packet and the prefab-relative collision rectangles. Use editable axis-aligned rectangles, aligned to the 48x48 grid wherever possible. Derive perimeter collision from the actual 2688x2016 pixel bounds. No rectangle may have x or y below 0, exceed pixel_width or pixel_height, cover a listed route, cover an interaction cell, or close a transition aperture. Every collision object requires stable id and name plus collision_kind, blocks_player, and blocks_companion properties.

Every transition trigger must occupy its listed outermost edge tile and include target_map_id, target_tile_x, target_tile_y, and entry_direction. Destination coordinates must be one or two walkable tiles inside the opposite edge and outside the destination return trigger.

Return the complete JSON in one code block with no comments, placeholders, abbreviations, or omitted arrays. Afterward provide a validation report confirming dimensions, all 2352-entry layer arrays, tile-ID range, prefab matrices, collision bounds, perimeter apertures, transition safety, route-loop connectivity, object reachability, and companion clearance.
```

### Map Preview Prompt

- Replace file: `frontend/public/assets/vertical-slice/maps/preview_balete_forest.png`
- Exact size: `2688x2016`

```text
Create an orthographic top-down preview of the approved WLOC000004 Balete Forest tilemap, exactly 2688x2016 pixels, representing 56x42 cells at 48x48 scale. Preserve the approved coordinate blueprint, orthogonal route graph, edge-transition positions, prefab footprints, and collision-readable openings. Show large nested forest loops, root maze, ancient Balete landmark, bamboo rise, firefly clearing, hidden grove, west chapel entry, and north shrine threshold. Do not redesign the layout or add diagonal movement routes. No labels, text, UI, characters, NPCs, Nilalang, quest markers, collision guides, or visible grid. This is reference art after JSON approval, never a collision source.
```

### battle_background_balete_forest

- Type: `battle_background`
- Source map: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_balete_forest.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a Balete Forest battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable moss-and-root battle floor in the lower third. Large balete roots and layered forest silhouettes in the midground, firefly glimmers, dense leaves, humid green atmosphere, respectful fictional Philippine folklore inspiration. Keep contrast moderate and avoid hiding battle sprites.
```

### battle_background_overlay_balete_forest

- Type: `battle_background_overlay`
- Source map: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_balete_forest_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Balete Forest battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add drifting mist, tiny firefly glow pulses, faint leaf movement at the top edges, and a soft humid forest shimmer. Keep the center and lower battle floor readable and do not obscure actors. Respectful fictional Philippine folklore-inspired forest mood, not horror.
```

### Placeable Map Object Prompts

#### quest_object_aghoy_leaf_tracks

- Type: `quest_map_object`
- Source: `AMBIENT_AGHOY_TRACKS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_aghoy_leaf_tracks.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down forest quest object: a curved trail of tiny leaf-shaped Aghoy footprints carefully bending around a small earthen mound. Subtle, readable, gentle mystery, no creature, text, UI marker, checkerboard, or background.
```

#### quest_object_damaged_roots

- Type: `quest_map_object`
- Source: `AMBIENT_DAMAGED_ROOTS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_damaged_roots.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down forest quest object showing a healthy living root pinned beneath dead storm branches and litter, clearly repairable rather than destroyed. Green-brown forest palette, no character, text, marker, checkerboard, or background.
```

## WLOC000009 Spirit Shrine Threshold

### Gameplay Identity

- Role: Boss approach, first major confrontation, recovery point, and post-boss bonding context
- Grid: `44x34`
- World size: `2112x1632`
- Tile size: `48x48`
- Movement: four-direction only
- Safe zone: no; Balon pocket is locally safe
- Random encounters: Duwende and Aghoy outside the boss arena
- Primary landmarks: forest arrival, Shrine Balon, branching forecourt, spirit stones, Batibat arena, Umalagad side path, lakeshore descent
- Required objects: player spawn, Forest transition, Shrine Balon, Batibat presence, Umalagad Echo, Lakeshore transition

### File Manifest

| Stage | Path |
| --- | --- |
| Original source tileset | `frontend/public/assets/vertical-slice/tilesets/source/tileset_spirit_shrine_1254.png` |
| Normalized runtime tileset | `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.png` |
| Tile catalog | `frontend/public/data/maps/tile-catalogs/WLOC000009_spirit_shrine_tile_catalog.json` |
| Compiled Tiled JSON | `frontend/public/data/maps/WLOC000009_spirit_shrine.json` |
| Map preview | `frontend/public/assets/vertical-slice/maps/preview_spirit_shrine.png` |

### Coordinate Blueprint

Coordinates are zero-based tile coordinates. Rectangles use `x,y,width,height`.

| Zone | Bounds | Purpose |
| --- | --- | --- |
| Outer boundary | `0,0,44,34` | Root and stone boundary with two south openings |
| Forest arrival | `4,27,10,6` | Return route and orientation pocket |
| Balon pocket | `3,18,9,8` | Safe side recovery route |
| Lower forecourt | `14,22,16,9` | Main route junction |
| Boss arena | `15,7,18,13` | Large readable Batibat confrontation space |
| Spirit-stone pocket | `3,6,10,10` | Optional western lore route |
| Umalagad path | `34,10,8,11` | Separate post-boss side area |
| Lakeshore descent | `28,27,11,6` | Second south-edge transition route |

### Orthogonal Route Graph

Every rectangle below is walkable. Intersections intentionally overlap.

| Route | Walkable cells | Connection |
| --- | --- | --- |
| Forest gate | `7,27,3,7` | South edge to forecourt |
| Lower forecourt lane | `8,24,22,4` | Forest, Balon, arena, and lake junction |
| Balon spur | `6,20,8,3` | Forecourt to recovery pocket |
| Arena approach | `20,17,4,9` | Forecourt to boss ring |
| Arena north | `14,7,20,4` | Upper arena arc |
| Arena west | `14,8,4,12` | Western arena arc |
| Arena east | `30,8,4,12` | Eastern arena arc |
| Echo branch | `29,15,9,3` | Arena edge to Umalagad |
| Lakeshore branch | `27,26,9,4` | Forecourt to southern lake route |
| Lake gate | `33,27,3,7` | South-edge lake transition |

Required loops:

1. Forest arrival -> forecourt -> Balon -> forecourt.
2. Forecourt -> arena ring -> Umalagad branch -> forecourt.
3. Forecourt -> spirit-stone pocket -> arena west -> forecourt.

### Landmark And Object Placement

| Stable ID | Object | Tile position | Placement rule |
| --- | --- | --- | --- |
| PLAYER_SPAWN | Player spawn | `8,31` | Inside forest arrival |
| TO_FOREST | Balete Forest transition | `8,33` | South edge; aperture x 7-9; target WLOC000004 north interior |
| SAVE_SHRINE | Shrine Balon | `6,22` | Safe western side pocket |
| BOSS_MON0007 | Batibat presence | `24,12` | Boss-arena center with clear actor radius |
| NPC_MON0040 | Umalagad Echo | `37,16` | Separate eastern post-boss path |
| TO_LAKESHORE | Reedwater transition | `34,33` | South edge; aperture x 33-35; target WLOC000010 north interior |

### Collision Contract

- Actual bounds are exactly `44x34` tiles and `2112x1632` pixels. Reject out-of-bounds collision.
- Block the perimeter except the explicit edge-transition apertures listed above.
- Every collision object requires `collision_kind`, `blocks_player`, and `blocks_companion`.
- Block shrine walls, ancient root barriers, solid spirit stones, platform supports, cliffs, and large tree footprints
- Keep the entire boss actor lane and arena ring free of accidental collision
- Keep both south apertures separate and preserve Balon and Umalagad interaction cells
- Walk-under banners and roof elements belong to Upper Decor and do not create full-tile collision

### Tileset Prompt

- Source upload: `frontend/public/assets/vertical-slice/tilesets/source/tileset_spirit_shrine_1254.png`
- Normalized output: `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.png`
- Source: `1254x1254`, visually strict `15x15`
- Runtime: exact `720x720`, `225` cells, each `48x48`

```text
Create one production-quality orthogonal top-down 2D tileset for Spirit Shrine Threshold in ALAMAT, a respectful fictional Filipino fantasy RPG. Output one square PNG at exactly 1254x1254 pixels, arranged as a strict visual 15 columns x 15 rows atlas with 225 edge-to-edge cells. The source will be partitioned proportionally and each conceptual cell normalized independently into a 720x720 runtime atlas with exact 48x48 cells. Do not add gutters, grid lines, labels, coordinates, text, logo, UI, characters, NPCs, Nilalang, quest markers, or a baked complete map.

Use a readable top-down classic handheld RPG perspective, stable lighting, consistent scale, and location-specific material language. Required visual families: connected old-stone floors, shrine paths, mist and luminous-root floors, boss-arena surfaces, platform edges, fictional offering points, woven banners, spirit stones, root barriers, and quiet sacred-threshold details. Routes support four-direction movement only, so all connected terrain requires horizontal, vertical, 90-degree corners, T-junctions, intersections, and end-caps where applicable.

Reserve contiguous rectangular atlas regions for these complete assembled prefabs: 6x5 shrine-threshold structure; 5x5 luminous ancestral-root tree; 4x3 offering platform; 3x3 Shrine Balon; 4x3 spirit-stone gate. A prefab must reconstruct as one polished object from its exact cell matrix. Do not fill prefab regions with independent samples, repeated standalone roof cells, disconnected walls, mismatched corners, or chopped tree canopies. Keep doors, stairs, interaction cells, walk-under lanes, and trunk footprints visually obvious. Walkable cells must read open; blocked cells must read solid.

Before generating, repeat the exact source filename, 1254x1254 size, 15x15 visual grid, and map ID WLOC000009. After generation, do not resize manually; use the repository normalization pipeline.
```

### Tile Catalog Prompt

- Attach: `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.png`
- Save response: `frontend/public/data/maps/tile-catalogs/WLOC000009_spirit_shrine_tile_catalog.json`

```text
Inspect the attached normalized 720x720 Spirit Shrine Threshold runtime tileset. It is a strict 15x15 grid of 225 exact 48x48 cells. Do not inspect the 1254x1254 source and do not redraw the image.

Return valid JSON cataloging every local tile ID 0 through 224. Each tile entry must contain local_id, global_id, row, column, semantic, terrain_group, variant, walkability, recommended_layer, prefab_id, prefab_local_x, and prefab_local_y. Global IDs use firstgid 1, so global_id = local_id + 1. Use null prefab fields for non-prefab cells.

Include a root prefabs array for these required assembled prefabs: 6x5 shrine-threshold structure; 5x5 luminous ancestral-root tree; 4x3 offering platform; 3x3 Shrine Balon; 4x3 spirit-stone gate. Every prefab entry must contain prefab_id, name, origin_row, origin_column, width, height, exact global-ID tile_matrix, anchor_cell, recommended_layer, interaction_cells, and tile-relative collision_rects. Collision rectangles require x, y, width, height, and collision_kind. Keep doors, stairs, gate openings, walk-under lanes, shallow crossings, and interaction cells out of collision.

The root must contain map_id WLOC000009, tileset_file tileset_spirit_shrine.png, source_dimensions 720x720, columns 15, rows 15, tilewidth 48, tileheight 48, firstgid 1, tilecount 225, tiles, and prefabs. Return one JSON code block with no omitted IDs or prose inside it.
```

### Compiled Tiled JSON And Collision Prompt

- Attach normalized tileset: `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.png`
- Attach tile catalog: `frontend/public/data/maps/tile-catalogs/WLOC000009_spirit_shrine_tile_catalog.json`
- Save response: `frontend/public/data/maps/WLOC000009_spirit_shrine.json`

```text
Create one complete Tiled 1.11 and Phaser 3 compatible orthogonal JSON map for WLOC000009 Spirit Shrine Threshold. Use width 44, height 34, tilewidth 48, tileheight 48, pixel_width 2112, and pixel_height 1632. Every tile layer must be a flat uncompressed row-major array of exactly 1496 integers. Use 0 for empty. Do not use base64, compression, chunks, nested row arrays, image layers, or external TSX/TSJ sources.

Embed one tileset with firstgid 1, columns 15, tilecount 225, imagewidth 720, imageheight 720, spacing 0, margin 0, and image ../../assets/vertical-slice/tilesets/tileset_spirit_shrine.png. Use only IDs from the attached catalog. Stamp every complete structure by copying its prefab tile_matrix exactly; never stretch it or repeat center cells.

Create tile layers in this exact order: Ground, Ground Detail, Path, Path Detail, Structures, Decor, Upper Decor. Then create object layers in this exact order: Collision, Objects, Transitions, Encounters.

Required zones: Outer boundary=0,0,44,34; Forest arrival=4,27,10,6; Balon pocket=3,18,9,8; Lower forecourt=14,22,16,9; Boss arena=15,7,18,13; Spirit-stone pocket=3,6,10,10; Umalagad path=34,10,8,11; Lakeshore descent=28,27,11,6.
Required walkable route rectangles: Forest gate=7,27,3,7; Lower forecourt lane=8,24,22,4; Balon spur=6,20,8,3; Arena approach=20,17,4,9; Arena north=14,7,20,4; Arena west=14,8,4,12; Arena east=30,8,4,12; Echo branch=29,15,9,3; Lakeshore branch=27,26,9,4; Lake gate=33,27,3,7.
Required object placements: PLAYER_SPAWN Player spawn@8,31 (Inside forest arrival); TO_FOREST Balete Forest transition@8,33 (South edge; aperture x 7-9; target WLOC000004 north interior); SAVE_SHRINE Shrine Balon@6,22 (Safe western side pocket); BOSS_MON0007 Batibat presence@24,12 (Boss-arena center with clear actor radius); NPC_MON0040 Umalagad Echo@37,16 (Separate eastern post-boss path); TO_LAKESHORE Reedwater transition@34,33 (South edge; aperture x 33-35; target WLOC000010 north interior).

Author collision from the collision contract in this map packet and the prefab-relative collision rectangles. Use editable axis-aligned rectangles, aligned to the 48x48 grid wherever possible. Derive perimeter collision from the actual 2112x1632 pixel bounds. No rectangle may have x or y below 0, exceed pixel_width or pixel_height, cover a listed route, cover an interaction cell, or close a transition aperture. Every collision object requires stable id and name plus collision_kind, blocks_player, and blocks_companion properties.

Every transition trigger must occupy its listed outermost edge tile and include target_map_id, target_tile_x, target_tile_y, and entry_direction. Destination coordinates must be one or two walkable tiles inside the opposite edge and outside the destination return trigger.

Return the complete JSON in one code block with no comments, placeholders, abbreviations, or omitted arrays. Afterward provide a validation report confirming dimensions, all 1496-entry layer arrays, tile-ID range, prefab matrices, collision bounds, perimeter apertures, transition safety, route-loop connectivity, object reachability, and companion clearance.
```

### Map Preview Prompt

- Replace file: `frontend/public/assets/vertical-slice/maps/preview_spirit_shrine.png`
- Exact size: `2112x1632`

```text
Create an orthographic top-down preview of the approved WLOC000009 Spirit Shrine Threshold tilemap, exactly 2112x1632 pixels, representing 44x34 cells at 48x48 scale. Preserve the approved coordinate blueprint, orthogonal route graph, edge-transition positions, prefab footprints, and collision-readable openings. Show branching shrine approach, Balon side pocket, spirit-stone route, large boss arena, Umalagad path, forest return, and separate lakeshore descent. Do not redesign the layout or add diagonal movement routes. No labels, text, UI, characters, NPCs, Nilalang, quest markers, collision guides, or visible grid. This is reference art after JSON approval, never a collision source.
```

### battle_background_spirit_shrine

- Type: `battle_background`
- Source map: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_spirit_shrine.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a fictional Spirit Shrine Threshold battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable old stone-and-root battle floor in the lower third. Luminous roots, mist, woven banners, old stones, subtle blue-gold spiritual glow, respectful fantasy tone without portraying any real religion as absolute truth. Keep the boss arena readable and leave space for large enemy sprites.
```

### battle_background_overlay_spirit_shrine

- Type: `battle_background_overlay`
- Source map: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_spirit_shrine_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Spirit Shrine Threshold battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add slow blue-gold spirit motes, faint root glow pulses, and thin drifting mist. Keep all motion gentle and avoid real-world religious symbols. Leave the center and lower battle floor clear for large boss sprites, HP bars, and skill VFX. The overlay must be transparent and designed to sit over a painted PNG battle background.
```

## WLOC000010 Laguna Reedwater Shore

### Gameplay Identity

- Role: Freshwater expansion region, ecology side-quest hub, and broader Nilalang encounter space
- Grid: `48x36`
- World size: `2304x1728`
- Tile size: `48x48`
- Movement: four-direction only
- Safe zone: mixed; Balon and settlement pockets are safe
- Random encounters: Mambubuno, Kataw, distant Sirena, and freshwater-appropriate roster
- Primary landmarks: Reedwater Balon, steward commons, reed nursery, fishing jetty, moon pool, river inlet, mangrove pocket, shrine trail
- Required objects: player spawn, Shrine transition, Reedwater Balon, Ka Amihan Luntian, Aling Sela Dahon, Mang Isko Bangkero, Tangled Nets, Reed Nursery, Clear Water Patch, freshwater encounters

### File Manifest

| Stage | Path |
| --- | --- |
| Original source tileset | `frontend/public/assets/vertical-slice/tilesets/source/tileset_laguna_lakeshore_1254.png` |
| Normalized runtime tileset | `frontend/public/assets/vertical-slice/tilesets/tileset_laguna_lakeshore.png` |
| Tile catalog | `frontend/public/data/maps/tile-catalogs/WLOC000010_laguna_lakeshore_tile_catalog.json` |
| Compiled Tiled JSON | `frontend/public/data/maps/WLOC000010_laguna_lakeshore.json` |
| Map preview | `frontend/public/assets/vertical-slice/maps/preview_laguna_lakeshore.png` |

### Coordinate Blueprint

Coordinates are zero-based tile coordinates. Rectangles use `x,y,width,height`.

| Zone | Bounds | Purpose |
| --- | --- | --- |
| Outer boundary | `0,0,48,36` | Deep water, reeds, and terrain edge with north shrine opening |
| Shrine arrival | `34,1,8,7` | Protected north arrival trail |
| Balon pocket | `5,5,9,8` | Safe recovery point |
| Steward commons | `14,5,12,9` | Ka Amihan and orientation hub |
| Village shore | `11,14,15,9` | Shared paths and herbalist route |
| Reed nursery | `3,18,11,10` | Restoration side quest |
| Fishing jetty | `31,16,13,10` | Mang Isko, boat, and net problem |
| Moon pool | `19,23,10,9` | Kataw reflection and optional route |
| River inlet | `35,28,10,7` | Mambubuno current and dangerous water |

### Orthogonal Route Graph

Every rectangle below is walkable. Intersections intentionally overlap.

| Route | Walkable cells | Connection |
| --- | --- | --- |
| Shrine entry | `35,0,3,11` | North edge to upper loop |
| Upper shore loop | `8,8,29,3` | Balon, commons, and shrine trail |
| West descent | `8,8,3,16` | Balon to reed nursery |
| Commons south | `11,13,17,3` | Commons to village shore |
| Reed branch | `7,15,3,11` | Village shore to nursery |
| Jetty approach | `25,14,12,3` | Commons to fishing jetty |
| East shore | `34,15,4,15` | Jetty to river inlet |
| Moon branch | `21,16,4,11` | Village shore to moon pool |
| Southern loop | `10,25,29,3` | Nursery, moon pool, and inlet return |

Required loops:

1. Shrine arrival -> Balon -> commons -> shrine arrival.
2. Commons -> jetty -> river inlet -> southern loop -> commons.
3. Village shore -> reed nursery -> moon pool -> village shore.

### Landmark And Object Placement

| Stable ID | Object | Tile position | Placement rule |
| --- | --- | --- | --- |
| PLAYER_SPAWN | Player spawn | `36,2` | Inside north arrival |
| TO_SHRINE | Spirit Shrine transition | `36,0` | North edge; aperture x 35-37; target WLOC000009 south interior |
| SAVE_REEDWATER | Reedwater Balon | `8,8` | Protected west pocket |
| NPC000601 | Ka Amihan Luntian | `18,10` | Steward commons |
| NPC000602 | Aling Sela Dahon | `8,21` | Reed-nursery approach |
| NPC000603 | Mang Isko Bangkero | `35,19` | Safe jetty edge |
| AMBIENT_TANGLED_NETS | Tangled Nets | `39,22` | Jetty side pocket |
| AMBIENT_REED_NURSERY | Reed Nursery | `7,23` | Restoration branch |
| AMBIENT_CLEAR_WATER_PATCH | Clear Water Patch | `23,27` | Moon-pool approach |
| ENCOUNTER_MAMBUBUNO | Mambubuno current | `39,30` | River inlet |
| ENCOUNTER_KATAW | Kataw reflection | `25,26` | Moon pool |
| AMBIENT_SIRENA | Distant Sirena song | `43,12` | Quiet unreachable-water edge with safe interaction shore |

### Collision Contract

- Actual bounds are exactly `48x36` tiles and `2304x1728` pixels. Reject out-of-bounds collision.
- Block the perimeter except the explicit edge-transition apertures listed above.
- Every collision object requires `collision_kind`, `blocks_player`, and `blocks_companion`.
- Block deep water, solid reed masses, mangrove trunks, jetty edges, boats, net racks, rocks, and building footprints
- Mark explicit shallow crossings and jetty surfaces walkable; keep water collision split around each crossing
- Keep NPC and quest-object approaches dry, reachable, and at least two tiles wide
- Use no coral, ocean surf, or saltwater-only collision semantics

### Tileset Prompt

- Source upload: `frontend/public/assets/vertical-slice/tilesets/source/tileset_laguna_lakeshore_1254.png`
- Normalized output: `frontend/public/assets/vertical-slice/tilesets/tileset_laguna_lakeshore.png`
- Source: `1254x1254`, visually strict `15x15`
- Runtime: exact `720x720`, `225` cells, each `48x48`

```text
Create one production-quality orthogonal top-down 2D tileset for Laguna Reedwater Shore in ALAMAT, a respectful fictional Filipino fantasy RPG. Output one square PNG at exactly 1254x1254 pixels, arranged as a strict visual 15 columns x 15 rows atlas with 225 edge-to-edge cells. The source will be partitioned proportionally and each conceptual cell normalized independently into a 720x720 runtime atlas with exact 48x48 cells. Do not add gutters, grid lines, labels, coordinates, text, logo, UI, characters, NPCs, Nilalang, quest markers, or a baked complete map.

Use a readable top-down classic handheld RPG perspective, stable lighting, consistent scale, and location-specific material language. Required visual families: freshwater shallows and deep-water edges, wet sand, packed shore paths, reed families, spawning grass, mangrove roots, jetty pieces, bamboo rails, boats, net racks, lake stones, moon-pool stonework, and shoreline transitions. Routes support four-direction movement only, so all connected terrain requires horizontal, vertical, 90-degree corners, T-junctions, intersections, and end-caps where applicable.

Reserve contiguous rectangular atlas regions for these complete assembled prefabs: 4x4 fishing hut; 6x3 jetty; 5x5 mature mangrove tree; 4x2 fictional banca-inspired boat; 3x3 Reedwater Balon. A prefab must reconstruct as one polished object from its exact cell matrix. Do not fill prefab regions with independent samples, repeated standalone roof cells, disconnected walls, mismatched corners, or chopped tree canopies. Keep doors, stairs, interaction cells, walk-under lanes, and trunk footprints visually obvious. Walkable cells must read open; blocked cells must read solid.

Before generating, repeat the exact source filename, 1254x1254 size, 15x15 visual grid, and map ID WLOC000010. After generation, do not resize manually; use the repository normalization pipeline.
```

### Tile Catalog Prompt

- Attach: `frontend/public/assets/vertical-slice/tilesets/tileset_laguna_lakeshore.png`
- Save response: `frontend/public/data/maps/tile-catalogs/WLOC000010_laguna_lakeshore_tile_catalog.json`

```text
Inspect the attached normalized 720x720 Laguna Reedwater Shore runtime tileset. It is a strict 15x15 grid of 225 exact 48x48 cells. Do not inspect the 1254x1254 source and do not redraw the image.

Return valid JSON cataloging every local tile ID 0 through 224. Each tile entry must contain local_id, global_id, row, column, semantic, terrain_group, variant, walkability, recommended_layer, prefab_id, prefab_local_x, and prefab_local_y. Global IDs use firstgid 1, so global_id = local_id + 1. Use null prefab fields for non-prefab cells.

Include a root prefabs array for these required assembled prefabs: 4x4 fishing hut; 6x3 jetty; 5x5 mature mangrove tree; 4x2 fictional banca-inspired boat; 3x3 Reedwater Balon. Every prefab entry must contain prefab_id, name, origin_row, origin_column, width, height, exact global-ID tile_matrix, anchor_cell, recommended_layer, interaction_cells, and tile-relative collision_rects. Collision rectangles require x, y, width, height, and collision_kind. Keep doors, stairs, gate openings, walk-under lanes, shallow crossings, and interaction cells out of collision.

The root must contain map_id WLOC000010, tileset_file tileset_laguna_lakeshore.png, source_dimensions 720x720, columns 15, rows 15, tilewidth 48, tileheight 48, firstgid 1, tilecount 225, tiles, and prefabs. Return one JSON code block with no omitted IDs or prose inside it.
```

### Compiled Tiled JSON And Collision Prompt

- Attach normalized tileset: `frontend/public/assets/vertical-slice/tilesets/tileset_laguna_lakeshore.png`
- Attach tile catalog: `frontend/public/data/maps/tile-catalogs/WLOC000010_laguna_lakeshore_tile_catalog.json`
- Save response: `frontend/public/data/maps/WLOC000010_laguna_lakeshore.json`

```text
Create one complete Tiled 1.11 and Phaser 3 compatible orthogonal JSON map for WLOC000010 Laguna Reedwater Shore. Use width 48, height 36, tilewidth 48, tileheight 48, pixel_width 2304, and pixel_height 1728. Every tile layer must be a flat uncompressed row-major array of exactly 1728 integers. Use 0 for empty. Do not use base64, compression, chunks, nested row arrays, image layers, or external TSX/TSJ sources.

Embed one tileset with firstgid 1, columns 15, tilecount 225, imagewidth 720, imageheight 720, spacing 0, margin 0, and image ../../assets/vertical-slice/tilesets/tileset_laguna_lakeshore.png. Use only IDs from the attached catalog. Stamp every complete structure by copying its prefab tile_matrix exactly; never stretch it or repeat center cells.

Create tile layers in this exact order: Ground, Ground Detail, Water, Path, Path Detail, Structures, Decor, Upper Decor. Then create object layers in this exact order: Collision, Objects, Transitions, Encounters.

Required zones: Outer boundary=0,0,48,36; Shrine arrival=34,1,8,7; Balon pocket=5,5,9,8; Steward commons=14,5,12,9; Village shore=11,14,15,9; Reed nursery=3,18,11,10; Fishing jetty=31,16,13,10; Moon pool=19,23,10,9; River inlet=35,28,10,7.
Required walkable route rectangles: Shrine entry=35,0,3,11; Upper shore loop=8,8,29,3; West descent=8,8,3,16; Commons south=11,13,17,3; Reed branch=7,15,3,11; Jetty approach=25,14,12,3; East shore=34,15,4,15; Moon branch=21,16,4,11; Southern loop=10,25,29,3.
Required object placements: PLAYER_SPAWN Player spawn@36,2 (Inside north arrival); TO_SHRINE Spirit Shrine transition@36,0 (North edge; aperture x 35-37; target WLOC000009 south interior); SAVE_REEDWATER Reedwater Balon@8,8 (Protected west pocket); NPC000601 Ka Amihan Luntian@18,10 (Steward commons); NPC000602 Aling Sela Dahon@8,21 (Reed-nursery approach); NPC000603 Mang Isko Bangkero@35,19 (Safe jetty edge); AMBIENT_TANGLED_NETS Tangled Nets@39,22 (Jetty side pocket); AMBIENT_REED_NURSERY Reed Nursery@7,23 (Restoration branch); AMBIENT_CLEAR_WATER_PATCH Clear Water Patch@23,27 (Moon-pool approach); ENCOUNTER_MAMBUBUNO Mambubuno current@39,30 (River inlet); ENCOUNTER_KATAW Kataw reflection@25,26 (Moon pool); AMBIENT_SIRENA Distant Sirena song@43,12 (Quiet unreachable-water edge with safe interaction shore).

Author collision from the collision contract in this map packet and the prefab-relative collision rectangles. Use editable axis-aligned rectangles, aligned to the 48x48 grid wherever possible. Derive perimeter collision from the actual 2304x1728 pixel bounds. No rectangle may have x or y below 0, exceed pixel_width or pixel_height, cover a listed route, cover an interaction cell, or close a transition aperture. Every collision object requires stable id and name plus collision_kind, blocks_player, and blocks_companion properties.

Every transition trigger must occupy its listed outermost edge tile and include target_map_id, target_tile_x, target_tile_y, and entry_direction. Destination coordinates must be one or two walkable tiles inside the opposite edge and outside the destination return trigger.

Return the complete JSON in one code block with no comments, placeholders, abbreviations, or omitted arrays. Afterward provide a validation report confirming dimensions, all 1728-entry layer arrays, tile-ID range, prefab matrices, collision bounds, perimeter apertures, transition safety, route-loop connectivity, object reachability, and companion clearance.
```

### Map Preview Prompt

- Replace file: `frontend/public/assets/vertical-slice/maps/preview_laguna_lakeshore.png`
- Exact size: `2304x1728`

```text
Create an orthographic top-down preview of the approved WLOC000010 Laguna Reedwater Shore tilemap, exactly 2304x1728 pixels, representing 48x36 cells at 48x48 scale. Preserve the approved coordinate blueprint, orthogonal route graph, edge-transition positions, prefab footprints, and collision-readable openings. Show large freshwater shore loops, Reedwater Balon, steward commons, reed nursery, fishing jetty, moon pool, river inlet, north shrine trail, and restoration side pockets. Do not redesign the layout or add diagonal movement routes. No labels, text, UI, characters, NPCs, Nilalang, quest markers, collision guides, or visible grid. This is reference art after JSON approval, never a collision source.
```

### battle_background_laguna_lakeshore

- Type: `battle_background`
- Source: `WLOC000010`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_laguna_lakeshore.png`
- Size target: PNG, exactly 1280x720

```text
Create an exact 1280x720 side-facing 2D RPG battle background for Laguna Reedwater Shore. Tropical Philippine-inspired fictional lakeshore, shallow blue-green water, reeds, distant bamboo fishing jetty, mangrove silhouettes, soft mountain horizon, open readable ground for two allies on the left and two enemies on the right. No characters, Nilalang, UI, text, frames, or baked combat effects. Keep the center and lower actor lanes visually quiet.
```

### battle_background_laguna_lakeshore_overlay

- Type: `animated_battle_overlay`
- Source: `WLOC000010`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_laguna_lakeshore_overlay.svg`
- Size target: animated SVG, 1280x720 viewBox, transparent background

```text
Create an animated transparent SVG overlay for the Laguna Reedwater Shore battle background, viewBox 0 0 1280 720. Use internal SMIL animation only. Include subtle water shimmer, slow reed sway, two or three tiny distant firefly glints, and a gentle moving reflection. No raster image, JavaScript, CSS animation dependency, characters, UI, labels, or large opaque shapes. Keep actor lanes unobstructed and animation restrained.
```

### Placeable Map Object Prompts

#### quest_object_tangled_nets

- Type: `quest_map_object`
- Source: `AMBIENT_TANGLED_NETS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_tangled_nets.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down lakeshore quest object showing an abandoned synthetic fishing net and a few dull hooks tangled around young spawning reeds. Environmental problem, no trapped animal, gore, character, text, UI marker, checkerboard, or background.
```

#### quest_object_reed_nursery

- Type: `quest_map_object`
- Source: `AMBIENT_REED_NURSERY`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_reed_nursery.png`
- Size target: transparent PNG, exactly 96x96

```text
Create one polished top-down chibi Filipino fantasy RPG quest map object for the Reed Nursery at Laguna Reedwater Shore. Exact 96x96 PNG with true alpha transparency. Show several young freshwater reeds, two pressed low by storm debris, healthy shoots still rooted, and a few fallen stems suitable for gentle support. The object must clearly communicate repair without harvesting. Natural reed green, wet earth, and freshwater-blue accents. No character, animal, text, quest marker, UI, checkerboard, painted background, grid, border, gore, or religious symbol. Keep the full object inside the canvas with transparent padding.
```

#### quest_object_clear_water_patch

- Type: `quest_map_object`
- Source: `AMBIENT_CLEAR_WATER_PATCH`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_clear_water_patch.png`
- Size target: transparent PNG, exactly 96x96

```text
Create one polished top-down chibi Filipino fantasy RPG quest map object for a Clear Water Patch at Laguna Reedwater Shore. Exact 96x96 PNG with true alpha transparency. Show a shallow clear-water pocket, visible living spawning grass below, and one loose piece of synthetic cord caught above the stems so it can be removed without damaging them. Gentle blue-green ripples, readable at gameplay scale, environmental restoration rather than loot. No trapped creature, character, text, UI marker, checkerboard, opaque background, border, gore, or ocean coral. Keep all water and cord inside the canvas with transparent edge padding.
```

## Shared Map UI And Debug Assets

### ui_interaction_marker

- Type: `ui_icon`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/interaction_marker.svg`
- Size target: animated SVG, 64x64 viewBox, transparent background

```text
Create an animated SVG interaction marker icon for ALAMAT, 64x64 viewBox, transparent background, no text, no logo, no UI frame. Filipino fantasy RPG visual style, simple golden woven ring with small sparkle, readable over dark and light map tiles. Animation must be inside the SVG only using SMIL animate / animateTransform elements: gentle glow pulse, subtle sparkle twinkle, optional tiny breathing scale inside the SVG groups. Do not rely on game-code rotation, game-code tweening, CSS animation, external images, raster embeds, or JavaScript. Keep the outer icon visually stable so it does not look like the whole marker is spinning.
```

### ui_save_point

- Type: `map_object`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/save_point.svg`
- Size target: animated SVG, 64x64 viewBox, transparent background

```text
Create an animated SVG save point map object for ALAMAT, 64x64 viewBox, transparent background, no text, no logo. It must clearly look like a small Balon / Filipino deep well from a top-down chibi RPG perspective: circular stone or wood-rimmed well, visible blue water inside, small bamboo/wooden pulley post or bucket detail, soft blue-gold restorative glow. Animation must be inside the SVG only using SMIL animate / animateTransform elements: water shimmer, gentle healing glow pulse, tiny sparkle twinkle. Do not rely on game-code rotation, game-code tweening, CSS animation, external images, raster embeds, or JavaScript. Keep the well silhouette stable and readable at 64x64.
```

### ui_collision_debug_tile

- Type: `debug_tile`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/collision_debug_tile.svg`
- Size target: 48x48

```text
Simple transparent red collision debug tile for development only, 48x48, diagonal stripe, semi-transparent.
```
