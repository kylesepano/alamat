# Equipment Schema

Primary tables:

- `equipment_categories`
- `equipment`
- `equipment_upgrade_paths`
- `equipment_sets`
- `equipment_set_items`

Important equipment fields:

- Identity: `equipment_id`, `name`, `slug`
- Taxonomy: `category_id`, `slot_type`, `rarity_id`
- Lore: `description`, `lore`, `region_origin`, `province_origin`, `ethnolinguistic_origin`, `source_note`
- Stats: `hp_bonus`, `mana_bonus`, `faith_bonus`, `stamina_bonus`, `attack_bonus`, `magic_bonus`, `defense_bonus`, `spirit_defense_bonus`, `speed_bonus`, `luck_bonus`
- Requirements: `required_level`, `required_class`, `required_affiliation`, `required_monster_id`, `required_quest_id`
- Runtime hooks: `passive_id`, `skill_id`, `status_effect_id`, `effect_payload`, `compatibility_payload`
- Assets: `icon_filename`, `sprite_filename`, `thumbnail_filename`, `asset_prompt`, `icon_prompt`, `design_notes`

`compatibility_payload` is an additional Phase F helper field. It keeps class, affiliation, Nilalang, and user-type compatibility visible before a full inventory/loadout runtime exists.
