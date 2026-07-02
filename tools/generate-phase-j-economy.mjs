import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataRoot = path.join(root, 'database', 'data', 'economy');

const currencies = [
  ['CUR0001', 'Gold', 'gold', 'G', 'Primary common currency.', true],
  ['CUR0002', 'Pearl Tokens', 'pearl-tokens', 'PT', 'Coastal barter and reef market tokens.', false],
  ['CUR0003', 'Rice Marks', 'rice-marks', 'RM', 'Agrarian settlement credit notes.', false],
  ['CUR0004', 'Shrine Beads', 'shrine-beads', 'SB', 'Offering-linked ritual exchange beads.', false],
  ['CUR0005', 'Guild Scrip', 'guild-scrip', 'GS', 'Merchant League and crafter scrip.', false],
  ['CUR0006', 'Festival Tickets', 'festival-tickets', 'FT', 'Seasonal festival market currency.', false],
].map(([currency_id, name, slug, symbol, description, is_primary], index) => ({
  currency_id,
  name,
  slug,
  symbol,
  description,
  icon_filename: `currency_${currency_id}_${slug}.png`,
  is_primary,
  exchange_rate_payload: { gold: index === 0 ? 1 : 5 + index * 3, volatility: index % 2 === 0 ? 'stable' : 'seasonal' },
  is_active: true,
}));

const craftingTypes = ['cooking', 'herbalism', 'forging', 'weaving', 'carving', 'alchemy', 'ritual', 'enchanting', 'equipment_upgrade', 'talisman_making', 'monster_care', 'fishing', 'farming', 'festival_crafting'];
const recipeNames = {
  cooking: ['Suman', 'Bibingka', 'Grilled Fish', 'Coconut Rice', 'Healing Soup'],
  herbalism: ['Antidote Leaf Paste', 'Burn Salve', 'Spirit Fever Tea', 'Sleep Remedy'],
  forging: ['Bolo', 'Kampilan', 'Kris', 'Barong', 'Spear Tip'],
  ritual: ['Cleansing Candle', 'Spirit Offering Bowl', 'Anito Memory Charm', 'Moon Thread Binding'],
  enchanting: ['Fire Charm', 'Moon Charm', 'Storm Charm', 'Forest Ward'],
  monster_care: ['Trust Food', 'Calming Incense', 'Habitat Lure', 'Offering Bundle'],
};
const stationTypes = ['hearth', 'herbal_table', 'forge', 'loom', 'carving_bench', 'alchemy_pot', 'ritual_mat', 'enchanting_lantern', 'upgrade_anvil', 'talisman_table', 'monster_care_table', 'fishing_dock', 'farm_plot', 'festival_booth'];
const shopTypes = ['general_store', 'blacksmith', 'herbalist', 'food_stall', 'ritual_vendor', 'monster_care', 'fisher_market', 'weaver', 'festival_booth', 'appraiser'];
const regions = ['WREG0001', 'WREG0004', 'WREG0007', 'WREG0012', 'WREG0015'];
const provinces = ['WPROV0001', 'WPROV0002', 'WPROV0003', 'WPROV0004', 'WPROV0005'];

const recipeCategories = craftingTypes.map((type, index) => ({
  category_id: `RCAT${String(index + 1).padStart(4, '0')}`,
  name: title(type),
  slug: type.replaceAll('_', '-'),
  recipe_type: type,
  description: `${title(type)} recipes for ALAMAT crafting and economy systems.`,
  icon_hint: ['utensils', 'leaf', 'hammer', 'scissors', 'knife', 'flask', 'sparkles'][index % 7],
  color_hint: ['#D6A85C', '#22C55E', '#64748B', '#A78BFA', '#F59E0B'][index % 5],
  sort_order: index + 1,
  is_active: true,
}));

const stations = Array.from({ length: 56 }, (_, index) => {
  const type = craftingTypes[index % craftingTypes.length];
  return {
    station_id: `CST${String(index + 1).padStart(5, '0')}`,
    name: `${title(type)} Station ${Math.floor(index / craftingTypes.length) + 1}`,
    slug: slugify(`${type}-station-${index + 1}`),
    station_type: stationTypes[index % stationTypes.length],
    location_id: `WLOC${String((index % 170) + 1).padStart(6, '0')}`,
    npc_id: `NPC${String((index % 1000) + 1).padStart(6, '0')}`,
    description: `Crafting station for ${title(type)} recipes.`,
    required_quest_id: index % 9 === 0 ? `QST${String((index % 260) + 1).padStart(6, '0')}` : null,
    icon_filename: `station_CST${String(index + 1).padStart(5, '0')}_${type}.png`,
    is_active: true,
  };
});

const recipes = [];
const ingredients = [];
const recipeCount = 168;
for (let i = 1; i <= recipeCount; i++) {
  const type = craftingTypes[(i - 1) % craftingTypes.length];
  const baseNames = recipeNames[type] ?? [`${title(type)} Work`, `${title(type)} Bundle`, `${title(type)} Kit`];
  const base = baseNames[(i - 1) % baseNames.length];
  const name = `${base} ${Math.floor((i - 1) / baseNames.length) + 1}`;
  const recipeId = `RCPJ${String(i).padStart(6, '0')}`;
  const outputEquipment = ['forging', 'equipment_upgrade', 'enchanting', 'talisman_making'].includes(type);
  const ingredientRows = [0, 1, 2].map((offset) => ({
    ingredient_id: `RING${String(i).padStart(6, '0')}${offset}`,
    recipe_id: recipeId,
    ingredient_type: offset === 2 && outputEquipment ? 'equipment' : 'item',
    item_id: offset === 2 && outputEquipment ? null : `ITM${String(((i + offset) % 1075) + 1).padStart(6, '0')}`,
    equipment_id: offset === 2 && outputEquipment ? `EQP${String((i % 650) + 1).padStart(6, '0')}` : null,
    quantity: 1 + offset,
    consume_on_use: true,
    condition_payload: { quality: offset === 0 ? 'any' : 'standard' },
  }));
  ingredients.push(...ingredientRows);
  recipes.push({
    recipe_id: recipeId,
    slug: slugify(`${name}-${recipeId}`),
    name,
    recipe_type: type,
    category: type.replaceAll('_', '-'),
    output_type: outputEquipment ? 'equipment' : 'item',
    output_item_id: outputEquipment ? null : `ITM${String((i % 1075) + 1).padStart(6, '0')}`,
    output_equipment_id: outputEquipment ? `EQP${String((i % 650) + 1).padStart(6, '0')}` : null,
    output_quantity: outputEquipment ? 1 : 2 + (i % 3),
    required_station_id: stations[(i - 1) % stations.length].station_id,
    required_level: i % 5 === 0 ? 10 + (i % 20) : null,
    required_npc_id: i % 6 === 0 ? `NPC${String((i % 1000) + 1).padStart(6, '0')}` : null,
    required_quest_id: i % 11 === 0 ? `QST${String((i % 260) + 1).padStart(6, '0')}` : null,
    required_weather: i % 8 === 0 ? 'Rain' : null,
    required_location_id: i % 7 === 0 ? `WLOC${String((i % 170) + 1).padStart(6, '0')}` : null,
    ingredients_payload: ingredientRows.map(({ ingredient_type, item_id, equipment_id, quantity }) => ({ ingredient_type, item_id, equipment_id, quantity })),
    success_rate: Number((0.72 + (i % 20) / 100).toFixed(2)),
    gold_cost: 10 + i * 2,
    time_cost: 2 + (i % 12),
    experience_reward: 5 + (i % 25),
    description: `${name} is a ${title(type)} recipe for ALAMAT's crafting and economy system.`,
    lore: `A fictional ALAMAT recipe rooted in community craft, travel preparation, and respectful Filipino fantasy motifs.`,
    icon_filename: `recipe_${recipeId}_${slugify(name)}.png`,
    is_active: true,
  });
}

const vendorProfiles = Array.from({ length: 80 }, (_, index) => ({
  vendor_profile_id: `VEND${String(index + 1).padStart(5, '0')}`,
  npc_id: `NPC${String((index % 1000) + 1).padStart(6, '0')}`,
  profile_name: `Vendor Profile ${index + 1}`,
  specialty: shopTypes[index % shopTypes.length],
  pricing_personality: ['fair', 'strict', 'generous', 'barter_first'][index % 4],
  haggle_difficulty: 1 + (index % 5),
  relationship_discount_payload: { Friend: 0.95, Mentor: 0.9 },
  is_active: true,
}));

const shops = Array.from({ length: 80 }, (_, index) => {
  const shopType = shopTypes[index % shopTypes.length];
  return {
    shop_id: `SHOPJ${String(index + 1).padStart(5, '0')}`,
    name: `${title(shopType)} ${index + 1}`,
    slug: slugify(`${shopType}-${index + 1}`),
    shop_type: shopType,
    npc_id: vendorProfiles[index].npc_id,
    location_id: `WLOC${String((index % 170) + 1).padStart(6, '0')}`,
    faction_id: index % 5 === 0 ? `NPCF${String((index % 15) + 1).padStart(4, '0')}` : null,
    description: `Economy shop for ${title(shopType)} goods.`,
    opening_hours_payload: { open: '08:00', close: index % 4 === 0 ? '22:00' : '18:00', closed_days: [] },
    reputation_requirement: index % 6 === 0 ? 10 : null,
    relationship_requirement: index % 7 === 0 ? 'Acquaintance' : null,
    currency_id: currencies[index % currencies.length].currency_id,
    price_modifier_payload: { base: 1, weather: index % 3 === 0 ? { Rain: 1.1 } : {}, festival: index % 9 === 0 ? 0.9 : 1 },
    restock_rule_payload: { cadence: index % 2 === 0 ? 'daily' : 'weekly', hour: '06:00' },
    is_active: true,
  };
});

const shopInventories = shops.flatMap((shop, shopIndex) => [0, 1, 2, 3].map((offset) => {
  const equipment = offset === 3 || ['blacksmith', 'weaver', 'appraiser'].includes(shop.shop_type);
  return {
    shop_inventory_id: `SHINV${String(shopIndex + 1).padStart(5, '0')}${offset}`,
    shop_id: shop.shop_id,
    inventory_type: equipment ? 'equipment' : 'item',
    item_id: equipment ? null : `ITM${String(((shopIndex * 4 + offset) % 1075) + 1).padStart(6, '0')}`,
    equipment_id: equipment ? `EQP${String(((shopIndex * 4 + offset) % 650) + 1).padStart(6, '0')}` : null,
    skill_id: null,
    quantity: 2 + offset,
    base_price: 25 + shopIndex * 3 + offset * 10,
    stock_limit: 5 + offset,
    restock_interval: shopIndex % 2 === 0 ? 'daily' : 'weekly',
    condition_payload: { relationship: offset === 3 ? 'Friend' : null },
  };
}));

const regionalPriceModifiers = Array.from({ length: 60 }, (_, index) => ({
  modifier_id: `RPM${String(index + 1).padStart(5, '0')}`,
  region_id: regions[index % regions.length],
  province_id: index % 2 === 0 ? provinces[index % provinces.length] : null,
  location_id: index % 5 === 0 ? `WLOC${String((index % 170) + 1).padStart(6, '0')}` : null,
  category: ['food', 'herb', 'metal', 'ritual', 'monster_drop'][index % 5],
  modifier_payload: { price_multiplier: Number((0.85 + (index % 8) * 0.05).toFixed(2)), reason_code: ['supply', 'festival', 'weather', 'route_danger'][index % 4] },
  reason: 'Generated Phase J regional economy modifier.',
}));

const barterRules = Array.from({ length: 60 }, (_, index) => ({
  barter_id: `BART${String(index + 1).padStart(5, '0')}`,
  npc_id: `NPC${String((index % 1000) + 1).padStart(6, '0')}`,
  faction_id: index % 4 === 0 ? `NPCF${String((index % 15) + 1).padStart(4, '0')}` : null,
  offered_payload: { item_id: `ITM${String((index % 1075) + 1).padStart(6, '0')}`, quantity: 2 },
  requested_payload: { item_id: `ITM${String(((index + 12) % 1075) + 1).padStart(6, '0')}`, quantity: 1 },
  condition_payload: { relationship_min: index % 3 === 0 ? 'Friend' : 'Acquaintance' },
  success_modifier_payload: { reputation_bonus: 0.05, faction_bonus: index % 4 === 0 ? 0.1 : 0 },
}));

const tradeRoutes = Array.from({ length: 50 }, (_, index) => ({
  route_id: `TRAD${String(index + 1).padStart(5, '0')}`,
  origin_location_id: `WLOC${String((index % 170) + 1).padStart(6, '0')}`,
  destination_location_id: `WLOC${String(((index + 17) % 170) + 1).padStart(6, '0')}`,
  goods_payload: { categories: ['food', 'herb', 'metal', 'ritual'][index % 4], volume: 10 + index },
  risk_level: ['low', 'medium', 'high'][index % 3],
  travel_time: 30 + index * 5,
  price_effect_payload: { category: ['food', 'herb', 'metal', 'ritual'][index % 4], multiplier: Number((0.95 + (index % 5) * 0.08).toFixed(2)) },
  condition_payload: { weather_sensitive: index % 4 === 0 },
}));

const festivalMarkets = Array.from({ length: 20 }, (_, index) => ({
  festival_market_id: `FMKT${String(index + 1).padStart(5, '0')}`,
  name: `Festival Market ${index + 1}`,
  slug: slugify(`festival-market-${index + 1}`),
  location_id: `WLOC${String((index % 170) + 1).padStart(6, '0')}`,
  currency_id: 'CUR0006',
  schedule_payload: { season: ['dry', 'rainy', 'spirit'][index % 3], days: 3 + (index % 5) },
  featured_goods_payload: { recipe_type: craftingTypes[index % craftingTypes.length], discount: 0.85 },
  condition_payload: { quest_flag: index % 4 === 0 ? `festival_${index + 1}` : null },
  is_active: true,
}));

const economyEvents = Array.from({ length: 40 }, (_, index) => ({
  economy_event_id: `ECON${String(index + 1).padStart(5, '0')}`,
  name: `Economy Event ${index + 1}`,
  event_type: ['supply_shortage', 'festival_discount', 'monster_outbreak', 'route_danger'][index % 4],
  region_id: regions[index % regions.length],
  location_id: index % 3 === 0 ? `WLOC${String((index % 170) + 1).padStart(6, '0')}` : null,
  trigger_payload: { weather: index % 4 === 0 ? 'Storm' : null, quest_state: null },
  effect_payload: { category: ['food', 'herb', 'metal', 'ritual'][index % 4], multiplier: Number((0.8 + (index % 6) * 0.1).toFixed(2)) },
  is_active: true,
}));

const assetPrompts = [
  ...recipes.map((recipe) => ({ asset_prompt_id: `EAP-${recipe.recipe_id}`, object_type: 'recipe', object_id: recipe.recipe_id, name: recipe.name, icon_filename: recipe.icon_filename, asset_prompt: iconPrompt(recipe.name, recipe.recipe_type, recipe.category, 'crafted output with Filipino fantasy materials') })),
  ...currencies.map((currency) => ({ asset_prompt_id: `EAP-${currency.currency_id}`, object_type: 'currency', object_id: currency.currency_id, name: currency.name, icon_filename: currency.icon_filename, asset_prompt: iconPrompt(currency.name, 'currency', 'economy', 'coin, token, bead, or scrip silhouette') })),
  ...stations.map((station) => ({ asset_prompt_id: `EAP-${station.station_id}`, object_type: 'station', object_id: station.station_id, name: station.name, icon_filename: station.icon_filename, asset_prompt: iconPrompt(station.name, station.station_type, 'crafting_station', 'workbench or station silhouette') })),
];

write('currencies.json', currencies);
write('crafting_stations.json', stations);
write('recipe_categories.json', recipeCategories);
write('recipes.json', recipes);
write('recipe_ingredients.json', ingredients);
write('shop_types.json', shopTypes.map((type, index) => ({ shop_type_id: `STYPE${String(index + 1).padStart(4, '0')}`, code: type, name: title(type), slug: type.replaceAll('_', '-'), description: `${title(type)} shop type.`, sort_order: index + 1, is_active: true })));
write('shops.json', shops);
write('shop_inventories.json', shopInventories);
write('vendor_profiles.json', vendorProfiles);
write('regional_price_modifiers.json', regionalPriceModifiers);
write('barter_rules.json', barterRules);
write('trade_routes.json', tradeRoutes);
write('festival_markets.json', festivalMarkets);
write('economy_events.json', economyEvents);
write('economy_asset_prompts.json', assetPrompts);

function iconPrompt(name, type, category, visual) {
  return `Create a clean 2D RPG icon for ALAMAT.\n\nObject: ${name}\nType: ${type}\nCategory: ${category}\n\nStyle:\nFilipino fantasy RPG.\nReadable at 32x32 and 64x64.\nTransparent background.\nNo text.\nNo UI.\nStrong silhouette.\n\nVisual concept:\n${visual}.`;
}

function title(value) {
  return value.replaceAll('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');
}

function write(filename, payload) {
  fs.mkdirSync(dataRoot, { recursive: true });
  fs.writeFileSync(path.join(dataRoot, filename), `${JSON.stringify(payload, null, 2)}\n`);
}
