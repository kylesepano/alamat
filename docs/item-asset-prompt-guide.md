# Item Asset Prompt Guide

Asset folders:

- `public/assets/items/icons`
- `public/assets/items/sprites`
- `public/assets/items/thumbnails`
- `public/assets/items/placeholders`
- `public/assets/items/generated`
- `public/assets/skills/icons`
- `public/assets/skills/effects`
- `public/assets/skills/generated`

Item filenames:

```text
icon_<item_id>_<slug>.png
item_<item_id>_<slug>.png
thumb_<item_id>_<slug>.png
```

Skill filenames:

```text
icon_<skill_id>_<slug>.png
effect_<skill_id>_<slug>.png
cast_<skill_id>_<slug>.png
impact_<skill_id>_<slug>.png
```

Prompt generation is handled by `ItemAssetPromptService`.

Every asset prompt should specify:

- item or skill name
- category/type
- rarity or affiliation
- small-size readability
- Filipino fantasy RPG aesthetic
- transparent background
- no text
- no UI
- cultural design notes
