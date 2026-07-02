# Equipment Import Guide

Generate source JSON:

```bash
node tools/generate-phase-f-equipment.mjs
```

Validate without writing:

```bash
php artisan alamat:validate-equipment
```

Import all equipment:

```bash
php artisan alamat:import-equipment --generate-prompts
```

Import one file:

```bash
php artisan alamat:import-equipment --file=weapons.json --generate-prompts
```

The importer uses `updateOrCreate` by stable IDs, so reruns update records instead of creating duplicates. It resolves category, rarity, required Nilalang, and status effect references by stable IDs, codes, slugs, or names instead of hardcoded database IDs.

After import, verify the codex:

```bash
php artisan alamat:validate-equipment
php artisan route:list --path=api/equipment
```
