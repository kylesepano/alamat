# Vertical Slice 1 Asset Prompts

This document contains only the original ALAMAT vertical-slice assets for Barangay San Isidro,
the Marketplace, Chapel Courtyard, Balete Forest, and Spirit Shrine Threshold.

All map planning, tilesets, tile catalogs, compiled Tiled JSON and collision, map previews,
battle backgrounds, animated overlays, and placeable map-object prompts live in
`docs/vertical-slice-map-production-prompts.md`.

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
- Use PNG for generated actor spritesheets, item icons, equipment icons, and portraits.
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

## Map And Battle Environment Assets

All tilesets, map JSON, collision, map previews, battle backgrounds, and animated battle-environment overlays now live in `docs/vertical-slice-map-production-prompts.md`.

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

## npc_mon0040_umalagad_echo

- Type: `npc_sprite`
- Source: `MON0040`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_MON0040_umalagad_echo.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates. Keep the full body inside each 256x256 cell with padding on all sides and aligned feet. Do not include labels, frame borders, scenery, gradient backdrop, checkerboard, or painted background. Create an overworld chibi spirit-guide NPC sprite sheet for Umalagad Echo, a gentle ancestral echo at the Spirit Shrine Threshold. Ethereal blue-gold glow, woven spirit sash, translucent but readable body silhouette, calm guardian presence, respectful fictional Philippine fantasy tone, no horror tone, no real religious symbol, transparent background.
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

## npc_npc000002_lira_lakandula

- Type: `npc_sprite`
- Source: `NPC000002`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000002_lira_lakandula.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Lira Lakandula, the welcoming barangay guide in ALAMAT. Warm young-adult Filipino features, practical dark tied hair, modest woven village clothing in river blue, muted gold, and leaf green, small notice ledger and cloth satchel, approachable observant posture, clearly distinct from Babaylan Lira Dalisay. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 768x1024 pixels. Strict 3 columns x 4 rows, 12 frames, each cell exactly 256x256. Rows: down/front, left, right, up/back. Columns: idle, left-foot-forward walk, right-foot-forward walk. Columns 2 and 3 must be visibly opposite walking poses. Keep face, outfit, ledger, proportions, colors, and baseline consistent. Keep the full body inside each cell with at least 24px top padding and 16px below the feet. No checkerboard, background, scenery, labels, grid lines, borders, or elements crossing cell boundaries.
```

## ChatGPT Portrait And Quest Item Session Contract

Paste the following block once near the beginning of a ChatGPT asset-generation conversation. Keep using the same conversation for the slice so visual identity remains consistent. Also keep this file as the durable source of truth; chat memory alone is not a replacement for the saved prompt and file path.

```text
ALAMAT PORTRAIT AND QUEST ITEM ASSET MASTER RULES

Remember and apply these rules to every later ALAMAT portrait and collectible quest-item icon request in this conversation unless I explicitly replace a rule. Placeable map-object rules live in `docs/vertical-slice-map-production-prompts.md`.

Shared rules:
- Match the established hand-painted polished 2D Filipino fantasy RPG art direction.
- Keep cultural inspiration respectful, fictional, regionally varied, and free of caricature.
- Output exactly one final asset per request at the exact requested dimensions.
- Use PNG with real alpha transparency. The corner pixels must be transparent.
- Never draw a checkerboard, white canvas, colored canvas, scenery backdrop, text, letters, numbers, logo, watermark, UI frame, rarity border, drop shadow outside the silhouette, or contact sheet.
- Keep the subject fully inside the canvas with transparent padding. Do not crop important anatomy or identifying features.
- Preserve names, IDs, colors, clothing, materials, and silhouette from earlier approved assets in this conversation.
- Do not silently rename an asset or change its path. Repeat the requested filename after generation.

Dialogue portrait rules:
- Canvas exactly 512x512 pixels.
- One head-and-shoulders subject in a consistent three-quarter view.
- Keep the complete head, hair, ears, shoulders, and identifying accessory visible with at least 24 pixels of transparent padding.
- Face and eyes must remain readable when displayed at 96x96.
- Use consistent warm key light with biome-appropriate reflected light.
- Do not include speech bubbles, nameplates, hands blocking the face, full-body poses, scenery, or unrelated props.
- Save as frontend/public/assets/vertical-slice/portraits/portrait_[ENTITY_ID]_[slug].png.

Collectible quest-item icon rules:
- Canvas exactly 64x64 pixels.
- Show one centered collectible object with a strong silhouette and at least 6 pixels of transparent padding.
- Use a slight top-down three-quarter presentation and restrained lighting.
- The object must remain recognizable at 32x32.
- Do not include a hand, character, pedestal, inventory slot, quantity number, glow filling the canvas, or environment.
- Save as frontend/public/assets/vertical-slice/quests/icon_[QUEST_OR_ITEM_ID]_[slug].png.

Before generating, state the asset category, entity or quest ID, exact dimensions, and exact target filename in one short line. If any required value is missing, ask for it instead of inventing a permanent ID.
```

## Slice 1 Dialogue Portraits

## portrait_npc000001_datu_magsalin

- Type: `dialogue_portrait`
- Source: `NPC000001`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000001_datu_magsalin.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Datu Magsalin, barangay elder and arrival anchor in ALAMAT. Exact 512x512 PNG with true alpha transparency. Head-and-shoulders three-quarter view, mature Filipino features, calm grounded eyes, dark hair with silver at the temples, practical woven sash, weathered village-leader clothing, hint of a document bundle, authority expressed through responsibility rather than wealth. Warm tropical key light. No scenery, text, logo, frame, checkerboard, crown, weapon, religious symbol, caricature, or cropped head.
```

## portrait_npc000002_lira_lakandula

- Type: `dialogue_portrait`
- Source: `NPC000002`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000002_lira_lakandula.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Lira Lakandula, welcoming barangay guide in ALAMAT. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter view, warm young-adult Filipino features, attentive expression, practical tied dark hair, river-blue and leaf-green woven collar, cloth satchel strap and small notice ledger, approachable community-worker identity clearly distinct from Babaylan Lira Dalisay. No background, checkerboard, text, logo, frame, sacred symbol, weapon, caricature, or cropped head.
```

## portrait_npc000301_general_store

- Type: `dialogue_portrait`
- Source: `NPC000301`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000301_general_store.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of the Barangay General Store keeper in ALAMAT. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter view, friendly adult Filipino shopkeeper, practical tied hair, warm woven work shirt, small inventory cord and pencil, expression combining hospitality with sensible preparation advice. Brass, leaf-green, and faded market-cloth accents. No store scenery, shelves, text, logo, frame, checkerboard, exaggerated merchant stereotype, weapon, or cropped head.
```

## portrait_npc000481_blacksmith

- Type: `dialogue_portrait`
- Source: `NPC000481`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000481_blacksmith.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of the Barangay Blacksmith in ALAMAT. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter view, sturdy adult Filipino craftsperson, soot-marked but clean practical face, tied dark hair, woven shirt beneath a forge apron, small brass fastener and folded tool cloth, focused friendly expression. Warm forge rim light balanced by natural daylight. No forge background, text, logo, frame, checkerboard, raised weapon, caricature, or cropped head.
```

## portrait_npc000004_mayumi_bagwis

- Type: `dialogue_portrait`
- Source: `NPC000004`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000004_mayumi_bagwis.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Mayumi Bagwis, caretaker of the shared Chapel Courtyard in ALAMAT. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter view, warm Filipino features, composed thoughtful expression, dark braided hair, modest layered courtyard clothing with muted green, blue, and gold woven details, small garden tie and shared-lamp wick tool. Present her as a respectful community mediator without assigning one real religion as absolute truth. No background, text, logo, frame, checkerboard, exclusive sacred symbol, caricature, or cropped head.
```

## portrait_npc000582_babaylan_lira_dalisay

- Type: `dialogue_portrait`
- Source: `NPC000582`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000582_babaylan_lira_dalisay.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Babaylan Lira Dalisay, spiritual guide and Nilalang-trust mentor in the fictional ALAMAT universe. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter view, mature Filipino features, steady compassionate eyes, long dark hair with restrained silver strands, layered natural-fiber garments, woven sash, river-stone and leaf tokens using fictional motifs only, quiet blue-gold spirit light. Respectful and grounded, not exoticized. No background, checkerboard, text, logo, frame, copied sacred object, religious superiority, caricature, or cropped head.
```

## portrait_npc000008_kidlat_balagtas

- Type: `dialogue_portrait`
- Source: `NPC000008`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000008_kidlat_balagtas.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Kidlat Balagtas, experienced Balete Forest path watcher in ALAMAT. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter view, weathered adult Filipino features, alert dark eyes, practical tied hair, forest-green and earth-brown woven trail clothing, small route cord and bamboo marker, cautious expression shaped by respect for mound paths and old trees. Soft forest light. No forest background, text, logo, frame, checkerboard, weapon raised toward the viewer, caricature, or cropped head.
```

## portrait_mon0040_umalagad_echo

- Type: `dialogue_portrait`
- Source: `MON0040`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_MON0040_umalagad_echo.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Umalagad Echo, gentle ancestral echo at the Spirit Shrine Threshold in ALAMAT. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter spirit portrait, readable Filipino features, calm guardian expression, translucent blue-gold light, woven spirit sash and abstract fictional ancestral motifs, softly fading lower shoulders while the face remains clear. Respectful, protective, and free of horror imagery. No shrine background, checkerboard, text, logo, frame, copied sacred symbol, skull imagery, religious claim, or cropped head.
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
