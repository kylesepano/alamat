# Item Schema

Item records live in `database/data/items/items.json` and split files by type.

Required fields:

- `item_id`
- `name`
- `slug`
- `category_id`
- `item_type`
- `rarity`
- `description`
- `icon_filename`
- `asset_prompt`
- `icon_prompt`

Important behavior fields:

- `effect_payload` stores structured effects.
- `rarity` resolves through Phase B rarity tiers by code, slug, or name.
- `category_id` resolves against Phase E `item_categories`.
- `monster_id` links monster drops to Phase C monsters when available.
- `skill_id`, `quest_id`, and affinity fields remain string references until those systems are promoted.

Validation rules are implemented in `ItemImportService`.
