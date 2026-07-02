# ALAMAT Phase B: Core Libraries

Phase B turns ALAMAT's reusable design vocabulary into database-backed master data. The source of truth is `database/data/alamat_phase_b_seed_data.json`.

## Database Diagram

Each Phase B table follows the same base shape, with nullable extension columns preserved from the JSON payload.

```text
library_affiliations
library_combat_classes
library_nilalang_orders
library_personality_traits
library_ai_behaviors
library_temperaments
library_status_effects
library_trust_methods
library_habitats
library_weather_types
library_active_times
library_rarity_tiers
library_growth_ranks
library_equipment_categories
library_item_categories
library_skill_categories
library_target_types
library_damage_types

id PK
code UNIQUE
name
slug UNIQUE
description
icon_hint
color_hint
sort_order
is_active
theme nullable
battle_role nullable
stat_focus nullable
gameplay_role nullable
behavior_rule nullable
effect_type nullable
default_duration nullable
stackable nullable
example_use_case nullable
rank_order nullable
created_at
updated_at
```

## Seeder Flow

1. Replace or edit `database/data/alamat_phase_b_seed_data.json`.
2. Run `php artisan db:seed --class=LibrarySeeder`.
3. `LibrarySeeder` calls one seeder per library.
4. Each seeder reads only its library key from the JSON file.
5. Rows are written with `updateOrCreate(['code' => ...])`.
6. Rows whose codes are not present in the JSON are deleted so the table stays synced to the source of truth.
7. `LibraryService::clearCache()` clears cached library reads after seeding.

## JSON Structure

```json
{
  "project": "ALAMAT",
  "phase": "Phase B - Core Libraries",
  "version": "1.0",
  "libraries": {
    "affiliations": [],
    "combat_classes": [],
    "nilalang_orders": []
  }
}
```

Each entry must include `code`, `name`, `slug`, `description`, `icon_hint`, `color_hint`, `sort_order`, and `is_active`. Extra fields are preserved in nullable columns.

## API Endpoints

- `GET /api/libraries`
- `GET /api/libraries/{library}`
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

## Backend Architecture

- Models: one Eloquent model per library table, all extending `LibraryEntry`.
- Seeders: one seeder per library, all using `SeedsLibraryFromJson`.
- Repository: `LibraryRepository` maps library keys to model classes.
- Service: `LibraryService` reads database rows, supports lookup by `id`, `code`, `slug`, or `name`, and caches library responses.
- Resources: `LibraryEntryResource` plus named resource classes for future CRUD/admin expansion.
- Validation: `LibraryEntryRequest` contains reusable CRUD-ready rules.

## Caching

Each library is cached for 24 hours with keys such as:

```text
libraries.affiliations
libraries.status_effects
libraries.ai_behaviors
```

The master seeder clears cache after imports.

## Frontend Architecture

- `LibraryService.js` uses Axios for API reads.
- `LibraryContext` loads all libraries once at app startup.
- `useLibraries`, `useAffiliations`, `useCombatClasses`, `useStatusEffects`, and related hooks expose cached context data to future pages.
- `LibrariesPage` provides search, filters, pagination, categories, and cards.
- Static fallback JSON lives in `frontend/src/data/libraries` and mirrors the seed data shape.

## Phase C References

Future Nilalang tables can reference these libraries through foreign keys such as:

```text
affiliation_id -> library_affiliations.id
combat_class_id -> library_combat_classes.id
habitat_id -> library_habitats.id
rarity_id -> library_rarity_tiers.id
growth_rank_id -> library_growth_ranks.id
temperament_id -> library_temperaments.id
active_time_id -> library_active_times.id
weather_type_id -> library_weather_types.id
```

Many-to-many tables can support secondary affiliations, multiple habitats, status immunities, trust methods, skill tags, and equipment compatibility.
