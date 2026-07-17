# Quest Item Asset Prompts

Rules and template for story-bound collectibles and key items.

## General ChatGPT Rule

Paste this rule first in a new ChatGPT conversation, then paste one individual asset prompt from this file.

```text
Create production game art for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and oral traditions. Use detailed semi-realistic hand-painted 2D art, grounded anatomy, strong silhouettes, tactile materials, humid atmosphere, deep shadow, and restrained color. Do not use chibi, cute, kawaii, mascot, baby-like, anime-idol, glossy mobile-game, generic Western fairy, or generic demon styling. Follow the supplied codex lore, physical description, habitat, temperament, skill, item, quest, or equipment record as the source of truth. Never copy real sacred objects or present one real belief as absolute truth.

Use lore-supported bodily horror and restrained gore only for hostile, corrupted, undead, wounded, or predatory subjects. Do not add random gore to ordinary humans, benevolent spirits, healing goods, or normal equipment. Generate exactly one requested asset at the stated dimensions. Transparency is optional during generation. Use either actual transparency or one flat, uniform removable background color that does not appear in the subject; do not paint a checkerboard pattern. Do not add scenery, labels, logos, UI plates, frame borders, or details crossing sprite cells. Preserve identity, anatomy, scale, material, wounds, palette, lighting, and anchors across every frame. Never silently change the canvas, grid, row order, or facing.
```
## Asset Contract

- Category: non-sellable quest or key-item collectible
- Source of truth: `database/data/items/quest_items.json` and the related quest record
- Output: exact `64x64` PNG with at least 6px padding; transparency is optional during generation
- Target path: `frontend/public/assets/vertical-slice/quests/icon_[ITEM_ID]_[slug].png`
- Show the exact story object and its provenance, damage, ownership marks, age, and narrative state without readable writing.
- Do not turn sacred or ancestral material into generic loot. Avoid real sacred-symbol copying.
- No hand, character, scenery, pedestal, UI slot, quantity, rarity border, or text.

## Reusable Quest-Item Prompt

```text
Apply the general ChatGPT rule above. Create one exact 64x64 PNG quest-item icon for [ITEM NAME], stable ID [ITEM ID], from quest [QUEST ID]. Save it as frontend/public/assets/vertical-slice/quests/icon_[ITEM ID]_[slug].png. Its story function is [FUNCTION]. Its physical materials are [MATERIALS], its current condition is [CONDITION], and its provenance is [OWNER/PLACE/HISTORY]. Make the silhouette readable at 32x32 with at least 6px padding. Transparency is optional; one flat removable background color is acceptable. Do not render readable writing, a hand, character, scenery, pedestal, UI slot, quantity, rarity frame, generic holy symbol, or checkerboard. Generate only this one icon.
```

## Canonical Quest Items

`database/data/items/quest_items.json` currently contains 100 seeded rows built from seven repeating object families. This prompt book registers only the first canonical record for each family. Numbered repetitions such as `Old Letter 2` and `Village Seal 14` are excluded until a later quest gives them a distinct design and provenance.

The item seed stores quest references as `QST00001` through `QST00100`, while `database/data/quests/quests.json` uses six-digit numeric portions such as `QST000001`. Both values are shown below so the current source mismatch remains visible.

## quest_item_itm000651_old_letter

- Type: `quest_item_icon`
- Source: `ITM000651`
- Item source quest ID: `QST00001`
- Quest codex record: `QST000001` - River Oath
- Rarity: `Uncommon`
- Region origin: `Visayas`
- Replace file: `frontend/public/assets/vertical-slice/quests/icon_ITM000651_old-letter.png`
- Size target: exact `64x64` PNG, at least 6px padding, transparency optional

```text
Apply the General ChatGPT Rule above. Create one exact 64x64 quest-item icon for Old Letter, stable ID ITM000651, associated with the River Oath quest. Show one old folded letter made from weather-softened plant-fiber paper, tied with a faded river-blue woven cord and sealed by a small plain brass clasp. The edges are swollen, stained, and slightly torn from repeated travel near water, but the object remains carefully preserved. Suggest that it carries a promise between distant communities without showing readable writing, a real script, an official seal, or a sacred symbol. Use a strong folded-paper silhouette, cool river accents, tactile fibers, restrained age, and at least 6px padding. Transparency is optional; one flat removable background color is acceptable. Do not add a hand, character, table, scenery, UI slot, quantity, rarity border, checkerboard, or text. Save the cleaned runtime file as frontend/public/assets/vertical-slice/quests/icon_ITM000651_old-letter.png. Generate only this icon.
```

## quest_item_itm000652_broken_shrine_bell

- Type: `quest_item_icon`
- Source: `ITM000652`
- Item source quest ID: `QST00002`
- Quest codex record: `QST000002` - Coral Lantern
- Rarity: `Epic`
- Region origin: `Mindanao`
- Replace file: `frontend/public/assets/vertical-slice/quests/icon_ITM000652_broken-shrine-bell.png`
- Size target: exact `64x64` PNG, at least 6px padding, transparency optional

```text
Apply the General ChatGPT Rule above. Create one exact 64x64 quest-item icon for Broken Shrine Bell, stable ID ITM000652, associated with the Coral Lantern quest. Depict a small fictional community threshold bell cast from dark weathered brass, with one broken lower edge, a missing clapper, salt-green patina, pale shell deposits, and a short frayed red-brown hanging cord. It was recovered after long exposure to sea wind and is a damaged witness, not disposable treasure. Give it an unmistakable cracked-bell silhouette and a restrained cold glint along the fracture. Do not copy a real ritual bell, sacred emblem, or identifiable religious design. Keep at least 6px padding. Transparency is optional; one flat removable background color is acceptable. Do not add a hand, shrine scene, pedestal, UI slot, rarity frame, checkerboard, or text. Save the cleaned runtime file as frontend/public/assets/vertical-slice/quests/icon_ITM000652_broken-shrine-bell.png. Generate only this icon.
```

## quest_item_itm000653_lost_heirloom

- Type: `quest_item_icon`
- Source: `ITM000653`
- Item source quest ID: `QST00003`
- Quest codex record: `QST000003` - Moon Road
- Rarity: `Common`
- Region origin: `Kapuluan`
- Replace file: `frontend/public/assets/vertical-slice/quests/icon_ITM000653_lost-heirloom.png`
- Size target: exact `64x64` PNG, at least 6px padding, transparency optional

```text
Apply the General ChatGPT Rule above. Create one exact 64x64 quest-item icon for Lost Heirloom, stable ID ITM000653, associated with the Moon Road quest. Show a modest family keepsake rather than royal jewelry: a small oval brass locket wrapped once with faded indigo thread, its hinge bent, its surface worn smooth by years of handling, and one tiny mother-of-pearl inset missing. The closed locket should feel personally valuable but materially ordinary, with no portrait, inscription, readable initials, royal crest, or real sacred symbol. Use a clear compact silhouette, moon-cool highlights, warm aged metal, and at least 6px padding. Transparency is optional; one flat removable background color is acceptable. Do not add a hand, character, scenery, pedestal, UI frame, quantity, checkerboard, or text. Save the cleaned runtime file as frontend/public/assets/vertical-slice/quests/icon_ITM000653_lost-heirloom.png. Generate only this icon.
```

## quest_item_itm000654_ancestral_cloth

- Type: `quest_item_icon`
- Source: `ITM000654`
- Item source quest ID: `QST00004`
- Quest codex record: `QST000004` - Hidden Drum
- Rarity: `Rare`
- Region origin: `Spirit Realm`
- Replace file: `frontend/public/assets/vertical-slice/quests/icon_ITM000654_ancestral-cloth.png`
- Size target: exact `64x64` PNG, at least 6px padding, transparency optional

```text
Apply the General ChatGPT Rule above. Create one exact 64x64 quest-item icon for Ancestral Cloth, stable ID ITM000654, associated with the Hidden Drum quest. Depict a carefully folded fragment of old handwoven cloth made from abaca-like fiber, dyed in muted charcoal, deep red, and aged ochre. Its edges are frayed, one corner is repaired with mismatched thread, and its broad fictional geometric bands are partially faded. Treat it as a preserved family memory and source of testimony, not generic magical loot. Do not reproduce a named real-world sacred textile, protected pattern, readable writing, or specific ethnolinguistic design without review. Keep the folded silhouette clear at 32x32 with at least 6px padding and only a faint warm memory-like sheen. Transparency is optional; one flat removable background color is acceptable. Do not add hands, a loom, person, room, pedestal, UI frame, checkerboard, or text. Save the cleaned runtime file as frontend/public/assets/vertical-slice/quests/icon_ITM000654_ancestral-cloth.png. Generate only this icon.
```

## quest_item_itm000655_stolen_pearl

- Type: `quest_item_icon`
- Source: `ITM000655`
- Item source quest ID: `QST00005`
- Quest codex record: `QST000005` - Storm Shrine
- Rarity: `Legendary`
- Region origin: `Luzon`
- Replace file: `frontend/public/assets/vertical-slice/quests/icon_ITM000655_stolen-pearl.png`
- Size target: exact `64x64` PNG, at least 6px padding, transparency optional

```text
Apply the General ChatGPT Rule above. Create one exact 64x64 quest-item icon for Stolen Pearl, stable ID ITM000655, associated with the Storm Shrine quest. Show one large irregular freshwater pearl held inside a broken copper-wire cradle, with a hairline fracture, cloudy inner layers, a cold blue-gray storm reflection, and a short torn cord proving it was forcibly removed from another object. The pearl must feel consequential and disputed rather than luxurious treasure. Avoid crowns, jewelry presentation, holy light, real sacred symbols, or readable ownership marks. Build a strong pearl-and-broken-cradle silhouette with at least 6px padding and restrained supernatural light contained inside the pearl. Transparency is optional; one flat removable background color is acceptable. Do not add a hand, chest, shrine scene, pedestal, UI frame, rarity border, checkerboard, or text. Save the cleaned runtime file as frontend/public/assets/vertical-slice/quests/icon_ITM000655_stolen-pearl.png. Generate only this icon.
```

## quest_item_itm000656_forgotten_name_stone

- Type: `quest_item_icon`
- Source: `ITM000656`
- Item source quest ID: `QST00006`
- Quest codex record: `QST000006` - Ancestor Thread
- Rarity: `Uncommon`
- Region origin: `Visayas`
- Replace file: `frontend/public/assets/vertical-slice/quests/icon_ITM000656_forgotten-name-stone.png`
- Size target: exact `64x64` PNG, at least 6px padding, transparency optional

```text
Apply the General ChatGPT Rule above. Create one exact 64x64 quest-item icon for Forgotten Name Stone, stable ID ITM000656, associated with the Ancestor Thread quest. Depict a palm-sized river-worn dark stone wrapped by two crossing strands of faded plant-fiber thread. Its face contains only shallow, nearly erased abstract grooves that suggest a lost identifier without forming readable writing, a copied script, a grave marker, or a real sacred symbol. Add mineral specks, one chipped edge, soil in the grooves, and a faint cool mountain-gray reflection. The object should feel quiet, personal, and incomplete rather than cursed. Keep a clear asymmetrical stone silhouette with at least 6px padding. Transparency is optional; one flat removable background color is acceptable. Do not add hands, bones, a grave scene, pedestal, UI frame, checkerboard, or text. Save the cleaned runtime file as frontend/public/assets/vertical-slice/quests/icon_ITM000656_forgotten-name-stone.png. Generate only this icon.
```

## quest_item_itm000657_village_seal

- Type: `quest_item_icon`
- Source: `ITM000657`
- Item source quest ID: `QST00007`
- Quest codex record: `QST000007` - Pearl Witness
- Rarity: `Epic`
- Region origin: `Mindanao`
- Replace file: `frontend/public/assets/vertical-slice/quests/icon_ITM000657_village-seal.png`
- Size target: exact `64x64` PNG, at least 6px padding, transparency optional

```text
Apply the General ChatGPT Rule above. Create one exact 64x64 quest-item icon for Village Seal, stable ID ITM000657, associated with the Pearl Witness quest. Show a small administrative stamp made from dark hardwood with a broad brass base, a woven grip band, water damage along one side, and a chipped corner from hurried removal. The underside may show a simple fictional abstract river-and-boat geometry, but it must not contain readable writing, a national emblem, a copied municipal crest, or a real sacred mark. It represents communal authority and contested testimony rather than wealth. Use a sturdy stamp silhouette, muted brass, moon-pale edge light, and at least 6px padding. Transparency is optional; one flat removable background color is acceptable. Do not add a hand, paper, desk, building, pedestal, UI frame, rarity border, checkerboard, or text. Save the cleaned runtime file as frontend/public/assets/vertical-slice/quests/icon_ITM000657_village-seal.png. Generate only this icon.
```
