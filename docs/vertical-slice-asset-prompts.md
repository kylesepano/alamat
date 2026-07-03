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
- Size target: PNG tileset, 1024x1024 canvas, 48x48-compatible top-down tiles, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a 48x48 top-down RPG tileset for Barangay San Isidro. Include village paths, nipa-style homes, barangay hall accents, marketplace ground, rice field edges, chapel courtyard stones, garden plants, fences, water jars, and collision-friendly landmarks. Seamless tiles, no text.
```

## tileset_balete_forest

- Type: `tileset`
- Source: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.png`
- Size target: PNG tileset, 1024x1024 canvas, 48x48-compatible top-down tiles, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a 48x48 top-down RPG tileset for Balete Forest. Include forest floor, moss, root paths, balete roots, bamboo thickets, firefly clearings, riverbank edges, rocks, hidden item spots, and collision-friendly tree trunks. Seamless tiles, no text.
```

## tileset_spirit_shrine

- Type: `tileset`
- Source: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.png`
- Size target: PNG tileset, 1024x1024 canvas, 48x48-compatible top-down tiles, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a 48x48 top-down RPG tileset for a fictional Spirit Shrine threshold. Include stone paths, shrine platform, mist pools, candle/offering spots, woven banners, ancient roots, luminous spirit tiles, and boss arena markings. No real religion as absolute truth, no text.
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
- Source: `ITM000001`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000001_healing_herb.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG inventory icon for Healing Herb. Small wrapped remedy, leaf bundle, woven fiber tie, clean healing silhouette, green and river accents, readable at 32x32 and 64x64, no text.
```

## item_itm000003_sacred_river_water

- Type: `item_icon`
- Source: `ITM000003`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000003_sacred_river_water.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG inventory icon for Sacred River Water. Small glass/bamboo vial of clear water with river stone charm, soft blue glow, respectful fictional motif, no text, readable at 32x32.
```

## equipment_eqp000001_bolo

- Type: `equipment_icon`
- Source: `EQP000001`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_EQP000001_bolo.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG equipment icon for Bolo. Clear blade silhouette, woven grip, brass and wood accents, river affinity detail, no text, readable at 32x32.
```

## equipment_eqp000003_kris

- Type: `equipment_icon`
- Source: `EQP000003`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_EQP000003_kris.png`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG equipment icon for Kris. Wavy blade silhouette, respectful fictional Filipino fantasy details, woven grip, subtle glow, no text, readable at 32x32.
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
