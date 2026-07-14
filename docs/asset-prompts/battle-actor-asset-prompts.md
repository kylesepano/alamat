# Player And Nilalang Battle Asset Prompts

Separate player and Nilalang battle idle/action sheets. These never reuse overworld walking sheets.

## General ChatGPT Rule

Paste this rule first in a new ChatGPT conversation, then paste one individual asset prompt from this file.

```text
Create production battle art for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and oral traditions. Human player actors use grounded semi-realistic anatomy. Nilalang use creature-centric, detailed semi-realistic hand-painted 2D bestiary design with strong silhouette first, asymmetry, nonhuman locomotion, and anatomy derived from beast, corpse, spirit, hybrid, plant, aquatic, insect, flame, smoke, root, mound, or place-entity logic. For Nilalang, avoid normal human proportions, clean human faces, humanoid superhero poses, ordinary hands and feet with minor edits, person-in-costume silhouettes, anime monster-girl or monster-boy design, chibi, cute, mascot, toy-like, cartoon, glossy mobile-game, generic Western fairy, or generic demon styling. Use feral, crawling, slithering, hunched, perched, floating, or unnatural posture and habitat materials such as bark, fungus, roots, mud, scales, drowned flesh, bone, smoke, insects, or grave soil when lore supports them. Follow the codex physical description, habitat, temperament, skills, and variants as the source of truth.

Use lore-supported bodily horror and restrained gore only for hostile, corrupted, undead, wounded, or predatory subjects. Do not add random gore to ordinary humans, benevolent spirits, healing goods, or normal equipment. Generate exactly one requested asset at the stated dimensions. Transparency is optional during generation. A plain, single-color removable background is acceptable because it can be removed manually afterward; do not add scenery, labels, logos, UI plates, frame borders, or details crossing sprite cells. Preserve identity, anatomy, scale, material, wounds, palette, lighting, and anchors across every frame. Never silently change the canvas, grid, row order, or facing.
```

## Asset Contract

- Categories: player battle actor and Nilalang battle actor
- Generation output: exact `1024x512` sprite sheet; transparency is optional
- Runtime output after cleanup: `.png` using the listed replacement filename
- Grid: `4x2`, eight `256x256` cells
- Row 1: stable idle frames 1-4 with a fixed feet, root, tail, water, or hover anchor
- Row 2: anticipation, committed action, contact/release pose without external VFX, recovery
- Player source artwork faces right.
- Every Nilalang source sheet faces left in both idle and action rows, whether hostile or tameable. The runtime mirrors a companion horizontally so it faces right in the allied formation. Never generate a second right-facing companion sheet.
- If a background is generated, keep it one flat, uniform color that does not appear in the actor so it can be removed cleanly later.
- Keep actor motion separate from skill VFX. No projectile, impact burst, blood arc, smoke field, or aura baked into the actor sheet.
- Nilalang actions must originate from their actual anatomy: jaws, tails, claws, hooves, roots, wings, fins, body mass, flame, water, smoke, or distorted limbs. Do not convert every attack into a human punch or casting gesture.
- Read the Creature Anatomy Spectrum in `nilalang-overworld-asset-prompts.md` before generating a Nilalang battle sheet.

# Registered Vertical-Slice Assets

## battle_player_customizable_base

- Type: `battle_actor_sprite`
- Source: `new`
- Replace file: `frontend/public/assets/vertical-slice/battle/characters/battle_player_customizable_base.png`
- Size target: battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, transparency optional

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for ALAMAT, no labels, no frame borders, no logo. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each cell exactly 256x256 pixels. Row 1 is battle idle frames 1-4, row 2 is battle attack frames 1-4. Side-facing 3/4 battle perspective, protagonist facing right, readable silhouette, practical traveler clothing inspired by woven fibers and natural materials. Keep full body inside every cell with at least 24px padding. No shadows or effects crossing cell boundaries.
```

## battle_nilalang_mon0038_aghoy

- Type: `battle_actor_sprite`
- Source: `MON0038`
- Body-plan family: `Environmental spirit / root-and-leaf entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0038_aghoy.png`
- Size target: battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, transparency optional

```text
Apply the General ChatGPT Rule above. Create Aghoy's exact 1024x512 battle sheet, strict 4x2 grid. The source artwork faces left in every frame; the game mirrors it only when Aghoy is deployed as a companion. Retain its bark mask, twig joints, leaf membranes, hollow basket torso, visible firefly organs, and sap scars. Row 1 is a stable four-frame idle with fixed root-foot contact and slight leaf/firefly motion. Row 2 is Leaf Tap: recoil, root-arm snap, leaf release pose without projectile VFX, and guarded recovery. Never turn Aghoy into a cute child or elf. Keep at least 24px padding; do not include labels, borders, external effects, or pixels crossing cells.
```

## battle_nilalang_mon0032_duwende

- Type: `battle_actor_sprite`
- Source: `MON0032`
- Body-plan family: `Distorted partly humanoid / house-earth entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0032_duwende.png`
- Size target: battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, transparency optional

```text
Apply the General ChatGPT Rule above. Create Duwende's exact 1024x512 battle sheet, strict 4x2 grid, facing left. Retain stunted adult anatomy, clay-cracked skin, root nails, uneven teeth, soot, and house fibers. Row 1 is a stable crouched idle with fixed feet and small soil shedding. Row 2 is Mound Pebble: scoop, body twist, committed throw without projectile VFX, recovery. It is not childlike, comic, or mascot-like. Keep at least 24px padding; do not include labels, borders, external effects, or pixels crossing cells.
```

## battle_nilalang_mon0028_ungo

- Type: `battle_actor_sprite`
- Source: `MON0028`
- Body-plan family: `Beastlike / arboreal ape-spirit`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0028_ungo.png`
- Size target: battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, transparency optional

```text
Apply the General ChatGPT Rule above. Create Ungo's exact 1024x512 battle sheet, strict 4x2 grid, facing left. Show a massive arboreal ape-spirit with long arms, rain-matted fur, bark-fused shoulders, torn ears, broken teeth, bleeding scarred knuckles, and moss in old wounds. Row 1 is a stable knuckle-braced idle. Row 2 is Canopy Crash: rear-up, forward launch, two-fist ground-contact pose without impact VFX, recovery. Keep at least 20px padding; do not include labels, borders, external effects, or pixels crossing cells.
```

## battle_nilalang_mon0007_batibat

- Type: `battle_actor_sprite`
- Source: `MON0007`
- Body-plan family: `Environmental horror / timber-and-root mass`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0007_batibat.png`
- Size target: battle sprite sheet, exact 1024x512 canvas, 8 frames, 4x2 grid, 256x256 per frame, transparency optional

```text
Apply the General ChatGPT Rule above. Create Batibat's exact 1024x512 boss battle sheet, strict 4x2 grid, facing left. Show swollen root-flesh around embedded housepost timber, crushing limbs, strangling hair fibers, pressure bruises, splinter wounds, and a half-formed maternal face in the grain. Row 1 is a stable oppressive idle with a fixed root anchor and slight timber strain. Row 2 is Weight of the Old Post: mass gathers, crushing lunge, full weight contact without pressure VFX, dragging recovery. Do not depict a giant woman or generic tree humanoid. Keep at least 12px padding; do not include labels, borders, external effects, or pixels crossing cells.
```

## battle_nilalang_mon0005_diwata

- Type: `battle_actor_sprite`
- Source: `MON0005`
- Body-plan family: `Environmental spirit / water-and-root place-entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0005_diwata.png`
- Size target: sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Apply the General ChatGPT Rule above. Create Diwata's exact 1024x512 battle sheet, strict 4x2 grid, facing left. Retain its nonhuman spring-water, root-lattice, moss, flower-bell, leaf-membrane, and refracted incomplete-face anatomy. Row 1 is a stable idle: roots remain fixed while water pulses, leaves turn, and the partial face briefly forms and dissolves. Row 2 is Sanctuary Bloom: roots tighten, water rises, flower bells open, release pose without external VFX, then recovery. Do not use hands, human casting gestures, hair, garments, an elf body, or fairy anatomy. Keep at least 24px padding; do not include text, borders, religious symbols, external VFX, or pixels crossing cells.
```

## battle_nilalang_mon0014_kataw

- Type: `battle_actor_sprite`
- Source: `MON0014`
- Body-plan family: `Aquatic-first monstrous hybrid / minimal human traits`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0014_kataw.png`
- Size target: sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Apply the General ChatGPT Rule above. Create Kataw's exact 1024x512 battle sheet, strict 4x2 grid, facing left. Retain scaled torso, webbed claws, gills, fin veils, lamp eyes, pressure scars, freshwater growth, and powerful aquatic lower anatomy. Row 1 is a stable water-contact idle. Row 2 is Moon Tide: body coils, claws mark the oath, tail commits the cast, release pose without external current VFX, recovery. It must not resemble a human in aquatic costume. Keep at least 24px padding; do not include labels, borders, or pixels crossing cells.
```

## battle_nilalang_mon0016_sirena

- Type: `battle_actor_sprite`
- Source: `MON0016`
- Body-plan family: `Aquatic-first monstrous hybrid / minimal human traits`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0016_sirena.png`
- Size target: sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Apply the General ChatGPT Rule above. Create Sirena's exact 1024x512 battle sheet, strict 4x2 grid, facing left. Show a scarred muscular fish tail, gills, webbed fingers, needle teeth, drowned hair, cloudy aquatic eyes, and uncanny song throat. Row 1 is a stable tail-anchored idle with restrained gill and throat motion. Row 2 is Tide Song: breath sac expands, jaw opens beyond human comfort, committed song release without VFX, recovery. Keep the warning-spirit predatory rather than seductive or glamorous. Keep at least 24px padding; do not include labels, borders, song VFX, or pixels crossing cells.
```

## battle_nilalang_mon0003_kapre

- Type: `battle_actor_sprite`
- Source: `MON0003`
- Body-plan family: `Distorted partly humanoid / tree giant`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0003_kapre.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Kapre, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Towering dark hairy balete giant with bark fused through skin, huge hands, root feet, amber eyes, matted hair, moss, old open wounds, vines, and pipe smoke; territorial and ancient, never a friendly human woodsman or generic ogre. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Kapre. Row 2 contains four Smoke Fist attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0004_tikbalang

- Type: `battle_actor_sprite`
- Source: `MON0004`
- Body-plan family: `Creature-dominant hybrid / equine road entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0004_tikbalang.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Tikbalang, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Extremely tall bony horse-headed road spirit with elongated humanoid torso, backward-bending hooved legs, overlong arms, storm eyes, tangled mane, road scars, dried blood, and impossible joint angles; its humanoid hybrid structure is lore-required but unmistakably nonhuman. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Tikbalang. Row 2 contains four Maze Gallop attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0010_sigbin

- Type: `battle_actor_sprite`
- Source: `MON0010`
- Body-plan family: `Beastlike quadruped`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0010_sigbin.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Sigbin, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Low predatory quadruped with disproportionately long hind legs, backward-track gait, folded ears, charcoal hide stretched over raw joints, old bite scars, and ember heat visible beneath thin skin; neither doglike nor demonic caricature. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Sigbin. Row 2 contains four Backward Pounce attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0027_kibaan

- Type: `battle_actor_sprite`
- Source: `MON0027`
- Body-plan family: `Distorted partly humanoid / bamboo-root entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0027_kibaan.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Kibaan, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Small bamboo trickster with adult but stunted proportions, russet barklike skin, root toes, leaf growth, sharp uneven teeth, reflective eyes, thorn scratches, bamboo whistle, and a grin that reads as a warning; never childlike, friendly-looking, or adorable. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Kibaan. Row 2 contains four Bamboo Prank attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0031_nuno_sa_punso

- Type: `battle_actor_sprite`
- Source: `MON0031`
- Body-plan family: `Distorted partly humanoid / mound entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0031_nuno_sa_punso.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Nuno sa Punso, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Ancient mound guardian whose severe elder-like anatomy is fused with clay, roots, beetle shells, grave soil, and stone; weathered adult face, root staff, moss growth, and no childlike or comic proportions. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Nuno sa Punso. Row 2 contains four Mound Warning attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0033_lambana

- Type: `battle_actor_sprite`
- Source: `MON0033`
- Body-plan family: `Environmental spirit / insect-and-petal entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0033_lambana.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Lambana, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Palm-sized insect-and-petal spirit with segmented limbs, translucent leaf wings, pollen organs, compound-eye glints, thorn mouthparts, and luminous sap; no human skin, dress, fairy face, or miniature-person anatomy. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Lambana. Row 2 contains four Pollen Dart attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0034_engkanto

- Type: `battle_actor_sprite`
- Source: `MON0034`
- Body-plan family: `Distorted partly humanoid / glamour entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0034_engkanto.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Engkanto, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Otherworld guardian beautiful only at first glance: elongated anatomy, subtly wrong joints, pearl-pale eyes, translucent skin veils, plant growth moving beneath the surface, and a face that changes slightly between frames; unmistakably nonhuman and nonreligious. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Engkanto. Row 2 contains four Veil Bolt attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0012_santelmo

- Type: `battle_actor_sprite`
- Source: `MON0012`
- Body-plan family: `Environmental spirit / corpse flame`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0012_santelmo.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Santelmo, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Wandering blue-orange corpse flame containing only a fleeting suggestion of a face or hand inside smoke, charred organic fragments, road ash, sparks, and grave-cold vapor; no complete humanoid body or cute masked core. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Santelmo. Row 2 contains four Wandering Flame attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0024_amalanhig

- Type: `battle_actor_sprite`
- Source: `MON0024`
- Body-plan family: `Corpse-like`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0024_amalanhig.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Amalanhig, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Reanimated waterlogged corpse with rigid joints, stretched tendons, earth-packed open wounds, death pallor, weathered woven remnants, river weeds, damaged jaw, and relentless upright stiffness; visible decay is required without comic zombie exaggeration. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Amalanhig. Row 2 contains four River Grip attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0035_anito

- Type: `battle_actor_sprite`
- Source: `MON0035`
- Body-plan family: `Distorted partly humanoid / object-and-smoke presence`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0035_anito.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Anito, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Fictional ancestral presence expressed through weathered carved wood, frayed woven cloth, smoke, ember eyes, incomplete shadow limbs, and layered abstract faces; no ordinary transparent human ghost and no direct copy of a real sacred object. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Anito. Row 2 contains four Spirit Echo attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0041_mambubuno

- Type: `battle_actor_sprite`
- Source: `MON0041`
- Body-plan family: `Aquatic beastlike hybrid`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0041_mambubuno.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Mambubuno, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Muscular freshwater ambusher with eel-and-fish anatomy, webbed gripping limbs, slick dark scales, hook scars, weed-draped shoulders, lamp eyes, and a jaw built to seize prey from below; no human in aquatic clothing. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Mambubuno. Row 2 contains four Current Bind attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0036_berberoka

- Type: `battle_actor_sprite`
- Source: `MON0036`
- Body-plan family: `Aquatic beastlike / amphibious swamp entity`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0036_berberoka.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Berberoka, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Large swamp predator with a distending amphibious body, silt-crusted hide, reed growth, grasping limbs, a draining mouth, leech scars, torn net fragments, and black marsh water leaking from its folds; visceral but never caricatured. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Berberoka. Row 2 contains four Marsh Lure attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```

## battle_nilalang_mon0047_kugtong

- Type: `battle_actor_sprite`
- Source: `MON0047`
- Body-plan family: `Beastlike aquatic / giant fish`
- Native battle facing: `left` (runtime mirrors companions to face right)
- Replace file: `frontend/public/assets/vertical-slice/battle/nilalang/battle_MON0047_kugtong.png`
- Size target: battle sprite sheet, exactly 1024x512, 4x2 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG battle sprite sheet for Kugtong, side-facing 3/4 RPG combat perspective, readable silhouette, respectful fictional Philippine folklore inspiration, no text, no logo. Huge ancient freshwater fish with armored dark-teal scales, broad head, whisker-like feelers, scarred mouth, broken hooks embedded in old tissue, shell and algae growth, cloudy eyes, and immense predatory weight; absolutely no humanoid torso. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. Canvas exactly 1024x512 pixels. Use a strict 4 columns x 2 rows grid, 8 frames total, each frame exactly 256x256 pixels. Row 1 contains four restrained battle-idle frames with subtle breathing and secondary motion appropriate to Kugtong. Row 2 contains four Lake Bite attack frames: anticipation, committed action, contact pose without external VFX, and recovery. Enemy presentation faces left. Keep anatomy, design, scale, lighting, and baseline consistent. Keep the complete body inside each cell with at least 24px padding. Do not include scenery, labels, frame borders, baked impact effects, or pixels crossing cell boundaries.
```
