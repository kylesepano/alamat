# Inventory Item Asset Prompts

Registered vertical-slice consumables, materials, and Nilalang drops. Quest-only collectibles are maintained separately.

## General ChatGPT Rule

Paste this rule first in a new ChatGPT conversation, then paste one individual asset prompt from this file.

```text
Create production game art for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and oral traditions. Use detailed semi-realistic hand-painted 2D art, grounded anatomy, strong silhouettes, tactile materials, humid atmosphere, deep shadow, and restrained color. Do not use chibi, cute, kawaii, mascot, baby-like, anime-idol, glossy mobile-game, generic Western fairy, or generic demon styling. Follow the supplied codex lore, physical description, habitat, temperament, skill, item, quest, or equipment record as the source of truth. Never copy real sacred objects or present one real belief as absolute truth.

Use lore-supported bodily horror and restrained gore only for hostile, corrupted, undead, wounded, or predatory subjects. Do not add random gore to ordinary humans, benevolent spirits, healing goods, or normal equipment. Generate exactly one requested asset at the stated dimensions. Transparency is optional during generation. Use either actual transparency or one flat, uniform removable background color that does not appear in the subject; do not paint a checkerboard pattern. Do not add scenery, labels, logos, UI plates, frame borders, or details crossing sprite cells. Preserve identity, anatomy, scale, material, wounds, palette, lighting, and anchors across every frame. Never silently change the canvas, grid, row order, or facing.
```
## Asset Contract

- Category: consumable, material, drop, food, herb, offering, relic, or ordinary inventory item
- Output: exact `64x64` PNG with optional transparency with at least 6px padding
- Must remain readable at `32x32`.
- Show one object or a tightly bound bundle with exact material, age, wear, contamination, regional craft, and source history.
- Healing and trade goods remain clean. Lore-supported blood, sap, bone, rot, hide, tooth, or residue is allowed only when the item record requires it.
- No hand, character, scenery, pedestal, quantity number, rarity frame, or inventory slot.

# Registered Vertical-Slice Assets

## item_itm000001_healing_herb


- Type: `item_icon`
- Source: `healing_herb`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000001_healing_herb.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished RPG inventory icon for Healing Herb. Small wrapped remedy, leaf bundle, woven fiber tie, clean healing silhouette, green and river accents, readable at 32x32 and 64x64, no text.
```

## item_itm000003_sacred_river_water


- Type: `item_icon`
- Source: `sacred_river_water`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_ITM000003_sacred_river_water.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create a polished RPG inventory icon for Sacred River Water. Small glass/bamboo vial of clear water with river stone charm, soft blue glow, respectful fictional motif, no text, readable at 32x32.
```

## item_mound_pebble


- Type: `item_icon`
- Source: `mound_pebble`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_mound_pebble.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Mound Pebble. Small clay-stained stone from a Duwende path, earthy brown with faint root flecks, readable at 32x32.
```

## item_tiny_clay_charm


- Type: `item_icon`
- Source: `tiny_clay_charm`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_tiny_clay_charm.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Tiny Clay Charm. Small handmade clay token with simple fictional earth motif, harmless field-token feeling, warm brown and gold accents, readable at 32x32.
```

## item_canopy_fur


- Type: `item_icon`
- Source: `canopy_fur`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_canopy_fur.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Canopy Fur. Small soft tuft caught from high forest branches, green-brown fur with leaf bits, readable silhouette, no gore.
```

## item_drum_bark


- Type: `item_icon`
- Source: `drum_bark`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_drum_bark.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Drum Bark. Curved bark chip with faint hollow rhythm motif, amber sound-ring accents, forest-brown texture, readable at 32x32.
```

## item_leaf_basket_fiber


- Type: `item_icon`
- Source: `leaf_basket_fiber`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_leaf_basket_fiber.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Leaf Basket Fiber. Tiny woven green leaf strand from Aghoy pathwork, soft forest glow, curled fiber silhouette, readable at 32x32.
```

## item_shortcut_twig


- Type: `item_icon`
- Source: `shortcut_twig`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_shortcut_twig.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Shortcut Twig. Small curved twig that subtly points toward a path, green leaf tip, gentle compass-like feel without text or symbols, readable at 32x32.
```

## item_nightmare_bark


- Type: `item_icon`
- Source: `nightmare_bark`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_nightmare_bark.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Nightmare Bark. Dark old-wood splinter with violet dream haze and faint root texture, eerie, visceral, and marked by restrained lore-driven gore, readable at 32x32.
```

## item_old_housepost_splinter


- Type: `item_icon`
- Source: `old_housepost_splinter`
- Replace file: `frontend/public/assets/vertical-slice/items/icon_old_housepost_splinter.png`
- Size target: 64x64

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG inventory icon, transparency optional with a flat removable background accepted, no text, no logo. Create a polished 64x64 icon for Old Housepost Splinter. Brittle shard of aged wooden post with muted gold crack lines and violet shadow tint, respectful fictional nightmare material, readable at 32x32.
```
