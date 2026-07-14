# ALAMAT Asset Prompt Index

The production prompt library is separated by asset family. Every prompt book is self-contained: paste its **General ChatGPT Rule** first, then paste one individual prompt from the same file.

## Prompt Books

| Asset family | Prompt book | Runtime destination |
| --- | --- | --- |
| Player overworld | [Player Overworld](player-overworld-asset-prompts.md) | `frontend/public/assets/vertical-slice/characters/` |
| NPC walking and portraits | [NPC And Portraits](npc-asset-prompts.md) | `frontend/public/assets/vertical-slice/npcs/` and `portraits/` |
| Nilalang overworld | [Nilalang Overworld](nilalang-overworld-asset-prompts.md) | `frontend/public/assets/vertical-slice/nilalang/` |
| Player and Nilalang battle | [Battle Actors](battle-actor-asset-prompts.md) | `frontend/public/assets/vertical-slice/battle/characters/` and `battle/nilalang/` |
| Skill effects | [Skill VFX](skill-vfx-asset-prompts.md) | `frontend/public/assets/vertical-slice/battle/vfx/` |
| Inventory items | [Inventory Items](item-asset-prompts.md) | `frontend/public/assets/vertical-slice/items/` |
| Quest and key items | [Quest Items](quest-item-asset-prompts.md) | `frontend/public/assets/vertical-slice/quests/` |
| Equipment | [Equipment](equipment-asset-prompts.md) | `frontend/public/assets/vertical-slice/equipment/` |
| Maps and battle environments | [Map Production](../vertical-slice-map-production-prompts.md) | `frontend/public/assets/vertical-slice/maps/`, `tilesets/`, `battle/backgrounds/`, and `frontend/public/data/maps/` |

## Generation Order

1. Open the prompt book for the asset family.
2. Paste that file's General ChatGPT Rule into a new ChatGPT conversation.
3. Paste exactly one registered asset prompt.
4. Confirm the filename, dimensions, grid, alpha transparency, and facing before accepting it.
5. Place the output at the listed `Replace file` path without renaming it.
6. Validate the asset in-game before generating the next visual family.

Do not generate multiple sprite sheets in one image. Do not use map art to infer collision; the map-production document owns tilesets, catalogs, Tiled JSON, collision, transitions, previews, and battle environments.

## Nilalang Art Direction

Nilalang use a creature-centric, semi-realistic, hand-painted dark folklore-horror direction with minimal humanoid bias. Their body plan must be classified before generation as beastlike, environmental/spirit-like, aquatic/hybrid, corpse-like, or distorted partly humanoid. A normal human body with creature accessories is never the default. The overworld and battle prompt books contain the complete anatomy and locomotion rules.
