# Milestone 0 - Gameplay Production Blueprint

Milestone 0 locks the playable direction before ALAMAT moves into Phaser gameplay implementation.

This is a planning and production milestone. It does not build gameplay yet.

## Core Decisions

| Area | Decision |
| --- | --- |
| Perspective | Top-down 2D RPG |
| Movement | Free 8-direction movement |
| Map grid | 48x48 tile-based maps |
| Camera | Centered on player, with map bounds |
| Engine | Phaser 3 embedded inside React |
| UI shell | React |
| Backend | Laravel API |
| Database | PostgreSQL |
| Asset style | Hand-painted HD 2D chibi Filipino fantasy |
| First playable scope | Barangay San Isidro -> Balete Forest -> Spirit Shrine |

## Approved Design Decisions

- The player is a customizable protagonist, not a fixed named hero.
- Character name and appearance customization are required.
- Future cosmetics should be supported without rewriting save data.
- The player does not begin with a Nilalang companion.
- The first companion bond must be earned through exploration, trust, and story progress.
- Taming/bonding must support multiple narrative paths, not one hardcoded ritual.
- Generated assets are acceptable as concept drafts, high-quality placeholders, and possible final assets after approval.
- Significant design decisions should be documented as part of ALAMAT's design history.

## Architecture Direction

React owns:

- menus
- codex pages
- inventory UI
- equipment UI
- dialogue panels
- quest tracker
- settings
- production/admin tools

Phaser owns:

- map rendering
- player movement
- camera
- collision
- interactables
- NPC/map object placement
- encounter triggers
- save point triggers
- debug overlay data

Laravel owns:

- canonical content data
- codex APIs
- player save APIs
- import/export/validation pipeline
- production tooling APIs

## Vertical Slice Scope

The first playable slice should prove the full loop without trying to build the whole game.

### Maps

1. Barangay San Isidro
2. Balete Forest
3. Spirit Shrine

### Barangay San Isidro

Required spaces:

- player house
- barangay hall
- small chapel
- marketplace
- rice fields
- balete tree
- forest entrance
- save point

Gameplay purpose:

- learn movement
- talk to NPCs
- accept first quests
- buy simple goods
- save/load
- enter forest route

### Balete Forest

Required spaces:

- forest entrance
- tall grass or encounter zones
- one locked/blocked path
- one simple puzzle
- hidden item
- mini boss clearing
- shrine approach

Gameplay purpose:

- wild Nilalang encounters
- item pickup
- collision test
- basic puzzle interaction
- first combat transition

### Spirit Shrine

Required spaces:

- shrine exterior
- ritual platform
- save point
- boss arena
- cutscene trigger
- legendary encounter marker

Gameplay purpose:

- story boss
- companion trust test
- first cinematic/event trigger
- first major story flag

## Content Scope

Initial vertical slice content:

- 1 playable character
- 1 earned companion Nilalang unlock after the first major story arc
- 10 common Nilalang
- 2 rare Nilalang
- 1 boss Nilalang
- 20 named NPCs
- 10 ambient villagers
- 10 story quests
- 15 side quests
- 5 Nilalang trust quests
- 5 tutorial quests
- 50 items
- 30 equipment pieces
- about 100 skills

This content should be selected from existing codex data where possible instead of inventing new one-off records.

## Phaser Folder Plan

Recommended future frontend structure:

```text
frontend/src/game/
  AlamatGame.jsx
  config/
    phaserConfig.js
    gameConstants.js
  scenes/
    BootScene.js
    PreloadScene.js
    WorldScene.js
    BattleScene.js
    UIScene.js
  systems/
    PlayerController.js
    CameraController.js
    CollisionSystem.js
    InteractionSystem.js
    EncounterSystem.js
    SaveSystem.js
    DebugOverlaySystem.js
  data/
    verticalSliceMaps.js
    interactionRegistry.js
  bridges/
    ReactPhaserBridge.js
    ApiBridge.js
```

## Acceptance Criteria For Milestone 1

Milestone 1 should be considered complete when:

- Phaser loads inside the React app.
- The player can move in 8 directions.
- Camera follows the player.
- Collision prevents walking through blocked tiles.
- Interactables can trigger a simple message.
- Map transitions work between the 3 vertical slice maps.
- Save/load records player position and story flag state.
- Debug overlay can show FPS, current map, coordinates, and collision state.
- Character creation stores a customizable protagonist name and appearance payload.
- The player starts without a bonded Nilalang.
- The save model can store future companion/bond data without requiring a schema rewrite.

## Placeholder Policy

Do not wait for final art before Milestone 1.

Use placeholder assets for:

- player sprite
- NPC sprites
- Nilalang overworld sprites
- tilesets
- interaction icons
- save point
- encounter markers
- battle background

Replace placeholders later through the Phase L asset pipeline.

## Asset Generation Policy

ALAMAT already has many prompts in the data layer:

- monster sprite and portrait prompts in monster import data
- item icon prompts in item data
- equipment asset prompts in equipment data
- NPC portrait prompts in NPC data
- map asset prompts in world data
- story/cutscene prompts in story data

These prompts are suitable for generating final or near-final art, but the first implementation should only require a small controlled batch.

Recommended first generation batch:

1. player character sprite sheet
2. 1 companion Nilalang sprite sheet
3. 3 common Nilalang overworld sprites
4. 3 NPC overworld sprites
5. Barangay tileset
6. forest tileset
7. shrine tileset
8. dialogue portrait for mentor/Babaylan NPC
9. 10 item icons
10. 5 equipment icons

## What The User Should Provide Or Approve

You do not need to provide every final asset before Milestone 1.

You should provide or approve:

- main player character look
- whether the player has a fixed protagonist or character selection
- first companion Nilalang choice
- the exact 10 common Nilalang for the vertical slice
- the exact 2 rare Nilalang
- the first boss Nilalang
- any must-have cultural motifs to include or avoid
- whether generated assets are acceptable as placeholders, final assets, or concept drafts only
- preferred output sizes for sprites/icons if you already have a standard

If you do not have those yet, Codex can propose a first vertical slice roster from the existing database.

## What Codex Can Do

Codex can:

- generate the asset manifest from existing prompts
- select a vertical slice roster from current codex records
- create placeholder assets or prompt-ready asset task lists
- generate individual bitmap assets when requested
- create Phaser scaffolding once Milestone 1 starts
- wire generated assets into `public/assets`
- register generated assets in the Phase L production asset tracker
- keep final assets replaceable

Codex should not:

- start gameplay implementation before Milestone 0 decisions are accepted
- generate hundreds of assets at once
- treat generated cultural art as authoritative without review
- hardcode content that already exists in codex data

## Next Recommended Step

Before Milestone 1, choose one of these:

Codex has been approved to select the vertical slice roster from existing content. The next step is to implement Milestone 1 from the approved roster and implementation plan.
