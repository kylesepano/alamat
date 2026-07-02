# Milestone 1 - Core Engine

Milestone 1 adds the first playable ALAMAT engine shell.

Implemented:

- Phaser 3 embedded in React.
- `/play` route.
- Customizable protagonist setup.
- Player starts with no Nilalang companion.
- 8-direction movement with normalized diagonal speed.
- Camera follow and map bounds.
- Procedural blockout maps for the vertical slice.
- Collision blockers and collision debug toggle.
- Generic interaction system.
- NPC dialogue stubs.
- Item pickup stubs.
- Save point interactions.
- Map transitions.
- Wild Nilalang encounter stubs.
- Boss encounter stub.
- Local save/load with versioned payload.
- Debug overlay with FPS, map, coordinates, facing, active interactable, and story flags.

Controls:

- Move: `WASD` or arrow keys
- Interact: `E` or `Space`
- Toggle debug: `F3`
- Quick save: `F5`

Current route:

```text
/play
```

Milestone 1 intentionally does not include full combat, final taming, inventory ownership, equipment stats, shop transactions, crafting transactions, or final art.
