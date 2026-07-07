# Vertical Slice Asset Prompts

Use these prompts with your preferred image generation tool. Keep filenames stable so generated files can replace the placeholders in `frontend/public/assets/vertical-slice`.

Recommended tools:

- ChatGPT image generation: good for concept art and quick iteration.
- Adobe Firefly: good commercial-safety posture and style exploration.
- Leonardo.ai: good game asset workflow and transparent-background assets.
- Scenario.gg: good for consistent game asset sets.
- Midjourney: strong concept art, but check commercial/license terms and transparent-background workflow.
- Stable Diffusion / ComfyUI: best local/batch control if you can manage models and licensing.

General negative prompt:

```text
Avoid caricature, gore, photorealism, real-world religious superiority, sacred-object misuse, text, logos, modern brands, muddy silhouettes, painted background, checkerboard background, fake transparent checkerboard, white background, black background, colored backdrop, vignette background, frame borders, uneven grid spacing, cropped body parts, oversized sprites that bleed into neighboring cells.
```

## ChatGPT Sprite Sheet Standard

For final character, NPC, and Nilalang sprite sheets, use this structure unless a later animation system changes it. The current repo placeholders may be SVG for stability, but approved production actor art should be transparent PNG first, with WebP considered later for optimized builds:

- File type: PNG with transparent background
- The PNG must contain real alpha transparency. Do not draw or render a checkerboard. A checkerboard pattern is not transparency.
- The background must be fully transparent pixels, not white, black, gray, brown, gradient, or checkerboard.
- If the generator cannot export true alpha, export the subject on a flat chroma green background only for manual removal, then remove it before adding to the repo.
- Exact canvas size for every player, NPC, and Nilalang actor sheet: 768x1024 pixels
- Grid: 3 columns x 4 rows, 12 frames total
- Cell size: 256x256 pixels
- Row order: down, left, right, up
- Column order: idle, walk-left-foot-forward, walk-right-foot-forward
- The 2nd and 3rd columns must be visibly different, not duplicated
- Column 2 pose: left foot forward, right arm forward
- Column 3 pose: right foot forward, left arm forward
- Side-facing rows must show opposite leg positions and arm swing
- Up/back row must show alternating heel/foot placement and shoulder movement
- No labels, no frame borders, no background
- No brown/black/gradient backdrop or vignette
- No shadows or effects that cross into another cell
- Keep the feet/bottom anchor aligned in every frame
- Keep the full body visible inside each cell with padding on all sides
- Leave at least 24px transparent padding above hair/head in every cell, especially the up/back row
- Leave at least 16px transparent padding below the feet in every cell so walking frames never bleed into the next row
- No hair, head, clothing, weapon, glow, shadow, or effect may cross a 256x256 cell boundary
- All characters should have similar chibi body proportions and fill roughly the same amount of their 256x256 cell

## Format Decision

- Use SVG for temporary placeholders, UI symbols, and debug markers.
- Use PNG for generated actor spritesheets, item icons, equipment icons, portraits, maps, and tilesets.
- Consider WebP only after the art direction is approved and a build-time optimization step exists.
- Do not use SVG as the final format for painterly animated actors unless the art is intentionally flat/vector.

## Battle Actor Sprite Standard

Overworld movement sheets are still needed for the player and tameable Nilalang because companions can follow the player. Battle sprites are separate from overworld sprites and should be generated as larger PNG sheets.

- File type: PNG with real alpha transparency
- Exact canvas size: 1024x512 pixels
- Grid: 4 columns x 2 rows, 8 frames total
- Cell size: 256x256 pixels
- Row 1: battle idle frames 1-4
- Row 2: battle attack frames 1-4
- Use side-facing 3/4 battle perspective, player/companion facing right and enemy variants facing left when needed
- Keep full body inside each cell with at least 24px transparent padding
- Do not include background, frame borders, labels, shadows crossing cells, or checkerboard patterns
- Use this for player battle sprites and Nilalang battle sprites

## Skill VFX Sprite Standard

Skill effects should be separate PNG sprite sheets so they can be reused by many actors and skills.

- File type: PNG with real alpha transparency
- Exact canvas size: 1536x256 pixels
- Grid: 6 columns x 1 row, 6 frames total
- Cell size: 256x256 pixels
- No background, no checkerboard, no labels, no frame borders
- Keep the effect inside each cell unless it is intentionally a projectile trail
- For long-range attacks, create a projectile/traveling sprite that reads clearly while moving from caster to target
- For melee attacks, create a short impact slash or burst centered on the target
- For support/self skills, create an aura/buff effect centered on the caster

## player_customizable_base

- Type: `character_sprite`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/characters/player_customizable_base.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create a customizable protagonist overworld sprite sheet base for ALAMAT. Chibi proportions, neutral traveler stance, practical lightweight clothing inspired by woven fibers and natural materials, modular hair/body/outfit layers, top-down 3/4 RPG view, transparent background.
```

## npc_npc000001_datu_magsalin

- Type: `npc_sprite`
- Source: `NPC000001`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000001_datu_magsalin.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create an overworld chibi NPC sprite sheet for Datu Magsalin, barangay elder and arrival anchor. Calm, grounded village leader, practical Filipino fantasy clothing, woven sash, walking cane or document bundle, transparent background, top-down 3/4 RPG view.
```

## npc_npc000582_babaylan_lira_dalisay

- Type: `npc_sprite`
- Source: `NPC000582`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000582_babaylan_lira_dalisay.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create an overworld chibi NPC sprite sheet for Babaylan Lira Dalisay, spiritual guide for trust and balance. Respectful fictional ritual attire, leaf fiber, brass, shell, and woven details, gentle authority, transparent background, top-down 3/4 RPG view.
```

## npc_npc000301_general_store

- Type: `npc_sprite`
- Source: `NPC000301`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000301_general_store.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create an overworld chibi NPC shopkeeper sprite sheet for the starter barangay general store. Friendly vendor, apron, small pouch, woven market cloth accents, transparent background, top-down 3/4 RPG view.
```

## npc_npc000004_mayumi_bagwis

- Type: `npc_sprite`
- Source: `NPC000004`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000004_mayumi_bagwis.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates. Keep the full body inside each 256x256 cell with padding on all sides and aligned feet. Do not include labels, frame borders, scenery, gradient backdrop, checkerboard, or painted background. Create an overworld chibi NPC sprite sheet for Mayumi Bagwis, a thoughtful chapel courtyard villager who represents the community's mixed traditions and careful listening. Warm practical clothing, modest woven shawl, calm expression, respectful fictional Filipino fantasy tone, transparent background.
```

## npc_npc000008_kidlat_balagtas

- Type: `npc_sprite`
- Source: `NPC000008`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000008_kidlat_balagtas.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates. Keep the full body inside each 256x256 cell with padding on all sides and aligned feet. Do not include labels, frame borders, scenery, gradient backdrop, checkerboard, or painted background. Create an overworld chibi NPC sprite sheet for Kidlat Balagtas, forest-edge scout and warning-giver near Balete Forest. Agile traveler outfit, leaf cloak, small lightning charm, bamboo walking stick or scout satchel, alert but friendly, transparent background.
```

## npc_npc000481_blacksmith

- Type: `npc_sprite`
- Source: `NPC000481`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000481_blacksmith.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates. Keep the full body inside each 256x256 cell with padding on all sides and aligned feet. Do not include labels, frame borders, scenery, gradient backdrop, checkerboard, or painted background. Create an overworld chibi NPC sprite sheet for the Barangay Blacksmith. Practical forge apron, sturdy posture, small hammer or folded tool bundle, soot and brass accents, friendly craftsperson silhouette, transparent background.
```

## nilalang_mon0038_aghoy

- Type: `nilalang_sprite`
- Source: `MON0038`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0038_aghoy.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create an overworld chibi Nilalang sprite sheet for Aghoy, the little forest helper and first earned companion candidate. Small forest spirit, kind and shy, leaf cloak, basket or root charm, firefly glow, readable silhouette, transparent background, no horror tone.
```

## nilalang_mon0032_duwende

- Type: `nilalang_sprite`
- Source: `MON0032`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0032_duwende.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create an overworld chibi Nilalang sprite sheet for Duwende, house-earth little folk. Small earthy spirit, mound and household motifs, friendly but mysterious, rattan/leaf details, transparent background, readable at 64x64.
```

## nilalang_mon0028_ungo

- Type: `nilalang_sprite`
- Source: `MON0028`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0028_ungo.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create an overworld chibi Nilalang sprite sheet for Ungo, wild ape spirit and first dangerous encounter. Strong forest creature, muscular but readable, moss and bark accents, alert stance, not grotesque, transparent background.
```

## nilalang_mon0007_batibat_boss

- Type: `boss_sprite`
- Source: `MON0007`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/boss_MON0007_batibat.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create a large overworld boss sprite sheet for Batibat, nightmare tree-mother presence. Heavy old-wood silhouette, sleep/nightmare motif, roots and housepost details, eerie but not graphic, transparent background, readable boss scale.
```

## tileset_barangay_san_isidro

- Type: `tileset`
- Source: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, 48x48 per tile, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG tileset with true transparent background where appropriate. Canvas must be exactly 960x960 pixels. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Create the Barangay San Isidro vertical-slice tileset for ALAMAT. Include walkable grass, packed earth paths, village plaza ground, marketplace ground, chapel courtyard stones, rice field edge tiles, garden edge tiles, nipa-style house wall/roof tiles, barangay hall wall/roof tiles, market stall tiles, forge tiles, fences, water jars, small plants, and clear blocked obstacle tiles. Collision readability is required: walkable tiles must look open; blocked tiles must look solid. Do not include labels, UI markers, frame borders, logos, or baked-in characters.
```

## Collision-First Map Asset Workflow

For production maps, do not generate a full painted map first and then ask an image model to infer collision. Image models are unreliable at exact grids, blocked tiles, and coordinates.

Use this order instead:

1. Keep the gameplay layout authoritative in data: map width, height, blocked tiles, decorations, object positions, transitions, save points, safe zones, and random encounter zones.
2. Generate or paint a reusable tileset that visually supports those collision rules.
3. Assemble the playable map in Tiled, LDtk, or a JSON tilemap using the exact blocked/walkable layout.
4. Export collision from the editor or maintain the current `blocked` arrays as the source of truth.
5. Generate map preview art only after the playable layout is locked.

If asking ChatGPT or another model for map help, ask it to produce a **layout proposal**, not final collision. Review it, then convert it manually or with a tool into map JSON. Do not treat generated collision JSON as final without testing it in-game.

## ChatGPT Pro Map Draft Prompt

Use this prompt when asking ChatGPT Pro to help draft a Tiled/Phaser JSON map for the current vertical slice. Replace the map-specific section with one of the specs below.

```text
You are helping create a Phaser/Tiled-compatible map draft for ALAMAT, a respectful Filipino fantasy RPG vertical slice.

Output a collision-aware Tiled-style JSON draft and a concise tile legend.

Rules:
- Tile size: 48x48 pixels.
- Use integer tile coordinates only.
- Use separate layers named Ground, Path, Decor, Collision, Objects, Transitions, Encounters.
- Collision must match the blocked rectangles exactly.
- Objects must use the exact coordinates provided.
- Do not invent extra NPCs, exits, bosses, shops, save points, or quest objects.
- Do not place visual obstacles on walkable tiles.
- Do not place walkable-looking paths on blocked tiles.
- Keep all NPCs, items, transitions, save points, and encounters reachable.
- Treat the current blockout as the gameplay source of truth.
- Return JSON that is easy to import or convert into Tiled/Phaser.

Return:
1. Tile legend with tile IDs and meanings.
2. Tiled-style JSON draft with width, height, tilewidth, tileheight, layers, objects, collision rectangles, and map properties.
3. A short validation checklist listing all reachable objects and all blocked rectangles.
4. Any assumptions made.

Map spec:
[PASTE ONE CURRENT BLOCKOUT COLLISION SPEC HERE]
```

## Current Vertical Slice Map Plan

These are the five maps that exist in the first playable vertical stage right now:

- `WLOC000001` Barangay San Isidro: opening safe zone, Balon spawn/save point, Datu, Lira, first herb, marketplace exit.
- `WLOC000002` Barangay Marketplace: shop, blacksmith/crafting, exits back to barangay and chapel courtyard.
- `WLOC000003` Chapel Courtyard: Mayumi, Babaylan Lira Dalisay, cultural worldbuilding, exit to Balete Forest.
- `WLOC000004` Balete Forest: first danger zone, random encounters, Duwende/Ungo/Aghoy quest encounters, Kidlat, exit to shrine.
- `WLOC000009` Spirit Shrine Threshold: Shrine Balon, Umalagad Echo, Batibat boss, post-boss bonding context.

Map art should support this exact flow: safe village learning, marketplace preparation, chapel/cultural context, forest danger, shrine boss.

## Collision-Aware Tileset Prompt Add-On

Add this paragraph to any tileset prompt when generating production-ready map art:

```text
Design every tile so collision is visually obvious. Walkable tiles must read as open ground, paths, floor, shallow grass, bridge surface, or shrine floor. Blocked tiles must read as solid obstacles such as house walls, tree trunks, thick roots, cliffs, fences, market stalls, stone monuments, deep water, dense bamboo, large rocks, or shrine structures. Include clear edge and corner tiles so blocked rectangles can be assembled cleanly on a 48x48 grid. Do not place important visual obstacles inside walkable ground tiles. Do not create decorative clutter that looks blocked unless it is intended to be a blocked tile.
```

## Current Blockout Collision Specs

These specs reflect the current playable vertical-slice maps in `frontend/src/game/data/verticalSliceMaps.js`. Use them when generating map mockups, Tiled references, or collision-aware tilesets.

### WLOC000001 Barangay San Isidro

- Grid: 22 columns x 15 rows
- Tile size: 48x48
- Safe zone: yes
- Tileset: barangay
- Blocked: map border, houses at `(4,3)` size `3x2`, barangay hall at `(13,3)` size `4x2`, rice field at `(8,11)` size `7x2`, garden/yard at `(1,9)` size `3x3`
- Objects: Balon Deepwell `(2,2)`, Datu Magsalin `(7,6)`, Lira Lakandula `(11,8)`, Healing Herb `(15,10)`, Marketplace transition `(18,7)`

```text
Create a collision-aware Tiled/Phaser map draft for Barangay San Isidro, 22 tiles wide by 15 tiles high, tile size 48x48. This is the opening safe zone. Keep all border tiles blocked. Show blocked structures exactly in these rectangles: houses at x4 y3 width3 height2, barangay hall at x13 y3 width4 height2, rice field at x8 y11 width7 height2, garden or yard at x1 y9 width3 height3. Keep walkable paths between Balon Deepwell save/spawn point at x2 y2, Datu Magsalin at x7 y6, Lira Lakandula at x11 y8, Healing Herb item at x15 y10, and Marketplace transition at x18 y7. Use barangay tiles: grass, packed-earth path, house walls/roofs, barangay hall, rice, garden, fences, water jar accents. The visual layout must clearly distinguish blocked buildings/fields from walkable paths. Do not add labels, text, UI markers, extra NPCs, or extra exits.
```

### WLOC000002 Barangay Marketplace

- Grid: 22 columns x 15 rows
- Tile size: 48x48
- Safe zone: yes
- Tileset: barangay
- Blocked: map border, stall at `(6,4)` size `3x2`, forge at `(12,4)` size `3x2`, market table row at `(6,10)` size `9x1`
- Objects: General Store `(5,7)`, Blacksmith `(15,7)`, Barangay transition `(2,7)`, Chapel Courtyard transition `(19,7)`

```text
Create a collision-aware Tiled/Phaser map draft for the Barangay San Isidro marketplace, 22 tiles wide by 15 tiles high, tile size 48x48. This is the preparation hub with shop and crafting. Keep all border tiles blocked. Show blocked market structures exactly in these rectangles: market stall at x6 y4 width3 height2, forge at x12 y4 width3 height2, long table row at x6 y10 width9 height1. Keep walkable paths between General Store NPC/shop at x5 y7, Blacksmith NPC/crafting station at x15 y7, Barangay transition at x2 y7, and Chapel Courtyard transition at x19 y7. Use barangay marketplace tiles: packed earth, stall counters, forge floor, workbench details, crates, woven awnings, open market paths. Make blocked stalls visually solid and walkable market ground visually open. Do not add labels, text, UI markers, extra NPCs, or extra exits.
```

### WLOC000003 Chapel Courtyard

- Grid: 22 columns x 15 rows
- Tile size: 48x48
- Safe zone: yes
- Tileset: barangay
- Blocked: map border, chapel at `(9,3)` size `5x4`, garden at `(4,10)` size `3x2`, courtyard structure at `(16,10)` size `2x2`
- Objects: Mayumi Bagwis `(7,8)`, Babaylan Lira Dalisay `(15,8)`, Marketplace transition `(2,7)`, Balete Forest transition `(19,7)`

```text
Create a collision-aware Tiled/Phaser map draft for a multi-faith barangay chapel courtyard, 22 tiles wide by 15 tiles high, tile size 48x48. This is the cultural context map before the forest. Keep all border tiles blocked. Show blocked rectangles exactly: chapel/courtyard building at x9 y3 width5 height4, garden at x4 y10 width3 height2, small courtyard structure at x16 y10 width2 height2. Keep walkable paths between Mayumi Bagwis at x7 y8, Babaylan Lira Dalisay at x15 y8, Marketplace transition at x2 y7, and Balete Forest transition at x19 y7. Use respectful fictional courtyard tiles: stone path, garden edges, open plaza, small shrine/courtyard details, mixed cultural motifs without declaring one real religion as absolute truth. Do not add labels, text, UI markers, extra NPCs, or extra exits.
```

### WLOC000004 Balete Forest

- Grid: 24 columns x 16 rows
- Tile size: 48x48
- Safe zone: no
- Random encounters: Duwende, Ungo, Aghoy
- Tileset: forest
- Blocked: map border, balete tree/root mass at `(7,3)` size `4x3`, roots at `(14,9)` size `5x2`, thicket at `(4,11)` size `3x2`, bamboo/tree column at `(18,3)` size `2x4`
- Objects: Duwende tracks `(5,5)`, Ungo encounter `(12,11)`, Aghoy rustle `(17,6)`, Kidlat Balagtas `(4,8)`, Chapel transition `(2,7)`, Spirit Threshold transition `(21,8)`

```text
Create a collision-aware Tiled/Phaser map draft for Balete Forest, 24 tiles wide by 16 tiles high, tile size 48x48. This is the first danger zone and supports random Nilalang encounters. Safe zone is false. Random encounter pool: Duwende, Ungo, Aghoy. Keep all border tiles blocked. Show blocked forest obstacles exactly in these rectangles: large balete tree and root mass at x7 y3 width4 height3, thick roots at x14 y9 width5 height2, thicket at x4 y11 width3 height2, bamboo or tree column at x18 y3 width2 height4. Keep walkable forest paths between Duwende tracks encounter at x5 y5, Ungo encounter at x12 y11, Aghoy rustle encounter at x17 y6, Kidlat Balagtas at x4 y8, Chapel transition at x2 y7, and Spirit Threshold transition at x21 y8. Use forest tiles: moss, roots, balete trunk, leaf floor, bamboo, rocks, firefly clearings, narrow paths. Make blocked roots and trunks visually obvious. Do not add labels, text, UI markers, extra NPCs, or extra exits.
```

### WLOC000009 Spirit Shrine Threshold

- Grid: 22 columns x 15 rows
- Tile size: 48x48
- Safe zone: no
- Random encounters: Duwende, Aghoy
- Tileset: shrine
- Blocked: map border, shrine at `(9,2)` size `4x3`, threshold platform at `(7,9)` size `8x2`, side stones at `(3,4)` size `2x2` and `(17,4)` size `2x2`
- Objects: Shrine Balon `(3,11)`, Batibat presence `(11,7)`, Umalagad Echo `(16,10)`, Balete Forest transition `(2,8)`

```text
Create a collision-aware Tiled/Phaser map draft for a fictional Spirit Shrine threshold, 22 tiles wide by 15 tiles high, tile size 48x48. This is the boss and post-boss bonding context map. Safe zone is false. Random encounter pool: Duwende, Aghoy. Keep all border tiles blocked. Show blocked shrine elements exactly in these rectangles: shrine structure at x9 y2 width4 height3, threshold platform or root barrier at x7 y9 width8 height2, side stone group at x3 y4 width2 height2, side stone group at x17 y4 width2 height2. Keep walkable paths between Shrine Balon save/revive point at x3 y11, Batibat boss presence at x11 y7, Umalagad Echo at x16 y10, and Balete Forest transition at x2 y8. Use shrine tiles: stone floor, mist, luminous roots, offering spots, woven banners, old root barriers, boss arena floor. Make boss arena space readable and keep blocked spiritual structures visually solid. Do not add labels, text, UI markers, extra NPCs, or extra exits.
```

## tileset_balete_forest

- Type: `tileset`
- Source: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, 48x48 per tile, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG tileset with true transparent background where appropriate. Canvas must be exactly 960x960 pixels. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Create the Balete Forest vertical-slice tileset for ALAMAT. Include walkable moss floor, leaf floor, narrow root paths, firefly clearing floor, riverbank edge tiles, balete root walls, balete trunk tiles, bamboo thickets, rocks, dense shrubs, hidden item spot tiles, and blocked root/thicket obstacle tiles. Collision readability is required: walkable forest paths must look open; blocked roots, trunks, rocks, and thickets must look solid. Do not include labels, UI markers, frame borders, logos, or baked-in characters.
```

## tileset_spirit_shrine

- Type: `tileset`
- Source: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, 48x48 per tile, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG tileset with true transparent background where appropriate. Canvas must be exactly 960x960 pixels. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Create the fictional Spirit Shrine Threshold vertical-slice tileset for ALAMAT. Include walkable stone floor, shrine path, mist floor, luminous root floor, boss arena floor, shrine platform tiles, offering spot tiles, woven banner details, ancient root barriers, side stones, spirit-lit stones, and blocked shrine structure tiles. Keep the fantasy spiritual tone respectful and fictional; do not portray any real religion as absolute truth. Collision readability is required: walkable shrine floor must look open; blocked shrine structures, stones, and root barriers must look solid. Do not include labels, UI markers, frame borders, logos, or baked-in characters.
```

## ui_interaction_marker

- Type: `ui_icon`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/interaction_marker.svg`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a transparent-background interaction marker icon for ALAMAT. Simple golden woven ring with small sparkle, readable over map tiles, no text, no UI frame.
```

## ui_save_point

- Type: `map_object`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/save_point.svg`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a top-down save point object for ALAMAT. Small shrine lantern or woven charm post with soft blue-gold glow, transparent background, readable at 64x64, no religious superiority, no text.
```

## ui_collision_debug_tile

- Type: `debug_tile`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/collision_debug_tile.svg`
- Size target: 48x48

```text
Simple transparent red collision debug tile for development only, 48x48, diagonal stripe, semi-transparent.
```

## item_itm000001_healing_herb

- Type: `item_icon`
- Source: `healing_herb`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000001_healing_herb.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG inventory icon for Healing Herb. Small wrapped remedy, leaf bundle, woven fiber tie, clean healing silhouette, green and river accents, readable at 32x32 and 64x64, no text.
```

## item_itm000003_sacred_river_water

- Type: `item_icon`
- Source: `sacred_river_water`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000003_sacred_river_water.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG inventory icon for Sacred River Water. Small glass/bamboo vial of clear water with river stone charm, soft blue glow, respectful fictional motif, no text, readable at 32x32.
```

## item_mound_pebble

- Type: `item_icon`
- Source: `mound_pebble`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_mound_pebble.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Mound Pebble. Small clay-stained stone from a Duwende path, earthy brown with faint root flecks, readable at 32x32, no background.
```

## item_tiny_clay_charm

- Type: `item_icon`
- Source: `tiny_clay_charm`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_tiny_clay_charm.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Tiny Clay Charm. Small handmade clay token with simple fictional earth motif, harmless field-token feeling, warm brown and gold accents, readable at 32x32, no background.
```

## item_canopy_fur

- Type: `item_icon`
- Source: `canopy_fur`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_canopy_fur.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Canopy Fur. Small soft tuft caught from high forest branches, green-brown fur with leaf bits, readable silhouette, no gore, no background.
```

## item_drum_bark

- Type: `item_icon`
- Source: `drum_bark`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_drum_bark.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Drum Bark. Curved bark chip with faint hollow rhythm motif, amber sound-ring accents, forest-brown texture, readable at 32x32, no background.
```

## item_leaf_basket_fiber

- Type: `item_icon`
- Source: `leaf_basket_fiber`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_leaf_basket_fiber.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Leaf Basket Fiber. Tiny woven green leaf strand from Aghoy pathwork, soft forest glow, curled fiber silhouette, readable at 32x32, no background.
```

## item_shortcut_twig

- Type: `item_icon`
- Source: `shortcut_twig`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_shortcut_twig.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Shortcut Twig. Small curved twig that subtly points toward a path, green leaf tip, gentle compass-like feel without text or symbols, readable at 32x32, no background.
```

## item_nightmare_bark

- Type: `item_icon`
- Source: `nightmare_bark`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_nightmare_bark.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Nightmare Bark. Dark old-wood splinter with violet dream haze and faint root texture, eerie but not graphic, readable at 32x32, no background.
```

## item_old_housepost_splinter

- Type: `item_icon`
- Source: `old_housepost_splinter`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_old_housepost_splinter.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG inventory icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Old Housepost Splinter. Brittle shard of aged wooden post with muted gold crack lines and violet shadow tint, respectful fictional nightmare material, readable at 32x32, no background.
```

## equipment_training_bolo

- Type: `equipment_icon`
- Source: `training_bolo`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_training_bolo.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG equipment icon for Training Bolo. Clear practical starter blade silhouette, woven grip, brass and wood accents, no text, readable at 32x32.
```

## equipment_woven_vest

- Type: `equipment_icon`
- Source: `woven_vest`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_woven_vest.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG equipment icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Woven Vest armor. Light protective vest made of woven fibers and forest cloth, warm tan with green trim, clear armor silhouette, readable at 32x32.
```

## equipment_river_charm

- Type: `equipment_icon`
- Source: `river_charm`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_river_charm.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG equipment icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for River Charm. Small charm with river stone, blue cord, bamboo or shell detail, gentle movement motif, player accessory, readable at 32x32.
```

## equipment_leaf_thread_charm

- Type: `equipment_icon`
- Source: `leaf_thread_charm`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_leaf_thread_charm.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG companion equipment icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Leaf-Thread Charm. Tiny woven green charm for a bonded Nilalang companion, leaf fibers, soft firefly glow, gentle forest blessing, readable at 32x32.
```

## equipment_balete_keepsake

- Type: `equipment_icon`
- Source: `balete_keepsake`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_balete_keepsake.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG companion equipment icon, true transparent PNG with alpha transparency, no checkerboard, no background, no text, no logo. Create a polished 64x64 icon for Balete Keepsake. Small keepsake made from cleared shrine remnants, old root bead, muted gold tie, dark bark accent, protective companion gear, readable at 32x32, not ominous.
```

## map_preview_barangay

- Type: `map_preview`
- Source: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/maps/preview_barangay_san_isidro.png`
- Size target: 1024x1024

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a top-down map preview for Barangay San Isidro with player house, barangay hall, small chapel, marketplace, rice fields, balete tree path, and forest entrance. Clear paths and collision landmarks, no labels or text.
```

## battle_player_customizable_base

- Type: `battle_actor_sprite`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/battle/characters/battle_player_customizable_base.png`
- Size target: PNG battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for ALAMAT, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each cell exactly 256x256 pixels. Row 1 is battle idle frames 1-4, row 2 is battle attack frames 1-4. Side-facing 3/4 battle perspective, protagonist facing right, readable silhouette, practical traveler clothing inspired by woven fibers and natural materials. Keep full body inside every cell with at least 24px transparent padding. No shadows or effects crossing cell boundaries.
```

## battle_nilalang_mon0038_aghoy

- Type: `battle_actor_sprite`
- Source: `MON0038`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0038_aghoy.png`
- Size target: PNG battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Aghoy, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each cell exactly 256x256 pixels. Row 1 is battle idle frames 1-4, row 2 is battle attack frames 1-4. Side-facing 3/4 battle perspective, Aghoy facing right as a companion. Small forest helper spirit, shy but brave, leaf cloak, root charm, soft firefly glow contained inside the cell. Keep full body inside every cell with at least 24px transparent padding. No shadows or effects crossing cell boundaries.
```

## battle_nilalang_mon0032_duwende

- Type: `battle_actor_sprite`
- Source: `MON0032`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0032_duwende.png`
- Size target: PNG battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Duwende, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each cell exactly 256x256 pixels. Row 1 is battle idle frames 1-4, row 2 is battle attack frames 1-4. Side-facing 3/4 battle perspective, enemy variant facing left. Small earthy house-spirit, mound motifs, rattan and leaf details, mysterious but not grotesque. Keep full body inside every cell with at least 24px transparent padding. No shadows or effects crossing cell boundaries.
```

## battle_nilalang_mon0028_ungo

- Type: `battle_actor_sprite`
- Source: `MON0028`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0028_ungo.png`
- Size target: PNG battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Ungo, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each cell exactly 256x256 pixels. Row 1 is battle idle frames 1-4, row 2 is battle attack frames 1-4. Side-facing 3/4 battle perspective, enemy variant facing left. Strong forest creature, muscular but readable, moss and bark accents, alert stance, not grotesque. Keep full body inside every cell with at least 24px transparent padding. No shadows or effects crossing cell boundaries.
```

## battle_nilalang_mon0007_batibat

- Type: `battle_actor_sprite`
- Source: `MON0007`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0007_batibat.png`
- Size target: PNG battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG boss battle sprite sheet for Batibat, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each cell exactly 256x256 pixels. Row 1 is battle idle frames 1-4, row 2 is battle attack frames 1-4. Side-facing 3/4 battle perspective, boss enemy facing left. Heavy old-wood nightmare tree-mother presence, roots and housepost details, eerie but not graphic. Keep full body inside every cell with at least 16px transparent padding. No shadows or effects crossing cell boundaries.
```

## skill_vfx_basic_strike

- Type: `skill_vfx`
- Source: `basic_strike`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_basic_strike.png`
- Size target: PNG VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a short melee impact slash for Basic Strike, neutral pale-gold arc, readable at battle scale, contained inside each cell, no background.
```

## skill_vfx_river_cut_projectile

- Type: `skill_vfx`
- Source: `river_cut`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_river_cut_projectile.png`
- Size target: PNG projectile sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG projectile VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a long-range River Cut water slash projectile that travels horizontally from caster to enemy, blue river arc with small foam and light, readable while moving, no background. Keep the main projectile centered in each frame and contained enough for smooth travel.
```

## skill_vfx_woven_resolve_aura

- Type: `skill_vfx`
- Source: `woven_resolve`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_woven_resolve_aura.png`
- Size target: PNG aura sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG support skill VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a self-buff aura for Woven Resolve, warm gold woven thread circle and gentle green light rising around the caster, contained inside each cell, no background.
```

## skill_vfx_leaf_tap_projectile

- Type: `skill_vfx`
- Source: `leaf_tap`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_leaf_tap_projectile.png`
- Size target: PNG projectile sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG projectile VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a small forest leaf projectile for Leaf Tap that travels horizontally from companion to enemy, green leaf flick with tiny wind trail, readable but subtle, no background.
```

## skill_vfx_steady_guard_aura

- Type: `skill_vfx`
- Source: `steady_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_steady_guard_aura.png`
- Size target: PNG aura sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG defensive support VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a self-guard aura for Steady Guard, compact golden-brown shield shimmer with woven reed patterns and soft dust motes around the caster, contained inside each cell, no background.
```

## skill_vfx_balangay_drive_slash

- Type: `skill_vfx`
- Source: `balangay_drive`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_balangay_drive_slash.png`
- Size target: PNG melee VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG melee impact VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a committed forward impact slash for Balangay Drive, warm wood-and-gold boat-prow energy arc with a small current wake, heavier than Basic Strike, centered on the target, contained inside each cell, no background.
```

## skill_vfx_mound_pebble_projectile

- Type: `skill_vfx`
- Source: `mound_pebble`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_mound_pebble_projectile.png`
- Size target: PNG projectile sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG earth projectile VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a small thrown earth pebble projectile for Mound Pebble, brown stone chip with tiny dust trail and faint root flecks, traveling horizontally from caster to target, readable at battle scale, no background.
```

## skill_vfx_underfloor_mischief_snare

- Type: `skill_vfx`
- Source: `underfloor_mischief`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_underfloor_mischief_snare.png`
- Size target: PNG status VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG status attack VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create an earth trickster snare for Underfloor Mischief, small floor cracks, root loops, dust puffs, and playful brown-gold sparks appearing under the target, contained inside each cell, no background.
```

## skill_vfx_canopy_crash_impact

- Type: `skill_vfx`
- Source: `canopy_crash`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_canopy_crash_impact.png`
- Size target: PNG melee VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG beast impact VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a heavy falling forest impact for Canopy Crash, green-brown downward claw arc, leaf burst, bark chips, and compressed impact ring centered on the target, energetic but readable, no background.
```

## skill_vfx_wild_drum_chestbeat_aura

- Type: `skill_vfx`
- Source: `wild_drum_chestbeat`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_wild_drum_chestbeat_aura.png`
- Size target: PNG support VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG support rhythm VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a self-buff aura for Wild Drum Chestbeat, pulsing amber sound rings, leaf vibration marks, and beast-energy rhythm around the caster, contained inside each cell, no background.
```

## skill_vfx_hidden_basket_gift_aura

- Type: `skill_vfx`
- Source: `hidden_basket_gift`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_hidden_basket_gift_aura.png`
- Size target: PNG support VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG helpful forest support VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a gentle self-buff aura for Hidden Basket Gift, tiny woven basket charm opening with green-gold leaves, firefly specks, and soft circular blessing light around the caster, contained inside each cell, no background.
```

## skill_vfx_aghoy_guiding_rustle_aura

- Type: `skill_vfx`
- Source: `aghoy_guiding_rustle`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_aghoy_guiding_rustle_aura.png`
- Size target: PNG support VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG companion support VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a guiding forest rustle aura for Aghoy's Guiding Rustle, small swirling leaves, gentle green wind lines, firefly pinpoints, and a safe-path shimmer around the caster, contained inside each cell, no background.
```

## skill_vfx_weight_of_the_old_post_pressure

- Type: `skill_vfx`
- Source: `weight_of_the_old_post`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_weight_of_the_old_post_pressure.png`
- Size target: PNG magic VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG dream-magic impact VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a nightmare pressure impact for Weight of the Old Post, dark violet wooden post silhouette descending as heavy translucent force, root-like pressure lines, muted gold cracks, centered on the target, eerie but not graphic, no background.
```

## skill_vfx_housepost_nightmare_sleep

- Type: `skill_vfx`
- Source: `housepost_nightmare`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_housepost_nightmare_sleep.png`
- Size target: PNG status VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true transparent background

```text
Hand-painted HD 2D Filipino fantasy RPG sleep status VFX sprite sheet, true transparent PNG with alpha transparency, no checkerboard, no background, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a dreamlike sleep-and-fear mist for Housepost Nightmare, violet shadow haze, tiny pale motes, faint old-wood ring, and soft downward pressure around the target, contained inside each cell, no background, no text symbols.
```
