# ALAMAT Phase H: Quest Codex

Phase H adds a scalable, data-driven quest architecture for main story, side, Nilalang trust, legendary, faction, relationship, festival, repeatable, hidden, collection, crafting, investigation, and branching quests.

Included:

- 260 starter quest templates
- 780 quest steps
- 780 objective records
- 520 reward records
- 520 requirement records
- 260 dialogue trees
- 260 quest flags
- 240 branching choices
- 5 quest chains
- 260 map markers
- 260 quest asset prompt records
- Progress tracking scaffold in `quest_player_progress`

Commands:

```bash
node tools/generate-phase-h-quests.mjs
php artisan migrate
php artisan alamat:validate-quests
php artisan alamat:import-quests
php artisan alamat:export-quests
```

API endpoints:

- `GET /api/quests`
- `GET /api/quests/{quest_id}`
- `GET /api/quests/slug/{slug}`
- `GET /api/quests/category/{category}`
- `GET /api/quests/type/{type}`
- `GET /api/quests/active`
- `GET /api/quests/available`
- `GET /api/quests/completed`
- `GET /api/quests/chain/{chain_id}`
- `GET /api/quests/chains`
- `GET /api/quests/categories`
- `GET /api/quest-codex/summary`
- `POST /api/quests/{quest_id}/start`
- `POST /api/quests/{quest_id}/advance`
- `POST /api/quests/{quest_id}/complete`
- `POST /api/quests/{quest_id}/choose-branch`

Not implemented yet:

- Player accounts
- Full save-game quest state
- Quest runtime side effects
- Map UI integration
- Battle objective resolution
