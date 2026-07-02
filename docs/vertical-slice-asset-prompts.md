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
Avoid caricature, gore, photorealism, real-world religious superiority, sacred-object misuse, text, logos, modern brands, muddy silhouettes.
```

## player_customizable_base

- Type: `character_sprite`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/characters/player_customizable_base.svg`
- Size target: 48x64 per frame, 4 directions, idle and walk frames

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a customizable protagonist overworld sprite sheet base for ALAMAT. Chibi proportions, neutral traveler stance, practical lightweight clothing inspired by woven fibers and natural materials, modular hair/body/outfit layers, top-down 3/4 RPG view, transparent background. Sprite must support 8-direction movement through mirrored or separate directional frames.
```

## npc_npc000001_datu_magsalin

- Type: `npc_sprite`
- Source: `NPC000001`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000001_datu_magsalin.svg`
- Size target: 48x64 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create an overworld chibi NPC sprite for Datu Magsalin, barangay elder and arrival anchor. Calm, grounded village leader, practical Filipino fantasy clothing, woven sash, walking cane or document bundle, transparent background, top-down 3/4 RPG view.
```

## npc_npc000582_babaylan_lira_dalisay

- Type: `npc_sprite`
- Source: `NPC000582`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000582_babaylan_lira_dalisay.svg`
- Size target: 48x64 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create an overworld chibi NPC sprite for Babaylan Lira Dalisay, spiritual guide for trust and balance. Respectful fictional ritual attire, leaf fiber, brass, shell, and woven details, gentle authority, transparent background, top-down 3/4 RPG view.
```

## npc_npc000301_general_store

- Type: `npc_sprite`
- Source: `NPC000301`
- Replace file: `frontend/public/assets/vertical-slice/npcs/npc_NPC000301_general_store.svg`
- Size target: 48x64 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create an overworld chibi NPC shopkeeper sprite for the starter barangay general store. Friendly vendor, apron, small pouch, woven market cloth accents, transparent background, top-down 3/4 RPG view.
```

## nilalang_mon0038_aghoy

- Type: `nilalang_sprite`
- Source: `MON0038`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0038_aghoy.svg`
- Size target: 64x64 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create an overworld chibi Nilalang sprite for Aghoy, the little forest helper and first earned companion candidate. Small forest spirit, kind and shy, leaf cloak, basket or root charm, firefly glow, readable silhouette, transparent background, no horror tone.
```

## nilalang_mon0032_duwende

- Type: `nilalang_sprite`
- Source: `MON0032`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0032_duwende.svg`
- Size target: 64x64 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create an overworld chibi Nilalang sprite for Duwende, house-earth little folk. Small earthy spirit, mound and household motifs, friendly but mysterious, rattan/leaf details, transparent background, readable at 64x64.
```

## nilalang_mon0028_ungo

- Type: `nilalang_sprite`
- Source: `MON0028`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0028_ungo.svg`
- Size target: 64x64 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create an overworld chibi Nilalang sprite for Ungo, wild ape spirit and first dangerous encounter. Strong forest creature, muscular but readable, moss and bark accents, alert stance, not grotesque, transparent background.
```

## nilalang_mon0007_batibat_boss

- Type: `boss_sprite`
- Source: `MON0007`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/boss_MON0007_batibat.svg`
- Size target: 96x96 per frame

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a large overworld boss sprite for Batibat, nightmare tree-mother presence. Heavy old-wood silhouette, sleep/nightmare motif, roots and housepost details, eerie but not graphic, transparent background, readable boss scale.
```

## tileset_barangay_san_isidro

- Type: `tileset`
- Source: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_barangay_san_isidro.svg`
- Size target: 48x48 tiles

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a 48x48 top-down RPG tileset for Barangay San Isidro. Include village paths, nipa-style homes, barangay hall accents, marketplace ground, rice field edges, chapel courtyard stones, garden plants, fences, water jars, and collision-friendly landmarks. Seamless tiles, no text.
```

## tileset_balete_forest

- Type: `tileset`
- Source: `WLOC000004`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_balete_forest.svg`
- Size target: 48x48 tiles

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a 48x48 top-down RPG tileset for Balete Forest. Include forest floor, moss, root paths, balete roots, bamboo thickets, firefly clearings, riverbank edges, rocks, hidden item spots, and collision-friendly tree trunks. Seamless tiles, no text.
```

## tileset_spirit_shrine

- Type: `tileset`
- Source: `WLOC000009`
- Replace file: `frontend/public/assets/vertical-slice/tilesets/tileset_spirit_shrine.svg`
- Size target: 48x48 tiles

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
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000001_healing_herb.svg`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG inventory icon for Healing Herb. Small wrapped remedy, leaf bundle, woven fiber tie, clean healing silhouette, green and river accents, readable at 32x32 and 64x64, no text.
```

## item_itm000003_sacred_river_water

- Type: `item_icon`
- Source: `ITM000003`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000003_sacred_river_water.svg`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG inventory icon for Sacred River Water. Small glass/bamboo vial of clear water with river stone charm, soft blue glow, respectful fictional motif, no text, readable at 32x32.
```

## equipment_eqp000001_bolo

- Type: `equipment_icon`
- Source: `EQP000001`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_EQP000001_bolo.svg`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG equipment icon for Bolo. Clear blade silhouette, woven grip, brass and wood accents, river affinity detail, no text, readable at 32x32.
```

## equipment_eqp000003_kris

- Type: `equipment_icon`
- Source: `EQP000003`
- Replace file: `frontend/public/assets/vertical-slice/equipment/icon_EQP000003_kris.svg`
- Size target: 64x64

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished transparent RPG equipment icon for Kris. Wavy blade silhouette, respectful fictional Filipino fantasy details, woven grip, subtle glow, no text, readable at 32x32.
```

## map_preview_barangay

- Type: `map_preview`
- Source: `WLOC000001`
- Replace file: `frontend/public/assets/vertical-slice/maps/preview_barangay_san_isidro.svg`
- Size target: 1024x1024

```text
Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a top-down map preview for Barangay San Isidro with player house, barangay hall, small chapel, marketplace, rice fields, balete tree path, and forest entrance. Clear paths and collision landmarks, no labels or text.
```

