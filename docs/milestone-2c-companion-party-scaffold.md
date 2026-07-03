# Milestone 2C - Companion and Party Scaffold

Milestone 2C adds the first story-gated companion framework. The player still does not start with a Nilalang companion.

Implemented:

- Companion registry for bondable vertical slice Nilalang.
- Initial Aghoy companion definition.
- Save data support for:
  - active companion
  - party slot
  - companion collection
  - per-Nilalang bond state
  - trust
  - eligibility
  - bonded state
- Battle victories can award trust to bondable Nilalang.
- Bond eligibility checks required story flags and required trust.
- First companion path is story-gated through `defeated_MON0007`.
- React companion panel displays trust and bond readiness.
- Bond button emits a game command rather than mutating save directly.
- Active companion is passed into battle scenes.
- Battle runtime supports a companion actor scaffold.
- Active companion support skills can appear in the battle command panel.
- Companion support actions consume the player turn.
- Aghoy support skill `Guiding Rustle` applies Haste as a reusable status hook.

Current first-bond rule:

- Aghoy must have enough trust.
- The player must have defeated Batibat.
- Then the bond action becomes available in the Companion panel.

This is intentionally data-shaped so future story routes can unlock bonding through other conditions, such as helping a Nilalang, choosing an affiliation, restoring an area, or receiving a guide's blessing.

Not included yet:

- Multi-member party swapping.
- Companion HP pools.
- Companion defeat conditions.
- Final taming cinematic.
- Full trust method UI.
- Post-battle rewards.
- Experience and leveling.

Next recommended step:

Milestone 2D should add rewards, post-battle result screens, and the first lightweight progression hooks before inventory/equipment/crafting become active in Milestone 3.
