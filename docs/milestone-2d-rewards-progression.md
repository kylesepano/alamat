# Milestone 2D - Rewards and Progression Scaffold

Milestone 2D adds post-battle rewards and lightweight progression without activating full inventory, equipment, crafting, or economy systems.

Implemented:

- Battle reward registry for the vertical slice encounters.
- XP rewards.
- Lightweight level thresholds.
- Player battle stats scale modestly from saved level.
- Pilak currency counter.
- Field reward log for discovered drops.
- Reward history log.
- Post-battle result modal.
- Progression panel on `/play`.
- Boss unique reward flag so Batibat's unique reward is not duplicated.
- Repeat boss victories grant reduced practice XP only.
- Flee/defeat result summaries grant no rewards.

Current scope:

- Field drops are notes, not inventory items.
- Pilak is a counter, not a full wallet/economy transaction system.
- Leveling affects battle stats only through a simple scaffold.
- No equipment rewards are granted.
- No crafting materials are inserted into inventory.
- No post-battle loot choice screen yet.

Next recommended step:

Milestone 3 should begin inventory, equipment, crafting, and economy integration using the existing Phase E/F/J codex data.
