# Vertical Slice Asset Manifest

This manifest lists the first assets needed before and during Milestone 1. It is intentionally small. Placeholder files have been generated under `frontend/public/assets/vertical-slice`, and the normalized prompt books are indexed in `docs/asset-prompts/README.md`. Characters, NPCs, and Nilalang use exact `768x1024` transparent PNG sprite sheet slots; icons and simple environment placeholders can remain SVG until final art is generated.

## Required For Milestone 1

| Asset | Quantity | Status | Source |
| --- | ---: | --- | --- |
| Player overworld sprite sheet | 1 | Placeholder ready | New prompt |
| NPC overworld sprite sheets | 3 | Placeholder ready | NPC prompt data |
| Earned companion Nilalang overworld sprite sheet | 1 | Placeholder ready | Monster prompt data |
| Wild Nilalang overworld sprites | 3 | Placeholder ready | Monster prompt data |
| Barangay tileset | 1 | Placeholder ready | Environment prompt |
| Forest tileset | 1 | Placeholder ready | Environment prompt |
| Shrine tileset | 1 | Placeholder ready | Environment prompt |
| Collision debug tile | 1 | Placeholder ready | Generated debug asset |
| Interaction marker | 1 | Placeholder ready | UI prompt |
| Save point sprite | 1 | Placeholder ready | Story/world prompt |

## Useful During Milestone 1

| Asset | Quantity | Status | Source |
| --- | ---: | --- | --- |
| Dialogue portrait | 1 | Needed | NPC prompt data |
| Item icons | 2 | Placeholder ready | Item data |
| Equipment icons | 2 | Placeholder ready | Equipment data |
| Battle background | 1 | Needed later | Environment prompt |
| Simple UI icons | 8 | Needed later | Production prompt generator |

## Recommended Asset Sizes

These are starting standards, not final constraints.

- Tiles: `48x48`
- Player/NPC sprite frame: `48x64` or `64x64`
- Small Nilalang overworld frame: `64x64`
- Large/boss Nilalang overworld frame: `96x96`
- Item/equipment icon: `64x64`, downscalable to `32x32`
- Dialogue portrait: `512x512`
- Battle background: `1280x720`
- Map preview: `1024x1024`

## Generation Priority

1. Use flat-color/blockout placeholders for engine work.
2. Generate one cohesive sample set.
3. Review art style.
4. Generate remaining vertical slice assets.
5. Register assets in the Phase L production pipeline.
6. Replace placeholders gradually.

## Implemented Asset Slots

The current game preloads assets through:

`frontend/src/game/data/verticalSliceAssets.js`

Replace same-extension files directly under `frontend/public/assets/vertical-slice`, or update that registry if you export WEBP files or different names. Sprite sheet assets should stay exact `768x1024`, transparent PNG, `3 columns x 4 rows`, `256x256` per frame.

## User Review Checklist

For each generated asset, review:

- silhouette readability
- Filipino fantasy tone
- no real-world religious/cultural misuse
- no text baked into image
- transparent background where needed
- consistent chibi proportions
- animation feasibility
- color contrast against map tiles

## Codex Asset Generation Note

Codex can generate assets from the existing prompts, but the safer workflow is batch-based:

1. Generate 1 customizable player sample, 1 wild Nilalang sample, 1 NPC sample, and 1 tile sample.
2. User approves or redirects style.
3. Generate the rest of the vertical slice set.

This avoids locking the whole project into an art direction too early.
