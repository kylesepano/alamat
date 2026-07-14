# Quest Item Asset Prompts

Rules and template for story-bound collectibles and key items.

## General ChatGPT Rule

Paste this rule first in a new ChatGPT conversation, then paste one individual asset prompt from this file.

```text
Create production game art for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and oral traditions. Use detailed semi-realistic hand-painted 2D art, grounded anatomy, strong silhouettes, tactile materials, humid atmosphere, deep shadow, and restrained color. Do not use chibi, cute, kawaii, mascot, baby-like, anime-idol, glossy mobile-game, generic Western fairy, or generic demon styling. Follow the supplied codex lore, physical description, habitat, temperament, skill, item, quest, or equipment record as the source of truth. Never copy real sacred objects or present one real belief as absolute truth.

Use lore-supported bodily horror and restrained gore only for hostile, corrupted, undead, wounded, or predatory subjects. Do not add random gore to ordinary humans, benevolent spirits, healing goods, or normal equipment. Generate exactly one requested asset at the stated filename and dimensions. PNG transparency must be genuine alpha: no checkerboard, backdrop, scenery, label, logo, UI plate, frame border, or pixels crossing sprite cells. Preserve identity, anatomy, scale, material, wounds, palette, lighting, and anchors across every frame. Never silently change the filename, canvas, grid, row order, or facing.
```
## Asset Contract

- Category: non-sellable quest or key-item collectible
- Source of truth: `database/data/items/quest_items.json` and the related quest record
- Output: exact `64x64` transparent PNG with at least 6px padding
- Target path: `frontend/public/assets/vertical-slice/quests/icon_[ITEM_ID]_[slug].png`
- Show the exact story object and its provenance, damage, ownership marks, age, and narrative state without readable writing.
- Do not turn sacred or ancestral material into generic loot. Avoid real sacred-symbol copying.
- No hand, character, scenery, pedestal, UI slot, quantity, rarity border, or text.

## Reusable Quest-Item Prompt

```text
Apply the general ChatGPT rule above. Create one exact 64x64 true-transparent PNG quest-item icon for [ITEM NAME], stable ID [ITEM ID], from quest [QUEST ID]. Save it as frontend/public/assets/vertical-slice/quests/icon_[ITEM ID]_[slug].png. Its story function is [FUNCTION]. Its physical materials are [MATERIALS], its current condition is [CONDITION], and its provenance is [OWNER/PLACE/HISTORY]. Make the silhouette readable at 32x32 with at least 6px transparent padding. Do not render readable writing, a hand, character, scenery, pedestal, UI slot, quantity, rarity frame, generic holy symbol, checkerboard, or background. Generate only this one icon.
```

No permanent vertical-slice quest-item IDs are currently registered in the two former combined prompt guides. Add an individual section here only after the item and quest IDs exist in the codex.
