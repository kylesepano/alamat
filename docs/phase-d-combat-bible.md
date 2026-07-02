# ALAMAT Phase D: Combat Bible Architecture

Phase D creates the Combat Bible architecture. It does not populate the final combat dataset yet. The goal is to define stable schemas, database constraints, validation rules, import/export flow, and reference rules before large-scale content generation begins.

## Source Layout

The canonical architecture lives in `database/combat`.

- `skills/*` defines skill schemas for common, class, affiliation, signature, boss, NPC, and hidden skills.
- `passives/passives.json` defines passive ability schema.
- `status/status_effects.json` defines combat status schema.
- `affinity/*` defines affinity records and effectiveness chart rows.
- `formulas/*` separates damage, healing, and capture formulas.
- `battlefield/*` separates weather, terrain, and field effects.
- `ai/*` separates AI profiles from targeting profiles.
- `scaling/*` separates rarity, boss, and stat growth scaling.
- `combos/combo_skills.json` defines multi-Nilalang combo hooks.
- `events/combat_events.json` defines dynamic battle events.
- `learning/*` defines skill acquisition rules.
- `balance/combat_balance_rules.json` defines tuning constraints and limits.

Each listed file is a JSON Schema document. Example records live under `database/combat/examples` with the same relative paths.

## Required Metadata

Every Combat Bible record must include:

- `id`
- `uuid`
- `slug`
- `created_at`
- `updated_at`
- `version`
- `source`
- `notes`

Each module also has a stable domain ID, such as `skill_id`, `passive_id`, `status_effect_id`, `formula_id`, `weather_id`, or `learning_id`.

## Database Registry

Phase D adds two normalized registry tables:

- `combat_bible_entries`
- `combat_bible_references`

The registry stores module/category/entry IDs, slugs, version, source notes, and the validated JSON payload. Cross-module references are stored separately so future tools can answer questions like "which monsters learn this skill?" or "which formulas affect this status?"

## Reference Rules

Combat records must reference existing IDs instead of duplicating names.

Examples:

- Monster learning records reference `monster_id` and `skill_id`.
- Skills reference `status_effect_id`, `target_type`, `required_class`, `required_weather`, and `required_terrain`.
- Affinity chart rows reference attacker and defender affiliation IDs.
- Status effects reference formula IDs instead of embedding formula logic.
- Scaling records reference rarity, boss rank, or class IDs.

## Validation

Run:

```bash
php artisan alamat:combat-bible-audit
```

Optional example import dry run:

```bash
php artisan alamat:combat-bible-audit --import-examples --dry-run
```

Import example records into the registry:

```bash
php artisan db:seed --class=CombatBibleSeeder
```

The example records are for architecture validation only. They are not the final combat content set.

## Migration Plan

The registry approach is intentionally generic for Phase D. Future phases can either keep using JSONB-backed registry records or promote heavily queried modules into dedicated tables after content and query patterns stabilize.

Planned dedicated tables, if needed:

- `combat_skills`
- `combat_passives`
- `combat_status_effects`
- `combat_formulas`
- `combat_affinities`
- `combat_affinity_chart`
- `combat_weather`
- `combat_terrain`
- `combat_ai_profiles`
- `combat_skill_learning`
- `combat_balance_rules`

## Version 1 Compatibility

Phase D connects to the Version 1 Codex by references only. It does not rewrite existing monster rows and does not duplicate skill text from Phase C. Later imports can map Phase C unique/common skills into Combat Bible skills using stable `monster_id`, `skill_slug`, and generated `skill_id` values.

## Not Included Yet

- Final 1,200+ skill content
- Final 400 passive abilities
- Final 120 status effects
- Battle simulator or turn resolver
- Damage execution engine
- Capture/trust resolver
- Inventory or equipment runtime

Those should be populated incrementally after the schemas are reviewed.
