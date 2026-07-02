# ALAMAT Phase E: Item Codex

Phase E adds a scalable item system without implementing equipment. Weapons, armor, accessories, and wearable relics remain Phase F.

Included:

- Item source JSON in `database/data/items`
- 30 item categories
- 1,075 initial item records
- 120 item recipes
- Item migrations, models, API resources, services, seeders, and commands
- Asset prompt generation and validation
- React Item Codex pages and detail views

## Commands

```bash
php artisan alamat:validate-items
php artisan alamat:import-items --generate-prompts
php artisan alamat:generate-item-asset-prompts --only-active
php artisan alamat:sync-monster-drops
php artisan alamat:export-items
```

## API

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

## Asset Policy

Every item must include:

- `icon_filename`
- `sprite_filename`
- `thumbnail_filename`
- `asset_prompt`
- `icon_prompt`
- `design_notes`

Every Phase D skill schema now supports:

- `icon_filename`
- `effect_animation_filename`
- `cast_animation_filename`
- `impact_animation_filename`
- `icon_prompt`
- `effect_prompt`
- `animation_prompt`
- `sound_effect_prompt`

No production asset should be generated without a prompt record.
