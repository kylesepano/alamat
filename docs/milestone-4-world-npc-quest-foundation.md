# Milestone 4 - World Maps, NPCs, and Quest Foundation

Milestone 4 gives the playable vertical slice a guided route through Barangay San Isidro, the marketplace, the chapel courtyard, Balete Forest, and the Spirit Shrine threshold.

## Scope

- Save-backed quest state.
- Main story quest chain for the vertical slice.
- Early optional side quest.
- Quest tracker in the Play page sidebar.
- Quest target labels on map interactables.
- Quest progress from NPC talk, item pickup, map reach, and battle victory events.
- Quest rewards using the Milestone 3 inventory and economy helpers.

## Implemented Quest Chain

| Quest | Role |
| --- | --- |
| `QST000001` Arrival in San Isidro | Opening movement, talk, pickup, and marketplace route |
| `QST000002` Prepare for the Forest | Shop, blacksmith, Babaylan, and forest entry |
| `QST000004` Balete Warning | Forest warning, Ungo battle, Aghoy encounter, shrine route |
| `QST000005` Storm Shrine | Batibat boss and Umalagad Echo story beat |
| `QST000024` Hidden Drum | Optional Duwende/Ungo material side quest |

## Quest Event Types

- `talk`: NPC or guide interaction.
- `collect`: map pickup interaction.
- `reach`: map transition into a target location.
- `defeat`: victory over a vertical slice Nilalang or boss.
- `item`: material reward recognition for side quest objectives.

## Design Notes

- The system is intentionally generic: quests do not call specific UI components directly.
- Phaser emits world progress, while React displays the tracker.
- Quest rewards use the same inventory/economy helpers as shops, crafting, and battle rewards.
- Quest target labels are generated from active objective state rather than hardcoded map text.
- This milestone still uses compact runtime quest data. Later work can migrate this to the full Phase H Quest Codex and backend APIs.

## Deferred

- Branching quest choices.
- Quest journal history page.
- Quest markers on a minimap.
- Dialogue node graph integration.
- Full world event scheduling.
- NPC schedules and movement.
