import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const assetRoot = path.join(root, 'frontend', 'public', 'assets', 'vertical-slice');
const docsRoot = path.join(root, 'docs');

const style = 'Hand-painted HD 2D chibi Filipino fantasy RPG, top-down classic handheld perspective, readable silhouette, warm tropical palette, respectful fictional Philippine folklore inspiration, no text, no logo.';
const negative = 'Avoid caricature, gore, photorealism, real-world religious superiority, sacred-object misuse, text, logos, modern brands, muddy silhouettes.';

const assets = [
  {
    id: 'player_customizable_base',
    type: 'character_sprite',
    path: 'characters/player_customizable_base.svg',
    size: '48x64 per frame, 4 directions, idle and walk frames',
    prompt: `${style} Create a customizable protagonist overworld sprite sheet base for ALAMAT. Chibi proportions, neutral traveler stance, practical lightweight clothing inspired by woven fibers and natural materials, modular hair/body/outfit layers, top-down 3/4 RPG view, transparent background. Sprite must support 8-direction movement through mirrored or separate directional frames.`,
  },
  {
    id: 'npc_npc000001_datu_magsalin',
    type: 'npc_sprite',
    source_id: 'NPC000001',
    path: 'npcs/npc_NPC000001_datu_magsalin.svg',
    size: '48x64 per frame',
    prompt: `${style} Create an overworld chibi NPC sprite for Datu Magsalin, barangay elder and arrival anchor. Calm, grounded village leader, practical Filipino fantasy clothing, woven sash, walking cane or document bundle, transparent background, top-down 3/4 RPG view.`,
  },
  {
    id: 'npc_npc000582_babaylan_lira_dalisay',
    type: 'npc_sprite',
    source_id: 'NPC000582',
    path: 'npcs/npc_NPC000582_babaylan_lira_dalisay.svg',
    size: '48x64 per frame',
    prompt: `${style} Create an overworld chibi NPC sprite for Babaylan Lira Dalisay, spiritual guide for trust and balance. Respectful fictional ritual attire, leaf fiber, brass, shell, and woven details, gentle authority, transparent background, top-down 3/4 RPG view.`,
  },
  {
    id: 'npc_npc000301_general_store',
    type: 'npc_sprite',
    source_id: 'NPC000301',
    path: 'npcs/npc_NPC000301_general_store.svg',
    size: '48x64 per frame',
    prompt: `${style} Create an overworld chibi NPC shopkeeper sprite for the starter barangay general store. Friendly vendor, apron, small pouch, woven market cloth accents, transparent background, top-down 3/4 RPG view.`,
  },
  {
    id: 'nilalang_mon0038_aghoy',
    type: 'nilalang_sprite',
    source_id: 'MON0038',
    path: 'nilalang/nilalang_MON0038_aghoy.svg',
    size: '64x64 per frame',
    prompt: `${style} Create an overworld chibi Nilalang sprite for Aghoy, the little forest helper and first earned companion candidate. Small forest spirit, kind and shy, leaf cloak, basket or root charm, firefly glow, readable silhouette, transparent background, no horror tone.`,
  },
  {
    id: 'nilalang_mon0032_duwende',
    type: 'nilalang_sprite',
    source_id: 'MON0032',
    path: 'nilalang/nilalang_MON0032_duwende.svg',
    size: '64x64 per frame',
    prompt: `${style} Create an overworld chibi Nilalang sprite for Duwende, house-earth little folk. Small earthy spirit, mound and household motifs, friendly but mysterious, rattan/leaf details, transparent background, readable at 64x64.`,
  },
  {
    id: 'nilalang_mon0028_ungo',
    type: 'nilalang_sprite',
    source_id: 'MON0028',
    path: 'nilalang/nilalang_MON0028_ungo.svg',
    size: '64x64 per frame',
    prompt: `${style} Create an overworld chibi Nilalang sprite for Ungo, wild ape spirit and first dangerous encounter. Strong forest creature, muscular but readable, moss and bark accents, alert stance, not grotesque, transparent background.`,
  },
  {
    id: 'nilalang_mon0007_batibat_boss',
    type: 'boss_sprite',
    source_id: 'MON0007',
    path: 'nilalang/boss_MON0007_batibat.svg',
    size: '96x96 per frame',
    prompt: `${style} Create a large overworld boss sprite for Batibat, nightmare tree-mother presence. Heavy old-wood silhouette, sleep/nightmare motif, roots and housepost details, eerie but not graphic, transparent background, readable boss scale.`,
  },
  {
    id: 'tileset_barangay_san_isidro',
    type: 'tileset',
    source_id: 'WLOC000001',
    path: 'tilesets/tileset_barangay_san_isidro.svg',
    size: '48x48 tiles',
    prompt: `${style} Create a 48x48 top-down RPG tileset for Barangay San Isidro. Include village paths, nipa-style homes, barangay hall accents, marketplace ground, rice field edges, chapel courtyard stones, garden plants, fences, water jars, and collision-friendly landmarks. Seamless tiles, no text.`,
  },
  {
    id: 'tileset_balete_forest',
    type: 'tileset',
    source_id: 'WLOC000004',
    path: 'tilesets/tileset_balete_forest.svg',
    size: '48x48 tiles',
    prompt: `${style} Create a 48x48 top-down RPG tileset for Balete Forest. Include forest floor, moss, root paths, balete roots, bamboo thickets, firefly clearings, riverbank edges, rocks, hidden item spots, and collision-friendly tree trunks. Seamless tiles, no text.`,
  },
  {
    id: 'tileset_spirit_shrine',
    type: 'tileset',
    source_id: 'WLOC000009',
    path: 'tilesets/tileset_spirit_shrine.svg',
    size: '48x48 tiles',
    prompt: `${style} Create a 48x48 top-down RPG tileset for a fictional Spirit Shrine threshold. Include stone paths, shrine platform, mist pools, candle/offering spots, woven banners, ancient roots, luminous spirit tiles, and boss arena markings. No real religion as absolute truth, no text.`,
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
  fs.writeFileSync(target, placeholderSvg(asset));
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
