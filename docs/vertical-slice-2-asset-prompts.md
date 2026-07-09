# Vertical Slice 2 Asset Prompts

This document contains only the assets introduced after the first ALAMAT vertical slice:
the Laguna Reedwater Shore expansion, its freshwater encounter roster, optional side-quest
objects, new battle actors, and skill effects.

The original first-slice assets remain in `docs/vertical-slice-asset-prompts.md`.

## Production Rules

- Use the existing Monster, World, Quest, and Combat Codices as the source of truth.
- Keep ALAMAT fictional and respectfully inspired by diverse Philippine cultures.
- Do not bake characters, Nilalang, labels, collision, quest markers, or UI into map tiles.
- All sprite and VFX sheets must use true alpha transparency, never a painted checkerboard.
- Keep every frame inside its cell with transparent padding and a stable baseline.
- Generate one asset per request so dimensions and grid structure can be checked immediately.
- Preserve every listed ID and replacement filename exactly.
- Slice 2 is an inland freshwater expansion. Do not use coral reefs, ocean surf, or saltwater-only scenery.

## Generation Order

1. Generate and approve the strict `960x960` lakeshore tileset.
2. Generate the `48x36` Tiled/Phaser map JSON and validate collision.
3. Generate the lakeshore battle background and animated SVG overlay.
4. Generate Diwata, Kataw, Sirena, Mambubuno, Berberoka, and Kugtong overworld sheets.
5. Generate all thirteen expansion Nilalang battle and overworld sheets.
6. Generate Ka Amihan, Aling Sela, and Mang Isko overworld sheets and portraits.
7. Generate the associated six-frame skill VFX sheets.
8. Generate the three lakeshore side-quest map objects.
9. Run `npm run assets:audit`, inspect in game, then register approved replacements.

## Slice 2 Asset Checklist

| Group                 |           Quantity | Contents                                                                                                                              |
| --------------------- | -----------------: | ------------------------------------------------------------------------------------------------------------------------------------- |
| New map               |                  1 | Laguna Reedwater Shore                                                                                                                |
| New tileset           |                  1 | Strict freshwater lakeshore tileset                                                                                                   |
| Battle background     |                  2 | Static PNG plus animated SVG overlay                                                                                                  |
| New NPC assets        |                  6 | Three directional overworld sheets and three dialogue portraits                                                                       |
| New playable Nilalang | 16 sheets per mode | Sixteen overworld sheets and sixteen corresponding battle sheets, covering the expanded roster assets not already approved in Slice 1 |
| New skill VFX         |                 32 | Freshwater skills and expanded-roster skill effects                                                                                   |
| Quest objects         |                  3 | Tangled nets, reed nursery, clear-water patch                                                                                         |

Use this checklist as production tracking. A generated file is not approved merely because it exists:
verify dimensions, alpha transparency, grid alignment, silhouette, cultural direction, and in-game scale.

## Shared Technical Standards

### Overworld Actors

- PNG canvas: exactly `768x1024`
- Grid: 3 columns x 4 rows
- Cell: exactly `256x256`
- Rows: down, left, right, up
- Columns: idle, left-foot-forward, right-foot-forward

### Battle Actors

- PNG canvas: exactly `1024x512`
- Grid: 4 columns x 2 rows
- Cell: exactly `256x256`
- Row 1: idle animation
- Row 2: attack or casting animation
- Enemy presentation faces left

### Skill VFX

- PNG canvas: exactly `1536x256`
- Grid: 6 columns x 1 row
- Cell: exactly `256x256`
- No actor art or background inside VFX sheets

### Tilesets

- PNG canvas: exactly `960x960`
- Grid: 20 columns x 20 rows
- Tile: exactly `48x48`
- No gutters, borders, visible grid, or spacing

### WLOC000010 Laguna Reedwater Shore

Generate the files below in this order.

## tileset_laguna_lakeshore

- Type: `tileset`
- Source: `WLOC000010`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_laguna_lakeshore.png`
- Size target: strict PNG, exactly 960x960, 20 columns x 20 rows, 48x48 per tile

```text
Create a production-quality top-down 2D Filipino fantasy RPG tileset for Laguna Reedwater Shore. The PNG canvas must be exactly 960x960 pixels, never 1024x1024, 1254x1254, or any other size. Use a strict 20 columns x 20 rows arrangement of 400 edge-to-edge tiles, each exactly 48x48 pixels. No visible grid, gutters, labels, characters, UI, or baked map composition. Include connected shallow-water terrain, deep-water edges, animated-looking water variants, wet sand, packed lakeshore paths, reed clusters, spawning grass, mangrove roots, fishing jetty pieces, bamboo rails, small boats, net racks, baskets, lake stones, moon-pool stonework, water corners, shoreline transitions, and readable blocked obstacle variants. Every connected set must include straight, corner, inner-corner, end-cap, T-junction, and intersection pieces where appropriate. Walkable and blocked terrain must remain visually clear. Warm tropical daylight with blue-green water, weathered bamboo, and restrained Filipino fantasy motifs.
```

## map_wloc000010_laguna_reedwater_shore

- Type: `map_json`
- Source: `WLOC000010`
- Replace file: `frontend/public/data/maps/WLOC000010_laguna_reedwater_shore.json`
- Grid: 48 columns x 36 rows
- Tile size: 48x48
- Required objects: Reedwater Balon, Ka Amihan Luntian, Aling Sela Dahon, Mang Isko Bangkero, Abandoned Nets, Reed Nursery, Clear Water Patch, Mambubuno current, Kataw reflection, Distant Sirena song, Spirit Shrine transition

```text
Create a Phaser/Tiled-compatible JSON map for Laguna Reedwater Shore, exactly 48 columns x 36 rows with 48x48 tiles, using tileset_laguna_lakeshore.png. Use tile layers Ground, Ground Detail, Water, Path, Path Detail, Decor, and Upper Decor. Use object layers Collision, Objects, Transitions, and Encounters. Build a non-linear freshwater lakeshore with a looping reed path, branching fishing jetty, optional moon-pool clearing, river-inlet pocket, shallow-water crossings, and at least two shortcuts. Do not arrange points from left to right. Place Reedwater Balon in a protected arrival pocket; Ka Amihan near the shared-water path; Aling Sela near the reed nursery; Mang Isko beside the safe jetty edge; Abandoned Nets beside damaged spawning reeds; Reed Nursery and Clear Water Patch on reachable restoration branches; Mambubuno near the river current entering the lake; Kataw near the moon pool; Sirena near a distant quiet inlet; and the Spirit Shrine transition on a curved inland route. Characters, quest objects, encounters, transitions, and markers must exist only in object layers. Give the three NPCs stable IDs NPC000601, NPC000602, and NPC000603. Do not include coral reefs, ocean surf, or saltwater scenery. Add precise collision rectangles around deep water, solid reeds, jetty edges, roots, rocks, structures, and map borders while keeping every required object reachable by the player and companion.
```

## nilalang_mon0005_diwata

- Type: `overworld_sprite`
- Source: `MON0005`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0005_diwata.png`
- Size target: transparent PNG, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Create an ALAMAT overworld sprite sheet for Diwata, a dignified hidden-lake and waterfall sanctuary guardian from the existing codex. True transparent PNG, exactly 768x1024, strict 3 columns x 4 rows, each frame 256x256. Rows: down, left, right, up. Columns: idle, left-step, right-step. Warm Filipino features, flowing dark hair, green-blue woven garments, freshwater flowers, pearl-like river stones, clear-water veil, protective and otherworldly without copying a real deity or sacred figure. No checkerboard, background, labels, borders, or effects crossing cells. Maintain 24px padding and consistent baseline.
```

## battle_nilalang_mon0005_diwata

- Type: `battle_actor_sprite`
- Source: `MON0005`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0005_diwata.png`
- Size target: transparent PNG, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Create an ALAMAT battle sprite sheet for Diwata. True transparent PNG, exactly 1024x512, strict 4 columns x 2 rows, 256x256 frames. Row 1: four restrained freshwater-veil idle frames. Row 2: four Sanctuary Bloom casting frames: preparation, flower-and-water gesture, release pose without VFX, recovery. Enemy faces left in side-facing 3/4 RPG perspective. Keep the complete body inside every cell with 24px padding. No background, checkerboard, text, border, or skill effect crossing cells.
```

## nilalang_mon0014_kataw

- Type: `overworld_sprite`
- Source: `MON0014`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0014_kataw.png`
- Size target: transparent PNG, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Create an ALAMAT overworld sprite sheet for Kataw, the dignified sea-oath keeper from the existing codex. True transparent PNG, exactly 768x1024, strict 3 columns x 4 rows, 256x256 per frame. Rows: down, left, right, up. Columns: idle, left-step, right-step. Noble aquatic spirit, pearl details, blue-green scales, fin-like arm veils, moonlit-water accents, calm readable silhouette. No scenery, labels, grid lines, checkerboard, or effects crossing cells.
```

## nilalang_mon0016_sirena

- Type: `overworld_sprite`
- Source: `MON0016`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0016_sirena.png`
- Size target: transparent PNG, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Create an ALAMAT overworld sprite sheet for Sirena, the tide-song warning spirit from the existing codex. True transparent PNG, exactly 768x1024, strict 3 columns x 4 rows, 256x256 per frame. Rows: down, left, right, up. Columns: idle, left-step, right-step. Warm brown skin, long dark hair, shell ornament, blue-green tail scales, small glowing shell instrument, graceful but practical readable silhouette. No background, checkerboard, labels, borders, or effects crossing cells.
```

## battle_nilalang_mon0014_kataw

- Type: `battle_actor_sprite`
- Source: `MON0014`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0014_kataw.png`
- Size target: transparent PNG, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Create an ALAMAT battle sprite sheet for Kataw. True transparent PNG with alpha, no checkerboard, background, labels, borders, or logo. Canvas exactly 1024x512. Strict 4 columns x 2 rows, each frame 256x256. Row 1: four elegant battle-idle frames with subtle fin-veils and pearl movement. Row 2: four Moon Tide casting frames: poised preparation, raised oath gesture, current release, recovery. Enemy faces left in side-facing 3/4 RPG perspective. Noble aquatic oath-keeper, blue-green scales, pearl ornaments, moonlit accents. Keep all anatomy inside each cell with 24px padding. Skill VFX must be separate.
```

## battle_nilalang_mon0016_sirena

- Type: `battle_actor_sprite`
- Source: `MON0016`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0016_sirena.png`
- Size target: transparent PNG, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Create an ALAMAT battle sprite sheet for Sirena. True transparent PNG with alpha, no checkerboard, background, labels, borders, or logo. Canvas exactly 1024x512. Strict 4 columns x 2 rows, each frame 256x256. Row 1: four calm battle-idle frames with hair, tail, and shell-instrument movement. Row 2: four Tide Song casting frames: breath, shell raised, sung note release, recovery. Enemy faces left in side-facing 3/4 RPG perspective. Warm brown skin, long dark hair, blue-green scales, shell ornaments, warning-spirit rather than seductive caricature. Keep the body inside each cell with at least 24px padding. Keep song VFX separate.
```

## skill_vfx_moon_tide

- Type: `skill_vfx`
- Source: `moon_tide`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_moon_tide_projectile.png`
- Size target: transparent PNG, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame horizontally traveling projectile VFX for Moon Tide. True transparent PNG, exactly 1536x256, strict 6x1 grid, 256x256 cells. A narrow blue-green crescent current carries a pearl-white moon reflection from caster to target. Show clear forward progression and a small final splash. No character, background, checkerboard, text, borders, or cell overflow.
```

## skill_vfx_tide_mirror

- Type: `skill_vfx`
- Source: `tide_mirror`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_tide_mirror_aura.png`
- Size target: transparent PNG, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame ALAMAT defensive support VFX for Tide Mirror. True transparent PNG, exactly 1536x256, strict 6x1 grid. A circular sheet of water forms before the target, catches moonlight, becomes briefly reflective, then dissolves into calm rings. No character, attack animation, scenery, checkerboard, labels, or overflow.
```

## skill_vfx_tide_song

- Type: `skill_vfx`
- Source: `tide_song`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_tide_song_wave.png`
- Size target: transparent PNG, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame traveling sound-wave VFX for Tide Song. True transparent PNG, exactly 1536x256, strict 6x1 grid. Layered aqua sound rings and tiny shell-light motes travel horizontally toward the enemy and end in a soft water ripple. Do not use musical notation, text, character art, background, checkerboard, borders, or overflow.
```

## skill_vfx_warning_lullaby

- Type: `skill_vfx`
- Source: `warning_lullaby`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_warning_lullaby_status.png`
- Size target: transparent PNG, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame ALAMAT status VFX for Warning Lullaby. True transparent PNG, exactly 1536x256, strict 6x1 grid. Gentle dark-aqua rings close around the target, pearl lights dim, and a calm moonlit ripple signals Sleep without cartoon symbols. Respectful, restrained, and readable. No character, scenery, text, checkerboard, frame borders, or overflow.
```

## battle_background_laguna_lakeshore

- Type: `battle_background`
- Source: `WLOC000010`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_laguna_lakeshore.png`
- Size target: PNG, exactly 1280x720

```text
Create an exact 1280x720 side-facing 2D RPG battle background for Laguna Reedwater Shore. Tropical Philippine-inspired fictional lakeshore, shallow blue-green water, reeds, distant bamboo fishing jetty, mangrove silhouettes, soft mountain horizon, open readable ground for two allies on the left and two enemies on the right. No characters, Nilalang, UI, text, frames, or baked combat effects. Keep the center and lower actor lanes visually quiet.
```

## battle_background_laguna_lakeshore_overlay

- Type: `animated_battle_overlay`
- Source: `WLOC000010`
- Replace file: `frontend/public/assets/vertical-slice/battle/backgrounds/bg_laguna_lakeshore_overlay.svg`
- Size target: animated SVG, 1280x720 viewBox, transparent background

```text
Create an animated transparent SVG overlay for the Laguna Reedwater Shore battle background, viewBox 0 0 1280 720. Use internal SMIL animation only. Include subtle water shimmer, slow reed sway, two or three tiny distant firefly glints, and a gentle moving reflection. No raster image, JavaScript, CSS animation dependency, characters, UI, labels, or large opaque shapes. Keep actor lanes unobstructed and animation restrained.
```

## npc_npc000601_ka_amihan_luntian

- Type: `npc_sprite`
- Source: `NPC000601`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000601_ka_amihan_luntian.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Ka Amihan Luntian, the trusted Laguna lakeshore steward in ALAMAT. Warm Filipino features, practical middle-aged community leader, sun-weathered complexion, dark tied hair with a few silver strands, freshwater blue and reed-green woven clothing, weatherproof shoulder cloth, small current-record notebook and smooth river-stone token, calm observant posture, no crown and no religious symbol. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 768x1024 pixels. Strict 3 columns x 4 rows, 12 frames total, each cell exactly 256x256. Rows: down/front, left, right, up/back. Columns: idle, walk-left-foot-forward, walk-right-foot-forward. Columns 2 and 3 must be visibly opposite steps with matching arm movement. Keep face, clothing, accessories, proportions, lighting, and baseline consistent. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. No checkerboard, background, scenery, labels, grid lines, or frame borders. Do not allow shadows, clothing, hair, limbs, or the notebook to cross cell boundaries.
```

## portrait_npc000601_ka_amihan_luntian

- Type: `dialogue_portrait`
- Source: `NPC000601`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000601_ka_amihan_luntian.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Ka Amihan Luntian, lakeshore steward of Laguna Reedwater Shore. Exact 512x512 PNG with true transparent background. Head-and-shoulders three-quarter view, warm Filipino features, sun-weathered middle-aged face, attentive dark eyes, tied dark hair with subtle silver strands, reed-green and freshwater-blue woven shoulder cloth, smooth river-stone token, calm authority expressed through observation rather than status. Soft warm key light with cool reflected lake light. No scenery, text, logo, frame, checkerboard, religious symbol, crown, weapon, or cropped head.
```

## npc_npc000602_aling_sela_dahon

- Type: `npc_sprite`
- Source: `NPC000602`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000602_aling_sela_dahon.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Aling Sela Dahon, the Reedwater herbalist in ALAMAT. Warm Filipino features, capable older adult, practical tied-back dark hair with gray strands, layered leaf-green and muted gold woven clothing, reed-fiber gathering pouch, small pruning knife kept safely sheathed, bundles containing only mature fallen or harvested leaves, gentle precise hands, grounded healer silhouette without mystical stereotypes. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 768x1024 pixels. Strict 3 columns x 4 rows, 12 frames total, 256x256 per cell. Rows: down/front, left, right, up/back. Columns: idle, walk-left-foot-forward, walk-right-foot-forward. Walking columns must show clearly opposite steps. Keep anatomy, outfit, pouch, colors, proportions, and baseline consistent. Keep all body parts and accessories within each cell with at least 24px top padding and 16px bottom padding. No checkerboard, background, scenery, text, grid, borders, loose effects, or assets crossing cell boundaries.
```

## portrait_npc000602_aling_sela_dahon

- Type: `dialogue_portrait`
- Source: `NPC000602`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000602_aling_sela_dahon.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Aling Sela Dahon, Reedwater herbalist. Exact 512x512 transparent PNG. Head-and-shoulders three-quarter view, warm older Filipino features, intelligent kind eyes, tied-back dark and gray hair, layered leaf-green woven collar, reed-fiber pouch strap, one mature medicinal leaf held for inspection, expression of careful practical knowledge rather than magical spectacle. Warm daylight and soft reflected water light. No background, checkerboard, text, logo, frame, exposed blade, real sacred symbol, caricature, or cropped head.
```

## npc_npc000603_mang_isko_bangkero

- Type: `npc_sprite`
- Source: `NPC000603`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000603_mang_isko_bangkero.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Mang Isko Bangkero, experienced freshwater boatman of Laguna Reedwater Shore. Warm Filipino features, sturdy older adult, sun-browned skin, short dark-gray hair, practical rolled-sleeve woven shirt, cropped work trousers, reed hat secured behind the shoulders rather than hiding the face, coiled repair cord and small wooden paddle tool, balanced patient stance, no sailor caricature. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 768x1024 pixels. Strict 3 columns x 4 rows, 12 frames, each cell exactly 256x256. Rows: down/front, left, right, up/back. Columns: idle, left-foot-forward walk, right-foot-forward walk. Make the two walking poses clearly opposite. Keep anatomy, clothing, cord, paddle tool, proportions, lighting, and baseline consistent. Keep every element inside its cell with at least 24px top padding and 16px bottom padding. No checkerboard, background, boat, water scenery, text, frame borders, or elements crossing cells.
```

## portrait_npc000603_mang_isko_bangkero

- Type: `dialogue_portrait`
- Source: `NPC000603`
- Replace file: `frontend/public/assets/vertical-slice/portraits/portrait_NPC000603_mang_isko_bangkero.png`
- Size target: transparent PNG, exactly 512x512

```text
Hand-painted polished 2D Filipino fantasy RPG dialogue portrait of Mang Isko Bangkero, experienced Laguna freshwater boatman. Exact 512x512 PNG with true alpha transparency. Head-and-shoulders three-quarter view, warm older Filipino features, sun-browned complexion, short dark-gray hair, practical woven shirt, reed hat hanging behind his shoulders, repair cord over one shoulder, thoughtful cautious expression of someone who respects dangerous currents. Warm tropical side light with cool lake reflection. No boat scenery, background, checkerboard, text, logo, frame, caricature, weapon, or cropped head.
```

## quest_object_tangled_nets

- Type: `quest_map_object`
- Source: `AMBIENT_TANGLED_NETS`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_tangled_nets.png`
- Size target: transparent PNG, exactly 96x96

```text
Create a transparent 96x96 top-down lakeshore quest object showing an abandoned synthetic fishing net and a few dull hooks tangled around young spawning reeds. Environmental problem, no trapped animal, gore, character, text, UI marker, checkerboard, or background.
```

## quest_object_reed_nursery

- Type: `quest_map_object`
- Source: `AMBIENT_REED_NURSERY`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_reed_nursery.png`
- Size target: transparent PNG, exactly 96x96

```text
Create one polished top-down chibi Filipino fantasy RPG quest map object for the Reed Nursery at Laguna Reedwater Shore. Exact 96x96 PNG with true alpha transparency. Show several young freshwater reeds, two pressed low by storm debris, healthy shoots still rooted, and a few fallen stems suitable for gentle support. The object must clearly communicate repair without harvesting. Natural reed green, wet earth, and freshwater-blue accents. No character, animal, text, quest marker, UI, checkerboard, painted background, grid, border, gore, or religious symbol. Keep the full object inside the canvas with transparent padding.
```

## quest_object_clear_water_patch

- Type: `quest_map_object`
- Source: `AMBIENT_CLEAR_WATER_PATCH`
- Replace file: `frontend/public/assets/vertical-slice/quests/object_clear_water_patch.png`
- Size target: transparent PNG, exactly 96x96

```text
Create one polished top-down chibi Filipino fantasy RPG quest map object for a Clear Water Patch at Laguna Reedwater Shore. Exact 96x96 PNG with true alpha transparency. Show a shallow clear-water pocket, visible living spawning grass below, and one loose piece of synthetic cord caught above the stems so it can be removed without damaging them. Gentle blue-green ripples, readable at gameplay scale, environmental restoration rather than loot. No trapped creature, character, text, UI marker, checkerboard, opaque background, border, gore, or ocean coral. Keep all water and cord inside the canvas with transparent edge padding.
```

## Playable Roster Expansion: Freshwater-Corrected Twenty

These thirteen Nilalang complete the playable roster expansion. Every asset below has a standalone
prompt that can be copied directly into ChatGPT without combining it with a shared template.

## Expanded Nilalang Overworld And Battle Sheets

## nilalang_mon0003_kapre

- Type: `overworld_sprite`
- Source: `MON0003`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0003_kapre.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Kapre, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Towering balete-tree guardian, dark bark-brown skin, ember cigar glow without real brand, woven waist cloth, old vines, smoke curls, imposing but thoughtful rather than monstrous. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0003_kapre

- Type: `battle_actor_sprite`
- Source: `MON0003`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0003_kapre.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Kapre, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Towering balete-tree guardian, dark bark-brown skin, ember cigar glow without real brand, woven waist cloth, old vines, smoke curls, imposing but thoughtful rather than monstrous. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Kapre. Row 2 contains four Smoke Fist attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0004_tikbalang

- Type: `overworld_sprite`
- Source: `MON0004`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0004_tikbalang.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Tikbalang, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Tall horse-headed trail spirit, lean limbs, dark mane, bamboo and vine ornaments, alert golden eyes, road-dust accents, uncanny guide silhouette without horror gore. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0004_tikbalang

- Type: `battle_actor_sprite`
- Source: `MON0004`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0004_tikbalang.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Tikbalang, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Tall horse-headed trail spirit, lean limbs, dark mane, bamboo and vine ornaments, alert golden eyes, road-dust accents, uncanny guide silhouette without horror gore. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Tikbalang. Row 2 contains four Maze Gallop attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0010_sigbin

- Type: `overworld_sprite`
- Source: `MON0010`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0010_sigbin.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Sigbin, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Small low forest quadruped with unusually long hind legs, folded ears, charcoal hide, faint ember accents, backward-track visual identity, agile rather than demonic. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0010_sigbin

- Type: `battle_actor_sprite`
- Source: `MON0010`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0010_sigbin.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Sigbin, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Small low forest quadruped with unusually long hind legs, folded ears, charcoal hide, faint ember accents, backward-track visual identity, agile rather than demonic. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Sigbin. Row 2 contains four Backward Pounce attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0027_kibaan

- Type: `overworld_sprite`
- Source: `MON0027`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0027_kibaan.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Kibaan, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Tiny bamboo trickster with russet skin, leaf cap, woven belt, playful grin, bamboo whistle and root anklets, mischievous but friendly readable silhouette. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0027_kibaan

- Type: `battle_actor_sprite`
- Source: `MON0027`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0027_kibaan.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Kibaan, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Tiny bamboo trickster with russet skin, leaf cap, woven belt, playful grin, bamboo whistle and root anklets, mischievous but friendly readable silhouette. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Kibaan. Row 2 contains four Bamboo Prank attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0031_nuno_sa_punso

- Type: `overworld_sprite`
- Source: `MON0031`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0031_nuno_sa_punso.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Nuno sa Punso, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Dignified small elder mound guardian, earth-toned robe, root staff, clay and moss details, patient stern expression, respectful fictional interpretation without caricature. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0031_nuno_sa_punso

- Type: `battle_actor_sprite`
- Source: `MON0031`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0031_nuno_sa_punso.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Nuno sa Punso, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Dignified small elder mound guardian, earth-toned robe, root staff, clay and moss details, patient stern expression, respectful fictional interpretation without caricature. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Nuno sa Punso. Row 2 contains four Mound Warning attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0033_lambana

- Type: `overworld_sprite`
- Source: `MON0033`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0033_lambana.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Lambana, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Palm-sized forest light spirit, petal-like wings, warm brown skin, green-gold woven dress, luminous pollen, delicate but readable silhouette, not a Western fairy copy. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0033_lambana

- Type: `battle_actor_sprite`
- Source: `MON0033`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0033_lambana.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Lambana, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Palm-sized forest light spirit, petal-like wings, warm brown skin, green-gold woven dress, luminous pollen, delicate but readable silhouette, not a Western fairy copy. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Lambana. Row 2 contains four Pollen Dart attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0034_engkanto

- Type: `overworld_sprite`
- Source: `MON0034`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0034_engkanto.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Engkanto, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Elegant otherworld guardian, warm Filipino features, pale woven forest garments, subtle pearl and leaf details, translucent veil-light, beautiful but uncanny and nonreligious. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0034_engkanto

- Type: `battle_actor_sprite`
- Source: `MON0034`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0034_engkanto.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Engkanto, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Elegant otherworld guardian, warm Filipino features, pale woven forest garments, subtle pearl and leaf details, translucent veil-light, beautiful but uncanny and nonreligious. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Engkanto. Row 2 contains four Veil Bolt attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0012_santelmo

- Type: `overworld_sprite`
- Source: `MON0012`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0012_santelmo.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Santelmo, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Living blue-orange wandering flame with a tiny masked spirit core, old-road ash motes, lantern-like silhouette, expressive without a human corpse or horror imagery. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0012_santelmo

- Type: `battle_actor_sprite`
- Source: `MON0012`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0012_santelmo.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Santelmo, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Living blue-orange wandering flame with a tiny masked spirit core, old-road ash motes, lantern-like silhouette, expressive without a human corpse or horror imagery. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Santelmo. Row 2 contains four Wandering Flame attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0024_amalanhig

- Type: `overworld_sprite`
- Source: `MON0024`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0024_amalanhig.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Amalanhig, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Waterlogged ancestral-road sentinel, weathered woven clothing, river weeds and clay, stiff guarded posture, mournful rather than grotesque, no exposed wounds or gore. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0024_amalanhig

- Type: `battle_actor_sprite`
- Source: `MON0024`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0024_amalanhig.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Amalanhig, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Waterlogged ancestral-road sentinel, weathered woven clothing, river weeds and clay, stiff guarded posture, mournful rather than grotesque, no exposed wounds or gore. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Amalanhig. Row 2 contains four River Grip attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0035_anito

- Type: `overworld_sprite`
- Source: `MON0035`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0035_anito.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Anito, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Fictional ancestral guardian made of warm wood, woven cloth, soft gold spirit light and abstract motifs, calm protective expression, no direct copy of a sacred real-world object. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0035_anito

- Type: `battle_actor_sprite`
- Source: `MON0035`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0035_anito.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Anito, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Fictional ancestral guardian made of warm wood, woven cloth, soft gold spirit light and abstract motifs, calm protective expression, no direct copy of a sacred real-world object. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Anito. Row 2 contains four Spirit Echo attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0041_mambubuno

- Type: `overworld_sprite`
- Source: `MON0041`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0041_mambubuno.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Mambubuno, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Freshwater current spirit, deep blue-green skin, river-grass mantle, smooth stone ornaments, flowing arm fins and mirrored-water details, territorial but protective inland-water silhouette. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0041_mambubuno

- Type: `battle_actor_sprite`
- Source: `MON0041`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0041_mambubuno.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Mambubuno, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Freshwater current spirit, deep blue-green skin, river-grass mantle, smooth stone ornaments, flowing arm fins and mirrored-water details, territorial but protective inland-water silhouette. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Mambubuno. Row 2 contains four Current Bind attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0036_berberoka

- Type: `overworld_sprite`
- Source: `MON0036`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0036_berberoka.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Berberoka, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Broad marsh-water spirit with reed crown, mud-blue skin, water pouch and woven net fragments, changing-water-level motif, eerie but not graphic or caricatured. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0036_berberoka

- Type: `battle_actor_sprite`
- Source: `MON0036`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0036_berberoka.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Berberoka, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Broad marsh-water spirit with reed crown, mud-blue skin, water pouch and woven net fragments, changing-water-level motif, eerie but not graphic or caricatured. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Berberoka. Row 2 contains four Marsh Lure attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## nilalang_mon0047_kugtong

- Type: `overworld_sprite`
- Source: `MON0047`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0047_kugtong.png`
- Size target: transparent PNG sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG overworld sprite sheet for Kugtong, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Massive ancient lake fish guardian, dark teal scales, broad armored head, whisker fins, old shell and reed growth, powerful readable tank silhouette, natural creature rather than sea monster gore. Create one exact PNG sprite sheet with true alpha transparency. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, walk-left-foot-forward, walk-right-foot-forward. The second and third columns must be clearly different opposite walking poses: left foot forward and right arm forward in column 2; right foot forward and left arm forward in column 3. Keep anatomy, costume, colors, proportions, and scale consistent across all frames. Align feet to the same baseline. Keep the full body inside every cell with at least 24px transparent padding above the head and 16px below the feet. Do not include checkerboard, white or colored background, scenery, labels, grid lines, or frame borders. Do not allow shadows, glow, clothing, hair, limbs, or effects to cross cell boundaries.
```

## battle_mon0047_kugtong

- Type: `battle_actor_sprite`
- Source: `MON0047`
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0047_kugtong.png`
- Size target: transparent PNG battle sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG battle sprite sheet for Kugtong, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Massive ancient lake fish guardian, dark teal scales, broad armored head, whisker fins, old shell and reed growth, powerful readable tank silhouette, natural creature rather than sea monster gore. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Kugtong. Row 2 contains four Lake Bite attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px transparent padding. Do not include checkerboard, background, scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## Expanded Nilalang Skill VFX

## skill_kapre_smoke_fist

- Type: `skill_vfx`
- Source: `kapre_smoke_fist`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_kapre_smoke_fist.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Smoke Fist, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Dense brown-gray balete smoke compresses into a gold-edged fist impact, then breaks into harmless curls. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_balete_guard_aura

- Type: `skill_vfx`
- Source: `balete_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_balete_guard_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Balete Guard, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Interlocking bark plates and old roots rise around the target, pulse once, then settle. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_maze_gallop

- Type: `skill_vfx`
- Source: `maze_gallop`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_maze_gallop.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Maze Gallop, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Dusty hoof arcs cross through two false trail directions before converging in one impact. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_trail_mirage_aura

- Type: `skill_vfx`
- Source: `trail_mirage`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_trail_mirage_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Trail Mirage, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Three translucent path lines briefly split behind the target and fold into a quickening green-gold glow. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_backward_pounce

- Type: `skill_vfx`
- Source: `backward_pounce`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_backward_pounce.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Backward Pounce, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Charcoal claw arc appears from the opposite direction, with tiny ember footprints fading backward. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_ember_hide_aura

- Type: `skill_vfx`
- Source: `ember_hide`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_ember_hide_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Ember Hide, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Low red-gold embers form a compact protective hide outline without flames obscuring the target. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_bamboo_prank

- Type: `skill_vfx`
- Source: `bamboo_prank`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_bamboo_prank.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Bamboo Prank, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Small bamboo segments snap in sequence and release a playful green impact ring. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_root_snare

- Type: `skill_vfx`
- Source: `root_snare`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_root_snare.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Root Snare, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Fine roots curl upward around a target point, tighten briefly, then return beneath the ground. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_mound_warning

- Type: `skill_vfx`
- Source: `mound_warning`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_mound_warning.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Mound Warning, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Concentric clay-and-earth rings rise into a firm warning pulse with small pebbles. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_earth_guard_aura

- Type: `skill_vfx`
- Source: `earth_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_earth_guard_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Earth Guard, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Packed soil and smooth mound stones create a low defensive ring around the target. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_pollen_dart_projectile

- Type: `skill_vfx`
- Source: `pollen_dart`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_pollen_dart_projectile.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Pollen Dart, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Bright green-gold pollen seed travels rapidly with a tiny petal trail and soft burst. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_petal_veil_aura

- Type: `skill_vfx`
- Source: `petal_veil`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_petal_veil_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Petal Veil, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Small tropical petals spiral around the target and become a light quickening veil. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_veil_bolt_projectile

- Type: `skill_vfx`
- Source: `veil_bolt`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_veil_bolt_projectile.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Veil Bolt, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Pearl-green translucent bolt passes through two thin veil rings before a restrained impact. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_glamour_step_aura

- Type: `skill_vfx`
- Source: `glamour_step`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_glamour_step_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Glamour Step, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Two pale reflected footprints separate and rejoin beneath a soft forest shimmer. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_wandering_flame_projectile

- Type: `skill_vfx`
- Source: `wandering_flame`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_wandering_flame_projectile.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Wandering Flame, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Blue-orange spirit flame travels horizontally, bends once, and blooms into a small clean flare. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_grave_chill_status

- Type: `skill_vfx`
- Source: `grave_chill`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_grave_chill_status.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Grave Chill, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered status effect: close around the target and communicate the condition without cartoon symbols. Visual direction: Cool blue mist and old-stone motes close around the target without skulls or horror symbols. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_river_grip

- Type: `skill_vfx`
- Source: `river_grip`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_river_grip.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for River Grip, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Two curved streams close like hands around a target point and release into droplets. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_undertow_step_aura

- Type: `skill_vfx`
- Source: `undertow_step`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_undertow_step_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Undertow Step, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Dark blue current circles the target feet and rises into a compact defensive water wall. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_spirit_echo_wave

- Type: `skill_vfx`
- Source: `spirit_echo`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_spirit_echo_wave.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Spirit Echo, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Warm gold woven-pattern pulse duplicates once like an echo and meets the target softly. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_ancestor_ward_aura

- Type: `skill_vfx`
- Source: `ancestor_ward`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_ancestor_ward_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Ancestor Ward, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Abstract gold-and-wood light forms a respectful protective ring with no real sacred symbols. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_current_bind

- Type: `skill_vfx`
- Source: `current_bind`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_current_bind.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Current Bind, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Two freshwater currents loop around a target point, tighten into a clear slowing ring, then release into river droplets. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_river_mirror_aura

- Type: `skill_vfx`
- Source: `river_mirror`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_river_mirror_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for River Mirror, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Smooth reflected freshwater rises into a compact defensive screen and settles into concentric rings. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_marsh_lure

- Type: `skill_vfx`
- Source: `marsh_lure`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_marsh_lure.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Marsh Lure, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Receding muddy-blue water line pulls reeds and ripples toward the impact point. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_drowning_reed_status

- Type: `skill_vfx`
- Source: `drowning_reed`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_drowning_reed_status.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Drowning Reed, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered status effect: close around the target and communicate the condition without cartoon symbols. Visual direction: Dark reeds rise through heavy water rings and settle into a quiet sleep effect, no drowning figure. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_lake_bite

- Type: `skill_vfx`
- Source: `lake_bite`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_lake_bite.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Lake Bite, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Large teal water-jaw silhouette closes in a powerful splash, abstract and non-gory. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_scale_guard_aura

- Type: `skill_vfx`
- Source: `scale_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_scale_guard_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Scale Guard, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Overlapping dark-teal scale shapes create a sturdy shield around the target and fade into ripples. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_sanctuary_bloom

- Type: `skill_vfx`
- Source: `sanctuary_bloom`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_sanctuary_bloom.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Sanctuary Bloom, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Freshwater flowers and clear droplets open in sequence around the target point, release a soft green-blue pulse, and fade without religious symbols. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_waterfall_veil_aura

- Type: `skill_vfx`
- Source: `waterfall_veil`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_waterfall_veil_aura.png`
- Size target: transparent PNG VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Hand-painted HD 2D Filipino fantasy RPG skill VFX sprite sheet for Waterfall Veil, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact PNG sprite sheet with true alpha transparency. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: A thin clear waterfall rises around the target as a protective curtain, catches pale light, and settles into a pool ring. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with transparent padding. Do not include a character, weapon wielder, scenery, checkerboard, white or colored background, labels, borders, UI, or effects crossing cell boundaries.
```
