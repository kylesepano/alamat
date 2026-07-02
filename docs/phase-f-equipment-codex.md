# ALAMAT Phase F: Equipment Codex

Phase F adds equipment as a separate system from normal items. Equipment can later attach to player loadouts, NPCs, bonded Nilalang, combat classes, affinities, status effects, upgrades, and set bonuses.

Included:

- Equipment source JSON in `database/data/equipment`
- 14 equipment categories
- 650 initial equipment records
- 180 upgrade paths
- 5 equipment sets with 40 set links
- Equipment migrations, models, API resources, services, seeders, and commands
- Asset folders under `public/assets/equipment`
- Asset prompt generation and validation
- React Equipment Codex pages, detail views, filters, set pages, and asset prompt panels

## Commands

```bash
node tools/generate-phase-f-equipment.mjs
php artisan migrate
php artisan alamat:validate-equipment
php artisan alamat:import-equipment --generate-prompts
php artisan alamat:generate-equipment-asset-prompts --only-active
php artisan alamat:sync-equipment-sets
php artisan alamat:export-equipment
```

## API

- `GET /api/equipment`
- `GET /api/equipment/{equipment_id}`
- `GET /api/equipment/slug/{slug}`
- `GET /api/equipment/category/{category}`
- `GET /api/equipment/slot/{slot}`
- `GET /api/equipment/search`
- `GET /api/equipment/categories`
- `GET /api/equipment/sets`
- `GET /api/equipment/sets/{set_id}`
- `GET /api/equipment-codex/summary`

## Separation From Items

Equipment records are intentionally not stored in the `items` table. Items remain consumables, materials, offerings, drops, quest items, and crafting resources. Equipment gets stat modifiers, slot rules, restrictions, set memberships, upgrade paths, and dedicated asset prompts.

## Future Use

Phase G/H systems can reference equipment by stable `equipment_id` or `slug`. Combat can read stat modifiers and effects; inventory can own instances later; quests can award equipment; crafting can consume Phase E items to upgrade Phase F equipment.
