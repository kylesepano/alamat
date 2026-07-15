# Skill VFX Asset Prompts

All reusable player and Nilalang skill effects across Vertical Slices 1 and 2.

## General ChatGPT Rule

Paste this rule first in a new ChatGPT conversation, then paste one individual asset prompt from this file.

```text
Create production game art for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and oral traditions. Use detailed semi-realistic hand-painted 2D art, grounded anatomy, strong silhouettes, tactile materials, humid atmosphere, deep shadow, and restrained color. Do not use chibi, cute, kawaii, mascot, baby-like, anime-idol, glossy mobile-game, generic Western fairy, or generic demon styling. Follow the supplied codex lore, physical description, habitat, temperament, skill, item, quest, or equipment record as the source of truth. Never copy real sacred objects or present one real belief as absolute truth.

Use lore-supported bodily horror and restrained gore only for hostile, corrupted, undead, wounded, or predatory subjects. Do not add random gore to ordinary humans, benevolent spirits, healing goods, or normal equipment. Generate exactly one requested asset at the stated dimensions. Transparency is optional during generation. Use either actual transparency or one flat, uniform removable background color that does not appear in the subject; do not paint a checkerboard pattern. Do not add scenery, labels, logos, UI plates, frame borders, or details crossing sprite cells. Preserve identity, anatomy, scale, material, wounds, palette, lighting, and anchors across every frame. Never silently change the canvas, grid, row order, or facing.
```
## Asset Contract

- Category: reusable skill VFX
- Output: exact `1536x256` PNG with optional transparency
- Grid: `6x1`, six `256x256` cells
- Stages: formation, growth, travel/expansion, peak/contact, breakup, clean dissipation
- Projectiles visibly travel; melee effects stay at contact; support effects build around the recipient without an attack pose.
- Derive materials from lore: water, silt, roots, leaves, smoke, corpse vapor, bone dust, sap, restrained blood, scales, insects, embers, or woven light.
- Never include the caster, target, weapon wielder, scenery, or UI.

# Registered Vertical-Slice Assets

## skill_vfx_basic_strike


- Type: `skill_vfx`
- Source: `basic_strike`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_basic_strike.png`
- Size target: PNG VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a short melee impact slash for Basic Strike, neutral pale-gold arc, readable at battle scale, contained inside each cell.
```

## skill_vfx_river_cut_projectile


- Type: `skill_vfx`
- Source: `river_cut`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_river_cut_projectile.png`
- Size target: PNG projectile sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG projectile VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a long-range River Cut water slash projectile that travels horizontally from caster to enemy, blue river arc with small foam and light, readable while moving. Keep the main projectile centered in each frame and contained enough for smooth travel.
```

## skill_vfx_woven_resolve_aura


- Type: `skill_vfx`
- Source: `woven_resolve`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_woven_resolve_aura.png`
- Size target: PNG aura sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG support skill VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a self-buff aura for Woven Resolve, warm gold woven thread circle and gentle green light rising around the caster, contained inside each cell.
```

## skill_vfx_leaf_tap_projectile


- Type: `skill_vfx`
- Source: `leaf_tap`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_leaf_tap_projectile.png`
- Size target: PNG projectile sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG projectile VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a small forest leaf projectile for Leaf Tap that travels horizontally from companion to enemy, green leaf flick with tiny wind trail, readable but subtle.
```

## skill_vfx_steady_guard_aura


- Type: `skill_vfx`
- Source: `steady_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_steady_guard_aura.png`
- Size target: PNG aura sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG defensive support VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a self-guard aura for Steady Guard, compact golden-brown shield shimmer with woven reed patterns and soft dust motes around the caster, contained inside each cell.
```

## skill_vfx_balangay_drive_slash


- Type: `skill_vfx`
- Source: `balangay_drive`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_balangay_drive_slash.png`
- Size target: PNG melee VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG melee impact VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a committed forward impact slash for Balangay Drive, warm wood-and-gold boat-prow energy arc with a small current wake, heavier than Basic Strike, centered on the target, contained inside each cell.
```

## skill_vfx_mound_pebble_projectile


- Type: `skill_vfx`
- Source: `mound_pebble`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_mound_pebble_projectile.png`
- Size target: PNG projectile sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG earth projectile VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a small thrown earth pebble projectile for Mound Pebble, brown stone chip with tiny dust trail and faint root flecks, traveling horizontally from caster to target, readable at battle scale.
```

## skill_vfx_underfloor_mischief_snare


- Type: `skill_vfx`
- Source: `underfloor_mischief`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_underfloor_mischief_snare.png`
- Size target: PNG status VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG status attack VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create an earth trickster snare for Underfloor Mischief, small floor cracks, root loops, dust puffs, and playful brown-gold sparks appearing under the target, contained inside each cell.
```

## skill_vfx_canopy_crash_impact


- Type: `skill_vfx`
- Source: `canopy_crash`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_canopy_crash_impact.png`
- Size target: PNG melee VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG beast impact VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a heavy falling forest impact for Canopy Crash, green-brown downward claw arc, leaf burst, bark chips, and compressed impact ring centered on the target, energetic but readable.
```

## skill_vfx_wild_drum_chestbeat_aura


- Type: `skill_vfx`
- Source: `wild_drum_chestbeat`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_wild_drum_chestbeat_aura.png`
- Size target: PNG support VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG support rhythm VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a self-buff aura for Wild Drum Chestbeat, pulsing amber sound rings, leaf vibration marks, and beast-energy rhythm around the caster, contained inside each cell.
```

## skill_vfx_hidden_basket_gift_aura


- Type: `skill_vfx`
- Source: `hidden_basket_gift`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_hidden_basket_gift_aura.png`
- Size target: PNG support VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG helpful forest support VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a gentle self-buff aura for Hidden Basket Gift, tiny woven basket charm opening with green-gold leaves, firefly specks, and soft circular blessing light around the caster, contained inside each cell.
```

## skill_vfx_aghoy_guiding_rustle_aura


- Type: `skill_vfx`
- Source: `aghoy_guiding_rustle`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_aghoy_guiding_rustle_aura.png`
- Size target: PNG support VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG companion support VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a guiding forest rustle aura for Aghoy's Guiding Rustle, small swirling leaves, gentle green wind lines, firefly pinpoints, and a safe-path shimmer around the caster, contained inside each cell.
```

## skill_vfx_weight_of_the_old_post_pressure


- Type: `skill_vfx`
- Source: `weight_of_the_old_post`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_weight_of_the_old_post_pressure.png`
- Size target: PNG magic VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG dream-magic impact VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a nightmare pressure impact for Weight of the Old Post, dark violet wooden post silhouette descending as heavy translucent force, root-like pressure lines, muted gold cracks, centered on the target, eerie, visceral, and marked by restrained lore-driven gore.
```

## skill_vfx_housepost_nightmare_sleep


- Type: `skill_vfx`
- Source: `housepost_nightmare`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_housepost_nightmare_sleep.png`
- Size target: PNG status VFX sprite sheet, exact 1536x256 canvas, 6 frames, 6x1 grid, 256x256 per frame, true optional transparency or a flat removable background

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG sleep status VFX sprite sheet, transparency optional with a flat removable background accepted, no labels, no frame borders, no logo. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. Create a dreamlike sleep-and-fear mist for Housepost Nightmare, violet shadow haze, tiny pale motes, faint old-wood ring, and soft downward pressure around the target, contained inside each cell, no text symbols.
```

## skill_vfx_moon_tide


- Type: `skill_vfx`
- Source: `moon_tide`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_moon_tide_projectile.png`
- Size target: PNG with optional transparency, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame horizontally traveling projectile VFX for Moon Tide. True PNG with optional transparency, exactly 1536x256, strict 6x1 grid, 256x256 cells. A narrow blue-green crescent current carries a pearl-white moon reflection from caster to target. Show clear forward progression and a small final splash. No character, background, checkerboard, text, borders, or cell overflow.
```

## skill_vfx_tide_mirror


- Type: `skill_vfx`
- Source: `tide_mirror`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_tide_mirror_aura.png`
- Size target: PNG with optional transparency, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame ALAMAT defensive support VFX for Tide Mirror. True PNG with optional transparency, exactly 1536x256, strict 6x1 grid. A circular sheet of water forms before the target, catches moonlight, becomes briefly reflective, then dissolves into calm rings. No character, attack animation, scenery, checkerboard, labels, or overflow.
```

## skill_vfx_tide_song


- Type: `skill_vfx`
- Source: `tide_song`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_tide_song_wave.png`
- Size target: PNG with optional transparency, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame traveling sound-wave VFX for Tide Song. True PNG with optional transparency, exactly 1536x256, strict 6x1 grid. Layered aqua sound rings and tiny shell-light motes travel horizontally toward the enemy and end in a soft water ripple. Do not use musical notation, text, character art, background, checkerboard, borders, or overflow.
```

## skill_vfx_warning_lullaby


- Type: `skill_vfx`
- Source: `warning_lullaby`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_warning_lullaby_status.png`
- Size target: PNG with optional transparency, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Create a six-frame ALAMAT status VFX for Warning Lullaby. True PNG with optional transparency, exactly 1536x256, strict 6x1 grid. Gentle dark-aqua rings close around the target, pearl lights dim, and a calm moonlit ripple signals Sleep without cartoon symbols. Respectful, restrained, and readable. No character, scenery, text, checkerboard, frame borders, or overflow.
```

## skill_vfx_kapre_smoke_fist


- Type: `skill_vfx`
- Source: `kapre_smoke_fist`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_kapre_smoke_fist.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Smoke Fist, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Dense brown-gray balete smoke compresses into a gold-edged fist impact, then breaks into harmless curls. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_balete_guard_aura


- Type: `skill_vfx`
- Source: `balete_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_balete_guard_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Balete Guard, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Interlocking bark plates and old roots rise around the target, pulse once, then settle. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_maze_gallop


- Type: `skill_vfx`
- Source: `maze_gallop`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_maze_gallop.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Maze Gallop, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Dusty hoof arcs cross through two false trail directions before converging in one impact. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_trail_mirage_aura


- Type: `skill_vfx`
- Source: `trail_mirage`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_trail_mirage_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Trail Mirage, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Three translucent path lines briefly split behind the target and fold into a quickening green-gold glow. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_backward_pounce


- Type: `skill_vfx`
- Source: `backward_pounce`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_backward_pounce.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Backward Pounce, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Charcoal claw arc appears from the opposite direction, with tiny ember footprints fading backward. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_ember_hide_aura


- Type: `skill_vfx`
- Source: `ember_hide`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_ember_hide_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Ember Hide, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Low red-gold embers form a compact protective hide outline without flames obscuring the target. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_bamboo_prank


- Type: `skill_vfx`
- Source: `bamboo_prank`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_bamboo_prank.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Bamboo Prank, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Small bamboo segments snap in sequence and release a playful green impact ring. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_root_snare


- Type: `skill_vfx`
- Source: `root_snare`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_root_snare.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Root Snare, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Fine roots curl upward around a target point, tighten briefly, then return beneath the ground. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_mound_warning


- Type: `skill_vfx`
- Source: `mound_warning`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_mound_warning.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Mound Warning, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Concentric clay-and-earth rings rise into a firm warning pulse with small pebbles. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_earth_guard_aura


- Type: `skill_vfx`
- Source: `earth_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_earth_guard_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Earth Guard, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Packed soil and smooth mound stones create a low defensive ring around the target. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_pollen_dart_projectile


- Type: `skill_vfx`
- Source: `pollen_dart`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_pollen_dart_projectile.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Pollen Dart, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Bright green-gold pollen seed travels rapidly with a tiny petal trail and soft burst. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_petal_veil_aura


- Type: `skill_vfx`
- Source: `petal_veil`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_petal_veil_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Petal Veil, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Small tropical petals spiral around the target and become a light quickening veil. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_veil_bolt_projectile


- Type: `skill_vfx`
- Source: `veil_bolt`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_veil_bolt_projectile.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Veil Bolt, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Pearl-green translucent bolt passes through two thin veil rings before a restrained impact. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_glamour_step_aura


- Type: `skill_vfx`
- Source: `glamour_step`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_glamour_step_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Glamour Step, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Two pale reflected footprints separate and rejoin beneath a soft forest shimmer. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_wandering_flame_projectile


- Type: `skill_vfx`
- Source: `wandering_flame`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_wandering_flame_projectile.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Wandering Flame, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Blue-orange spirit flame travels horizontally, bends once, and blooms into a small clean flare. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_grave_chill_status


- Type: `skill_vfx`
- Source: `grave_chill`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_grave_chill_status.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Grave Chill, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered status effect: close around the target and communicate the condition without cartoon symbols. Visual direction: Cool blue mist and old-stone motes close around the target without skulls or horror symbols. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_river_grip


- Type: `skill_vfx`
- Source: `river_grip`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_river_grip.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for River Grip, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Two curved streams close like hands around a target point and release into droplets. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_undertow_step_aura


- Type: `skill_vfx`
- Source: `undertow_step`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_undertow_step_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Undertow Step, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Dark blue current circles the target feet and rises into a compact defensive water wall. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_spirit_echo_wave


- Type: `skill_vfx`
- Source: `spirit_echo`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_spirit_echo_wave.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Spirit Echo, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a left-to-right traveling effect: each frame must visibly advance toward the target and finish with a restrained contact frame. Visual direction: Warm gold woven-pattern pulse duplicates once like an echo and meets the target softly. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_ancestor_ward_aura


- Type: `skill_vfx`
- Source: `ancestor_ward`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_ancestor_ward_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Ancestor Ward, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Abstract gold-and-wood light forms a respectful protective ring with no real sacred symbols. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_current_bind


- Type: `skill_vfx`
- Source: `current_bind`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_current_bind.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Current Bind, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Two freshwater currents loop around a target point, tighten into a clear slowing ring, then release into river droplets. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_river_mirror_aura


- Type: `skill_vfx`
- Source: `river_mirror`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_river_mirror_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for River Mirror, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Smooth reflected freshwater rises into a compact defensive screen and settles into concentric rings. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_marsh_lure


- Type: `skill_vfx`
- Source: `marsh_lure`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_marsh_lure.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Marsh Lure, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Receding muddy-blue water line pulls reeds and ripples toward the impact point. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_drowning_reed_status


- Type: `skill_vfx`
- Source: `drowning_reed`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_drowning_reed_status.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Drowning Reed, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered status effect: close around the target and communicate the condition without cartoon symbols. Visual direction: Dark reeds rise through heavy water rings and settle into a quiet sleep effect, no drowning figure. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_lake_bite


- Type: `skill_vfx`
- Source: `lake_bite`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_lake_bite.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Lake Bite, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Large teal water-jaw silhouette closes in a powerful splash, abstract and non-gory. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_scale_guard_aura


- Type: `skill_vfx`
- Source: `scale_guard`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_scale_guard_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Scale Guard, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: Overlapping dark-teal scale shapes create a sturdy shield around the target and fade into ripples. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_sanctuary_bloom


- Type: `skill_vfx`
- Source: `sanctuary_bloom`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_sanctuary_bloom.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Sanctuary Bloom, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is an impact or melee effect: build rapidly at the target point, peak clearly, and dissipate without drawing the acting character. Visual direction: Freshwater flowers and clear droplets open in sequence around the target point, release a soft green-blue pulse, and fade without religious symbols. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```

## skill_vfx_waterfall_veil_aura


- Type: `skill_vfx`
- Source: `waterfall_veil`
- Replace file: `frontend/public/assets/vertical-slice/battle/vfx/skill_waterfall_veil_aura.png`
- Size target: PNG with optional transparency VFX sheet, exactly 1536x256, 6x1 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG skill VFX sprite sheet for Waterfall Veil, polished production-game readability, respectful fictional Philippine fantasy tone, no text, no logo. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1536x256 pixels. Use a strict 6 columns x 1 row grid, 6 frames total, each cell exactly 256x256 pixels. This is a centered support effect: build around the target without attack movement or a projectile. Visual direction: A thin clear waterfall rises around the target as a protective curtain, catches pale light, and settles into a pool ring. Show a clear six-frame progression from anticipation or formation, through the strongest readable frame, into a clean dissipation. Keep effect scale, direction, color language, and anchor consistent. Keep every particle, trail, ripple, glow, and fragment fully inside its own cell with padding. Do not include a character, weapon wielder, scenery, checkerboard, labels, borders, UI, or effects crossing cell boundaries.
```
