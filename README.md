# ALAMAT

ALAMAT is a full-stack browser RPG foundation for a Filipino mythology-inspired Nilalang collector game. Players do not capture creatures. They earn trust and form bonds with mythological beings called Nilalang while restoring balance between humanity and the Spirit Realm.

Phase A builds the universe foundation: lore, realms, Nilalang orders, affiliations, combat class placeholders, trust methods, growth ranks, awakening levels, API endpoints, database placeholders, and a browsable React frontend.

Phase B adds reusable core libraries that future Nilalang, skills, items, quests, and battle systems can reference without duplicating values.

Phase C completes the Version 1 Nilalang Codex: database tables, API, import command, frontend browsing/detail pages, and the first canonical Codex content set.

Phase D adds the Combat Bible architecture: normalized combat schemas, example records, registry tables, validation/audit tooling, and TypeScript interfaces for future combat systems.

Phase E adds the Item Codex and asset pipeline: normalized item data, item APIs, import commands, asset folders, asset prompt generation, and React item browsing pages.

Phase F adds the Equipment Codex: weapons, armor, accessories, relics, instruments, shields, bonded Nilalang gear, upgrade paths, equipment sets, asset prompts, APIs, and React browsing pages.

Phase G adds the NPC Codex: named characters, factions, roles, professions, personalities, relationships, schedules, dialogues, services, shops, trainers, companions, quests, voice profiles, asset prompts, APIs, and React browsing pages.

Phase H adds the Quest Codex: data-driven quest categories, types, statuses, quests, steps, objectives, rewards, requirements, dialogue, flags, branches, chains, markers, progress scaffolding, asset prompts, APIs, and React browsing pages.

Phase I adds the World Codex: regions, provinces, locations, routes, interiors, dungeons, fast travel, transitions, spawn zones, weather zones, NPC placements, quest markers, events, map asset prompts, APIs, and React browsing pages.

Phase J adds the Crafting & Economy Codex: currencies, crafting stations, recipe categories, recipes, ingredients, shop types, shops, shop inventories, vendor profiles, regional price modifiers, barter rules, trade routes, festival markets, economy events, asset prompts, APIs, and React pages.

Phase K adds the Story Bible: acts, chapters, scenes, dialogue nodes, choices, flags, cutscenes, cinematics, lore collectibles, folk tales, songs, poems, timeline, world history, mythology, relationship graph data, endings, epilogues, asset prompts, APIs, and React story browsing pages.

Phase L adds the internal Production Pipeline & Developer Tools platform: import/export job tracking, validation reports, asset registry, prompt records, localization scaffolding, save version metadata, developer command logging, QA/build/analytics/modding scaffolds, APIs, and React production dashboard pages.

## Tech Stack

- Backend: Laravel 12
- Frontend: React, Vite, Tailwind CSS
- Routing: React Router
- Database target: PostgreSQL
- Static fallback data: JSON in `frontend/public/data/game-foundation.json`, `frontend/src/data/game-foundation.json`, and `frontend/src/data/libraries`

## Project Structure

- `app/Data/GameFoundationData.php` contains the canonical Phase A foundation data for the Laravel API and seeders.
- `database/data/alamat_phase_b_seed_data.json` is the canonical Phase B library data source.
- `app/Data/LibraryData.php` reads the Phase B source JSON for seeders and metadata.
- `app/Http/Controllers/Api/GameFoundationController.php` exposes the Phase A API.
- `app/Http/Controllers/Api/LibraryController.php` exposes the Phase B libraries API.
- `app/Http/Resources/FoundationCollectionResource.php` wraps foundation responses.
- `database/migrations` contains future-ready Phase A and Phase B tables.
- `database/seeders/FoundationSeeder.php` seeds the initial universe data.
- `database/seeders/LibrarySeeder.php` seeds the reusable Phase B libraries.
- `docs/phase-b.md` explains the Phase B database, seeding, API, frontend, and cache architecture.
- `docs/phase-c-monster-codex.md` explains the Phase C Codex database, import format, API, and frontend architecture.
- `docs/phase-d-combat-bible.md` explains the Phase D Combat Bible schemas, registry tables, validation flow, and future import plan.
- `docs/phase-e-item-codex.md` explains the Phase E Item Codex.
- `docs/item-asset-prompt-guide.md` explains item and skill asset naming and prompt requirements.
- `docs/phase-f-equipment-codex.md` explains the Phase F Equipment Codex.
- `docs/equipment-asset-prompt-guide.md` explains equipment asset naming and prompt requirements.
- `docs/phase-g-npc-codex.md` explains the Phase G NPC Codex.
- `docs/npc-asset-guide.md` explains NPC asset naming and prompt requirements.
- `docs/phase-h-quest-codex.md` explains the Phase H Quest Codex.
- `docs/quest-import-guide.md` explains the quest import flow.
- `docs/phase-i-world-codex.md` explains the Phase I World Codex.
- `docs/world-asset-guide.md` explains world map asset naming and prompt requirements.
- `docs/phase-j-crafting-economy.md` explains the Phase J Crafting & Economy Codex.
- `docs/economy-api-guide.md` explains the economy API surface.
- `docs/phase-k-story-bible.md` explains the Phase K Story Bible.
- `docs/story-schema.md` documents story JSON and database records.
- `docs/dialogue-system.md` documents dialogue nodes, choices, flags, localization keys, and consequences.
- `docs/timeline.md` documents the canonical ALAMAT timeline.
- `docs/mythology.md` documents fictional mythology rules.
- `docs/endings.md` documents ending route families.
- `docs/localization-guide.md` documents story localization guidance.
- `docs/story-asset-guide.md` documents story asset prompt requirements.
- `docs/phase-l-production-pipeline.md` explains the Phase L production platform.
- `docs/import-system.md` explains production import wrappers and reports.
- `docs/validation-engine.md` explains JSON/HTML validation reports.
- `docs/asset-pipeline.md` explains asset lifecycle tracking.
- `docs/localization.md` explains localization keys and language support.
- `docs/save-system.md` explains versioned save metadata.
- `docs/modding-guide.md` explains future external JSON pack support.
- `docs/developer-console.md` explains development-only console command logging.
- `docs/milestone-0-gameplay-production-blueprint.md` locks the pre-gameplay Phaser direction.
- `docs/vertical-slice-asset-manifest.md` lists the first playable asset needs.
- `docs/vertical-slice-asset-prompts.md` contains generation prompts for the first vertical slice asset roster.
- `docs/asset-generation-workflow.md` explains where to generate assets and how to replace placeholders.
- `docs/vertical-slice-roster.md` selects the first playable roster from existing codex data.
- `docs/milestone-1-implementation-plan.md` defines the Core Engine implementation order.
- `docs/milestone-1-core-engine.md` documents the first playable Phaser core engine shell.
- `docs/milestone-2a-battle-foundation.md` documents the first playable battle scene shell.
- `docs/milestone-2b-skill-status-runtime.md` documents the reusable battle skill/status runtime.
- `docs/milestone-2c-companion-party-scaffold.md` documents the story-gated companion and party scaffold.
- `docs/milestone-2d-rewards-progression.md` documents post-battle rewards and lightweight progression.
- `docs/milestone-3-inventory-economy-foundation.md` documents the first playable inventory, equipment, crafting, and economy systems.
- `docs/milestone-4-world-npc-quest-foundation.md` documents the first playable world, NPC, and quest progression layer.
- `docs/milestone-5-story-polish-asset-reset.md` documents story scene integration and the reset asset-format direction.
- `database/combat` contains Phase D Combat Bible JSON Schema files and architecture examples.
- `database/data/items` contains Phase E item seed data.
- `database/data/equipment` contains Phase F equipment seed data.
- `database/data/npcs` contains Phase G NPC seed data.
- `database/data/quests` contains Phase H quest seed data.
- `database/data/world` contains Phase I world seed data.
- `database/data/economy` contains Phase J economy seed data.
- `database/data/story` contains Phase K story bible seed data.
- `database/import_templates` and `database/validation_rules` contain Phase L production manifests.
- `frontend/src/components` contains reusable UI pieces.
- `frontend/src/pages` contains the requested browsing pages.
- `frontend/src/services` and `frontend/src/hooks` load API data with static JSON fallback.

## Installation

Install backend dependencies:

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## PostgreSQL Setup

Create a PostgreSQL database named `alamat`, then set these values in `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=alamat
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

Run migrations and seed Phase A and Phase B data:

```bash
php artisan migrate --seed
```

## Run Locally

Start the Laravel API:

```bash
php artisan serve
```

Start the React frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the frontend at the Vite URL, usually `http://localhost:5173`. The Vite dev server proxies `/api` requests to `http://127.0.0.1:8000`.

## API Endpoints

Phase A:

- `GET /api/lore/ages`
- `GET /api/lore/realms`
- `GET /api/nilalang/orders`
- `GET /api/affiliations`
- `GET /api/classes`
- `GET /api/trust-methods`
- `GET /api/growth-system`
- `GET /api/game-foundation`

Phase B:

- `GET /api/libraries`
- `GET /api/libraries/affiliations`
- `GET /api/libraries/combat-classes`
- `GET /api/libraries/nilalang-orders`
- `GET /api/libraries/personality-traits`
- `GET /api/libraries/ai-behaviors`
- `GET /api/libraries/temperaments`
- `GET /api/libraries/status-effects`
- `GET /api/libraries/trust-methods`
- `GET /api/libraries/habitats`
- `GET /api/libraries/weather-types`
- `GET /api/libraries/active-times`
- `GET /api/libraries/rarity-tiers`
- `GET /api/libraries/growth-ranks`
- `GET /api/libraries/equipment-categories`
- `GET /api/libraries/item-categories`
- `GET /api/libraries/skill-categories`
- `GET /api/libraries/target-types`
- `GET /api/libraries/damage-types`

Phase C:

- `GET /api/monsters`
- `GET /api/monsters/{monster_id}`
- `GET /api/monsters/slug/{slug}`
- `GET /api/monsters/filter`
- `GET /api/monster-codex/summary`

Phase D has no public gameplay API yet. Validate the Combat Bible architecture with:

```bash
php artisan alamat:combat-bible-audit
```

Phase E:

- `GET /api/items`
- `GET /api/items/{item_id}`
- `GET /api/items/slug/{slug}`
- `GET /api/items/category/{category}`
- `GET /api/items/search`
- `GET /api/items/crafting-materials`
- `GET /api/items/monster-drops`
- `GET /api/items/offerings`
- `GET /api/items/quest-items`
- `GET /api/items/categories`
- `GET /api/item-codex/summary`

Phase F:

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

Phase G:

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

Phase H:

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

Phase I:

- `GET /api/world/regions`
- `GET /api/world/provinces`
- `GET /api/world/locations`
- `GET /api/world/locations/{location_id}`
- `GET /api/world/locations/slug/{slug}`
- `GET /api/world/locations/type/{type}`
- `GET /api/world/routes`
- `GET /api/world/spawns/{location_id}`
- `GET /api/world/npcs/{location_id}`
- `GET /api/world/fast-travel`
- `GET /api/world/events`
- `GET /api/world-codex/summary`

Phase J:

- `GET /api/economy/currencies`
- `GET /api/economy/stations`
- `GET /api/economy/recipes`
- `GET /api/economy/recipes/{recipe_id}`
- `GET /api/economy/shops`
- `GET /api/economy/shops/{shop_id}`
- `GET /api/economy/shops/{shop_id}/inventory`
- `GET /api/economy/trade-routes`
- `GET /api/economy/festival-markets`
- `GET /api/economy/events`
- `GET /api/economy-codex/summary`
- `POST /api/economy/craft/{recipe_id}`
- `POST /api/economy/buy`
- `POST /api/economy/sell`
- `POST /api/economy/barter`

Phase K:

- `GET /api/story/acts`
- `GET /api/story/chapters`
- `GET /api/story/scenes`
- `GET /api/story/dialogues`
- `GET /api/story/timeline`
- `GET /api/story/lore`
- `GET /api/story/endings`
- `GET /api/story/mythology`
- `GET /api/story/relationships`
- `GET /api/story-codex/summary`

Phase L:

- `GET /api/production/summary`
- `GET /api/production/import-status`
- `POST /api/production/import`
- `GET /api/production/export-jobs`
- `POST /api/production/export`
- `GET /api/production/validation-reports`
- `POST /api/production/validate`
- `GET /api/production/assets`
- `POST /api/production/assets`
- `POST /api/production/prompts`
- `GET /api/production/localization`
- `GET /api/production/build-status`
- `GET /api/production/qa-reports`
- `GET /api/production/analytics-summary`
- `GET /api/production/mod-packs`
- `POST /api/production/developer-command`

## Frontend Pages

- Home
- Lore
- World
- Nilalang Orders
- Affiliations
- Trust System
- Game Bible
- Libraries
- Nilalang Codex
- Item Codex
- Equipment Codex
- NPC Codex
- Quest Codex
- World Codex
- Economy Dashboard
- Story Codex
- Production Dashboard

## Phase A Scope

Included:

- Kapuluan world summary and regions
- Three realms
- Five ages
- Core themes
- Six Nilalang orders
- Initial affiliation system
- Initial combat class taxonomy
- Trust-based recruitment methods
- Growth ranks and awakening levels
- Laravel API endpoints
- PostgreSQL-compatible migrations
- Seeders and static fallback JSON
- Responsive React/Tailwind interface

## Phase B Scope

Included:

- Normalized reusable library records with `id`, `code`, `name`, `slug`, `description`, `icon_hint`, `color_hint`, `sort_order`, and `is_active`
- Library groups for affiliations, combat classes, Nilalang orders, personality traits, AI behavior profiles, temperaments, status effects, trust methods, habitats, weather types, active times, rarity tiers, growth ranks, equipment categories, item categories, skill categories, target types, and damage types
- PostgreSQL-compatible Phase B library tables
- `LibrarySeeder` for Phase B data
- Combined and per-library frontend fallback JSON files in `frontend/src/data/libraries`
- `/api/libraries` aggregate endpoint and individual library endpoints
- Libraries page with filter sections for Battle, World, Nilalang Design, Items, Skills, and Progression
- Reusable frontend components: `LibraryCard`, `LibraryGrid`, `LibrarySection`, `LibraryFilterTabs`, `StatBadge`, and `TagBadge`

New Phase B database tables:

- `library_affiliations`
- `library_combat_classes`
- `library_nilalang_orders`
- `library_personality_traits`
- `library_ai_behaviors`
- `library_temperaments`
- `library_status_effects`
- `library_trust_methods`
- `library_habitats`
- `library_weather_types`
- `library_active_times`
- `library_rarity_tiers`
- `library_growth_ranks`
- `library_equipment_categories`
- `library_item_categories`
- `library_skill_categories`
- `library_target_types`
- `library_damage_types`

To seed Phase B data directly:

```bash
php artisan db:seed --class=LibrarySeeder
```

The seeder reads from `database/data/alamat_phase_b_seed_data.json`, uses `updateOrCreate`, removes stale codes not present in the JSON, and clears the library cache.

## Phase C Support

Phase C Nilalang entries can reference Phase B libraries by stable `code` or database id. A future Nilalang record can link to affiliations, combat classes, Nilalang order, personality traits, AI behavior profile, temperament, habitats, active times, rarity tier, growth rank, trust methods, status effects, target types, damage types, and skill categories without copying label text or design metadata into each entry.

## Phase C Scope

Status: Version 1 complete.

Included:

- `monsters` table and Codex relationship pivots
- Unique skill and temporary common skill link tables
- Eloquent models and Phase B relationships
- API resources and Codex endpoints
- `MonsterImportService`
- `php artisan alamat:import-monsters`
- JSON and CSV import support from `database/data/monsters`
- Nilalang Codex list and detail pages
- Search, filters, cards, tabs, stats, lore, skills, habitats, trust, assets, variants, and design notes
- 122 canonical Nilalang records after duplicate cleanup
- Completed lore fields for canonical entries: `folklore_summary`, `alamat_lore`, and `lore_and_backstory`
- Signature skills, common skill links, passive abilities, stat blocks, sprite prompts, portrait prompts, animation prompts, drop items, equipment compatibility, and boss/corrupted/divine variant notes
- Duplicate-name handling that skips later duplicate Nilalang instead of importing alternate copies

Import a batch:

```bash
php artisan alamat:import-monsters --file=batch_001.json --format=json
```

Dry run a batch:

```bash
php artisan alamat:import-monsters --file=batch_001.json --format=json --dry-run
```

Not included yet:

- Full combat logic
- Nilalang ownership or forced recruitment mechanics
- Additional Nilalang expansions beyond the Version 1 Codex set
- Inventory
- Quests implementation
- Maps
- NPC systems
- Multiplayer

## Future Phases

The Version 1 Codex is large enough for development to continue, but it remains a living content system. Future phases can add more Nilalang, battle rules, items, quests, maps, NPCs, shrine interactions, player accounts, save data, asset generation, and multiplayer systems. The current foundation keeps those systems separated so they can be added without rewriting the lore and taxonomy layer.

## Phase D Scope

Status: architecture scaffold complete.

Included:

- Exact `database/combat` module structure for skills, passives, status, affinity, formulas, battlefield, AI, scaling, combos, combat events, learning, and balance
- JSON Schema files for every Combat Bible module
- Matching example records under `database/combat/examples`
- `combat_bible_entries` and `combat_bible_references` registry tables
- `CombatBibleEntry` and `CombatBibleReference` Eloquent models
- `CombatBibleImportService`
- `CombatBibleSeeder`
- `php artisan alamat:combat-bible-audit`
- Frontend TypeScript interfaces in `frontend/src/types/combatBible.ts`
- Documentation in `docs/phase-d-combat-bible.md`

Not included yet:

- Final combat content population
- Battle runtime simulation
- Damage resolver
- Capture/trust resolver
- Equipment or inventory runtime

## Phase E Scope

Status: Item Codex and asset pipeline scaffold complete.

Included:

- `item_categories`, `items`, `item_recipes`, `monster_drop_tables`, and `quest_item_requirements` tables
- `ItemCategory`, `Item`, `ItemRecipe`, `MonsterDropTable`, and `QuestItemRequirement` models
- `ItemService`, `ItemImportService`, `ItemAssetPromptService`, `ItemRecipeService`, and `DropTableService`
- `php artisan alamat:import-items`
- `php artisan alamat:validate-items`
- `php artisan alamat:generate-item-asset-prompts`
- `php artisan alamat:export-items`
- `php artisan alamat:sync-monster-drops`
- 30 item categories
- 1,075 initial non-equipment items
- 120 item recipes
- 185 generated monster drop table links
- Asset folders under `public/assets/items` and `public/assets/skills`
- Required asset prompts and filenames for every item
- Phase D skill schemas updated with icon/effect/cast/impact filenames and prompts
- React Item Codex, detail page, category/type pages, search, filters, recipes, drop sources, asset prompt panel, and JSON debug panel

Not included yet:

- Inventory ownership/runtime
- Crafting execution runtime
- Quest runtime

## Phase F Scope

Status: Equipment Codex and asset pipeline scaffold complete.

Included:

- `equipment_categories`, `equipment`, `equipment_upgrade_paths`, `equipment_sets`, and `equipment_set_items` tables
- `EquipmentCategory`, `Equipment`, `EquipmentUpgradePath`, and `EquipmentSet` models
- `EquipmentService`, `EquipmentImportService`, `EquipmentAssetPromptService`, `EquipmentUpgradeService`, and `EquipmentSetService`
- `php artisan alamat:import-equipment`
- `php artisan alamat:validate-equipment`
- `php artisan alamat:generate-equipment-asset-prompts`
- `php artisan alamat:export-equipment`
- `php artisan alamat:sync-equipment-sets`
- 14 equipment categories
- 650 initial equipment records
- 180 upgrade paths
- 5 equipment sets and 40 set links
- Required asset prompts and filenames for every equipment record
- Asset folders under `public/assets/equipment`
- React Equipment Codex, detail page, weapon/armor/accessory/Nilalang gear pages, search, filters, stat blocks, effects, upgrade paths, set pages, and asset prompt panels
- `compatibility_payload` for future class, affiliation, Nilalang, and user-type loadout rules

Seed and import Phase F:

```bash
node tools/generate-phase-f-equipment.mjs
php artisan migrate
php artisan alamat:validate-equipment
php artisan alamat:import-equipment --generate-prompts
```

Not included yet:

- Inventory ownership/runtime
- Equipment shop NPCs
- Crafting or upgrade execution runtime
- Final combat damage resolver

## Phase G Scope

Status: NPC Codex and data-driven character architecture scaffold complete.

Included:

- NPC lookup tables for categories, roles, professions, factions, personalities, and relationship levels
- `npcs`, `npc_locations`, `npc_schedules`, `npc_dialogues`, `npc_dialogue_conditions`, `npc_services`, `npc_shops`, `npc_inventory`, `npc_quests`, `npc_training`, `npc_portraits`, `npc_voice_profiles`, and `npc_asset_prompts` tables
- `NPCService`, `DialogueService`, `RelationshipService`, `ScheduleService`, `ShopService`, `TrainerService`, `CompanionService`, `NPCAssetPromptService`, and `NPCImportService`
- `php artisan alamat:import-npcs`
- `php artisan alamat:validate-npcs`
- `php artisan alamat:generate-npc-asset-prompts`
- `php artisan alamat:export-npcs`
- 1,000 named NPC records
- 2,000 unnamed ambient NPC spawn templates
- 1,000 schedules
- 1,000 dialogue trees and condition records
- 1,000 services
- 200 shops
- 600 shop inventory links
- 160 training lessons
- 340 quest hooks
- 1,000 voice profiles
- 1,000 NPC asset prompt records
- Asset folders under `public/assets/npcs`
- React NPC Codex, detail page, search, relationship, schedule, shop, trainer, faction, and companion directory pages
- `availability_payload` for future story, weather, festival, and faction reputation gates

Seed and import Phase G:

```bash
node tools/generate-phase-g-npcs.mjs
php artisan migrate
php artisan alamat:validate-npcs
php artisan alamat:import-npcs
```

Not included yet:

- Runtime shop purchases
- Runtime quest execution
- Save-game relationship state
- NPC pathfinding
- NPC battle AI

## Phase H Scope

Status: Quest Codex and data-driven quest architecture scaffold complete.

Included:

- `quest_categories`, `quest_types`, `quest_statuses`, `quests`, `quest_steps`, `quest_objectives`, `quest_rewards`, `quest_requirements`, `quest_dialogues`, `quest_flags`, `quest_branches`, `quest_chains`, `quest_markers`, `quest_asset_prompts`, and `quest_player_progress` tables
- `QuestService`, `QuestImportService`, `QuestConditionService`, `QuestProgressService`, `QuestRewardService`, `QuestBranchService`, `QuestFlagService`, and `QuestMarkerService`
- `php artisan alamat:import-quests`
- `php artisan alamat:validate-quests`
- `php artisan alamat:export-quests`
- 260 starter quest templates
- 780 quest steps
- 780 objectives
- 520 rewards
- 520 requirements
- 260 dialogue trees
- 260 quest flags
- 240 branching choices
- 5 quest chains
- 260 map markers
- 260 quest asset prompt records
- Asset folders under `public/assets/quests`
- React Quest Codex, detail page, active quest page, chain pages, faction quest page, Nilalang trust quest page, and legendary quest page

Seed and import Phase H:

```bash
node tools/generate-phase-h-quests.mjs
php artisan migrate
php artisan alamat:validate-quests
php artisan alamat:import-quests
```

Not included yet:

- Full save-game quest runtime
- Quest side-effect execution
- Battle objective resolver
- Map marker rendering on a world map

## Phase I Scope

Status: World Codex and location architecture scaffold complete.

Included:

- `world_regions`, `provinces`, `location_types`, `locations`, `world_routes`, `interiors`, `dungeons`, `fast_travel_points`, `map_transitions`, `spawn_zones`, `weather_zones`, `npc_placements`, `world_quest_markers`, `world_events`, and `map_asset_prompts` tables
- `WorldService`, `LocationImportService`, `SpawnZoneService`, `MapTransitionService`, `FastTravelService`, `WeatherZoneService`, `NPCPlacementService`, and `MapAssetPromptService`
- `php artisan alamat:import-world`
- `php artisan alamat:validate-world`
- 17 world regions
- 17 province hooks
- 170 starter locations
- 51 routes
- 51 interiors
- 34 dungeons and boss arenas
- 51 fast travel points
- 170 map transitions
- 119 spawn zones
- 170 weather zones
- 170 NPC placements
- 170 world quest markers
- 80 world events
- 170 map asset prompt records
- Asset folders under `public/assets/world`
- React World Codex, location detail page, route page, dungeon page, spawn page, fast travel page, region page, and province page

Seed and import Phase I:

```bash
node tools/generate-phase-i-world.mjs
php artisan migrate
php artisan alamat:validate-world
php artisan alamat:import-world
```

Not included yet:

- Tilemap renderer
- Pathfinding runtime
- Dynamic weather simulation
- Fast-travel transaction flow

## Phase J Scope

Status: Crafting & Economy Codex scaffold complete.

Included:

- `currencies`, `crafting_stations`, `recipe_categories`, `recipes`, `recipe_ingredients`, `shop_types`, `shops`, `shop_inventories`, `vendor_profiles`, `regional_price_modifiers`, `barter_rules`, `trade_routes`, `festival_markets`, `economy_events`, and `economy_asset_prompts` tables
- `CraftingService`, `RecipeImportService`, `ShopService`, `EconomyPricingService`, `BarterService`, `TradeRouteService`, `FestivalMarketService`, and `CurrencyService`
- `php artisan alamat:import-economy`
- `php artisan alamat:validate-economy`
- 6 currencies
- 56 crafting stations
- 14 recipe categories
- 168 recipes
- 504 recipe ingredients
- 80 shops
- 320 shop inventory rows
- 80 vendor profiles
- 60 regional price modifiers
- 60 barter rules
- 50 trade routes
- 20 festival markets
- 40 economy events
- 230 economy asset prompt records
- Asset folders under `public/assets/economy`
- React crafting codex, recipe detail, shop directory, shop detail, trade route, festival market, and economy dashboard pages

Seed and import Phase J:

```bash
node tools/generate-phase-j-economy.mjs
php artisan migrate
php artisan alamat:validate-economy
php artisan alamat:import-economy
```

Not included yet:

- Player inventory transactions
- Wallet/save-game currency balances
- Real buy/sell mutation
- Crafting success rolls

## Phase K Scope

Status: Story Bible architecture complete.

Included:

- `story_acts`, `story_chapters`, `story_scenes`, `dialogues`, `dialogue_choices`, `dialogue_flags`, `cutscenes`, `cinematics`, `lore_books`, `folk_tales`, `songs`, `poems`, `timeline_entries`, `historical_events`, `world_history_entries`, `mythology_entries`, `character_relationships`, `ending_routes`, `epilogues`, and `story_asset_prompts` tables
- `StoryService`, `DialogueService` story node support, `ChoiceService`, `TimelineService`, `LoreService`, `EndingService`, `RelationshipGraphService`, `LocalizationService`, and `StoryImportService`
- `php artisan alamat:import-story`
- `php artisan alamat:validate-story`
- 9 acts
- 15 chapters
- 30 scenes
- 30 dialogue nodes
- 60 dialogue choices
- 40 dialogue flags
- 9 timeline eras
- 36 historical events
- 11 mythology entries
- 70 relationship graph edges
- 8 ending routes
- 62 story asset prompt records
- Asset folders under `public/assets/story`
- React Story Codex, Act Viewer, Chapter Viewer, Timeline Viewer, Lore Library, Dialogue Browser, Relationship Graph, Ending Gallery, and Mythology Encyclopedia pages

Seed and import Phase K:

```bash
node tools/generate-phase-k-story.mjs
php artisan migrate
php artisan alamat:validate-story
php artisan alamat:import-story
```

Not included yet:

- Full cinematic playback
- Voice audio files
- Final localized translations
- Final illustrated story assets

## Phase L Scope

Status: Production Pipeline & Developer Tools scaffold complete.

Included:

- `production_import_jobs`, `production_export_jobs`, `production_validation_reports`, `production_assets`, `production_prompt_records`, `production_localization_strings`, `production_save_versions`, `production_qa_reports`, `production_build_runs`, `production_analytics_events`, `production_mod_packs`, and `production_console_logs` tables
- `ProductionImportPipelineService`, `ProductionExportService`, `ProductionValidationService`, `ProductionAssetPipelineService`, and `ProductionPlatformService`
- Import aliases: `php artisan alamat:import:monsters`, `alamat:import:items`, `alamat:import:equipment`, `alamat:import:npcs`, `alamat:import:quests`, `alamat:import:world`, and `alamat:import:story`
- `php artisan alamat:production:validate`
- `php artisan alamat:production:export`
- `php artisan alamat:production:seed-defaults`
- Production API endpoints under `/api/production`
- React Developer Dashboard, Import Center, Validation Center, Asset Manager, Prompt Manager, Localization Manager, Save Inspector, QA Dashboard, Analytics Dashboard, and Build Manager
- Required production folders under `storage`, `database`, `docs/production`, and `app`

Run Phase L checks:

```bash
php artisan migrate
php artisan db:seed --class=ProductionSeeder
php artisan alamat:production:validate story
php artisan alamat:production:export story --format=json --limit=5
php artisan alamat:import:story --dry-run
```

Not included yet:

- Full authenticated admin role UI
- Live JSON editing writes from React
- PDF rendering
- Real asset generation calls
- Production telemetry ingestion
