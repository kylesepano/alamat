# Asset Generation Workflow

This workflow keeps Milestone 1 assets replaceable while the game engine continues to work with placeholder files.

## Where To Generate Assets

Recommended tools:

- ChatGPT image generation: fast concept drafts and iteration.
- Adobe Firefly: useful when you want a commercial-safety-focused workflow.
- Leonardo.ai: strong for game asset sets and transparent-background outputs.
- Scenario.gg: useful for consistent game asset batches.
- Midjourney: strong concept art, but review license terms and transparent-background steps.
- Stable Diffusion or ComfyUI: best for local batch generation and repeatable art direction if you can manage model licensing.

## Prompt Source

Use [vertical-slice-asset-prompts.md](/c:/xampp/htdocs/alamat/docs/vertical-slice-asset-prompts.md) as the source for the first playable roster prompts.

The machine-readable manifest is:

`frontend/public/assets/vertical-slice/manifest.json`

## Replacement Rules

Generated placeholder SVG files already exist in:

`frontend/public/assets/vertical-slice`

For a no-code replacement, export the generated asset with the same filename and extension as the placeholder it replaces.

If a generated asset is a PNG, WEBP, or sprite sheet with a different filename, update the path once in:

`frontend/src/game/data/verticalSliceAssets.js`

Then Phaser will preload the new asset on the next dev-server refresh.

## First Batch To Generate

Start with only these four assets to lock style before producing the whole set:

1. `characters/player_customizable_base.svg`
2. `npcs/npc_NPC000001_datu_magsalin.svg`
3. `nilalang/nilalang_MON0038_aghoy.svg`
4. `tilesets/tileset_barangay_san_isidro.svg`

Once those feel cohesive, generate the rest of the roster in `docs/vertical-slice-asset-prompts.md`.

## Review Standard

Approve assets only when they meet these requirements:

- readable silhouette at gameplay size
- no text baked into the image
- transparent background for characters, NPCs, Nilalang, items, and equipment
- respectful fictional Philippine fantasy tone
- no caricature or real-world religious claim of supremacy
- consistent chibi proportions for overworld sprites
- colors remain readable on barangay, forest, and shrine maps
