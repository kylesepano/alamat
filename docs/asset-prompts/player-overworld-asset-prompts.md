# Player Overworld Asset Prompts

Customizable protagonist walking-sprite generation. Battle actions are intentionally kept in the battle-actor prompt book.

## General ChatGPT Rule

Paste this rule first in a new ChatGPT conversation, then paste one individual asset prompt from this file.

```text
Create production game art for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and oral traditions. Use detailed semi-realistic hand-painted 2D art, grounded anatomy, strong silhouettes, tactile materials, humid atmosphere, deep shadow, and restrained color. Do not use chibi, cute, kawaii, mascot, baby-like, anime-idol, glossy mobile-game, generic Western fairy, or generic demon styling. Follow the supplied codex lore, physical description, habitat, temperament, skill, item, quest, or equipment record as the source of truth. Never copy real sacred objects or present one real belief as absolute truth.

Use lore-supported bodily horror and restrained gore only for hostile, corrupted, undead, wounded, or predatory subjects. Do not add random gore to ordinary humans, benevolent spirits, healing goods, or normal equipment. Generate exactly one requested asset at the stated dimensions. Transparency is optional during generation. Use either actual transparency or one flat, uniform removable background color that does not appear in the subject; do not paint a checkerboard pattern. Do not add scenery, labels, logos, UI plates, frame borders, or details crossing sprite cells. Preserve identity, anatomy, scale, material, wounds, palette, lighting, and anchors across every frame. Never silently change the canvas, grid, row order, or facing.
```
## Asset Contract

- Category: player overworld walking sprite
- Output: exact `768x1024` PNG with optional transparency
- Grid: `3x4`, twelve `256x256` cells
- Rows: down/front, left, right, up/back
- Columns: idle, left-foot-forward, right-foot-forward
- Keep at least 24px above the head and 16px below the feet.
- The two walking frames must show genuinely opposite steps while keeping the same baseline.
- Player battle art is maintained separately in `battle-actor-asset-prompts.md`.

# Registered Vertical-Slice Assets

## player_customizable_base


- Type: `character_sprite`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/characters/player_customizable_base.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background. Create a customizable protagonist overworld sprite sheet base for ALAMAT. grounded semi-realistic proportions, neutral traveler stance, practical lightweight clothing inspired by woven fibers and natural materials, modular hair/body/outfit layers, top-down 3/4 RPG view, optional transparency or a flat removable background.
```
