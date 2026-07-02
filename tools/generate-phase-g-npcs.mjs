import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataRoot = path.join(root, 'database', 'data', 'npcs');

const categories = [
  ['NPCC0001', 'Story', 'story', 'Story-critical NPCs.'],
  ['NPCC0002', 'Village', 'village', 'Settlement residents and local flavor NPCs.'],
  ['NPCC0003', 'Merchant', 'merchant', 'Vendors and trade NPCs.'],
  ['NPCC0004', 'Trainer', 'trainer', 'Skill, bonding, recipe, and combat teachers.'],
  ['NPCC0005', 'Crafter', 'crafter', 'Blacksmiths, artisans, cooks, and makers.'],
  ['NPCC0006', 'Religious', 'religious', 'Shrine, church, mosque, and ritual leaders.'],
  ['NPCC0007', 'Government', 'government', 'Datu, rajah, sultanate, council, and civic figures.'],
  ['NPCC0008', 'Military', 'military', 'Guards, captains, scouts, and patrol figures.'],
  ['NPCC0009', 'Scholar', 'scholar', 'Researchers, librarians, historians, and teachers.'],
  ['NPCC0010', 'Wandering', 'wandering', 'Traveling NPCs and road encounters.'],
  ['NPCC0011', 'Child', 'child', 'Young settlement NPCs.'],
  ['NPCC0012', 'Elder', 'elder', 'Elders and memory keepers.'],
  ['NPCC0013', 'Companion', 'companion', 'Recruitable companions.'],
  ['NPCC0014', 'Boss', 'boss', 'Narrative rivals and boss-adjacent figures.'],
  ['NPCC0015', 'Festival', 'festival', 'Festival hosts and seasonal NPCs.'],
];

const roles = [
  'Quest Giver', 'Shopkeeper', 'Healer', 'Blacksmith', 'Monster Researcher', 'Babaylan', 'Catalonan', 'Priest', 'Imam', 'Datu', 'Rajah', 'Sultan', 'Captain', 'Farmer', 'Fisher', 'Hunter', 'Herbalist', 'Librarian', 'Historian', 'Musician', 'Treasure Hunter', 'Courier', 'Teacher', 'Judge', 'Elder', 'Shrine Keeper', 'Stable Keeper', 'Cook', 'Navigator', 'Festival Host',
].map((name, index) => makeLookup('NPCR', index + 1, name, `${name} role hooks for dialogue, services, and quests.`));

const professions = [
  'Rice Farmer', 'Fisher', 'Boatwright', 'Weaver', 'Blacksmith', 'Herbalist', 'Healer', 'Babaylan', 'Catalonan', 'Priest', 'Imam', 'Archivist', 'Monster Ecologist', 'Guard Captain', 'Courier', 'Cook', 'Pearl Diver', 'Brass Artisan', 'Teacher', 'Trader', 'Hunter', 'Musician', 'Judge', 'Shrine Tender', 'Mapmaker', 'Festival Organizer',
].map((name, index) => makeLookup('NPCP', index + 1, name, `${name} profession metadata for schedules and services.`));

const factions = [
  'Babaylan Circle', 'Catalonan Council', 'Mountain Guardians', 'Diwata Court', 'Church Order', 'Sultanate Council', 'Rajahnate Alliance', 'Treasure Hunters Guild', 'Monster Researchers', 'Forest Keepers', 'Coral Wardens', 'Bakunawa Cult', 'Merchant League', 'River Ferry Union', 'Kapuluan Archives',
].map((name, index) => ({
  faction_id: `NPCF${String(index + 1).padStart(4, '0')}`,
  name,
  slug: slugify(name),
  description: `${name} is a fictional ALAMAT faction that can drive reputation, shops, quests, and relationship gates.`,
  reputation_scope: index % 3 === 0 ? 'regional' : 'world',
  icon_hint: ['leaf', 'scroll', 'mountain', 'sparkles', 'cross', 'moon', 'crown', 'gem', 'book', 'tree', 'waves', 'eye', 'coins', 'ship', 'archive'][index],
  color_hint: ['#2F855A', '#D6A85C', '#64748B', '#F472B6', '#E5E7EB', '#38BDF8', '#F59E0B', '#A78BFA', '#60A5FA', '#22C55E', '#06B6D4', '#7F1D1D', '#FACC15', '#0EA5E9', '#94A3B8'][index],
  is_active: true,
}));

const personalities = ['Cheerful', 'Serious', 'Wise', 'Reserved', 'Proud', 'Brave', 'Cowardly', 'Curious', 'Mischievous', 'Compassionate', 'Stoic', 'Ambitious', 'Spiritual', 'Scholarly', 'Humble', 'Protective', 'Competitive'].map((name, index) => ({
  personality_id: `NPCPER${String(index + 1).padStart(4, '0')}`,
  name,
  slug: slugify(name),
  description: `${name} NPCs modify dialogue tone, schedule priorities, quest behavior, reactions, and friendship gain.`,
  dialogue_modifier: slugify(name),
  friendship_modifier: Number((0.85 + (index % 6) * 0.05).toFixed(2)),
  schedule_modifier: index % 2 === 0 ? 'community_first' : 'work_first',
  reaction_tags: [slugify(name), index % 2 === 0 ? 'warm' : 'measured'],
  is_active: true,
}));

const relationshipLevels = ['Stranger', 'Acquaintance', 'Trusted', 'Friend', 'Close Friend', 'Family', 'Mentor', 'Rival', 'Companion', 'Soul Bond'].map((name, index) => ({
  relationship_level_id: `NPCRL${String(index + 1).padStart(4, '0')}`,
  name,
  slug: slugify(name),
  min_points: index * 100,
  max_points: index === 9 ? 9999 : (index + 1) * 100 - 1,
  price_modifier: Number((1 - Math.min(index, 6) * 0.03).toFixed(2)),
  gift_modifier: Number((1 + index * 0.05).toFixed(2)),
  dialogue_unlocks: [`relationship_${slugify(name)}`],
  is_active: true,
}));

const categoryTargets = [
  ['Story', 100], ['Village', 200], ['Merchant', 100], ['Trainer', 80], ['Crafter', 100], ['Religious', 50], ['Scholar', 50], ['Government', 100], ['Wandering', 200], ['Companion', 20],
];

const regions = ['Luzon', 'Visayas', 'Mindanao', 'Kapuluan', 'Spirit Realm'];
const provinces = ['Laguna', 'Cebu', 'Davao', 'Palawan', 'Iloilo', 'Sulu', 'Benguet', 'Bohol', 'Samar', 'Aklan'];
const hometowns = ['Balete Grove', 'Pearl Ford', 'Talisay Crossing', 'Manggahan Port', 'Luntian Ridge', 'Moonwell Quarter', 'Coral Gate', 'Old Archive Ward'];
const firstNames = ['Amaya', 'Datu', 'Lira', 'Bayani', 'Mayumi', 'Makisig', 'Hiraya', 'Tala', 'Kidlat', 'Mutya', 'Sinag', 'Lakan', 'Ligaya', 'Habagat', 'Marikit', 'Alon', 'Diwa', 'Sari', 'Tandang', 'Isagani'];
const lastNames = ['Balagtas', 'Magsalin', 'Dimalanta', 'Lakandula', 'Silangan', 'Kalaw', 'Mabini', 'Bagwis', 'Makiling', 'Sikatuna', 'Banaag', 'Tagapulo', 'Salcedo', 'Dalisay', 'Agbayani'];
const languages = ['Tagalog', 'Cebuano', 'Ilokano', 'Hiligaynon', 'Bikol', 'Kapampangan', 'Waray', 'Maguindanaon', 'Tausug', 'Fictional trade creole'];
const faiths = ['Anito reverence', 'Babaylan practice', 'Catalonan rites', 'Catholic folk devotion', 'Islamic community tradition', 'Civic ancestor remembrance', 'Diwata oath practice', 'Mixed local observance'];
const serviceTypes = ['Shop', 'Blacksmith', 'Crafter', 'Healer', 'Trainer', 'Monster Stable', 'Capture Expert', 'Appraiser', 'Banker', 'Courier', 'Inn', 'Food Stall', 'Museum', 'Library', 'Shrine', 'Church', 'Mosque', 'Festival Booth'];
const lessonTypes = ['Skills', 'Passives', 'Recipes', 'Crafting', 'Cooking', 'Monster Bonding', 'Capture Techniques', 'Lore'];

let npcIndex = 1;
const npcs = [];
const dialogues = [];
const conditions = [];
const schedules = [];
const locations = [];
const services = [];
const shops = [];
const inventory = [];
const quests = [];
const training = [];
const portraits = [];
const voices = [];
const assetPrompts = [];
const ambientTemplates = [];

for (const [categoryName, count] of categoryTargets) {
  for (let i = 0; i < count; i++) {
    const npc = makeNpc(npcIndex++, categoryName, i);
    npcs.push(npc);
    locations.push(makeLocation(npc));
    schedules.push(makeSchedule(npc));
    dialogues.push(makeDialogue(npc));
    conditions.push(makeCondition(npc));
    portraits.push(makePortrait(npc));
    voices.push(makeVoice(npc));
    assetPrompts.push(makeAssetPrompts(npc));
    quests.push(...makeQuests(npc));
    if (npc.service_id) services.push(makeService(npc));
    if (npc.shop_id) {
      shops.push(makeShop(npc));
      inventory.push(...makeInventory(npc));
    }
    if (npc.trainer_id) training.push(...makeTraining(npc));
  }
}

for (let i = 1; i <= 2000; i++) {
  ambientTemplates.push({
    ambient_id: `AMBNPC${String(i).padStart(6, '0')}`,
    archetype: ['Market Visitor', 'Road Traveler', 'Festival Guest', 'Shrine Attendant', 'Harbor Worker', 'Student', 'Patrol Scout', 'Farmhand'][i % 8],
    region: regions[i % regions.length],
    settlement_type: ['village', 'port', 'highland', 'forest_edge', 'city_quarter'][i % 5],
    role_tag: ['civilian', 'worker', 'pilgrim', 'vendor', 'traveler', 'guard'][i % 6],
    schedule_payload: {
      morning: ['walk_market', 'work_field', 'travel_road'][i % 3],
      afternoon: ['rest', 'trade', 'gossip'][i % 3],
      evening: ['return_home', 'festival_walk', 'worship'][i % 3],
    },
    dialogue_pool: [
      'The road feels different when the weather turns.',
      'A good promise is remembered longer than a loud boast.',
      'Keep an eye on your bonded Nilalang near crowded paths.',
    ],
    spawn_rules: { max_per_area: 3 + (i % 5), weather: i % 6 === 0 ? ['Rain'] : [], festival_weight: i % 4 === 0 ? 2 : 1 },
    asset_prompt: `Create a simple top-down ambient NPC sprite for ALAMAT. Archetype: unnamed ${['Market Visitor', 'Road Traveler', 'Festival Guest', 'Shrine Attendant', 'Harbor Worker', 'Student', 'Patrol Scout', 'Farmhand'][i % 8]}. Region: ${regions[i % regions.length]}. Transparent background, readable at 32x32, Filipino fantasy town clothing, no text.`,
    is_active: true,
  });
}

write('npc_categories.json', categories.map(([category_id, name, slug, description], index) => ({ category_id, name, slug, description, icon_hint: iconFor(name), color_hint: colorFor(index), sort_order: index + 1, is_active: true })));
write('npc_roles.json', roles);
write('npc_professions.json', professions);
write('npc_factions.json', factions);
write('npc_personalities.json', personalities);
write('npc_relationship_levels.json', relationshipLevels);
write('npc_dialogues.json', dialogues);
write('npc_dialogue_conditions.json', conditions);
write('npc_schedules.json', schedules);
write('npc_locations.json', locations);
write('npc_services.json', services);
write('npc_shops.json', shops);
write('npc_inventory.json', inventory);
write('npc_quests.json', quests);
write('npc_training.json', training);
write('npc_portraits.json', portraits);
write('npc_voice_profiles.json', voices);
write('npc_asset_prompts.json', assetPrompts);
write('npc_ambient_templates.json', ambientTemplates);
write('npcs.json', npcs);

function makeNpc(index, categoryName, localIndex) {
  const npcId = `NPC${String(index).padStart(6, '0')}`;
  const first = firstNames[index % firstNames.length];
  const last = lastNames[(index + localIndex) % lastNames.length];
  const role = roleFor(categoryName, index);
  const profession = professionFor(categoryName, index);
  const faction = factions[index % factions.length];
  const region = regions[index % regions.length];
  const category = categories.find(([, name]) => name === categoryName);
  const fullName = `${first} ${last}`;
  const slug = slugify(`${fullName}-${npcId}`);
  const isCompanion = categoryName === 'Companion' || (categoryName === 'Story' && localIndex % 25 === 0);
  const isShopkeeper = categoryName === 'Merchant' || ['Shopkeeper', 'Healer', 'Blacksmith'].includes(role.name);
  const isTrainer = categoryName === 'Trainer' || role.name === 'Teacher';
  const service = serviceFor(role.name, profession.name, categoryName);

  return {
    npc_id: npcId,
    slug,
    first_name: first,
    last_name: last,
    full_name: fullName,
    nickname: localIndex % 9 === 0 ? `${first} of ${hometowns[index % hometowns.length]}` : null,
    title: titleFor(role.name, categoryName),
    category_id: category[0],
    role_id: role.role_id,
    profession_id: profession.profession_id,
    faction_id: faction.faction_id,
    region,
    province: provinces[index % provinces.length],
    hometown: hometowns[index % hometowns.length],
    age_group: ['Young Adult', 'Adult', 'Middle Age', 'Elder'][index % 4],
    gender: ['Female', 'Male', 'Nonbinary'][index % 3],
    personality_id: personalities[index % personalities.length].personality_id,
    relationship_level_id: relationshipLevels[index % relationshipLevels.length].relationship_level_id,
    portrait_filename: `portrait_${npcId}_${slug}.png`,
    overworld_sprite: `sprite_${npcId}_${slug}.png`,
    battle_sprite: isCompanion ? `battle_${npcId}_${slug}.png` : null,
    voice_profile_id: `NPCV${String(index).padStart(6, '0')}`,
    biography: `${fullName} is a ${profession.name.toLowerCase()} from ${hometowns[index % hometowns.length]}, designed as a data-driven ALAMAT NPC for future quests, services, schedules, and relationship events.`,
    cultural_background: `Fictional ALAMAT synthesis rooted in ${region} community life and respectful Filipino fantasy motifs.`,
    language: languages[index % languages.length],
    faith_tradition: faiths[index % faiths.length],
    reputation: (index % 21) - 5,
    friendship_points: (index * 13) % 900,
    trust_points: (index * 17) % 700,
    romance_allowed: index % 37 === 0,
    recruitable: isCompanion,
    companion_unlock: isCompanion ? `Complete ${npcId}-bond-quest and reach Friend.` : null,
    shop_id: isShopkeeper ? `NPCSHOP${String(index).padStart(6, '0')}` : null,
    trainer_id: isTrainer ? `NPCTRN${String(index).padStart(6, '0')}` : null,
    service_id: service ? `NPCSVC${String(index).padStart(6, '0')}` : null,
    schedule_id: `NPCSCH${String(index).padStart(6, '0')}`,
    dialogue_root_id: `NPCDIA${String(index).padStart(6, '0')}`,
    location_id: `NPCLOC${String(index).padStart(6, '0')}`,
    availability_payload: {
      story_chapter_min: index % 8,
      faction_reputation_min: index % 5 === 0 ? 10 : 0,
      festival_only: categoryName === 'Festival',
      weather_tags: index % 6 === 0 ? ['Rain'] : [],
    },
    notes: 'Generated Phase G seed NPC; review culturally specific names before final narrative use.',
    is_active: true,
  };
}

function makeLocation(npc) {
  return {
    location_id: npc.location_id,
    npc_id: npc.npc_id,
    name: `${npc.hometown} ${npc.role_id.endsWith('0002') ? 'Market' : 'Commons'}`,
    region: npc.region,
    province: npc.province,
    settlement: npc.hometown,
    map_key: slugify(`${npc.hometown}-${npc.region}`),
    x: (Number(npc.npc_id.slice(-3)) * 7) % 100,
    y: (Number(npc.npc_id.slice(-3)) * 11) % 100,
    description: `Default location hook for ${npc.full_name}.`,
  };
}

function makeSchedule(npc) {
  return {
    schedule_id: npc.schedule_id,
    npc_id: npc.npc_id,
    timezone: 'Asia/Manila',
    morning: block('06:00', '10:59', 'workplace', npc.location_id),
    afternoon: block('11:00', '16:59', npc.shop_id ? 'marketplace' : 'community', npc.location_id),
    evening: block('17:00', '20:59', 'home', npc.location_id),
    night: block('21:00', '23:59', 'resting', npc.location_id),
    late_night: block('00:00', '05:59', 'home', npc.location_id),
    festival_schedule: [block('09:00', '22:00', 'festival_booth', npc.location_id)],
    emergency_schedule: [block('00:00', '23:59', 'evacuation_point', npc.location_id)],
    weather_schedule: [{ weather: 'Rain', ...block('08:00', '18:00', 'covered_walkway', npc.location_id) }],
    story_progress_schedule: [{ chapter: npc.availability_payload.story_chapter_min, ...block('08:00', '18:00', 'story_marker', npc.location_id) }],
    route_payload: { walking_route: [`${npc.location_id}:home`, `${npc.location_id}:work`, `${npc.location_id}:commons`] },
    is_active: true,
  };
}

function makeDialogue(npc) {
  return {
    dialogue_id: npc.dialogue_root_id,
    npc_id: npc.npc_id,
    root_key: 'default',
    title: `${npc.full_name} Default Dialogue`,
    nodes: [
      { id: 'greeting', text: `May your path stay balanced, traveler. I am ${npc.full_name}.`, next: ['weather', 'relationship'] },
      { id: 'weather', text: 'The day changes the work, but not the work of keeping community whole.', next: [] },
      { id: 'relationship', text: 'Trust is built by returning, listening, and keeping promises.', next: [] },
    ],
    fallback_line: `Safe roads to you from ${npc.hometown}.`,
    is_active: true,
  };
}

function makeCondition(npc) {
  return {
    condition_id: `NPCCOND${npc.npc_id.slice(3)}`,
    dialogue_id: npc.dialogue_root_id,
    npc_id: npc.npc_id,
    condition_payload: {
      weather: npc.availability_payload.weather_tags,
      relationship_level: 'Acquaintance',
      player_reputation_min: npc.availability_payload.faction_reputation_min,
      story_chapter_min: npc.availability_payload.story_chapter_min,
      player_affiliation: null,
    },
    priority: Number(npc.npc_id.slice(-3)) % 10,
  };
}

function makeService(npc) {
  const type = serviceFor(npc.role_id, npc.profession_id, '');
  return {
    service_id: npc.service_id,
    npc_id: npc.npc_id,
    service_type: serviceTypes[Number(npc.npc_id.slice(-2)) % serviceTypes.length],
    name: `${npc.full_name} Service`,
    opening_hours: { open: '08:00', close: '18:00', closed_days: Number(npc.npc_id.slice(-2)) % 7 === 0 ? ['Festival Eve'] : [] },
    pricing_payload: { base_modifier: 1, relationship_discount: 0.03, faction_discount: 0.02 },
    requirements_payload: npc.availability_payload,
    relationship_modifiers: { Friend: 0.9, Mentor: 0.85, Rival: 1.1 },
    is_active: true,
  };
}

function makeShop(npc) {
  return {
    shop_id: npc.shop_id,
    npc_id: npc.npc_id,
    name: `${npc.full_name}'s Stall`,
    shop_type: npc.role_id.includes('0003') ? 'healer' : 'general',
    refresh_rule: { cadence: 'daily', hour: '06:00', seasonal_overrides: true },
    currency_type: 'gold',
    inventory_rule_payload: { rarity_cap: 'Rare', faction_bonus: npc.faction_id, relationship_unlocks: ['Friend', 'Mentor'] },
    is_active: true,
  };
}

function makeInventory(npc) {
  return [0, 1, 2].map((offset) => ({
    inventory_id: `NPCINV${npc.npc_id.slice(3)}${offset}`,
    npc_id: npc.npc_id,
    shop_id: npc.shop_id,
    item_id: `ITM${String(((Number(npc.npc_id.slice(3)) + offset) % 1075) + 1).padStart(6, '0')}`,
    equipment_id: offset === 2 ? `EQP${String(((Number(npc.npc_id.slice(3)) + offset) % 650) + 1).padStart(6, '0')}` : null,
    monster_id: null,
    quantity: 1 + offset,
    price_modifier: 1 + offset * 0.1,
    refresh_rule: { cadence: 'daily', stock_min: 1, stock_max: 4 },
    is_active: true,
  }));
}

function makeQuests(npc) {
  if (Number(npc.npc_id.slice(-2)) % 3 !== 0) return [];
  return [{
    npc_quest_id: `NPCQ${npc.npc_id.slice(3)}`,
    npc_id: npc.npc_id,
    quest_id: `QST${String(Number(npc.npc_id.slice(3))).padStart(5, '0')}`,
    quest_role: ['start', 'continue', 'finish', 'unlock'][Number(npc.npc_id.slice(-1)) % 4],
    quest_type: ['story', 'daily', 'hidden', 'seasonal'][Number(npc.npc_id.slice(-1)) % 4],
    requirements_payload: npc.availability_payload,
    rewards_payload: { friendship_points: 25, faction_reputation: 5 },
    is_repeatable: Number(npc.npc_id.slice(-1)) % 2 === 0,
  }];
}

function makeTraining(npc) {
  return [0, 1].map((offset) => ({
    training_id: `NPCTRAIN${npc.npc_id.slice(3)}${offset}`,
    npc_id: npc.npc_id,
    trainer_id: npc.trainer_id,
    lesson_type: lessonTypes[(Number(npc.npc_id.slice(-2)) + offset) % lessonTypes.length],
    lesson_key: `lesson_${slugify(npc.full_name)}_${offset + 1}`,
    teaches_payload: { skill_id: `SKL-EQP-${String((Number(npc.npc_id.slice(3)) % 650) + 1).padStart(4, '0')}`, recipe_id: offset === 1 ? `RCP${String(offset + 1).padStart(6, '0')}` : null },
    requirements_payload: { friendship_points: 100 + offset * 150, gold: 50 + offset * 75, required_item_id: offset === 1 ? 'ITM000001' : null },
    cost_payload: { gold: 50 + offset * 75, offerings: [] },
    is_active: true,
  }));
}

function makePortrait(npc) {
  return {
    portrait_id: `NPCPOR${npc.npc_id.slice(3)}`,
    npc_id: npc.npc_id,
    portrait_filename: npc.portrait_filename,
    bust_filename: `bust_${npc.npc_id}_${npc.slug}.png`,
    emotion_sheet_filename: `emotions_${npc.npc_id}_${npc.slug}.png`,
    style_notes: 'Semi-realistic painterly Filipino fantasy RPG portrait with profession tools and warm natural colors.',
  };
}

function makeVoice(npc) {
  return {
    voice_profile_id: npc.voice_profile_id,
    npc_id: npc.npc_id,
    voice_type: ['warm', 'clear', 'raspy', 'soft', 'commanding'][Number(npc.npc_id.slice(-1)) % 5],
    accent: `${npc.region} fictional local cadence`,
    speaking_speed: ['slow', 'measured', 'lively'][Number(npc.npc_id.slice(-1)) % 3],
    vocabulary: ['plainspoken', 'formal', 'poetic', 'technical'][Number(npc.npc_id.slice(-1)) % 4],
    catchphrases: [`From ${npc.hometown}, we remember.`, 'Balance first.'],
    emotional_range: ['gentle', 'expressive', 'reserved', 'dramatic'][Number(npc.npc_id.slice(-1)) % 4],
    battle_callouts: npc.recruitable ? ['Stand with me!', 'Guard the bond!'] : [],
    greeting_style: ['nod', 'bow', 'wave', 'salute'][Number(npc.npc_id.slice(-1)) % 4],
  };
}

function makeAssetPrompts(npc) {
  const profession = professions.find((item) => item.profession_id === npc.profession_id)?.name ?? 'Community Worker';
  const role = roles.find((item) => item.role_id === npc.role_id)?.name ?? 'Resident';
  const portraitPrompt = `Create a detailed fantasy RPG portrait for ALAMAT.\n\nNPC Name: ${npc.full_name}\nRole: ${role}\nRegion: ${npc.region}\nProfession: ${profession}\n\nStyle:\nSemi-realistic painterly fantasy.\nFilipino-inspired clothing.\nRespect regional traditions.\nWarm natural colors.\nNo text.\nStrong facial expression.\nInclude profession tools.`;
  const spritePrompt = `Create a top-down RPG sprite for ${npc.full_name}. Readable at 32x32 and 64x64. Transparent background. Strong silhouette. Traditional Filipino fantasy clothing. Profession-specific accessories for ${profession}.`;

  return {
    asset_prompt_id: `NPCASSET${npc.npc_id.slice(3)}`,
    npc_id: npc.npc_id,
    portrait_filename: npc.portrait_filename,
    overworld_sprite: npc.overworld_sprite,
    battle_sprite: npc.battle_sprite,
    bust_filename: `bust_${npc.npc_id}_${npc.slug}.png`,
    emotion_sheet_filename: `emotions_${npc.npc_id}_${npc.slug}.png`,
    portrait_prompt: portraitPrompt,
    overworld_sprite_prompt: spritePrompt,
    battle_sprite_prompt: npc.battle_sprite ? `Create a combat-ready RPG battle sprite for ${npc.full_name}, role ${role}, with readable silhouette and no text.` : null,
    bust_prompt: `${portraitPrompt}\n\nCrop as a bust illustration suitable for dialogue UI.`,
    emotion_sheet_prompt: `Generate emotion sheet prompts for ${npc.full_name}: Happy, Sad, Angry, Thinking, Laughing, Shocked, Determined, Prayer, Celebration, Combat Ready.`,
    voice_description_prompt: `Describe the voice for ${npc.full_name}: type, accent, speaking speed, vocabulary, catchphrases, emotional range, battle callouts, and greeting style.`,
    design_notes: 'Use fictional ALAMAT styling and avoid presenting any living tradition as costume-only decoration.',
  };
}

function makeLookup(prefix, index, name, description) {
  return {
    [`${prefix === 'NPCR' ? 'role' : 'profession'}_id`]: `${prefix}${String(index).padStart(4, '0')}`,
    name,
    slug: slugify(name),
    description,
    icon_hint: iconFor(name),
    color_hint: colorFor(index),
    sort_order: index,
    is_active: true,
  };
}

function roleFor(categoryName, index) {
  const byCategory = {
    Story: 'Quest Giver',
    Village: 'Farmer',
    Merchant: 'Shopkeeper',
    Trainer: 'Teacher',
    Crafter: 'Blacksmith',
    Religious: index % 2 === 0 ? 'Babaylan' : 'Imam',
    Scholar: 'Historian',
    Government: 'Datu',
    Wandering: 'Courier',
    Companion: 'Hunter',
  };
  return roles.find((role) => role.name === (byCategory[categoryName] ?? 'Quest Giver')) ?? roles[index % roles.length];
}

function professionFor(categoryName, index) {
  const byCategory = {
    Story: 'Archivist',
    Village: 'Rice Farmer',
    Merchant: 'Trader',
    Trainer: 'Teacher',
    Crafter: 'Blacksmith',
    Religious: 'Shrine Tender',
    Scholar: 'Monster Ecologist',
    Government: 'Judge',
    Wandering: 'Courier',
    Companion: 'Hunter',
  };
  return professions.find((profession) => profession.name === (byCategory[categoryName] ?? 'Teacher')) ?? professions[index % professions.length];
}

function serviceFor() {
  return true;
}

function titleFor(roleName, categoryName) {
  if (categoryName === 'Companion') return 'Companion Candidate';
  if (['Datu', 'Rajah', 'Sultan'].includes(roleName)) return roleName;
  if (roleName === 'Babaylan') return 'Ritual Guide';
  return roleName;
}

function block(start, end, activity, locationId) {
  return { start, end, activity, location_id: locationId };
}

function iconFor(value) {
  if (/shop|merchant|trader/i.test(value)) return 'coins';
  if (/trainer|teacher/i.test(value)) return 'book-open';
  if (/relig|priest|imam|babaylan|catalonan|shrine/i.test(value)) return 'sparkles';
  if (/government|datu|rajah|sultan|judge/i.test(value)) return 'landmark';
  if (/military|captain|guard/i.test(value)) return 'shield';
  return 'user';
}

function colorFor(index) {
  return ['#D6A85C', '#22C55E', '#38BDF8', '#A78BFA', '#F472B6', '#F59E0B', '#94A3B8'][index % 7];
}

function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');
}

function write(filename, payload) {
  fs.mkdirSync(dataRoot, { recursive: true });
  fs.writeFileSync(path.join(dataRoot, filename), `${JSON.stringify(payload, null, 2)}\n`);
}
