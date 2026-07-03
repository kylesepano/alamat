# Combat Balance Baseline

This document records the first repeatable balance pass for the vertical slice after companion turns were added.

## Command

Run from `frontend/`:

```bash
npm run balance:combat
```

The report uses the same `BattleRuntime` and vertical slice battle data as the playable game.

## Balance Targets

| Encounter Type | Target Rounds | Minimum Player HP After Victory |
| --- | ---: | ---: |
| Wild encounters | 2-5 rounds | 25% |
| Boss encounters | 4-8 rounds | 15% |

## Current Findings

- Solo wild encounters are winnable and sit inside the target range.
- Solo Batibat is intentionally too difficult, which supports the story role of bonding and preparation.
- Player level 3 plus Aghoy level 2 defeats Batibat in about 5 rounds with meaningful damage taken by both player and companion.
- Player level 4 plus geared Aghoy level 3 defeats Batibat in about 4 rounds, which is acceptable for a prepared replay state.
- Duo combat currently does not trivialize Ungo or Batibat, but low-level wild encounters become quick once Aghoy joins. That is acceptable for this slice because Aghoy is earned after the main danger curve.

## Current Report Snapshot

| Scenario | Encounter | Result | Rounds | Player HP | Companion HP | Grade |
| --- | --- | --- | ---: | --- | --- | --- |
| Solo Level 1 | Duwende | victory | 3 | 64/96 | - | ok |
| Solo Level 1 | Ungo | victory | 4 | 40/96 | - | ok |
| Solo Level 1 | Aghoy | victory | 3 | 82/96 | - | ok |
| Solo Level 1 | Batibat | defeat | 4 | 0/96 | - | expected gate |
| Solo Level 3 | Duwende | victory | 3 | 94/122 | - | ok |
| Solo Level 3 | Ungo | victory | 3 | 96/122 | - | ok |
| Solo Level 3 | Aghoy | victory | 2 | 110/122 | - | ok |
| Solo Level 3 | Batibat | defeat | 5 | 0/122 | - | expected gate |
| Player L3 + Aghoy L2 | Duwende | victory | 2 | 106/122 | 84/84 | ok |
| Player L3 + Aghoy L2 | Ungo | victory | 3 | 96/122 | 84/84 | ok |
| Player L3 + Aghoy L2 | Aghoy | victory | 2 | 110/122 | 84/84 | ok |
| Player L3 + Aghoy L2 | Batibat | victory | 5 | 58/122 | 25/84 | ok |
| Player L4 + Geared Aghoy L3 | Duwende | victory | 2 | 119/132 | 92/92 | ok |
| Player L4 + Geared Aghoy L3 | Ungo | victory | 2 | 110/132 | 92/92 | ok |
| Player L4 + Geared Aghoy L3 | Aghoy | victory | 2 | 123/132 | 92/92 | ok |
| Player L4 + Geared Aghoy L3 | Batibat | victory | 4 | 74/132 | 72/92 | ok |

## Next Balance Hooks

- Add simulations for potion usage once item AI heuristics are needed.
- Add encounter chains to estimate Balon return pressure.
- Add future companions as separate scenarios instead of changing Aghoy's baseline.
- Re-run this report after every combat stat, skill power, or enemy AI change.
