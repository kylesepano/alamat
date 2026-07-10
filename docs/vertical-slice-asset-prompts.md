# Vertical Slice 1 Asset Prompts

This document contains only the original ALAMAT vertical-slice assets for Barangay San Isidro,
the Marketplace, Chapel Courtyard, Balete Forest, and Spirit Shrine Threshold.

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

## Battle Background Standard

Battle backgrounds are map-location-specific PNG images drawn behind battle actors and UI. They are not tilemaps and do not need collision.

- File type: PNG
- Exact canvas size: 1280x720 pixels
- No text, logos, labels, UI, characters, Nilalang, items, or attack effects
- Use side-facing 2.5D RPG battle backdrop perspective
- Keep the lower third as a readable battle floor/platform
- Keep contrast moderate so actors, HP bars, and skill VFX remain clear

## Animated Battle Background Overlay Standard

Use these SVG overlays on top of PNG battle backgrounds when the scene needs motion without replacing the painted background. The PNG remains the main art; the SVG adds subtle movement only.

- File type: animated SVG
- ViewBox/canvas: 1280x720
- Transparent background
- No raster embeds, no JavaScript, no CSS files, no text, no logos
- Use only inline SVG shapes, gradients, filters, SMIL `animate`, and `animateTransform`
- Keep animation subtle so it never competes with sprites, HP bars, skill VFX, or battle commands
- Good animation elements: drifting mist, firefly glows, soft water shimmer, distant leaf movement, smoke wisps, spiritual motes
- Bad animation elements: full-screen flashing, large moving objects, hard strobe effects, camera shake, readable symbols from real religions

## battle_background_overlay_barangay

- Type: `battle_background_overlay`
- Source map: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_encounter_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Barangay San Isidro battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add gentle late-afternoon dust motes, soft leaf drift near the edges, and faint warm light shimmer close to the ground. Keep the center and lower battle floor readable for chibi battle sprites. Use respectful fictional Filipino fantasy village atmosphere. The overlay must be subtle and transparent, designed to sit over a painted PNG battle background.
```

## battle_background_overlay_marketplace

- Type: `battle_background_overlay`
- Source map: `WLOC000002`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_marketplace_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Barangay Marketplace battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add slow forge smoke wisps in the rear, tiny floating dust motes, and soft warm glints near market awnings. Keep the battle floor clear and avoid busy motion near actors. Respectful fictional Filipino fantasy market mood. The overlay must be transparent and designed to sit over a painted PNG background.
```

## battle_background_overlay_chapel_courtyard

- Type: `battle_background_overlay`
- Source map: `WLOC000003`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_chapel_courtyard_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Chapel Courtyard battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add quiet floating pollen, barely moving woven banner hints at the far edges, and soft daylight motes. Keep the scene respectful and fictional, with mixed cultural influences but no real-world religious symbols. Keep the center and lower battle floor clear for sprites and VFX.
```

## battle_background_overlay_balete_forest

- Type: `battle_background_overlay`
- Source map: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_balete_forest_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Balete Forest battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add drifting mist, tiny firefly glow pulses, faint leaf movement at the top edges, and a soft humid forest shimmer. Keep the center and lower battle floor readable and do not obscure actors. Respectful fictional Philippine folklore-inspired forest mood, not horror.
```

## battle_background_overlay_spirit_shrine

- Type: `battle_background_overlay`
- Source map: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_spirit_shrine_overlay.svg`
- Size target: animated SVG overlay, 1280x720 viewBox, transparent background

```text
Create an animated SVG overlay for an ALAMAT Spirit Shrine Threshold battle background, 1280x720 viewBox, transparent background, no text, no logo, no raster images, no JavaScript, no external CSS. Use subtle SMIL animation only. Add slow blue-gold spirit motes, faint root glow pulses, and thin drifting mist. Keep all motion gentle and avoid real-world religious symbols. Leave the center and lower battle floor clear for large boss sprites, HP bars, and skill VFX. The overlay must be transparent and designed to sit over a painted PNG battle background.
```

## battle_background_barangay

- Type: `battle_background`
- Source map: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_encounter.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a Barangay San Isidro opening-village battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable lower battle floor. Warm tropical village edge: packed earth, soft grass, woven fence hints, nipa-style roof silhouettes in the distance, gentle late-afternoon light. Respectful fictional Philippine fantasy tone, clean readable shapes, moderate contrast so chibi sprites and VFX stand out.
```

## battle_background_marketplace

- Type: `battle_background`
- Source map: `WLOC000002`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_barangay_marketplace.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a Barangay San Isidro marketplace battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable lower packed-earth battle floor. Midground hints of woven awnings, forge smoke, baskets, crates, and market stalls, all softly pushed back so battle actors remain readable. Warm tropical village craft-market mood, respectful fictional Philippine fantasy tone, moderate contrast, no busy clutter in the combat floor.
```

## battle_background_chapel_courtyard

- Type: `battle_background`
- Source map: `WLOC000003`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_chapel_courtyard.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a respectful fictional chapel courtyard battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable stone-and-earth lower battle floor. Midground garden edges, courtyard stones, woven banners, and quiet community architecture inspired by mixed historical influences without declaring any real religion as absolute truth. Gentle daylight, clean silhouettes, moderate contrast, leave clear space for sprites and VFX.
```

## battle_background_balete_forest

- Type: `battle_background`
- Source map: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_balete_forest.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a Balete Forest battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable moss-and-root battle floor in the lower third. Large balete roots and layered forest silhouettes in the midground, firefly glimmers, dense leaves, humid green atmosphere, respectful fictional Philippine folklore inspiration. Keep contrast moderate and avoid hiding battle sprites.
```

## battle_background_spirit_shrine

- Type: `battle_background`
- Source map: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_spirit_shrine.png`
- Size target: PNG battle background, exact 1280x720 canvas

```text
Hand-painted HD 2D Filipino fantasy RPG battle background, PNG, 1280x720, no text, no logo, no characters, no UI, no enemies, no items. Create a fictional Spirit Shrine Threshold battle backdrop for ALAMAT. Side-facing 2.5D RPG battle perspective with a readable old stone-and-root battle floor in the lower third. Luminous roots, mist, woven banners, old stones, subtle blue-gold spiritual glow, respectful fantasy tone without portraying any real religion as absolute truth. Keep the boss arena readable and leave space for large enemy sprites.
```

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

## tileset_barangay_san_isidro

- Type: `tileset`
- Source: `WLOC000001`
- Used by map: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, 48x48 per tile, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact PNG tileset. Canvas must be exactly 960x960 pixels, not larger. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Do not draw visible grid lines, gutters, white separators, black separators, tile borders, frame borders, or spacing between tiles; tiles must touch edge-to-edge cleanly for a game engine. Create the Barangay San Isidro opening-village tileset for ALAMAT. Include walkable grass, packed-earth village paths with straight/corner/T/intersection/end-cap variants, small plaza ground, rice field edge/corner/center tiles, garden edge/corner/center tiles, nipa-style house wall/roof/corner/door/window tiles, barangay hall wall/roof/corner/door/window tiles, water jars, small plants, and clear blocked obstacle tiles. Include a connected fence set: horizontal, vertical, top-left corner, top-right corner, bottom-left corner, bottom-right corner, T-junctions, gate, end-caps. Fence pieces must visually connect without gaps when placed on neighboring 48x48 tiles. Collision readability is required: walkable tiles must look open; blocked tiles must look solid. Do not include labels, UI markers, logos, or baked-in characters.
```

## Production Tileset Requirements

Apply these requirements to every generated map tileset:

- Exact `960x960` PNG only. The file must be exactly `960x960` pixels, exactly `20 columns x 20 rows`, exactly `48x48` per tile.
- Do not output `1024x1024`, `1254x1254`, square contact sheets, preview boards, or any larger canvas. If the generator cannot produce exactly `960x960`, regenerate or crop before using it in the game.
- No visible grid lines, no gutters, no separators, no borders, no labels, no UI, no characters.
- Include full connected/autotile-style families for the dominant terrain types:
    - center
    - horizontal
    - vertical
    - top edge
    - bottom edge
    - left edge
    - right edge
    - four outer corners
    - four inner corners
    - T-junctions
    - cross/intersection
    - end-caps
- Include transition tiles between major surfaces, such as grass-to-path, grass-to-stone, path-to-plaza, forest-floor-to-root, shrine-floor-to-root.
- Include decorative overlays separate from base ground when possible: flowers, leaves, pebbles, cracks, moss, small grass tufts.
- Include collision-readable object sets with complete connected pieces: fences, walls, root barriers, stone borders, counters, market stalls, building edges.
- Keep tile families grouped together in predictable rows so Tiled/LDtk mapping is easier.
- Do not make every tile highly detailed. Production tilesets need quiet filler tiles, edge tiles, and focal decorative tiles.
- Avoid one-off random tiles that cannot connect cleanly to neighbors.

## Production Map Layout Requirements

Apply these requirements to every generated map JSON:

- Use larger explorable maps, not tiny demo rooms.
- Keep tile size `48x48`.
- Use one embedded tileset entry with `firstgid: 1`, `tilewidth: 48`, `tileheight: 48`, `columns: 20`, `tilecount: 400`, `imagewidth: 960`, `imageheight: 960`, `spacing: 0`, and `margin: 0`. Never use an external TSX/TSJ `source`.
- Treat every cell in the `960x960` tilesheet as an independently selectable `48x48` tile. Global tile IDs are stable and row-major: `tileId = row * 20 + column + 1`; use `0` for an empty cell.
- Store every tile layer as an uncompressed flat integer `data` array with exactly `map width * map height` entries. Do not use base64, compression, infinite-map chunks, encoded strings, nested row arrays, or image layers.
- Include a `tiles` catalog inside the embedded tileset for every tile ID used by the map. Give each catalog entry properties named `semantic`, `terrain_group`, `variant`, and `walkability` so a tile can be found and replaced without inspecting the artwork.
- Use non-linear routes: loops, branches, bends, small clearings, side paths, optional corners, and short dead ends with rewards or lore.
- Do not place important waypoints in a straight left-to-right line.
- Do not place all characters, exits, shops, and quest objects on one horizontal road.
- Put characters and interactables in `Objects`, `Transitions`, and `Encounters` object layers only. Do not bake characters, NPCs, Nilalang, labels, quest icons, or UI markers into tile layers.
- Every important object must be reachable by at least two turns or a clear path, not placed inside collision.
- Collision must be authored as object rectangles in the `Collision` object layer.
- Keep collision independent from visual tile IDs. A visual tile may be replaced without silently changing collision.
- Align collision rectangles to the `48x48` grid wherever possible. Each collision object must have a stable string `id`, a descriptive `name`, and properties `collision_kind`, `blocks_player`, and `blocks_companion`.
- Use multiple small, meaningful collision rectangles around actual obstacles instead of one huge rectangle over an entire area. Gates, bridges, openings, shallow crossings, and shortcuts must remain separate so they can be enabled or disabled later.
- Add map properties `schema_version`, `tileset_key`, and `tile_id_formula`. Add stable layer IDs and object IDs; never reuse an ID for a different object.
- Use multiple visible tile layers: `Ground`, `Ground Detail`, `Path`, `Path Detail`, `Decor`, `Upper Decor`, then object layers.
- Larger maps should include meaningful negative space, landmarks, and navigational rhythm, not dense random decoration everywhere.
- Keep exits near believable edges, but vary their positions: corners, bends, gates, bridges, courtyards, forest openings, shrine thresholds.

## tileset_barangay_marketplace

- Type: `tileset`
- Source: `WLOC000002`
- Used by map: `WLOC000002`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_marketplace.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, 48x48 per tile, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact production-level PNG tileset for Barangay San Isidro Marketplace. Canvas must be exactly 960x960 pixels, not larger. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Do not draw visible grid lines, gutters, separators, tile borders, frame borders, or spacing between tiles; tiles must touch edge-to-edge cleanly for a game engine. Include packed earth market ground, worn path full connected set, stall floor full connected set, woven awning stall parts, counter/table full connected set, crate/barrel/sack clusters, forge floor, anvil, furnace, workbench, display racks, baskets, signs without text, and blocked stall/forge/object tiles. Include connected fence/rope/barrier pieces with horizontal, vertical, corners, T-junctions, gate, and end-caps that connect without gaps when placed next to each other. Include quiet filler tiles plus focal decorative tiles. Walkable tiles must look open; blocked tiles must look solid. No characters, UI, labels, logos, or baked-in NPCs.
```

## tileset_chapel_courtyard

- Type: `tileset`
- Source: `WLOC000003`
- Used by map: `WLOC000003`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_chapel_courtyard.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, 48x48 per tile, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact production-level PNG tileset for a respectful fictional Barangay Chapel Courtyard. Canvas must be exactly 960x960 pixels, not larger. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Do not draw visible grid lines, gutters, separators, tile borders, frame borders, or spacing between tiles; tiles must touch edge-to-edge cleanly for a game engine. Include courtyard grass, stone path full connected set, chapel/courtyard building wall/roof/corner/door/window tiles, garden edge/corner/center tiles, small non-specific community shrine/courtyard ornament tiles, benches, flower beds, woven banners, low stone borders, and blocked building/garden/object tiles. Include connected low fence/stone border pieces with horizontal, vertical, corners, T-junctions, gate, and end-caps that connect without gaps. Include quiet filler tiles plus focal decorative tiles. Use mixed cultural influences respectfully without declaring any real religion as absolute truth. No characters, UI, labels, logos, or baked-in NPCs.
```

## tileset_balete_forest

- Type: `tileset`
- Source: `WLOC000004`
- Used by map: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, per tile, no text
  48x48

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact production-level PNG tileset. Canvas must be exactly 960x960 pixels, not larger. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Do not draw visible grid lines, gutters, white separators, black separators, tile borders, frame borders, or spacing between tiles; tiles must touch edge-to-edge cleanly for a game engine. Create the Balete Forest vertical-slice tileset for ALAMAT. Include walkable moss floor, leaf floor, narrow root path full connected set, firefly clearing floor, riverbank edge/corner/inner-corner tiles, balete root wall full connected set, balete trunk pieces, bamboo thicket connected pieces, rocks, dense shrubs, hidden item spot tiles, and blocked root/thicket obstacle tiles. Include quiet filler tiles plus focal decorative tiles. Collision readability is required: walkable forest paths must look open; blocked roots, trunks, rocks, and thickets must look solid. Do not include labels, UI markers, logos, or baked-in characters.
```

## tileset_spirit_shrine

- Type: `tileset`
- Source: `WLOC000009`
- Used by map: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.png`
- Size target: PNG tileset, exact 960x960 canvas, 20 columns x 20 rows, 48x48 per tile, no text

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact production-level PNG tileset. Canvas must be exactly 960x960 pixels, not larger. Use a strict 20 columns x 20 rows grid, 400 tiles total, each tile exactly 48x48 pixels. Do not draw visible grid lines, gutters, white separators, black separators, tile borders, frame borders, or spacing between tiles; tiles must touch edge-to-edge cleanly for a game engine. Create the fictional Spirit Shrine Threshold vertical-slice tileset for ALAMAT. Include walkable stone floor full connected set, shrine path full connected set, mist floor, luminous root floor, boss arena floor, shrine platform edge/corner/center tiles, offering spot tiles, woven banner details, ancient root barrier full connected set, side stones, spirit-lit stones, and blocked shrine structure tiles. Include quiet filler tiles plus focal decorative tiles. Keep the fantasy spiritual tone respectful and fictional; do not portray any real religion as absolute truth. Collision readability is required: walkable shrine floor must look open; blocked shrine structures, stones, and root barriers must look solid. Do not include labels, UI markers, logos, or baked-in characters.
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
- The tilesheet is exactly 960x960 pixels: 20 columns x 20 rows, 400 independently selectable 48x48 tiles.
- Embed the complete tileset definition directly in `tilesets[0]`. Do not return a `source` field or an external TSX/TSJ dependency.
- Use `firstgid: 1`, `columns: 20`, `tilecount: 400`, `imagewidth: 960`, `imageheight: 960`, `spacing: 0`, and `margin: 0`.
- Use row-major global tile IDs: tileId = row * 20 + column + 1. Use 0 only for an empty tile.
- Every tile layer must contain an uncompressed flat integer data array of exactly width * height entries. Never use base64, compression, chunks, encoded strings, or nested row arrays.
- Include tileset tile properties for every used tile ID: semantic, terrain_group, variant, and walkability.
- Use integer tile coordinates only.
- Use larger explorable maps. Do not make a tiny test room.
- Use separate tile layers named Ground, Ground Detail, Path, Path Detail, Decor, Upper Decor.
- Use separate object layers named Collision, Objects, Transitions, Encounters.
- Place NPCs, Nilalang, items, save points, shops, bosses, and quest interactables only in object layers.
- Do not bake characters, labels, quest icons, UI markers, or dialogue markers into tile layers.
- Collision must match blocked structures, walls, fences, thick roots, buildings, water, rocks, and major props.
- Collision is authoritative and independent from visible tile choices. Put it only in the Collision object layer as editable rectangles aligned to the 48x48 grid wherever possible.
- Every collision rectangle needs a stable string key and properties collision_kind, blocks_player, and blocks_companion.
- Split fences, walls, shorelines, roots, structures, and map borders into logical collision sections. Preserve explicit gaps for gates, doors, bridges, crossings, and shortcuts.
- Objects must use the exact important story roles provided, but their coordinates should be placed dynamically within the larger map.
- Do not invent extra named NPCs, bosses, shops, save points, or quest-critical objects.
- Do not place visual obstacles on walkable tiles.
- Do not place walkable-looking paths on blocked tiles.
- Keep all NPCs, items, transitions, save points, and encounters reachable.
- Important waypoints must not form a straight left-to-right line.
- Use loops, side paths, bends, landmarks, courtyards, gates, forest clearings, shrine thresholds, and optional pockets.
- Place transitions near believable edges, but vary them by map: corners, gates, forest openings, bridges, side paths, or shrine thresholds.
- Treat the map spec as the gameplay source of truth.
- Return JSON that is easy to import or convert into Tiled/Phaser.

Return:
1. Tile catalog listing each used tile's global ID, tilesheet row, tilesheet column, semantic, terrain_group, variant, and walkability.
2. Tiled-style JSON draft with an embedded tileset, width, height, tilewidth, tileheight, uncompressed flat tile-layer arrays, object layers, editable collision rectangles, and map properties.
3. A short validation checklist listing all reachable objects and all blocked rectangles.
4. Any assumptions made.

Map spec:
[PASTE ONE EXPANDED MAP SPEC HERE]
```

## Current Vertical Slice Map Plan

These are the five maps that exist in the first playable vertical stage right now:

- `WLOC000001` Barangay San Isidro: opening safe zone, Balon spawn/save point, Datu, Lira, first herb, marketplace exit.
- `WLOC000002` Barangay Marketplace: shop, blacksmith/crafting, exits back to barangay and chapel courtyard.
- `WLOC000003` Chapel Courtyard: Mayumi, Babaylan Lira Dalisay, cultural worldbuilding, exit to Balete Forest.
- `WLOC000004` Balete Forest: first danger zone, random encounters, Duwende/Ungo/Aghoy quest encounters, Kidlat, exit to shrine.
- `WLOC000009` Spirit Shrine Threshold: Shrine Balon, Umalagad Echo, Batibat boss, post-boss bonding context.

Map art should support this exact flow: safe village learning, marketplace preparation, chapel/cultural context, forest danger, shrine boss.

## Vertical Slice Map Generation Order

Generate map assets in this order:

1. `tileset_barangay_san_isidro.png`
2. `tileset_barangay_marketplace.png`
3. `tileset_chapel_courtyard.png`
4. `tileset_balete_forest.png`
5. `tileset_spirit_shrine.png`
6. Expanded map JSON drafts for `WLOC000001`, `WLOC000002`, `WLOC000003`, `WLOC000004`, and `WLOC000009`
7. Map preview PNGs for the same five maps
8. Battle background PNGs and animated SVG overlays for the same five maps

Playable collision should come from the map JSON or the existing map data, not from the preview PNG.

## Collision-Aware Tileset Prompt Add-On

Add this paragraph to any tileset prompt when generating production-ready map art:

```text
Design every tile so collision is visually obvious. Walkable tiles must read as open ground, paths, floor, shallow grass, bridge surface, or shrine floor. Blocked tiles must read as solid obstacles such as house walls, tree trunks, thick roots, cliffs, fences, market stalls, stone monuments, deep water, dense bamboo, large rocks, or shrine structures. Include clear edge and corner tiles so blocked rectangles can be assembled cleanly on a 48x48 grid. Do not place important visual obstacles inside walkable ground tiles. Do not create decorative clutter that looks blocked unless it is intended to be a blocked tile.
```

## Expanded Map Specs

These specs define the next larger playable vertical-slice maps. Use them when generating map JSON drafts, Tiled references, or LDtk layouts. They intentionally replace the smaller blockout dimensions.

### WLOC000001 Barangay San Isidro

- Type: `map_json`
- Source: `WLOC000001`
- Map name: `Barangay San Isidro`
- Replace file: `frontend/public/data/maps/WLOC000001_barangay_san_isidro.json`
- Grid: 40 columns x 30 rows
- Tile size: 48x48
- Safe zone: yes
- Tileset: barangay
- Required object-layer characters/interactables: Balon Deepwell, Datu Magsalin, Lira Lakandula, Healing Herb, Marketplace transition
- Layout direction: opening village hub with branching paths, small homes, rice field, garden, barangay hall, Balon corner, and at least one optional side path

```text
Create a collision-aware Tiled/Phaser map JSON for Barangay San Isidro, 40 tiles wide by 30 tiles high, tile size 48x48. This is the opening safe zone and should feel like a real explorable village, not a small test room. Use tile layers named Ground, Ground Detail, Path, Path Detail, Decor, Upper Decor, and object layers named Collision, Objects, Transitions, Encounters. Place characters and interactables only in object layers, not baked into tile art. Required objects: Balon Deepwell save/spawn point, Datu Magsalin, Lira Lakandula, Healing Herb pickup, Marketplace transition. Do not place these in a straight left-to-right line. Use a looping village path with branches: one branch to the Balon, one to the barangay hall/Datu, one to Lira near a quiet garden, one to the rice field/herb, and one to the marketplace gate. Include collision rectangles for houses, barangay hall, fences, rice field edges, garden borders, water jars/large props, and map borders. Keep all required objects reachable and leave enough open walkable space for movement and companion following. No labels, no UI markers, no baked-in characters.
```

## map_preview_barangay_san_isidro

- Type: `map_preview`
- Source: `WLOC000001`
- Map name: `Barangay San Isidro`
- Replace file: `frontend/public/assets/vertical-slice/maps/preview_barangay_san_isidro.png`
- Size target: PNG map preview, exact 1920x1440 canvas, 40 columns x 30 rows, 48x48 per tile, no text

```text
Create a top-down map preview for Barangay San Isidro, exact 1920x1440 pixels, 40x30 tiles at 48x48 scale. Show an explorable village layout with branching paths, houses, barangay hall, rice field, garden, Balon area, and marketplace gate. No labels, no UI, no characters, no NPCs, no enemies, no quest icons.
```

### WLOC000002 Barangay Marketplace

- Type: `map_json`
- Source: `WLOC000002`
- Map name: `Barangay Marketplace`
- Replace file: `frontend/public/data/maps/WLOC000002_barangay_marketplace.json`
- Grid: 38 columns x 28 rows
- Tile size: 48x48
- Safe zone: yes
- Tileset: marketplace
- Required object-layer characters/interactables: General Store, Blacksmith, Barangay transition, Chapel Courtyard transition
- Layout direction: preparation hub with market aisles, forge area, shop stall area, side storage pockets, and angled/branching paths

```text
Create a collision-aware Tiled/Phaser map JSON for Barangay Marketplace, 38 tiles wide by 28 tiles high, tile size 48x48. This is a preparation hub with shop and crafting. Use tile layers named Ground, Ground Detail, Path, Path Detail, Decor, Upper Decor, and object layers named Collision, Objects, Transitions, Encounters. Place General Store and Blacksmith as object-layer NPC/shop/crafting entries, not baked into the art. Do not arrange the shop, blacksmith, and exits on one horizontal line. Build a market with branching aisles, stall rows, a forge/workbench area, crate pockets, and at least one curved or L-shaped route between exits. Barangay transition should feel like a village road/gate. Chapel Courtyard transition should be at a different edge or corner, not directly opposite in a straight line. Add collision rectangles for stalls, forge, tables, crates, counters, fences/barriers, and map borders. Keep all shop/crafting/exits reachable. No labels, no UI markers, no baked-in characters.
```

## map_preview_barangay_marketplace

- Type: `map_preview`
- Source: `WLOC000002`
- Map name: `Barangay Marketplace`
- Replace file: `frontend/public/assets/vertical-slice/maps/preview_barangay_marketplace.png`
- Size target: PNG map preview, exact 1824x1344 canvas, 38 columns x 28 rows, 48x48 per tile, no text

```text
Create a top-down map preview for Barangay Marketplace, exact 1824x1344 pixels, 38x28 tiles at 48x48 scale. Show a lively but readable marketplace with branching aisles, store stall, blacksmith forge, crates, counters, and two exits at different edges. No labels, no UI, no characters, no NPCs.
```

### WLOC000003 Chapel Courtyard

- Type: `map_json`
- Source: `WLOC000003`
- Map name: `Chapel Courtyard`
- Replace file: `frontend/public/data/maps/WLOC000003_chapel_courtyard.json`
- Grid: 38 columns x 28 rows
- Tile size: 48x48
- Safe zone: yes
- Tileset: chapel
- Required object-layer characters/interactables: Mayumi Bagwis, Babaylan Lira Dalisay, Courtyard Garden, Shared Lamps, Marketplace transition, Balete Forest transition
- Layout direction: cultural courtyard with open plaza, garden pockets, quiet side paths, chapel/courtyard structure, and forest gate

```text
Create a collision-aware Tiled/Phaser map JSON for Chapel Courtyard, 38 tiles wide by 28 tiles high, tile size 48x48. This is the cultural context map before Balete Forest. Use tile layers named Ground, Ground Detail, Path, Path Detail, Decor, Upper Decor, and object layers named Collision, Objects, Transitions, Encounters. Place Mayumi Bagwis and Babaylan Lira Dalisay as object-layer NPCs only. Place Courtyard Garden (`AMBIENT_CHAPEL_GARDEN`) and Shared Lamps (`AMBIENT_CHAPEL_LAMPS`) as reachable inspectable quest objects on walkable tiles adjacent to their visual features, never inside collision rectangles. Do not put characters, quest objects, or labels in tile art. Do not place both NPCs and both exits on one horizontal line. Use a central courtyard loop with side garden paths, a quiet chapel/courtyard structure, benches or low borders, and a forest gate/threshold on a different edge from the marketplace entrance. Use respectful fictional mixed cultural motifs without declaring any real religion as absolute truth. Add collision rectangles for buildings, garden borders, low stone borders, benches, courtyard ornaments, fences, and map borders. Keep all required objects reachable.
```

## map_preview_chapel_courtyard

- Type: `map_preview`
- Source: `WLOC000003`
- Map name: `Chapel Courtyard`
- Replace file: `frontend/public/assets/vertical-slice/maps/preview_chapel_courtyard.png`
- Size target: PNG map preview, exact 1824x1344 canvas, 38 columns x 28 rows, 48x48 per tile, no text

```text
Create a top-down map preview for Chapel Courtyard, exact 1824x1344 pixels, 38x28 tiles at 48x48 scale. Show a central courtyard loop, garden side paths, quiet chapel/courtyard structure, cultural details, and forest threshold. No labels, no UI, no characters, no NPCs.
```

### WLOC000004 Balete Forest

- Type: `map_json`
- Source: `WLOC000004`
- Map name: `Balete Forest`
- Replace file: `frontend/public/data/maps/WLOC000004_balete_forest.json`
- Grid: 56 columns x 42 rows
- Tile size: 48x48
- Safe zone: no
- Random encounters: Duwende, Ungo, Aghoy
- Tileset: forest
- Required object-layer characters/interactables: Duwende tracks, Ungo encounter, Aghoy rustle, Kidlat Balagtas, Aghoy Leaf Tracks, Damaged Roots, Chapel transition, Spirit Threshold transition
- Layout direction: first danger zone with winding forest routes, clearings, loops, hidden pockets, and random encounter regions

```text
Create a collision-aware Tiled/Phaser map JSON for Balete Forest, 56 tiles wide by 42 tiles high, tile size 48x48. This is the first dangerous exploration zone and should feel much larger than the village maps. Use tile layers named Ground, Ground Detail, Path, Path Detail, Decor, Upper Decor, and object layers named Collision, Objects, Transitions, Encounters. Place Duwende tracks, Ungo encounter, Aghoy rustle, Kidlat Balagtas, Chapel transition, and Spirit Threshold transition as object-layer entries only. Place Aghoy Leaf Tracks (`AMBIENT_AGHOY_TRACKS`) and Damaged Roots (`AMBIENT_DAMAGED_ROOTS`) as reachable inspectable quest objects on walkable side paths. Do not bake characters, Nilalang, quest objects, labels, or quest markers into tile art. Do not place these waypoints in a straight line. Create winding forest paths with loops, side clearings, optional dead ends, dense root barriers, thickets, balete tree landmarks, bamboo columns, rocks, and at least three encounter zones. Put the Spirit Threshold transition deeper in the forest, requiring turns and exploration from the Chapel entrance. Add collision rectangles for trees, root walls, thickets, rocks, bamboo, water/deep terrain if used, and map borders. Keep all required objects reachable and leave enough path width for companion following.
```

## map_preview_balete_forest

- Type: `map_preview`
- Source: `WLOC000004`
- Map name: `Balete Forest`
- Replace file: `frontend/public/assets/vertical-slice/maps/preview_balete_forest.png`
- Size target: PNG map preview, exact 2688x2016 canvas, 56 columns x 42 rows, 48x48 per tile, no text

```text
Create a top-down map preview for Balete Forest, exact 2688x2016 pixels, 56x42 tiles at 48x48 scale. Show winding forest routes, root barriers, balete landmarks, clearings, hidden pockets, and a deeper shrine threshold path. No labels, no UI, no characters, no NPCs, no Nilalang.
```

### WLOC000009 Spirit Shrine Threshold

- Type: `map_json`
- Source: `WLOC000009`
- Map name: `Spirit Shrine Threshold`
- Replace file: `frontend/public/data/maps/WLOC000009_spirit_shrine_threshold.json`
- Grid: 44 columns x 34 rows
- Tile size: 48x48
- Safe zone: no
- Random encounters: Duwende, Aghoy
- Tileset: shrine
- Required object-layer characters/interactables: Shrine Balon, Batibat presence, Umalagad Echo, Balete Forest transition
- Layout direction: boss approach with shrine forecourt, branching spiritual paths, side stones, root barriers, and a larger boss arena

```text
Create a collision-aware Tiled/Phaser map JSON for Spirit Shrine Threshold, 44 tiles wide by 34 tiles high, tile size 48x48. This is the boss and post-boss bonding context map. Use tile layers named Ground, Ground Detail, Path, Path Detail, Decor, Upper Decor, and object layers named Collision, Objects, Transitions, Encounters. Place Shrine Balon, Batibat presence, Umalagad Echo, and Balete Forest transition as object-layer entries only. Do not bake characters, boss, labels, or UI markers into tile art. Do not arrange the Balon, Batibat, Umalagad, and exit in a straight line. Create a shrine approach with a branching stone path, side spirit-stone pockets, root barriers, a readable boss arena, and at least one optional side route. Place Batibat in a large central or upper arena, Shrine Balon in a safe side pocket, Umalagad Echo in a separate post-boss-feeling side area, and the forest transition at an edge. Add collision rectangles for shrine structures, root barriers, side stones, altar-like fictional structures, cliffs/walls if used, and map borders. Keep the fantasy spiritual tone respectful and fictional; do not portray any real religion as absolute truth.
```

## map_preview_spirit_shrine_threshold

- Type: `map_preview`
- Source: `WLOC000009`
- Map name: `Spirit Shrine Threshold`
- Replace file: `frontend/public/assets/vertical-slice/maps/preview_spirit_shrine_threshold.png`
- Size target: PNG map preview, exact 2112x1632 canvas, 44 columns x 34 rows, 48x48 per tile, no text

```text
Create a top-down map preview for Spirit Shrine Threshold, exact 2112x1632 pixels, 44x34 tiles at 48x48 scale. Show a shrine approach, branching stone paths, side spirit-stone pockets, root barriers, boss arena, Balon side pocket, and forest exit. No labels, no UI, no characters, no boss sprite, no NPCs.
```

## npc_npc000002_lira_lakandula

- Type: `npc_sprite`
- Source: `NPC000002`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000002_lira_lakandula.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Lira Lakandula, the welcoming barangay guide in ALAMAT. Warm young-adult Filipino features, practical dark tied hair, modest woven village clothing in river blue, muted gold, and leaf green, small notice ledger and cloth satchel, approachable observant posture, clearly distinct from Babaylan Lira Dalisay. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 768x1024 pixels. Strict 3 columns x 4 rows, 12 frames, each cell exactly 256x256. Rows: down/front, left, right, up/back. Columns: idle, left-foot-forward walk, right-foot-forward walk. Columns 2 and 3 must be visibly opposite walking poses. Keep face, outfit, ledger, proportions, colors, and baseline consistent. Keep the full body inside each cell with at least 24px top padding and 16px below the feet. No checkerboard, background, scenery, labels, grid lines, borders, or elements crossing cell boundaries.
```

## ChatGPT Portrait And Quest Asset Session Contract

Paste the following block once near the beginning of a ChatGPT asset-generation conversation. Keep using the same conversation for the slice so visual identity remains consistent. Also keep this file as the durable source of truth; chat memory alone is not a replacement for the saved prompt and file path.

```text
ALAMAT PORTRAIT AND QUEST ASSET MASTER RULES

Remember and apply these rules to every later ALAMAT portrait, quest-item icon, and map quest-object request in this conversation unless I explicitly replace a rule.

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

Map quest-object rules:
- Canvas exactly 96x96 pixels unless the individual prompt specifies another exact size.
- Show one top-down or top-down three-quarter environmental object that can be placed directly over a 48x48 tile map.
- Keep the interaction footprint centered near the lower-middle of the canvas and leave at least 16 pixels of transparent padding.
- Use a readable base/contact point but no painted ground tile, interaction ring, quest marker, exclamation mark, label, or baked collision guide.
- The object must visually match the relevant map tileset and remain readable when displayed between 48x48 and 96x96.
- Save as frontend/public/assets/vertical-slice/quests/object_[QUEST_OBJECT_ID]_[slug].png.

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

## Slice 1 Quest Map Objects

These objects belong to Chapel Courtyard and Balete Forest and must be generated with the
original Slice 1 map assets.

## quest_object_courtyard_garden

- Type: `quest_map_object`
- Source: `AMBIENT_CHAPEL_GARDEN`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_courtyard_garden.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down chibi RPG map object for a courtyard garden needing gentle care: small native plants, windblown leaves, loose soil, and a subtle shared-space lamp detail. Respectful fictional Filipino fantasy style. No text, marker, character, checkerboard, or background.
```

## quest_object_shared_lamps

- Type: `quest_map_object`
- Source: `AMBIENT_CHAPEL_LAMPS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_shared_lamps.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down chibi RPG map object showing two modest shared courtyard lamps with unlit wicks and woven/brass details. Culturally neutral common gathering-space object, no exclusive religious symbol, text, character, checkerboard, or background.
```

## quest_object_aghoy_leaf_tracks

- Type: `quest_map_object`
- Source: `AMBIENT_AGHOY_TRACKS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_aghoy_leaf_tracks.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down forest quest object: a curved trail of tiny leaf-shaped Aghoy footprints carefully bending around a small earthen mound. Subtle, readable, gentle mystery, no creature, text, UI marker, checkerboard, or background.
```

## quest_object_damaged_roots

- Type: `quest_map_object`
- Source: `AMBIENT_DAMAGED_ROOTS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_damaged_roots.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down forest quest object showing a healthy living root pinned beneath dead storm branches and litter, clearly repairable rather than destroyed. Green-brown forest palette, no character, text, marker, checkerboard, or background.
```

## ui_interaction_marker

- Type: `ui_icon`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/interaction_marker.svg`
- Size target: animated SVG, 64x64 viewBox, transparent background

```text
Create an animated SVG interaction marker icon for ALAMAT, 64x64 viewBox, transparent background, no text, no logo, no UI frame. Filipino fantasy RPG visual style, simple golden woven ring with small sparkle, readable over dark and light map tiles. Animation must be inside the SVG only using SMIL animate / animateTransform elements: gentle glow pulse, subtle sparkle twinkle, optional tiny breathing scale inside the SVG groups. Do not rely on game-code rotation, game-code tweening, CSS animation, external images, raster embeds, or JavaScript. Keep the outer icon visually stable so it does not look like the whole marker is spinning.
```

## ui_save_point

- Type: `map_object`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/ui/save_point.svg`
- Size target: animated SVG, 64x64 viewBox, transparent background

```text
Create an animated SVG save point map object for ALAMAT, 64x64 viewBox, transparent background, no text, no logo. It must clearly look like a small Balon / Filipino deep well from a top-down chibi RPG perspective: circular stone or wood-rimmed well, visible blue water inside, small bamboo/wooden pulley post or bucket detail, soft blue-gold restorative glow. Animation must be inside the SVG only using SMIL animate / animateTransform elements: water shimmer, gentle healing glow pulse, tiny sparkle twinkle. Do not rely on game-code rotation, game-code tweening, CSS animation, external images, raster embeds, or JavaScript. Keep the well silhouette stable and readable at 64x64.
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
