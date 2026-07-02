import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataRoot = path.join(root, 'database', 'data', 'items');

const itemTypes = [
  'consumable',
  'food',
  'herb',
  'crafting_material',
  'monster_drop',
  'quest_item',
  'key_item',
  'offering',
  'relic_material',
  'skill_material',
  'event_item',
  'lore_collectible',
  'currency_token',
];

const categories = [
  ['ITC0001', 'Consumables', 'consumables', 'Battle and field-use items consumed on use.', 'flask', '#EF4444', null],
  ['ITC0002', 'Food', 'food', 'Cooked, gathered, or prepared food items.', 'utensils', '#F59E0B', null],
  ['ITC0003', 'Herbs', 'herbs', 'Medicinal leaves, roots, flowers, and poultice components.', 'leaf', '#22C55E', null],
  ['ITC0004', 'Crafting Materials', 'crafting-materials', 'General resources used in crafting and upgrades.', 'hammer', '#A16207', null],
  ['ITC0005', 'Monster Drops', 'monster-drops', 'Materials recovered from Nilalang encounters without treating Nilalang as loot objects.', 'sparkles', '#A78BFA', null],
  ['ITC0006', 'Quest Items', 'quest-items', 'Items used to advance quests and story flags.', 'scroll', '#38BDF8', null],
  ['ITC0007', 'Key Items', 'key-items', 'Persistent progression items.', 'key', '#FACC15', null],
  ['ITC0008', 'Offerings', 'offerings', 'Respectful offerings used for trust, shrines, and relationship systems.', 'hand-heart', '#F472B6', null],
  ['ITC0009', 'Relic Materials', 'relic-materials', 'Ancient, sacred, or rare materials used to restore relics.', 'gem', '#818CF8', null],
  ['ITC0010', 'Skill Materials', 'skill-materials', 'Essences and components used for skill learning or refinement.', 'wand', '#60A5FA', null],
  ['ITC0011', 'Event Items', 'event-items', 'Limited-time or world-event materials.', 'calendar', '#FB7185', null],
  ['ITC0012', 'Lore Collectibles', 'lore-collectibles', 'Pages, songs, testimony, and inscriptions used to reveal lore.', 'book-open', '#D6A85C', null],
  ['ITC0013', 'Currency Tokens', 'currency-tokens', 'Token-like exchange items that are not equipment.', 'coins', '#EAB308', null],
  ['ITC0014', 'Medicine', 'medicine', 'Remedies focused on status recovery.', 'cross', '#10B981', 'ITC0001'],
  ['ITC0015', 'Waters', 'waters', 'Sacred, river, spring, rain, and sea water items.', 'droplet', '#0EA5E9', 'ITC0001'],
  ['ITC0016', 'Candles', 'candles', 'Candles used for rituals, shrines, and trust scenes.', 'flame', '#F97316', 'ITC0008'],
  ['ITC0017', 'Rice Offerings', 'rice-offerings', 'Rice, grain, cake, and harvest-based offerings.', 'wheat', '#FDE68A', 'ITC0008'],
  ['ITC0018', 'Sea Offerings', 'sea-offerings', 'Shells, salt, pearls, and sea gifts.', 'shell', '#38BDF8', 'ITC0008'],
  ['ITC0019', 'Forest Materials', 'forest-materials', 'Bark, resin, bamboo, rattan, leaves, and roots.', 'trees', '#16A34A', 'ITC0004'],
  ['ITC0020', 'River Materials', 'river-materials', 'Stones, reeds, clay, and water-polished resources.', 'waves', '#0284C7', 'ITC0004'],
  ['ITC0021', 'Mountain Materials', 'mountain-materials', 'Stone, ash, ore dust, and highland resources.', 'mountain', '#78716C', 'ITC0004'],
  ['ITC0022', 'Spirit Materials', 'spirit-materials', 'Subtle essences, mist, glow, and ward fragments.', 'sparkle', '#C084FC', 'ITC0010'],
  ['ITC0023', 'Ancestral Materials', 'ancestral-materials', 'Memory-bound cloth, names, seals, and vow fragments.', 'scroll-text', '#BFA16A', 'ITC0009'],
  ['ITC0024', 'Shrine Items', 'shrine-items', 'Objects used in shrine repair or ritual restoration.', 'landmark', '#FACC15', 'ITC0006'],
  ['ITC0025', 'Village Items', 'village-items', 'Personal, household, and community quest items.', 'home', '#FBBF24', 'ITC0006'],
  ['ITC0026', 'Festival Items', 'festival-items', 'Celebration and seasonal event items.', 'party-popper', '#F472B6', 'ITC0011'],
  ['ITC0027', 'Weather Items', 'weather-items', 'Items that interact with weather or battlefield conditions.', 'cloud-sun', '#93C5FD', 'ITC0011'],
  ['ITC0028', 'Trust Tokens', 'trust-tokens', 'Non-currency tokens of completed service, apology, or remembered names.', 'badge-check', '#34D399', 'ITC0013'],
  ['ITC0029', 'Fragments', 'fragments', 'Broken pieces of maps, tablets, bells, songs, and old records.', 'puzzle', '#CBD5E1', 'ITC0012'],
  ['ITC0030', 'Essences', 'essences', 'Elemental, spiritual, and affinity essences for learning and crafting.', 'atom', '#7DD3FC', 'ITC0010'],
];

const rarityCycle = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const regionCycle = ['Luzon', 'Visayas', 'Mindanao', 'Kapuluan', 'Spirit Realm'];
const affinities = ['Forest', 'River', 'Sea', 'Spirit', 'Ancestor', 'Sky', 'Mountain', 'Moon', 'Sun', 'Storm'];

const groups = [
  ['consumables', 'consumable', 'ITC0001', 100, ['Healing Herb', 'Diwata Dew', 'Sacred River Water', 'Antidote Leaf', 'Burn Salve', 'Spirit Candle', 'Moonlit Bandage']],
  ['food_items', 'food', 'ITC0002', 100, ['Suman', 'Bibingka', 'Puto', 'Rice Cake', 'Grilled Fish', 'Coconut Water', 'Forest Fruit', 'Sea Grapes']],
  ['herbs', 'herb', 'ITC0003', 100, ['Lagundi Leaf', 'Sambong Sprig', 'Tawa-Tawa Stem', 'Banaba Flower', 'Yerba Buena', 'Ginger Root', 'Guava Leaf']],
  ['crafting_materials', 'crafting_material', 'ITC0004', 150, ['Balete Bark', 'Bamboo Fiber', 'Rattan Strip', 'River Stone', 'Coral Shard', 'Volcanic Ash', 'Pearl Dust', 'Moon Thread']],
  ['monster_drops', 'monster_drop', 'ITC0005', 200, ['Kapre Ember Ash', 'Tikbalang Mane Hair', 'Manananggal Wing Membrane', 'Aswang Fang', 'Diwata Petal', 'Bakunawa Scale', 'Sarimanok Feather', 'Nuno Mound Soil']],
  ['quest_items', 'quest_item', 'ITC0006', 100, ['Old Letter', 'Broken Shrine Bell', 'Lost Heirloom', 'Ancestral Cloth', 'Stolen Pearl', 'Forgotten Name Stone', 'Village Seal']],
  ['offerings', 'offering', 'ITC0008', 100, ['Betel Nut', 'Rice Grains', 'Candle', 'Tobacco Bundle', 'Flower Garland', 'Shell Charm', 'Black Salt', 'Clean Water Bowl']],
  ['relic_materials', 'relic_material', 'ITC0009', 50, ['Ancient Brass Piece', 'Shrine Gold Leaf', 'Old Bell Metal', 'Prayer Bead', 'Memory Glass']],
  ['skill_materials', 'skill_material', 'ITC0010', 50, ['Fire Essence', 'Moon Essence', 'Shadow Essence', 'Forest Essence', 'Spirit Essence', 'River Essence', 'Storm Essence']],
  ['event_items', 'event_item', 'ITC0011', 50, ['Festival Lantern', 'Eclipse Token', 'Typhoon Charm', 'Harvest Ribbon', 'Balete Awakening Seed']],
  ['lore_collectibles', 'lore_collectible', 'ITC0012', 50, ['Folklore Page', 'Old Map Fragment', 'Babaylan Note', 'Shrine Inscription', 'Elder Testimony', 'Song Fragment']],
  ['key_items', 'key_item', 'ITC0007', 25, ['Gate Charm', 'Realm Key', 'Oath Marker', 'Village Writ', 'Sanctuary Pass']],
];

let itemIndex = 1;
const allItems = [];
const splitFiles = {};

for (const [fileKey, itemType, categoryId, count, baseNames] of groups) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const base = baseNames[i % baseNames.length];
    const variant = Math.floor(i / baseNames.length) + 1;
    const name = variant === 1 ? base : `${base} ${variant}`;
    const item = makeItem(itemIndex++, name, itemType, categoryId, i);
    items.push(item);
    allItems.push(item);
  }
  splitFiles[fileKey] = items;
}

const recipes = allItems
  .filter((item) => ['consumable', 'offering', 'skill_material', 'relic_material'].includes(item.item_type))
  .slice(0, 120)
  .map((item, index) => ({
    recipe_id: `RCP${String(index + 1).padStart(6, '0')}`,
    output_item_id: item.item_id,
    output_quantity: index % 5 === 0 ? 2 : 1,
    recipe_type: item.item_type === 'consumable' ? 'field_craft' : 'ritual_craft',
    required_station: index % 3 === 0 ? 'shrine_workmat' : null,
    required_level: (index % 10) + 1,
    required_quest_id: null,
    required_npc_id: null,
    required_weather: index % 7 === 0 ? 'Dawn' : null,
    required_habitat: index % 9 === 0 ? 'Sacred Sites' : null,
    ingredients: [
      { item_id: allItems[(index * 3) % allItems.length].item_id, quantity: 1 },
      { item_id: allItems[(index * 5 + 11) % allItems.length].item_id, quantity: 2 },
    ],
    success_rate: 0.95,
    gold_cost: 10 + index,
    description: `Crafting rule for ${item.name}.`,
  }));

const assetPrompts = allItems.map((item) => ({
  item_id: item.item_id,
  icon_filename: item.icon_filename,
  sprite_filename: item.sprite_filename,
  thumbnail_filename: item.thumbnail_filename,
  asset_prompt: item.asset_prompt,
  icon_prompt: item.icon_prompt,
  design_notes: item.design_notes,
}));

write('item_categories.json', categories.map(([category_id, name, slug, description, icon, color_hint, parent_category_id], index) => ({
  category_id,
  name,
  slug,
  description,
  parent_category_id,
  icon,
  color_hint,
  sort_order: index + 1,
  is_active: true,
})));
write('items.json', allItems);
for (const [fileKey, items] of Object.entries(splitFiles)) write(`${fileKey}.json`, items);
write('item_recipes.json', recipes);
write('item_asset_prompts.json', assetPrompts);

function makeItem(index, name, itemType, categoryId, localIndex) {
  const itemId = `ITM${String(index).padStart(6, '0')}`;
  const slug = slugify(name);
  const rarity = rarityCycle[(index + localIndex) % rarityCycle.length];
  const region = regionCycle[index % regionCycle.length];
  const affinity = affinities[index % affinities.length];
  const stackable = !['key_item', 'quest_item', 'lore_collectible'].includes(itemType);
  const icon = `icon_${itemId}_${slug}.png`;
  const sprite = `item_${itemId}_${slug}.png`;
  const thumb = `thumb_${itemId}_${slug}.png`;
  const visual = visualDescription(itemType, name, affinity);
  const colorMood = colorMoodFor(itemType, rarity, affinity);
  const cultural = culturalNotes(itemType, affinity);

  return {
    item_id: itemId,
    name,
    slug,
    category_id: categoryId,
    item_type: itemType,
    rarity,
    description: `${name} is a ${rarity.toLowerCase()} ${itemType.replaceAll('_', ' ')} used in ALAMAT's item, trust, crafting, quest, or lore systems.`,
    lore: `${name} is handled as a respectful Filipino fantasy RPG item. It supports play without turning sacred beings or cultural objects into disposable trophies.`,
    region_origin: region,
    province_origin: null,
    ethnolinguistic_origin: 'Fictional ALAMAT synthesis inspired by Philippine cultural motifs',
    source_note: 'Generated Phase E seed item; review culturally specific names before production narrative use.',
    stackable,
    max_stack: stackable ? 99 : 1,
    sellable: !['quest_item', 'key_item'].includes(itemType),
    buyable: ['consumable', 'food', 'herb', 'offering'].includes(itemType),
    base_price: priceFor(itemType, rarity),
    sell_price: Math.floor(priceFor(itemType, rarity) * 0.4),
    weight: ['key_item', 'lore_collectible'].includes(itemType) ? null : Number((0.05 + (index % 12) * 0.03).toFixed(2)),
    usable_in_battle: ['consumable', 'food', 'herb'].includes(itemType),
    usable_in_field: ['consumable', 'food', 'herb', 'key_item', 'quest_item', 'lore_collectible'].includes(itemType),
    usable_in_crafting: ['crafting_material', 'monster_drop', 'relic_material', 'skill_material', 'herb'].includes(itemType),
    usable_in_quests: ['quest_item', 'key_item', 'offering', 'lore_collectible', 'event_item'].includes(itemType),
    consumable: ['consumable', 'food', 'herb', 'offering', 'event_item'].includes(itemType),
    cooldown: ['consumable', 'food', 'herb'].includes(itemType) ? 1 + (index % 3) : null,
    effect_summary: effectSummary(itemType, name, affinity),
    effect_payload: effectPayload(itemType, affinity),
    status_effect_id: itemType === 'herb' && index % 4 === 0 ? 'reveal' : null,
    skill_id: itemType === 'skill_material' ? `SKL-MAT-${String(localIndex + 1).padStart(4, '0')}` : null,
    monster_id: itemType === 'monster_drop' ? `MON${String((localIndex % 122) + 1).padStart(4, '0')}` : null,
    quest_id: itemType === 'quest_item' ? `QST${String(localIndex + 1).padStart(5, '0')}` : null,
    offering_affinity: itemType === 'offering' ? affinity : null,
    habitat_affinity: itemType === 'offering' && localIndex % 3 === 0 ? 'Sacred Sites' : null,
    weather_affinity: itemType === 'event_item' ? (localIndex % 2 === 0 ? 'Dawn' : 'New Moon') : null,
    time_affinity: itemType === 'offering' && localIndex % 4 === 0 ? 'Eclipse' : null,
    icon_filename: icon,
    sprite_filename: sprite,
    thumbnail_filename: thumb,
    asset_prompt: assetPrompt(name, itemType, rarity, visual, colorMood, cultural),
    icon_prompt: iconPrompt(name, itemType, rarity, visual, colorMood),
    design_notes: `${visual} ${cultural} Keep the silhouette readable and avoid text or UI marks inside the asset.`,
    is_active: true,
  };
}

function assetPrompt(itemName, category, rarity, visual, colorMood, cultural) {
  return `Create a clean 2D RPG item icon for ALAMAT, a Philippine mythology monster-collecting RPG.\n\nItem: ${itemName}\nCategory: ${category.replaceAll('_', ' ')}\nRarity: ${rarity}\nStyle: readable at 32x32 and 64x64, painterly but clean, Filipino fantasy RPG aesthetic, transparent background, no text, no UI, strong silhouette.\n\nVisual details:\n${visual}\n\nColor/mood:\n${colorMood}\n\nCultural design notes:\n${cultural}\n\nOutput should look like a game inventory icon.`;
}

function iconPrompt(itemName, category, rarity, visual, colorMood) {
  return `Create a polished transparent-background RPG inventory icon for ${itemName}. Category: ${category.replaceAll('_', ' ')}. Rarity: ${rarity}. ${visual} ${colorMood} No text, no UI frame, readable at small sizes.`;
}

function visualDescription(itemType, name, affinity) {
  const map = {
    consumable: 'Small wrapped remedy, leaf bundle, vial, candle, or bandage with clear healing silhouette.',
    food: 'Readable prepared food shape using rice, coconut, fish, fruit, or woven-leaf wrapping cues.',
    herb: 'Distinct medicinal leaf, root, flower, or sprig tied with a simple fiber cord.',
    crafting_material: 'Raw natural material such as bark, bamboo, stone, ash, coral, pearl dust, or thread.',
    monster_drop: 'A respectful recovered trace such as ash, scale, feather, soil, petal, fang, or hair, not a trophy display.',
    quest_item: 'Story object such as a letter, bell, heirloom, cloth, pearl, seal, or name stone.',
    key_item: 'Important progression object with a clear unique silhouette and subtle ritual markings.',
    offering: 'Humble offering object such as grain, candle, water bowl, flower, shell, salt, tobacco, or betel nut.',
    relic_material: 'Ancient fragment, bead, brass, glass, or gold leaf material with sacred-restoration mood.',
    skill_material: `${affinity}-aligned essence in a small vial, charm, spark, mist, or crystal container.`,
    event_item: 'Seasonal or celestial token with festival, typhoon, harvest, eclipse, or awakening motifs.',
    lore_collectible: 'Old page, map scrap, note, inscription rubbing, testimony slip, or song fragment.',
    currency_token: 'Small token or coin substitute with clean readable value silhouette.',
  };
  return map[itemType] || `Readable item silhouette for ${name}.`;
}

function colorMoodFor(itemType, rarity, affinity) {
  return `${rarity} treatment with ${affinity.toLowerCase()} accent colors, warm natural materials, subtle glow only when magical.`;
}

function culturalNotes(itemType, affinity) {
  return `Use Filipino fantasy inspiration respectfully: woven fibers, shell, bamboo, brass, leaf wrapping, river stone, shrine candle, or harvest motifs where appropriate. Keep ${affinity.toLowerCase()} symbolism broad and fictional unless a specific source is reviewed.`;
}

function effectSummary(itemType, name, affinity) {
  if (itemType === 'consumable') return `${name} restores or protects a single ally.`;
  if (itemType === 'food') return `${name} supports field recovery or trust scenes.`;
  if (itemType === 'herb') return `${name} supports remedy crafting and status recovery.`;
  if (itemType === 'offering') return `${name} improves trust interactions for ${affinity}-aligned encounters.`;
  if (itemType === 'skill_material') return `${name} supports skill learning or refinement.`;
  if (itemType === 'crafting_material' || itemType === 'monster_drop' || itemType === 'relic_material') return `${name} is used in crafting and restoration recipes.`;
  if (itemType === 'quest_item' || itemType === 'key_item') return `${name} advances story or unlocks access.`;
  return `${name} supports Codex progression or event systems.`;
}

function effectPayload(itemType, affinity) {
  if (itemType === 'consumable') return { effect_type: 'restore_hp', amount: 50, scaling: 'flat', target: 'single_ally', removes_status: [] };
  if (itemType === 'food') return { effect_type: 'field_recovery', stamina: 15, target: 'party' };
  if (itemType === 'herb') return { effect_type: 'status_remedy', target: 'single_ally', removes_status: ['poison'] };
  if (itemType === 'offering') return { effect_type: 'trust_modifier', affinity, amount: 5, scaling: 'flat' };
  if (itemType === 'skill_material') return { effect_type: 'skill_learning_material', affinity, amount: 1 };
  return null;
}

function priceFor(itemType, rarity) {
  const base = { consumable: 30, food: 20, herb: 18, crafting_material: 12, monster_drop: 45, quest_item: 0, key_item: 0, offering: 25, relic_material: 80, skill_material: 70, event_item: 40, lore_collectible: 10, currency_token: 1 }[itemType] || 10;
  const mult = { Common: 1, Uncommon: 2, Rare: 4, Epic: 8, Legendary: 16 }[rarity] || 1;
  return base * mult;
}

function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');
}

function write(filename, payload) {
  fs.mkdirSync(dataRoot, { recursive: true });
  fs.writeFileSync(path.join(dataRoot, filename), `${JSON.stringify(payload, null, 2)}\n`);
}
