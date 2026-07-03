# Milestone 2A - Battle Scene Foundation

Milestone 2A adds the first playable battle shell for ALAMAT. It is intentionally small and is not the final combat system.

Implemented:

- Phaser `BattleScene`.
- World-to-battle handoff from wild Nilalang and boss map encounters.
- Battle return flow back to the current map.
- React battle command panel.
- Player actions: Attack, Guard, Flee.
- Boss encounters can block fleeing.
- Enemy auto-turn with simple skill rotation.
- HP bars and battle log in Phaser.
- Battle state mirrored to React through `gameBridge`.
- Battle outcome tracking in the local save payload.
- Story flags for defeated Nilalang encounters.
- Placeholder combat runtime in `BattleRuntime`.
- Vertical slice battle data for Duwende, Ungo, Aghoy, and Batibat.

Current scope:

- The player still starts without a bonded Nilalang.
- Wild Nilalang battles do not unlock taming yet.
- Skills are simplified and use placeholder damage math.
- Status effects are not resolved yet.
- Inventory, equipment, rewards, experience, and crafting are not connected yet.
- Full balancing is postponed.

Controls:

- Start battle: interact with a wild Nilalang or boss marker.
- Battle actions: use the React battle panel beside the game canvas.

Next recommended step:

Milestone 2B should connect this shell to reusable skill/status definitions and begin resolving a real runtime action model from the Combat Bible data.
