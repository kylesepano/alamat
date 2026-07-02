# ALAMAT Phase G: NPC Codex

Phase G adds a data-driven NPC architecture for story characters, village residents, merchants, trainers, crafters, faction members, companions, shops, schedules, dialogue, and asset prompts.

Included:

- 1,000 named NPC records in `database/data/npcs/npcs.json`
- 2,000 unnamed ambient NPC spawn templates in `database/data/npcs/npc_ambient_templates.json`
- Lookup libraries for categories, roles, professions, factions, personalities, and relationship levels
- Modular dialogue, conditions, schedules, locations, services, shops, inventory, quests, training, portraits, voice profiles, and asset prompts
- PostgreSQL tables, Eloquent models, import/export/validation commands, API resources, services, and React Codex pages
- Asset prompt coverage for every NPC
- `availability_payload` for future story, weather, festival, and faction gates

Commands:

```bash
node tools/generate-phase-g-npcs.mjs
php artisan migrate
php artisan alamat:validate-npcs
php artisan alamat:import-npcs
php artisan alamat:generate-npc-asset-prompts --only-active
php artisan alamat:export-npcs
```

API:

- `GET /api/npcs`
- `GET /api/npcs/{npc_id}`
- `GET /api/npcs/search`
- `GET /api/npcs/region/{region}`
- `GET /api/npcs/faction/{faction}`
- `GET /api/npcs/role/{role}`
- `GET /api/npcs/shopkeepers`
- `GET /api/npcs/trainers`
- `GET /api/npcs/companions`
- `GET /api/npcs/schedule/{npc_id}`
- `GET /api/npcs/dialogue/{npc_id}`
- `GET /api/npcs/categories`
- `GET /api/npcs/roles`
- `GET /api/npcs/factions`
- `GET /api/npcs/ambient`
- `GET /api/npc-codex/summary`

Not implemented yet:

- Runtime quest execution
- Shop purchase transactions
- Dynamic pathfinding
- Save-game relationship persistence
- NPC battle AI
