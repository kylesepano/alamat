import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataRoot = path.join(root, 'database', 'data', 'equipment');

const categories = [
  ['EQC0001', 'Weapons', 'weapons', 'Offensive equipment for player, NPC, and future class rules.', 'main_hand', 'sword', '#B45309'],
  ['EQC0002', 'Armor', 'armor', 'Body protection and defensive gear.', 'body', 'shield', '#64748B'],
  ['EQC0003', 'Headgear', 'headgear', 'Head-slot protective or ritual pieces.', 'head', 'helmet', '#94A3B8'],
  ['EQC0004', 'Accessories', 'accessories', 'Small wearable charms and stat modifiers.', 'accessory', 'gem', '#EC4899'],
  ['EQC0005', 'Talismans', 'talismans', 'Ritual protective objects and spiritual anchors.', 'talisman', 'badge', '#A78BFA'],
  ['EQC0006', 'Relics', 'relics', 'Rare ancestral or sacred artifacts.', 'relic', 'crown', '#FACC15'],
  ['EQC0007', 'Shields', 'shields', 'Off-hand protective equipment.', 'off_hand', 'shield', '#475569'],
  ['EQC0008', 'Instruments', 'instruments', 'Musical and ritual instruments with combat utility.', 'instrument', 'music', '#38BDF8'],
  ['EQC0009', 'Charms', 'charms', 'Small charms used for affinity or trust effects.', 'charm', 'sparkles', '#F472B6'],
  ['EQC0010', 'Monster Gear', 'monster-gear', 'Non-extractive gear designed for bonded Nilalang comfort and safety.', 'monster_core', 'paw-print', '#22C55E'],
  ['EQC0011', 'Class Gear', 'class-gear', 'Class-compatible gear hooks.', 'accessory', 'badge-check', '#60A5FA'],
  ['EQC0012', 'Affinity Gear', 'affinity-gear', 'Affinity-based equipment hooks.', 'charm', 'atom', '#7DD3FC'],
  ['EQC0013', 'Quest Gear', 'quest-gear', 'Quest-locked equipment.', 'relic', 'scroll', '#D6A85C'],
  ['EQC0014', 'Legendary Artifacts', 'legendary-artifacts', 'High-rarity artifacts for late-game systems.', 'relic', 'star', '#F59E0B'],
];

const groups = [
  ['weapons', 'EQC0001', 'main_hand', 100, ['Bolo', 'Kampilan', 'Kris', 'Barong', 'Panabas', 'Spear', 'Bow', 'Staff', 'Ritual Dagger', 'Fishing Spear']],
  ['armor', 'EQC0002', 'body', 100, ['Woven Vest', 'Bark Armor', 'Coral Armor', 'Brass Armor', 'Spirit Cloth', 'Scale Mail']],
  ['accessories', 'EQC0004', 'accessory', 100, ['Beadwork', 'Bells', 'Shell Charm', 'Bone Talisman', 'Moon Charm', 'Sun Charm', 'Ancestral Relic']],
  ['talismans', 'EQC0005', 'talisman', 50, ['Anting-Anting', 'Prayer Knot', 'River Ward', 'Balete Seal', 'Moon Thread Talisman']],
  ['relics', 'EQC0006', 'relic', 50, ['Ancestral Relic', 'Shrine Fragment', 'Old Brass Icon', 'Memory Bead', 'Sacred Bell Piece']],
  ['shields', 'EQC0007', 'off_hand', 50, ['Rattan Shield', 'Brass Buckler', 'Shell Guard', 'Bark Ward', 'Spirit Roundel']],
  ['instruments', 'EQC0008', 'instrument', 50, ['Kulintang', 'Agung', 'Bamboo Flute', 'Shell Horn', 'War Drum']],
  ['monster_gear', 'EQC0010', 'monster_core', 100, ['Saddle', 'Charm Collar', 'Spirit Harness', 'Scale Guard', 'Wing Band', 'Horn Ring']],
  ['legendary_artifacts', 'EQC0014', 'relic', 50, ['Moon-Eater Scale', 'First Balete Ring', 'Hidden Spring Diadem', 'Storm Cliff Pin', 'Ancestor Gold Seal']],
];

const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const regions = ['Luzon', 'Visayas', 'Mindanao', 'Kapuluan', 'Spirit Realm'];
const classes = ['Guardian', 'Warrior', 'Ranger', 'Mage', 'Shaman', 'Support', 'Trickster', 'Oracle'];
const affinities = ['Forest', 'River', 'Sea', 'Spirit', 'Ancestor', 'Sky', 'Mountain', 'Moon'];

let equipmentIndex = 1;
const allEquipment = [];
const splitFiles = {};

for (const [key, categoryId, slot, count, names] of groups) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const base = names[i % names.length];
    const variant = Math.floor(i / names.length) + 1;
    const name = variant === 1 ? base : `${base} ${variant}`;
    const row = makeEquipment(equipmentIndex++, name, categoryId, slot, key, i);
    rows.push(row);
    allEquipment.push(row);
  }
  splitFiles[key] = rows;
}

const upgradePaths = allEquipment.slice(0, 180).map((equipment, index) => {
  const upgraded = allEquipment[(index + 1) % allEquipment.length];
  return {
    upgrade_id: `UPG${String(index + 1).padStart(6, '0')}`,
    base_equipment_id: equipment.equipment_id,
    upgraded_equipment_id: upgraded.equipment_id,
    upgrade_level: (index % 5) + 1,
    required_items: [{ item_id: `ITM${String((index % 1075) + 1).padStart(6, '0')}`, quantity: 2 + (index % 3) }],
    required_gold: 50 + index * 3,
    required_npc_id: null,
    required_station: index % 2 === 0 ? 'shrine_forge' : 'village_workbench',
    required_quest_id: index % 11 === 0 ? `QST${String(index + 1).padStart(5, '0')}` : null,
    success_rate: 0.9,
    description: `Upgrade path from ${equipment.name} to ${upgraded.name}.`,
  };
});

const sets = [
  makeSet(1, 'Balete Guardian Set', 'Forest defensive gear for wardens and guardians.'),
  makeSet(2, 'Moonlit Traveler Set', 'Mobility and luck gear for night journeys.'),
  makeSet(3, 'Ancestral Brass Set', 'Faith and spirit-defense gear bound to remembered vows.'),
  makeSet(4, 'River Oath Set', 'Support and healing gear tied to water and shrine restoration.'),
  makeSet(5, 'Storm Cliff Set', 'Ranger and sky-affinity gear for highland encounters.'),
];

const setItems = sets.flatMap((set, setIndex) => allEquipment.slice(setIndex * 8, setIndex * 8 + 8).map((equipment) => ({
  set_id: set.set_id,
  equipment_id: equipment.equipment_id,
})));

const assetPrompts = allEquipment.map((equipment) => ({
  equipment_id: equipment.equipment_id,
  icon_filename: equipment.icon_filename,
  sprite_filename: equipment.sprite_filename,
  thumbnail_filename: equipment.thumbnail_filename,
  asset_prompt: equipment.asset_prompt,
  icon_prompt: equipment.icon_prompt,
  design_notes: equipment.design_notes,
}));

write('equipment_categories.json', categories.map(([category_id, name, slug, description, slot_type, icon, color_hint], index) => ({ category_id, name, slug, description, slot_type, icon, color_hint, sort_order: index + 1, is_active: true })));
write('equipment.json', allEquipment);
for (const [key, rows] of Object.entries(splitFiles)) write(`${key}.json`, rows);
write('equipment_upgrade_paths.json', upgradePaths);
write('equipment_sets.json', sets);
write('equipment_set_items.json', setItems);
write('equipment_asset_prompts.json', assetPrompts);

function makeEquipment(index, name, categoryId, slot, group, localIndex) {
  const equipmentId = `EQP${String(index).padStart(6, '0')}`;
  const slug = slugify(`${name}-${group}`);
  const rarity = rarities[(index + localIndex) % rarities.length];
  const region = regions[index % regions.length];
  const affinity = affinities[index % affinities.length];
  const requiredClass = group === 'weapons' || group === 'armor' ? classes[index % classes.length] : null;
  const usableByMonsters = group === 'monster_gear';
  const stats = statBlock(group, rarity);
  const icon = `icon_${equipmentId}_${slug}.png`;
  const sprite = `equipment_${equipmentId}_${slug}.png`;
  const thumb = `thumb_${equipmentId}_${slug}.png`;
  const visual = visualDescription(group, name, affinity);
  const cultural = culturalNotes(group, affinity);

  return {
    equipment_id: equipmentId,
    name,
    slug,
    category_id: categoryId,
    slot_type: slot,
    rarity,
    description: `${name} is ${rarity.toLowerCase()} ${slot.replaceAll('_', ' ')} equipment for ALAMAT's future loadout and combat systems.`,
    lore: `${name} is fictional ALAMAT equipment inspired by Filipino fantasy materials and respectful mythic motifs. It is separate from normal items and does not implement shops yet.`,
    region_origin: region,
    province_origin: null,
    ethnolinguistic_origin: 'Fictional ALAMAT synthesis inspired by Philippine cultural motifs',
    source_note: 'Generated Phase F seed equipment; review culturally specific names before final narrative use.',
    ...stats,
    required_level: rarity === 'Legendary' ? 30 : rarity === 'Epic' ? 20 : null,
    required_class: requiredClass,
    required_affiliation: group === 'affinity_gear' ? affinity : null,
    required_monster_id: usableByMonsters ? `MON${String((localIndex % 122) + 1).padStart(4, '0')}` : null,
    required_quest_id: group === 'legendary_artifacts' && localIndex % 4 === 0 ? `QST${String(localIndex + 1).padStart(5, '0')}` : null,
    usable_by_player: !usableByMonsters,
    usable_by_monsters: usableByMonsters,
    usable_by_npcs: group !== 'monster_gear',
    stackable: false,
    sellable: group !== 'legendary_artifacts',
    buyable: ['weapons', 'armor', 'accessories', 'shields', 'instruments'].includes(group) && rarity !== 'Legendary',
    base_price: priceFor(group, rarity),
    sell_price: Math.floor(priceFor(group, rarity) * 0.45),
    passive_id: ['accessories', 'talismans', 'relics', 'legendary_artifacts'].includes(group) ? `PAS-EQP-${String(index).padStart(4, '0')}` : null,
    skill_id: ['weapons', 'instruments', 'legendary_artifacts'].includes(group) ? `SKL-EQP-${String(index).padStart(4, '0')}` : null,
    status_effect_id: group === 'talismans' ? 'reveal' : null,
    effect_payload: effectPayload(group, affinity, stats),
    compatibility_payload: {
      classes: requiredClass ? [requiredClass] : [],
      affiliations: affinity ? [affinity] : [],
      monsters: usableByMonsters ? [`MON${String((localIndex % 122) + 1).padStart(4, '0')}`] : [],
      user_types: [usableByMonsters ? 'monster' : 'player', group !== 'monster_gear' ? 'npc' : null].filter(Boolean),
    },
    icon_filename: icon,
    sprite_filename: sprite,
    thumbnail_filename: thumb,
    asset_prompt: assetPrompt(name, slot, group, rarity, visual, cultural),
    icon_prompt: `Create a polished transparent-background RPG equipment icon for ${name}. Slot: ${slot}. Rarity: ${rarity}. ${visual} No text, no UI, readable at 32x32.`,
    design_notes: `${visual} ${cultural} Keep equipment separate from consumable item assets.`,
    is_active: true,
  };
}

function statBlock(group, rarity) {
  const mult = { Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Legendary: 6 }[rarity] || 1;
  const base = { hp_bonus: 0, mana_bonus: 0, faith_bonus: 0, stamina_bonus: 0, attack_bonus: 0, magic_bonus: 0, defense_bonus: 0, spirit_defense_bonus: 0, speed_bonus: 0, luck_bonus: 0 };
  if (group === 'weapons') base.attack_bonus = 4 * mult;
  if (group === 'armor') base.defense_bonus = 4 * mult;
  if (group === 'shields') base.defense_bonus = 3 * mult;
  if (group === 'instruments') base.magic_bonus = 3 * mult;
  if (group === 'monster_gear') base.hp_bonus = 8 * mult;
  if (group === 'accessories') base.luck_bonus = 2 * mult;
  if (group === 'talismans') base.faith_bonus = 3 * mult;
  if (group === 'relics') base.spirit_defense_bonus = 3 * mult;
  if (group === 'legendary_artifacts') {
    base.attack_bonus = 3 * mult;
    base.magic_bonus = 3 * mult;
    base.faith_bonus = 2 * mult;
  }
  return base;
}

function assetPrompt(name, slot, category, rarity, visual, cultural) {
  return `Create a clean 2D RPG equipment icon for ALAMAT, a Philippine mythology monster-collecting RPG.\n\nEquipment: ${name}\nSlot: ${slot}\nCategory: ${category.replaceAll('_', ' ')}\nRarity: ${rarity}\n\nStyle:\nReadable at 32x32 and 64x64.\nFilipino fantasy RPG aesthetic.\nTransparent background.\nNo text.\nNo UI.\nStrong silhouette.\n\nVisual details:\n${visual}\n\nCultural design notes:\n${cultural}\n\nOutput should look like a polished RPG inventory equipment icon.`;
}

function visualDescription(group, name, affinity) {
  const map = {
    weapons: 'A clear weapon silhouette using wood, brass, steel, woven grip, shell, or ritual cloth accents.',
    armor: 'Protective wearable gear with woven fiber, bark, coral, brass, spirit cloth, or scale motifs.',
    accessories: 'Small wearable ornament with beadwork, bells, shells, bone-like shapes, moon or sun motifs.',
    talismans: 'Protective charm object with cord, bead, seal, small brass plate, or folded cloth.',
    relics: 'Ancient artifact fragment with patina, memory glow, brass, stone, or shrine-restoration materials.',
    shields: 'Readable off-hand guard silhouette using rattan, brass, bark, shell, or spirit-ward markings.',
    instruments: 'Musical equipment silhouette with bamboo, brass, shell, drum hide, or carved wood.',
    monster_gear: 'Comfortable bonded-Nilalang gear such as harness, collar, guard, band, ring, or saddle; respectful and non-restrictive.',
    legendary_artifacts: 'Rare artifact with strong mythic silhouette, subtle glow, and refined ceremonial materials.',
  };
  return `${map[group] ?? `Readable equipment silhouette for ${name}.`} Affinity accent: ${affinity}.`;
}

function culturalNotes(group, affinity) {
  return `Use Filipino fantasy inspiration respectfully: woven patterns, bamboo, brass, shell, rattan, river stone, leaf fiber, or ceremonial cloth where appropriate. Keep ${affinity.toLowerCase()} symbolism fictional unless a specific source is reviewed.`;
}

function effectPayload(group, affinity, stats) {
  if (group === 'weapons') return { effect_type: 'stat_bonus', affinity, stats: { attack_bonus: stats.attack_bonus, magic_bonus: stats.magic_bonus } };
  if (group === 'armor' || group === 'shields') return { effect_type: 'defense_bonus', stats: { defense_bonus: stats.defense_bonus, spirit_defense_bonus: stats.spirit_defense_bonus } };
  if (group === 'monster_gear') return { effect_type: 'bonded_monster_comfort', affinity, trust_modifier: 2, stats };
  return { effect_type: 'equipment_modifier', affinity, stats };
}

function priceFor(group, rarity) {
  const base = { weapons: 120, armor: 140, accessories: 90, talismans: 110, relics: 180, shields: 130, instruments: 150, monster_gear: 100, legendary_artifacts: 500 }[group] || 100;
  const mult = { Common: 1, Uncommon: 2, Rare: 4, Epic: 8, Legendary: 16 }[rarity] || 1;
  return base * mult;
}

function makeSet(index, name, description) {
  return {
    set_id: `SET${String(index).padStart(4, '0')}`,
    name,
    slug: slugify(name),
    description,
    set_bonus_payload: { pieces_required: [2, 4], bonuses: [{ pieces: 2, effect: 'minor_stat_bonus' }, { pieces: 4, effect: 'theme_bonus' }] },
    lore: `${name} is a fictional ALAMAT equipment set designed for future loadout bonuses.`,
    icon: `set_${String(index).padStart(4, '0')}_${slugify(name)}.png`,
    is_active: true,
  };
}

function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');
}

function write(filename, payload) {
  fs.mkdirSync(dataRoot, { recursive: true });
  fs.writeFileSync(path.join(dataRoot, filename), `${JSON.stringify(payload, null, 2)}\n`);
}
