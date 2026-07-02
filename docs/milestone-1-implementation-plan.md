# Milestone 1 - Core Engine Implementation Plan

Milestone 1 builds the playable foundation only. It does not build full combat, inventory, economy, or story polish.

## Goal

Create a Phaser-powered playable vertical slice shell inside the existing React/Laravel app.

The player should be able to:

- create a customizable protagonist
- arrive in the starter barangay
- move in 8 directions
- collide with map blockers
- interact with NPCs and map objects
- transition between starter maps
- see debug information
- save and load position, appearance, and early story flags

The player must start without a Nilalang companion.

## Recommended Implementation Order

### Step 1 - Install And Mount Phaser

- Add Phaser 3 to the frontend.
- Create `frontend/src/game`.
- Mount Phaser inside a React page, likely `/play`.
- Keep existing codex/admin pages untouched.

Acceptance:

- `/play` loads a Phaser canvas inside the React app.
- Canvas resizes safely within the layout.

### Step 2 - Game Scene Skeleton

Create:

- `BootScene`
- `PreloadScene`
- `WorldScene`
- `UIScene`

Defer:

- `BattleScene`
- full pause menu
- full inventory menu

Acceptance:

- Phaser boots predictably.
- Scene transitions work.
- WorldScene can load a test/blockout map.

### Step 3 - Character Creation State

Create a lightweight character creation screen before entering the map.

Store:

- player name
- body preset
- hair preset
- outfit palette
- future cosmetic slots

Acceptance:

- Player name and appearance payload are stored in local save state.
- No fixed protagonist name appears in story code.

### Step 4 - Player Controller

Build:

- keyboard movement
- 8-direction movement
- normalized diagonal speed
- idle/walk facing state
- temporary placeholder sprite

Acceptance:

- Player can move smoothly in 8 directions.
- Movement remains stable at different frame rates.

### Step 5 - Camera

Build:

- camera follow
- map bounds
- soft deadzone if needed

Acceptance:

- Camera follows player.
- Camera does not show outside map bounds.

### Step 6 - Blockout Maps

Use blockout maps first.

Start with:

- Barangay zone from `WLOC000001`, `WLOC000002`, `WLOC000003`
- Forest zone from `WLOC000004`
- Shrine zone from `WLOC000009`

Acceptance:

- At least three maps or map zones are traversable.
- Map data references source location IDs.

### Step 7 - Collision System

Build:

- blocked tile layer
- object collision zones
- collision debug toggle

Acceptance:

- Player cannot walk through walls, trees, water, shrine objects, or market stalls.
- Debug overlay can show collision state.

### Step 8 - Interaction System

Build generic interactables:

- NPC
- sign/object
- item pickup
- map transition
- save point
- encounter trigger

Acceptance:

- Pressing interact near an object dispatches an interaction event.
- Interaction payload references codex IDs, not hardcoded copy.

### Step 9 - NPC Placement

Place first NPCs:

- `NPC000001`
- `NPC000002`
- `NPC000003`
- `NPC000004`
- `NPC000582`

Acceptance:

- NPCs appear on maps.
- Interacting opens a simple dialogue panel.
- Dialogue references existing dialogue IDs where available.

### Step 10 - Wild Nilalang Presence

Do not implement full combat yet.

Build:

- overworld encounter markers
- simple proximity/trigger encounter stub
- encounter payload with monster ID

Use:

- `MON0032`
- `MON0038`
- `MON0028`

Acceptance:

- Nilalang can appear as map entities or encounter zones.
- Triggering an encounter opens a stub panel with monster data.
- No companion is granted.

### Step 11 - Save And Load

Build local save first, then prepare API integration.

Save:

- player name
- appearance payload
- current map/location ID
- player x/y
- story flags
- inventory stub
- companion collection empty array
- future bond state object

Acceptance:

- Save anywhere outside encounter/combat.
- Reload restores player position and character payload.
- Save format includes version field.

### Step 12 - Debug Overlay

Display:

- FPS
- map/location ID
- player coordinates
- facing direction
- collision enabled
- active interactable
- active story flags

Acceptance:

- Toggle debug overlay on/off.
- Debug overlay does not block normal play.

## React/Phaser Bridge

React should own:

- character creation UI
- dialogue panel
- simple interaction text
- debug panel shell if easier

Phaser should emit events:

- `interaction:started`
- `dialogue:open`
- `map:changed`
- `encounter:preview`
- `save:requested`
- `debug:update`

React should send commands:

- `player:lock`
- `player:unlock`
- `dialogue:closed`
- `save:complete`

## Data Contracts

Use source IDs from `docs/vertical-slice-roster.md`.

Initial map entity payload:

```json
{
  "entity_id": "NPC000001",
  "entity_type": "npc",
  "location_id": "WLOC000001",
  "x": 12,
  "y": 18,
  "interaction_type": "dialogue"
}
```

Initial save payload:

```json
{
  "save_version": "1.0.0",
  "player": {
    "name": "",
    "appearance": {}
  },
  "world": {
    "location_id": "WLOC000001",
    "x": 0,
    "y": 0,
    "story_flags": []
  },
  "companions": {
    "active_companion_id": null,
    "collection": [],
    "bond_state": {}
  }
}
```

## Do Not Build Yet In Milestone 1

- full combat
- full taming/bonding
- inventory ownership
- equipment stats
- shop transactions
- crafting transactions
- quest branching UI
- final map art
- final sprite sheets

## Milestone 1 Definition Of Done

- `/play` exists.
- Character creation works.
- Player moves in 8 directions.
- Camera follows.
- Collision works.
- Three vertical slice zones can be entered.
- NPC interaction opens dialogue.
- Wild Nilalang encounter stubs work.
- Save/load restores player state.
- Debug overlay works.
- The player starts with no companion.
- The save payload is ready for future companion bonding.
