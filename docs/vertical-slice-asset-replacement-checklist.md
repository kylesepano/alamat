# Vertical Slice Asset Replacement Checklist

Use this checklist when replacing blockout art with approved production PNG assets.

## Runtime Status

- Actor sprite sheets now load from PNG paths in `frontend/src/game/data/verticalSliceAssets.js`.
- Tilesets are now drawn as an art background layer when a texture exists for the map.
- UI/debug markers may remain SVG for now.
- The production manifest points tilesets, item icons, equipment icons, and map previews toward PNG filenames.

## Audit Command

Run from `frontend/`:

```bash
npm run assets:audit
```

The audit reports:

- missing asset files
- SVG assets still waiting for PNG replacement
- sprite sheets whose dimensions differ from the preferred production standard

## Current Actor PNGs

The following actor PNGs are present and used by the game:

- `characters/player_customizable_base.png`
- `npcs/npc_NPC000001_datu_magsalin.png`
- `npcs/npc_NPC000582_babaylan_lira_dalisay.png`
- `npcs/npc_NPC000301_general_store.png`
- `nilalang/nilalang_MON0038_aghoy.png`
- `nilalang/nilalang_MON0032_duwende.png`
- `nilalang/nilalang_MON0028_ungo.png`
- `nilalang/boss_MON0007_batibat.png`

Some current actor PNGs are not the preferred `768x1024` sprite sheet size. The loader slices them best-effort, but final production art should use the corresponding standard under `docs/asset-prompts/`.

## Still Needing PNG Replacement

- `tilesets/tileset_barangay_san_isidro.png`
- `tilesets/tileset_balete_forest.png`
- `tilesets/tileset_spirit_shrine.png`
- `items/icon_ITM000001_healing_herb.png`
- `items/icon_ITM000003_sacred_river_water.png`
- `equipment/icon_EQP000001_bolo.png`
- `equipment/icon_EQP000003_kris.png`
- `maps/preview_barangay_san_isidro.png`

Until these PNG files are created, the app continues using the existing SVG placeholders for stability.

## Production Sprite Standard

- PNG
- transparent background
- exact `768x1024` canvas for actor sheets
- 3 columns x 4 rows
- 256x256 per cell
- row order: down, left, right, up
- column order: idle, walk-left-foot-forward, walk-right-foot-forward
- no labels, borders, backgrounds, or cross-cell shadows
- at least 24px transparent padding above hair/head in every cell
- at least 16px transparent padding below feet in every cell
- no hair, head, clothing, glow, shadow, weapon, or effects crossing a cell boundary

## Battle Sprite Standard

- PNG with real alpha transparency
- no checkerboard, no fake transparency, no background
- exact `1024x512` canvas
- 4 columns x 2 rows
- 256x256 per cell
- row 1: battle idle frames 1-4
- row 2: battle attack frames 1-4
- player and companion variants face right
- enemy variants face left

## Skill VFX Standard

- PNG with real alpha transparency
- no checkerboard, no fake transparency, no background
- exact `1536x256` canvas
- 6 columns x 1 row
- 256x256 per cell
- projectile VFX should travel from caster to target in the battle scene
- melee VFX should appear on or near the target
- support VFX should appear on or around the caster

## Sprite Bleed QA

When reviewing a new actor sheet:

- Walk right and confirm no up/back head or hair appears at the bottom edge.
- Walk up and confirm hair/head is fully visible.
- Check all three frames in each row; frame 2 and frame 3 should be different poses.
- If bleed appears, regenerate the sheet with stronger cell-boundary and transparent-padding instructions instead of manually stretching the image.

## Transparency QA

- Open the PNG over both dark and light backgrounds.
- If you see a checkerboard pattern inside the image itself, regenerate or remove the background before using it.
- True transparency should show the editor/viewer background, not painted gray squares.
