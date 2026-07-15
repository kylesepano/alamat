# Nilalang Overworld Asset Prompts

All registered lore-specific Nilalang walking and locomotion sheets across Vertical Slices 1 and 2.

## General ChatGPT Rule

Paste this rule first in a new ChatGPT conversation, then paste one individual asset prompt from this file.

```text
Create production bestiary art for ALAMAT, a fictional dark Filipino folklore-horror RPG inspired respectfully by diverse Philippine landscapes and oral traditions. Use creature-centric, detailed semi-realistic hand-painted 2D design: painterly game readability, strong silhouette first, grounded creature anatomy, asymmetry, tactile materials, humid atmosphere, deep shadow, and restrained color. Nilalang are creature-first, never humanoid-first. Prioritize beast, corpse, spirit, hybrid, plant, aquatic, insect, flame, smoke, root, mound, or place-entity anatomy over a normal human body plan. Use unusual neck length, distorted spine, hunched back, elongated or extra-jointed limbs, nonhuman feet, claws, tails, wings, fins, root appendages, and feral, crawling, slithering, perched, floating, or unnatural posture when the lore supports them. A face must not look normally human unless disguise or partial humanity is essential to the codex.

Make every Nilalang feel grown from its habitat: bark, fungus, sap, roots, mud, silt, scales, drowned flesh, salt, bone, smoke, insects, grave soil, or weather damage should follow its ecology. Avoid humanoid superhero anatomy, clean human faces, ordinary human hands and feet with minor edits, a person-in-costume silhouette, anime monster-girl or monster-boy styling, elegant fantasy humanoids except where specifically justified, chibi, cute, kawaii, mascot, toy-like, cartoon, glossy mobile-game, generic Western fairy, or generic demon styling. Follow the supplied codex lore, physical description, habitat, temperament, skill, and variants as the source of truth. Never copy real sacred objects or present one real belief as absolute truth.

Use lore-supported bodily horror and restrained gore only for hostile, corrupted, undead, wounded, or predatory subjects. Do not add random gore to ordinary humans, benevolent spirits, healing goods, or normal equipment. Generate exactly one requested asset at the stated dimensions. Transparency is optional during generation. Use either actual transparency or one flat, uniform removable background color that does not appear in the subject; do not paint a checkerboard pattern. Do not add scenery, labels, logos, UI plates, frame borders, or details crossing sprite cells. Preserve identity, anatomy, scale, material, wounds, palette, lighting, and anchors across every frame. Never silently change the canvas, grid, row order, or facing.
```
## Asset Contract

- Category: Nilalang four-direction overworld locomotion
- Output: exact `768x1024` PNG with optional transparency
- Grid: `3x4`, twelve `256x256` cells
- Rows: down/front, left, right, up/back
- Columns: idle, locomotion phase A, locomotion phase B
- Do not force human walking. Use the correct body plan: quadruped gait, hooves, root crawl, tail propulsion, hovering flame, water transfer, corpse stiffness, insect flight, or other lore-defined movement.
- Preserve scars, wounds, gore placement, markings, anatomy, contact anchor, and relative size in every frame.
- Battle sheets are maintained separately in `battle-actor-asset-prompts.md`.

## Creature Anatomy Spectrum

| Body-plan family | Current roster | Required bias |
| --- | --- | --- |
| Beastlike or creature-dominant hybrid | Sigbin, Ungo, Kugtong, Tikbalang | Quadruped, ape, fish, equine, or animal locomotion dominates; no human torso pasted onto a creature. Tikbalang keeps its lore-required hybrid structure but must read horse-entity first. |
| Environmental or spirit-like | Aghoy, Batibat, Diwata, Santelmo, Lambana | Roots, timber, water, flame, smoke, insects, or place-energy determine anatomy and movement. Corrupted Diwata may become more distorted only when its variant record requires it. |
| Aquatic-first or monstrous hybrid | Kataw, Sirena, Mambubuno, Berberoka | Tails, fins, gills, amphibious mass, webbing, pressure damage, and water-driven locomotion dominate; human traits are minimal and lore-required only. |
| Corpse-like | Amalanhig | Death stiffness, decay, damaged joints, earth or water intrusion, and unnatural locomotion are essential. |
| Distorted partly humanoid | Kapre, Engkanto, Anito, Nuno sa Punso, Duwende, Kibaan | Humanoid ancestry is allowed only where lore requires it; distort proportions, joints, face, feet, posture, and material anatomy enough to prevent a person-in-costume result. Anito remains an object-and-smoke presence rather than a normal ghost. |
| Future creature-first forms | Tiyanak and later codex additions | Classify from lore before prompting; never default to a human child, actor, or generic demon. |

# Registered Vertical-Slice Assets

## nilalang_mon0038_aghoy


- Type: `nilalang_sprite`
- Source: `MON0038`
- Body-plan family: `Environmental spirit / root-and-leaf entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0038_aghoy.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, optional transparency or a flat removable background

```text
Apply the General ChatGPT Rule above. Create Aghoy's exact 768x1024 PNG with optional transparency overworld sheet using the standard 3x4 grid and four-direction row order. Aghoy is a cautious nonhuman forest helper, child-sized only in scale: a bark-mask face, twig joints, layered leaf membranes, root fingers, a hollow basket-like torso containing dim firefly organs, old sap scars, and prey-animal alertness. It must not resemble a cute child, elf, mascot, or human wearing a leaf cloak. Columns are stillness, locomotion phase A, and locomotion phase B; use careful root-foot placements and opposite body weight shifts. Preserve the same bark fractures, sap stains, firefly organs, anatomy, baseline, and 24px padding in all frames. No checkerboard, labels, borders, external glow, or pixels crossing cells.
```

## nilalang_mon0032_duwende


- Type: `nilalang_sprite`
- Source: `MON0032`
- Body-plan family: `Distorted partly humanoid / house-earth entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0032_duwende.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, optional transparency or a flat removable background

```text
Apply the General ChatGPT Rule above. Create Duwende's exact 768x1024 PNG with optional transparency overworld sheet using the standard 3x4 grid and four-direction row order. Give it stunted adult anatomy, a severe weathered face, clay-cracked skin, root nails, uneven teeth, soot, old house fibers, rattan bindings, and soil packed into its joints. It may be helpful or hostile, but it must never resemble a child, garden gnome, plush mascot, or tiny cheerful human. Columns are stillness, left-weight step, and right-weight step with distinct adult locomotion. Preserve every crack, tooth, fiber, baseline, and 24px padding. No scenery, checkerboard, labels, borders, or pixels crossing cells.
```

## nilalang_mon0028_ungo


- Type: `nilalang_sprite`
- Source: `MON0028`
- Body-plan family: `Beastlike / arboreal ape-spirit`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0028_ungo.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, optional transparency or a flat removable background

```text
Apply the General ChatGPT Rule above. Create Ungo's exact 768x1024 PNG with optional transparency overworld sheet using the standard 3x4 grid. Ungo is a heavy arboreal ape-spirit predator, not a man: long load-bearing arms, dense rain-matted fur, bark fused over shoulders, torn ears, broken teeth, scarred knuckles, moss growing in old wounds, and restrained fresh blood from territorial fighting. Use a grounded knuckle-walking gait with clearly opposite contact phases, not human arm swing. Preserve anatomy, wound placement, baseline, and padding in every direction. No scenery, checkerboard, labels, borders, or pixels crossing cells.
```

## nilalang_mon0007_batibat_boss


- Type: `boss_sprite`
- Source: `MON0007`
- Body-plan family: `Environmental horror / timber-and-root mass`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/boss_MON0007_batibat.png`
- Size target: PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, optional transparency or a flat removable background

```text
Apply the General ChatGPT Rule above. Create Batibat's exact 768x1024 PNG with optional transparency boss-overworld sheet using the standard 3x4 grid. Batibat is an immense sleep-paralysis weight born from a felled tree and the housepost made from it: swollen root-flesh, old timber embedded through the torso, crushing limbs, strangling hair-like fibers, pressure bruises, splinter wounds, and a half-formed maternal face trapped in the grain. It must not resemble a large woman, witch, or generic tree person. Movement is a dragging root-heave with two distinct weight phases, not an ordinary walk. Fill the cell more than common actors but keep at least 16px padding and identical wounds across frames. No scenery, checkerboard, labels, borders, or pixels crossing cells.
```

## nilalang_mon0005_diwata


- Type: `overworld_sprite`
- Source: `MON0005`
- Body-plan family: `Environmental spirit / water-and-root place-entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0005_diwata.png`
- Size target: PNG with optional transparency, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Apply the General ChatGPT Rule above. Create Diwata's exact 768x1024 overworld sheet, strict 3x4 grid with rows down, left, right, up and columns stillness, locomotion phase A, locomotion phase B. This manifestation is a nonhuman sanctuary intelligence assembled from flowing spring water, root lattice, moss, flower bells, translucent leaf membranes, pearl-like river stones, and passing bird shadows. A face appears only incompletely in water refraction; there is no human skin, hair, dress, elf anatomy, fairy wings, or princess silhouette. It travels by roots taking hold while water transfers its mass between them, with two clearly different phases. Preserve the same root and water anchors, 24px padding, and material identity. No checkerboard, labels, borders, religious symbols, or pixels crossing cells.
```

## nilalang_mon0014_kataw


- Type: `overworld_sprite`
- Source: `MON0014`
- Body-plan family: `Aquatic-first monstrous hybrid / minimal human traits`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0014_kataw.png`
- Size target: PNG with optional transparency, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Apply the General ChatGPT Rule above. Create Kataw's exact 768x1024 background-removable overworld sheet using a strict 3x4 grid of twelve 256x256 cells. Rows are down/front, left, right, and up/back. Columns are idle, aquatic locomotion phase A, and aquatic locomotion phase B. Use an unmistakably creature-first aquatic oath-keeper body: long scaled torso, broad gill slits, webbed clawed forelimbs rather than human hands, fin veils, lamp-like eyes, pressure scars, freshwater growth, and a powerful serpentine fish tail with no human legs. Reduce the human chest and face to only the minimum hybrid traits required by lore. It must never look like a person wearing merfolk clothing. Phase A and B must show opposite tail curves, fin loading, spine compression, and body propulsion while the water-contact anchor remains stable; do not invent footsteps or human arm swing. Preserve scars, gills, scale patterns, asymmetry, and proportions in every direction. Keep at least 24px padding and all anatomy inside its cell. No scenery, labels, checkerboard, borders, clothing costume, external water VFX, or pixels crossing cells.
```

## nilalang_mon0016_sirena


- Type: `overworld_sprite`
- Source: `MON0016`
- Body-plan family: `Aquatic-first monstrous hybrid / minimal human traits`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0016_sirena.png`
- Size target: PNG with optional transparency, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Apply the General ChatGPT Rule above. Create Sirena's exact 768x1024 background-removable overworld sheet using a strict 3x4 grid of twelve 256x256 cells. Rows are down/front, left, right, and up/back. Columns are idle, aquatic locomotion phase A, and aquatic locomotion phase B. Design a creature-first predatory tide-song warning spirit, not a glamorous mermaid: powerful scarred fish tail, lateral fins, exposed gills, webbed clawed digits, needle teeth, drowned hair tangled with river debris, cloudy aquatic eyes, and a distended throat sac adapted for an inhuman song. Humanlike upper anatomy appears only where lore requires it and must be warped by aquatic function, pressure, and predation. Phase A and B use opposite tail bends, rib and throat compression, fin loading, and spine undulation with no legs, footsteps, or elegant human swimming pose. Preserve scars, gills, teeth, scale patterns, asymmetry, and water-contact anchor. Keep at least 24px padding. No shell-bra glamour, anime monster-girl anatomy, scenery, checkerboard, labels, borders, external song VFX, or pixels crossing cells.
```

## nilalang_mon0003_kapre


- Type: `overworld_sprite`
- Source: `MON0003`
- Body-plan family: `Distorted partly humanoid / tree giant`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0003_kapre.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Kapre, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Towering dark hairy balete giant with bark fused through skin, huge hands, root feet, amber eyes, matted hair, moss, old open wounds, vines, and pipe smoke; territorial and ancient, never a friendly human woodsman or generic ogre. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0004_tikbalang


- Type: `overworld_sprite`
- Source: `MON0004`
- Body-plan family: `Creature-dominant hybrid / equine road entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0004_tikbalang.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Tikbalang, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Extremely tall bony horse-headed road spirit with elongated humanoid torso, backward-bending hooved legs, overlong arms, storm eyes, tangled mane, road scars, dried blood, and impossible joint angles; its humanoid hybrid structure is lore-required but unmistakably nonhuman. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0010_sigbin


- Type: `overworld_sprite`
- Source: `MON0010`
- Body-plan family: `Beastlike quadruped`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0010_sigbin.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Sigbin, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Low predatory quadruped with disproportionately long hind legs, backward-track gait, folded ears, charcoal hide stretched over raw joints, old bite scars, and ember heat visible beneath thin skin; neither doglike nor demonic caricature. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0027_kibaan


- Type: `overworld_sprite`
- Source: `MON0027`
- Body-plan family: `Distorted partly humanoid / bamboo-root entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0027_kibaan.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Kibaan, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Small bamboo trickster with adult but stunted proportions, russet barklike skin, root toes, leaf growth, sharp uneven teeth, reflective eyes, thorn scratches, bamboo whistle, and a grin that reads as a warning; never childlike, friendly-looking, or adorable. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0031_nuno_sa_punso


- Type: `overworld_sprite`
- Source: `MON0031`
- Body-plan family: `Distorted partly humanoid / mound entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0031_nuno_sa_punso.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Nuno sa Punso, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Ancient mound guardian whose severe elder-like anatomy is fused with clay, roots, beetle shells, grave soil, and stone; weathered adult face, root staff, moss growth, and no childlike or comic proportions. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0033_lambana


- Type: `overworld_sprite`
- Source: `MON0033`
- Body-plan family: `Environmental spirit / insect-and-petal entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0033_lambana.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Lambana, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Palm-sized insect-and-petal spirit with segmented limbs, translucent leaf wings, pollen organs, compound-eye glints, thorn mouthparts, and luminous sap; no human skin, dress, fairy face, or miniature-person anatomy. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0034_engkanto


- Type: `overworld_sprite`
- Source: `MON0034`
- Body-plan family: `Distorted partly humanoid / glamour entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0034_engkanto.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Engkanto, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Otherworld guardian beautiful only at first glance: elongated anatomy, subtly wrong joints, pearl-pale eyes, translucent skin veils, plant growth moving beneath the surface, and a face that changes slightly between frames; unmistakably nonhuman and nonreligious. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0012_santelmo


- Type: `overworld_sprite`
- Source: `MON0012`
- Body-plan family: `Environmental spirit / corpse flame`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0012_santelmo.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Santelmo, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Wandering blue-orange corpse flame containing only a fleeting suggestion of a face or hand inside smoke, charred organic fragments, road ash, sparks, and grave-cold vapor; no complete humanoid body or cute masked core. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0024_amalanhig


- Type: `overworld_sprite`
- Source: `MON0024`
- Body-plan family: `Corpse-like`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0024_amalanhig.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Amalanhig, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Reanimated waterlogged corpse with rigid joints, stretched tendons, earth-packed open wounds, death pallor, weathered woven remnants, river weeds, damaged jaw, and relentless upright stiffness; visible decay is required without comic zombie exaggeration. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0035_anito


- Type: `overworld_sprite`
- Source: `MON0035`
- Body-plan family: `Distorted partly humanoid / object-and-smoke presence`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0035_anito.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Anito, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Fictional ancestral presence expressed through weathered carved wood, frayed woven cloth, smoke, ember eyes, incomplete shadow limbs, and layered abstract faces; no ordinary transparent human ghost and no direct copy of a real sacred object. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0041_mambubuno


- Type: `overworld_sprite`
- Source: `MON0041`
- Body-plan family: `Aquatic beastlike hybrid`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0041_mambubuno.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Mambubuno, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Muscular freshwater ambusher with eel-and-fish anatomy, webbed gripping limbs, slick dark scales, hook scars, weed-draped shoulders, lamp eyes, and a jaw built to seize prey from below; no human in aquatic clothing. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0036_berberoka


- Type: `overworld_sprite`
- Source: `MON0036`
- Body-plan family: `Aquatic beastlike / amphibious swamp entity`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0036_berberoka.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Berberoka, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Large swamp predator with a distending amphibious body, silt-crusted hide, reed growth, grasping limbs, a draining mouth, leech scars, torn net fragments, and black marsh water leaking from its folds; visceral but never caricatured. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```

## nilalang_mon0047_kugtong


- Type: `overworld_sprite`
- Source: `MON0047`
- Body-plan family: `Beastlike aquatic / giant fish`
- Replace file: `frontend/public/assets/vertical-slice/nilalang/nilalang_MON0047_kugtong.png`
- Size target: PNG with optional transparency sprite sheet, exactly 768x1024, 3x4 grid, 256x256 per frame

```text
Detailed semi-realistic 2D dark Filipino folklore-horror RPG overworld sprite sheet for Kugtong, top-down classic handheld perspective, readable silhouette, humid shadow-rich tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo. Huge ancient freshwater fish with armored dark-teal scales, broad head, whisker-like feelers, scarred mouth, broken hooks embedded in old tissue, shell and algae growth, cloudy eyes, and immense predatory weight; absolutely no humanoid torso. Create one exact sprite sheet. Transparency is optional; a flat removable background is acceptable. The canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order: down/front, left, right, up/back. Column order: idle, locomotion phase A, locomotion phase B. The second and third columns must be clearly different sequential or opposing locomotion states based on the creature's actual body plan; do not invent human arm swing or footsteps for forms that do not have them. Keep anatomy, markings, wounds, materials, colors, proportions, and scale consistent across all frames. Keep the appropriate ground, root, tail, water, flight, or hover anchor stable. Keep the full body inside every cell with at least 24px padding above the head and 16px below the feet. Do not include checkerboard, scenery, labels, grid lines, or frame borders. Do not allow anatomy, material, shadow, glow, blood, smoke, or effects to cross cell boundaries.
```
