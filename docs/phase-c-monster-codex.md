# ALAMAT Phase C: Nilalang Codex Foundation

Phase C prepares the Nilalang Codex system. It does not add hundreds of entries yet; it creates the database, API, import flow, and frontend foundation so Nilalang batches can be added later.

## Database Structure

Primary table:

```text
monsters
id
monster_id unique
filipino_name
english_name
scientific_name nullable
nickname nullable
slug unique
region_of_origin
province_origin nullable
ethnolinguistic_origin nullable
folklore_source_url nullable
mythological_category
rarity_id -> library_rarity_tiers.id
nilalang_order_id -> library_nilalang_orders.id
combat_class_id -> library_combat_classes.id
temperament_id -> library_temperaments.id nullable
ai_behavior_id -> library_ai_behaviors.id nullable
passive_ability
stats: hp, attack, magic, defense, spirit_defense, speed, luck, faith
capture_difficulty, displayed as trust difficulty
trust_method_id -> library_trust_methods.id nullable
lore, variant, asset, audio, drop, equipment, prompt, and design fields
is_recruitable
is_boss
is_active
timestamps
```

Pivot tables:

- `monster_affiliation`
- `monster_personality_trait`
- `monster_habitat`
- `monster_weather_type`
- `monster_active_time`

Skill staging tables:

- `monster_unique_skills`
- `monster_common_skill_links`

## Import Format

Place import files in:

```text
database/data/monsters/
```

Supported filenames and formats:

```bash
php artisan alamat:import-monsters --file=monsters_batch_001.json --format=json
php artisan alamat:import-monsters --file=monsters_batch_001.csv --format=csv
php artisan alamat:import-monsters --file=monsters_batch_001.json --format=json --dry-run
```

## JSON Example

```json
{
  "monsters": [
    {
      "monster_id": "NLG001",
      "filipino_name": "Example Nilalang",
      "english_name": "Example Being",
      "slug": "example-nilalang",
      "region_of_origin": "Northern Isles",
      "mythological_category": "Guardian spirit",
      "rarity": "rare",
      "order": "espiritu",
      "class": "guardian",
      "affiliation": "forest, spirit",
      "habitat": "old-forest",
      "weather_preference": "fog",
      "active_time": "night",
      "trust_method": "restore-shrine",
      "passive_ability": "Protects allies near sacred ground.",
      "hp": 80,
      "attack": 40,
      "magic": 55,
      "defense": 70,
      "spirit_defense": 65,
      "speed": 35,
      "luck": 20,
      "faith": 60,
      "capture_difficulty": 45,
      "folklore_summary": "Documented folklore notes go here.",
      "alamat_lore": "Original ALAMAT lore goes here.",
      "lore_and_backstory": "Combined story summary.",
      "physical_description": "Visual description.",
      "sprite_filename": "example.png",
      "battle_portrait_filename": "example_portrait.png",
      "overworld_sprite_filename": "example_overworld.png",
      "sprite_prompt": "Pixel sprite prompt.",
      "portrait_prompt": "Portrait prompt.",
      "battle_animation_prompt": "Battle animation prompt.",
      "unique_skill_1": "Shrine Ward",
      "unique_skill_2": "Root Oath",
      "learnable_common_skills": "Guard, Blessing"
    }
  ]
}
```

## CSV Column List

Supported columns:

`id`, `monster_id`, `filipino_name`, `english_name`, `region_of_origin`, `province_origin`, `ethnolinguistic_origin`, `folklore_source_url`, `mythological_category`, `affiliation`, `class`, `rarity`, `passive_ability`, `unique_skill_1`, `unique_skill_2`, `learnable_common_skills`, `hp`, `attack`, `magic`, `defense`, `spirit_defense`, `speed`, `luck`, `faith`, `capture_difficulty`, `habitat`, `weather_preference`, `active_time`, `favorite_food_offering`, `lore_and_backstory`, `folklore_summary`, `alamat_lore`, `physical_description`, `personality`, `weaknesses`, `resistances`, `npc_related`, `quest_appearances`, `boss_variant`, `corrupted_variant`, `divine_variant`, `sprite_filename`, `battle_portrait_filename`, `overworld_sprite_filename`, `sound_effects`, `cry_voice_description`, `drop_items`, `equipment_compatibility`, `sprite_prompt`, `portrait_prompt`, `battle_animation_prompt`, `design_notes`.

`evolution_chain` is ignored if present.

## API Endpoints

- `GET /api/monsters`
- `GET /api/monsters/{monster_id}`
- `GET /api/monsters/slug/{slug}`
- `GET /api/monsters/filter`
- `GET /api/monster-codex/summary`

Filters:

- `affiliation`
- `class`
- `rarity`
- `order`
- `region`
- `habitat`
- `active_time`
- `weather`
- `temperament`
- `search`

## Frontend Pages

- `/codex` shows the Nilalang Codex list with search and filters.
- `/codex/:slug` shows a detailed Codex entry.

Detail tabs:

- Overview
- Lore
- Skills
- Stats
- Habitat
- Trust Method
- Assets
- Design Notes

## Phase B Connections

Nilalang records resolve library references by code, slug, or name. The import service writes foreign keys to Phase B library tables rather than duplicating labels in the monster record.

## Future Batches

To add more Nilalang, place the next JSON or CSV file in `database/data/monsters/`, run the import command, inspect skipped rows, then commit the source batch file. Use stable `monster_id` values so later imports update existing entries.
