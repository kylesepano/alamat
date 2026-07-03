# Milestone 2B - Skill and Status Runtime

Milestone 2B upgrades the battle shell from fixed actions into a reusable skill/status runtime.

Implemented:

- Frontend combat runtime registry shaped after the Combat Bible skill/status schemas.
- Reusable skill fields:
  - category
  - type
  - damage type
  - target type
  - power
  - accuracy
  - cooldown
  - status effect reference
  - status chance
- Reusable status fields:
  - duration
  - stack behavior placeholder
  - damage taken modifier
  - attack modifier
  - future speed modifier hook
  - turn skip hook
- Player action list now renders from registered skills.
- Enemy skill rotation resolves skill IDs through the same registry.
- Cooldown handling.
- Accuracy handling.
- Status application.
- Status ticking.
- Guard no longer expires before the enemy attack.
- Sleep can skip a turn.
- Weaken can reduce outgoing damage.
- Haste and Slow are present as turn-order hooks for a later initiative system.
- Battle panel now displays active statuses and skill metadata.

Current scope:

- Skill data is local frontend runtime data, not yet fetched from the Laravel API.
- The formulas are intentionally simple and not final balance.
- Targeting is still one-player-versus-one-Nilalang.
- Status visuals are text-only.
- No inventory, equipment, companion party, experience, rewards, or taming yet.

Next recommended step:

Milestone 2C should add party/companion battle scaffolding and the first trust/bond unlock flow while keeping the first companion story-gated.
