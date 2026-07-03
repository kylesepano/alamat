# Milestone 3 - Inventory, Equipment, Crafting, and Economy Foundation

Milestone 3 turns the vertical slice rewards into usable player-owned resources.

## Scope

- Save-backed inventory with starter consumables.
- Save-backed equipment ownership and equipped slots.
- Equipment stat bonuses applied to battle stats.
- Battle item use for healing and cleanse-style consumables.
- Material rewards from vertical slice Nilalang encounters.
- Starter marketplace shop service.
- Starter crafting workbench service.
- React panels for inventory, equipment, shop, and crafting.

## Runtime Data

The gameplay slice reads from `frontend/src/game/data/inventoryRuntimeData.js`.

Current runtime records include:

- Consumables: Healing Herb, Sacred River Water
- Materials: Duwende, Ungo, Aghoy, and boss reward materials
- Equipment: Training Bolo, Woven Vest, River Charm
- Shop: Barangay General Store
- Recipes: Forest Poultice, Clay Guard Charm

This file is intentionally small. The full Phase E, Phase F, and Phase J codex data remains the long-term source for broad content expansion.

## Gameplay Flow

1. The player starts with two Healing Herbs.
2. Map pickups can add items to inventory.
3. Wild Nilalang victories grant XP, Pilak, and material items.
4. The General Store NPC opens the shop.
5. The Blacksmith NPC opens the crafting workbench.
6. Owned equipment can be equipped from the Play page side panel.
7. Equipped stats are applied when a battle starts.
8. Consumables can be used during battle and are persisted when the battle ends.

## Design Notes

- Items and equipment are data-driven through runtime definitions instead of hardcoded page text.
- The system is deliberately compact so Milestone 4 world/NPC/quest work can call the same buy, craft, equip, and reward helpers.
- Full inventory sorting, stack limits, selling, storage, rarity UI, and equipment comparison are deferred until the broader inventory pass.
