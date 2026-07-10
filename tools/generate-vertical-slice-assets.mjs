import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const assetRoot = path.join(root, 'frontend', 'public', 'assets', 'vertical-slice');
const docsRoot = path.join(root, 'docs');
const fallbackPng = path.join(root, 'frontend', 'public', 'alamat.png');

const style = 'Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo.';
const negative = 'Avoid caricature, gore, photorealism, real-world religious superiority, sacred-object misuse, text, logos, modern brands, muddy silhouettes, painted background, vignette background, frame borders, uneven grid spacing, cropped body parts, oversized sprites that bleed into neighboring cells.';
const spriteSheetInstruction = 'Create one exact PNG sprite sheet with transparent background. Canvas must be exactly 768x1024 pixels. Use a strict 3 columns x 4 rows grid, 12 frames total, each cell exactly 256x256 pixels. Row order must be: down/front, left, right, up/back. Column order must be: idle, walk-left-foot-forward, walk-right-foot-forward. The 2nd and 3rd columns must be clearly different walking poses, not duplicates: in column 2 the character has the left foot forward and right arm forward; in column 3 the character has the right foot forward and left arm forward. For side rows, show opposite leg positions and arm swing clearly. For the up/back row, show alternating heel/foot placement and shoulder movement. Keep the full body inside each 256x256 cell with padding on all sides. Feet must align to the same baseline in every frame. Do not include labels, frame borders, shadows outside the character, scenery, gradient backdrop, or any painted background.';
const spriteSheetSize = 'PNG sprite sheet, exact 768x1024 canvas, 12 frames, 3x4 grid, 256x256 per frame, transparent background';

const assets = [
  {
    id: 'player_customizable_base',
    type: 'character_sprite',
    path: 'characters/player_customizable_base.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create a customizable protagonist overworld sprite sheet base for ALAMAT. Chibi proportions, neutral traveler stance, practical lightweight clothing inspired by woven fibers and natural materials, modular hair/body/outfit layers, top-down 3/4 RPG view, transparent background.`,
  },
  {
    id: 'npc_npc000001_datu_magsalin',
    type: 'npc_sprite',
    source_id: 'NPC000001',
    path: 'npcs/npc_NPC000001_datu_magsalin.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create an overworld chibi NPC sprite sheet for Datu Magsalin, barangay elder and arrival anchor. Calm, grounded village leader, practical Filipino fantasy clothing, woven sash, walking cane or document bundle, transparent background, top-down 3/4 RPG view.`,
  },
  {
    id: 'npc_npc000582_babaylan_lira_dalisay',
    type: 'npc_sprite',
    source_id: 'NPC000582',
    path: 'npcs/npc_NPC000582_babaylan_lira_dalisay.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create an overworld chibi NPC sprite sheet for Babaylan Lira Dalisay, spiritual guide for trust and balance. Respectful fictional ritual attire, leaf fiber, brass, shell, and woven details, gentle authority, transparent background, top-down 3/4 RPG view.`,
  },
  {
    id: 'npc_npc000301_general_store',
    type: 'npc_sprite',
    source_id: 'NPC000301',
    path: 'npcs/npc_NPC000301_general_store.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create an overworld chibi NPC shopkeeper sprite sheet for the starter barangay general store. Friendly vendor, apron, small pouch, woven market cloth accents, transparent background, top-down 3/4 RPG view.`,
  },
  {
    id: 'nilalang_mon0038_aghoy',
    type: 'nilalang_sprite',
    source_id: 'MON0038',
    path: 'nilalang/nilalang_MON0038_aghoy.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create an overworld chibi Nilalang sprite sheet for Aghoy, the little forest helper and first earned companion candidate. Small forest spirit, kind and shy, leaf cloak, basket or root charm, firefly glow, readable silhouette, transparent background, no horror tone.`,
  },
  {
    id: 'nilalang_mon0032_duwende',
    type: 'nilalang_sprite',
    source_id: 'MON0032',
    path: 'nilalang/nilalang_MON0032_duwende.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create an overworld chibi Nilalang sprite sheet for Duwende, house-earth little folk. Small earthy spirit, mound and household motifs, friendly but mysterious, rattan/leaf details, transparent background, readable at 64x64.`,
  },
  {
    id: 'nilalang_mon0028_ungo',
    type: 'nilalang_sprite',
    source_id: 'MON0028',
    path: 'nilalang/nilalang_MON0028_ungo.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create an overworld chibi Nilalang sprite sheet for Ungo, wild ape spirit and first dangerous encounter. Strong forest creature, muscular but readable, moss and bark accents, alert stance, not grotesque, transparent background.`,
  },
  {
    id: 'nilalang_mon0007_batibat_boss',
    type: 'boss_sprite',
    source_id: 'MON0007',
    path: 'nilalang/boss_MON0007_batibat.png',
    size: spriteSheetSize,
    prompt: `${style} ${spriteSheetInstruction} Create a large overworld boss sprite sheet for Batibat, nightmare tree-mother presence. Heavy old-wood silhouette, sleep/nightmare motif, roots and housepost details, eerie but not graphic, transparent background, readable boss scale.`,
  },
  {
    id: 'ui_interaction_marker',
    type: 'ui_icon',
    path: 'ui/interaction_marker.svg',
    size: '64x64',
    prompt: `${style} Create a transparent-background interaction marker icon for ALAMAT. Simple golden woven ring with small sparkle, readable over map tiles, no text, no UI frame.`,
  },
  {
    id: 'ui_save_point',
    type: 'map_object',
    path: 'ui/save_point.svg',
    size: '64x64',
    prompt: `${style} Create a top-down save point object for ALAMAT. Small shrine lantern or woven charm post with soft blue-gold glow, transparent background, readable at 64x64, no religious superiority, no text.`,
  },
  {
    id: 'ui_collision_debug_tile',
    type: 'debug_tile',
    path: 'ui/collision_debug_tile.svg',
    size: '48x48',
    prompt: 'Simple transparent red collision debug tile for development only, 48x48, diagonal stripe, semi-transparent.',
  },
  {
    id: 'item_itm000001_healing_herb',
    type: 'item_icon',
    source_id: 'ITM000001',
    path: 'items/icon_ITM000001_healing_herb.svg',
    size: '64x64',
    prompt: `${style} Create a polished transparent RPG inventory icon for Healing Herb. Small wrapped remedy, leaf bundle, woven fiber tie, clean healing silhouette, green and river accents, readable at 32x32 and 64x64, no text.`,
  },
  {
    id: 'item_itm000003_sacred_river_water',
    type: 'item_icon',
    source_id: 'ITM000003',
    path: 'items/icon_ITM000003_sacred_river_water.svg',
    size: '64x64',
    prompt: `${style} Create a polished transparent RPG inventory icon for Sacred River Water. Small glass/bamboo vial of clear water with river stone charm, soft blue glow, respectful fictional motif, no text, readable at 32x32.`,
  },
  {
    id: 'equipment_eqp000001_bolo',
    type: 'equipment_icon',
    source_id: 'EQP000001',
    path: 'equipment/icon_EQP000001_bolo.svg',
    size: '64x64',
    prompt: `${style} Create a polished transparent RPG equipment icon for Bolo. Clear blade silhouette, woven grip, brass and wood accents, river affinity detail, no text, readable at 32x32.`,
  },
  {
    id: 'equipment_eqp000003_kris',
    type: 'equipment_icon',
    source_id: 'EQP000003',
    path: 'equipment/icon_EQP000003_kris.svg',
    size: '64x64',
    prompt: `${style} Create a polished transparent RPG equipment icon for Kris. Wavy blade silhouette, respectful fictional Filipino fantasy details, woven grip, subtle glow, no text, readable at 32x32.`,
  },
  {
    id: 'map_preview_barangay',
    type: 'map_preview',
    source_id: 'WLOC000001',
    path: 'maps/preview_barangay_san_isidro.svg',
    size: '1024x1024',
    prompt: `${style} Create a top-down map preview for Barangay San Isidro with player house, barangay hall, small chapel, marketplace, rice fields, balete tree path, and forest entrance. Clear paths and collision landmarks, no labels or text.`,
  },
];

for (const asset of assets) {
  const target = path.join(assetRoot, asset.path);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (asset.path.endsWith('.png')) {
    if (!fs.existsSync(target)) fs.copyFileSync(fallbackPng, target);
  } else {
    fs.writeFileSync(target, placeholderSvg(asset));
  }
}

fs.writeFileSync(path.join(assetRoot, 'manifest.json'), `${JSON.stringify({ style, negative_prompt: negative, assets }, null, 2)}\n`);
fs.writeFileSync(path.join(docsRoot, 'vertical-slice-asset-prompts.md'), promptMarkdown(assets));

console.log(`Generated ${assets.length} vertical-slice placeholder assets.`);
console.log(`Manifest: ${path.join(assetRoot, 'manifest.json')}`);

function placeholderSvg(asset) {
  const color = colorFor(asset.type);
  const icon = iconFor(asset.type);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="${escapeXml(asset.id)}">
  <rect width="256" height="256" rx="24" fill="#11180f"/>
  <rect x="14" y="14" width="228" height="228" rx="18" fill="${color}" opacity="0.22" stroke="#d8b765" stroke-width="4"/>
  <circle cx="128" cy="108" r="44" fill="${color}" opacity="0.9"/>
  <path d="${icon}" fill="#fff6df" opacity="0.92"/>
</svg>
`;
}

function promptMarkdown(rows) {
  return `# Vertical Slice Asset Prompts

Use these prompts with your preferred image generation tool. Keep filenames stable so generated files can replace the placeholders in \`frontend/public/assets/vertical-slice\`.

Recommended tools:

- ChatGPT image generation: good for concept art and quick iteration.
- Adobe Firefly: good commercial-safety posture and style exploration.
- Leonardo.ai: good game asset workflow and transparent-background assets.
- Scenario.gg: good for consistent game asset sets.
- Midjourney: strong concept art, but check commercial/license terms and transparent-background workflow.
- Stable Diffusion / ComfyUI: best local/batch control if you can manage models and licensing.

General negative prompt:

\`\`\`text
${negative}
\`\`\`

## ChatGPT Sprite Sheet Standard

For character, NPC, and Nilalang sprite sheets, use this structure unless a later animation system changes it:

- File type: PNG with transparent background
- Exact canvas size for every player, NPC, and Nilalang actor sheet: 768x1024 pixels
- Grid: 3 columns x 4 rows, 12 frames total
- Cell size: 256x256 pixels
- Row order: down, left, right, up
- Column order: idle, walk-left-foot-forward, walk-right-foot-forward
- The 2nd and 3rd columns must be visibly different, not duplicated
- Column 2 pose: left foot forward, right arm forward
- Column 3 pose: right foot forward, left arm forward
- Side-facing rows must show opposite leg positions and arm swing
- Up/back row must show alternating heel/foot placement and shoulder movement
- No labels, no frame borders, no background
- No brown/black/gradient backdrop or vignette
- No shadows or effects that cross into another cell
- Keep the feet/bottom anchor aligned in every frame
- Keep the full body visible inside each cell with padding on all sides
- All characters should have similar chibi body proportions and fill roughly the same amount of their 256x256 cell

${rows.map((asset) => `## ${asset.id}

- Type: \`${asset.type}\`
- Source: \`${asset.source_id ?? 'new'}\`
- Replace file: \`frontend/public/assets/vertical-slice/${asset.path}\`
- Size target: ${asset.size}

\`\`\`text
${asset.prompt}
\`\`\`
`).join('\n')}
`;
}

function colorFor(type) {
  return {
    character_sprite: '#d8b765',
    npc_sprite: '#38bdf8',
    nilalang_sprite: '#61c47c',
    boss_sprite: '#bd4c5f',
    tileset: '#7a9b57',
    ui_icon: '#f7d98b',
    map_object: '#6db6ff',
    debug_tile: '#ff4d4d',
    item_icon: '#22c55e',
    equipment_icon: '#c69b54',
    map_preview: '#82a7a6',
  }[type] ?? '#d8b765';
}

function iconFor(type) {
  if (type.includes('sprite')) return 'M92 154c-13-8-22-23-22-40 0-31 25-56 58-56s58 25 58 56c0 17-9 32-22 40l14 34H78l14-34z';
  if (type === 'tileset' || type === 'map_preview') return 'M56 72h64v64H56V72zm80 0h64v64h-64V72zM56 152h64v64H56v-64zm80 0h64v64h-64v-64z';
  if (type === 'equipment_icon') return 'M74 184l82-112 28 28-112 82-28 8 2-28 28 22z';
  if (type === 'item_icon') return 'M90 78h76l-8 34c18 12 30 32 30 55 0 37-27 61-60 61s-60-24-60-61c0-23 12-43 30-55l-8-34z';
  return 'M128 48l22 54 58 5-44 38 14 57-50-30-50 30 14-57-44-38 58-5 22-54z';
}

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]));
}
