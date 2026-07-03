# Milestone 5 - Story Integration, Polish, and Asset Reset

Milestone 5 connects story beats to the playable vertical slice and resets the asset policy to a stable production direction.

## Story Integration

Implemented story scenes:

| Scene | Trigger |
| --- | --- |
| `STSC00001` Home by the River: Arrival | First load into the playable slice |
| `STSC00002` Home by the River: Decision | Speaking with Babaylan Lira Dalisay |
| `STSC00003` First Oath of Trust: Forest Threshold | Entering Balete Forest |
| `STSC00004` First Oath of Trust: After the Nightmare | Clearing the Batibat boss |

Story scenes are stored through `world.story_flags` and displayed in the Play page story panel after they are seen.

## Asset Reset Decision

The current vertical slice now uses deterministic SVG placeholder sprite sheets for development. This gives the engine a stable baseline while final art is still being reviewed.

This is not the final asset format decision for production art.

Recommended production formats:

| Asset Type | Best Format | Reason |
| --- | --- | --- |
| Animated actors: player, NPCs, Nilalang | PNG spritesheet, later WebP spritesheet if compression is needed | Best compatibility with Phaser animation and image generation tools |
| Large maps and tilesets | PNG/WebP tileset or texture atlas | Better painting fidelity and runtime consistency than SVG |
| Portraits and cutscene stills | PNG/WebP | Painterly detail and compression control |
| Item/equipment icons | PNG/WebP, SVG only for simple symbolic placeholders | Most generated fantasy icons are raster art |
| UI symbols and debug markers | SVG | Crisp, tiny, easy to recolor |

## Why Not SVG For Final Sprites?

SVG is excellent for simple icons and deterministic placeholders, but final ALAMAT actor art is painterly and animated. PNG/WebP spritesheets are safer for:

- transparent backgrounds
- exact frame slicing
- visual consistency across browsers
- generated art pipelines
- future texture atlases
- Phaser runtime performance

## Placeholder Reset Tool

Run:

```bash
node tools/reset-vertical-slice-placeholders.mjs
```

This regenerates consistent SVG placeholders for the vertical-slice assets without changing the asset contract.

## Replacement Rule

When a final actor sprite is approved:

1. Export transparent PNG spritesheet at `768x1024`.
2. Keep the `3x4` grid and `256x256` cells.
3. Replace the file in `frontend/public/assets/vertical-slice`.
4. Update `frontend/src/game/data/verticalSliceAssets.js` path from `.svg` to `.png`.
5. Run `npm run build`.

This keeps every asset replaceable through the Phase L pipeline.
