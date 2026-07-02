import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataRoot = path.join(root, 'database', 'data', 'world');

const regionNames = [
  'Ilocos Region', 'Cagayan Valley', 'Central Luzon', 'CALABARZON', 'MIMAROPA', 'Bicol Region', 'Western Visayas', 'Central Visayas', 'Eastern Visayas', 'Zamboanga Peninsula', 'Northern Mindanao', 'Davao Region', 'SOCCSKSARGEN', 'Caraga', 'Bangsamoro', 'Cordillera', 'National Capital Region',
];
const provinceNames = ['Laguna', 'Cebu', 'Davao del Sur', 'Palawan', 'Iloilo', 'Sulu', 'Benguet', 'Bohol', 'Samar', 'Aklan', 'Albay', 'Rizal', 'Bukidnon', 'Agusan del Norte', 'Tawi-Tawi', 'Ifugao', 'Metro Manila'];
const locationTypes = ['region', 'province', 'town', 'barangay', 'route', 'forest', 'mountain', 'cave', 'river', 'lake', 'waterfall', 'shrine', 'chapel', 'church', 'mosque', 'market', 'port', 'beach', 'mangrove', 'coral_reef', 'rice_field', 'volcano', 'ruins', 'dungeon', 'interior', 'spirit_realm', 'boss_arena'];
const weather = ['Clear', 'Rain', 'Storm', 'Mist', 'Moonlit', 'Humid'];
const terrains = ['town_path', 'forest_floor', 'riverbank', 'mountain_trail', 'reef_shallows', 'cave_stone', 'spirit_threshold'];
const monsterPoolSize = 100;

const regions = regionNames.map((name, index) => ({
  region_id: `WREG${String(index + 1).padStart(4, '0')}`,
  name,
  slug: slugify(name),
  description: `${name} is represented as a fictionalized ALAMAT world region for future maps, routes, weather, spawns, and quests.`,
  cultural_notes: 'Use Filipino fantasy inspiration respectfully; review specific cultural details before final narrative use.',
  default_weather: weather[index % weather.length],
  map_icon: `region_${slugify(name)}.png`,
  is_active: true,
}));

const provinces = provinceNames.map((name, index) => ({
  province_id: `WPROV${String(index + 1).padStart(4, '0')}`,
  region_id: regions[index % regions.length].region_id,
  name,
  slug: slugify(name),
  description: `${name} province hook for ALAMAT's regional world map.`,
  cultural_notes: 'Fictional ALAMAT map data; avoid claiming exact real-world geography for gameplay-only locations.',
  is_active: true,
}));

const locations = [];
const basePlaces = [
  ['Starter Barangay', 'barangay', 'safe village paths, homes, shrine corner, rice plots'],
  ['Marketplace', 'market', 'vendor lanes, food stall, blacksmith corner, notice board'],
  ['Chapel Courtyard', 'chapel', 'small chapel, candles, garden path, community benches'],
  ['Balete Forest', 'forest', 'large balete tree, root paths, firefly clearings, hidden shrine'],
  ['River Dock', 'river', 'wood dock, boats, reeds, ferry posts, fishing nets'],
  ['Mountain Pass', 'mountain', 'stone path, cliff edges, watch post, cloud trail'],
  ['Echo Cave Dungeon', 'dungeon', 'cave halls, underground stream, cracked shrine, boss door'],
  ['Coral Reef Route', 'coral_reef', 'shallow reef paths, coral arches, tide pools, watch buoys'],
  ['Spirit Realm Threshold', 'spirit_realm', 'mist gate, floating stones, spirit lanterns, mirrored water'],
  ['Legendary Boss Arena', 'boss_arena', 'wide circular arena, ancient marks, storm sky, ritual stones'],
];

let locationIndex = 1;
for (const province of provinces) {
  for (const [baseName, type, landmarks] of basePlaces) {
    const id = `WLOC${String(locationIndex).padStart(6, '0')}`;
    const region = regions.find((r) => r.region_id === province.region_id);
    const name = `${province.name} ${baseName}`;
    const slug = slugify(`${name}-${id}`);
    locations.push({
      location_id: id,
      slug,
      name,
      location_type: type,
      region_id: region.region_id,
      province_id: province.province_id,
      parent_location_id: null,
      description: `${name} is a ${type.replaceAll('_', ' ')} location for Phase I world exploration.`,
      lore: `A fictional ALAMAT place shaped around community routes, Nilalang encounters, weather, and quest markers.`,
      recommended_level_min: type === 'boss_arena' ? 30 : type === 'dungeon' ? 12 : 1 + (locationIndex % 8),
      recommended_level_max: type === 'boss_arena' ? 50 : type === 'dungeon' ? 25 : 10 + (locationIndex % 10),
      danger_level: ['safe', 'low', 'medium', 'high', 'legendary'][type === 'boss_arena' ? 4 : type === 'dungeon' ? 3 : locationIndex % 3],
      default_weather: weather[locationIndex % weather.length],
      default_terrain: terrains[locationIndex % terrains.length],
      available_times: ['morning', 'afternoon', 'evening', type === 'spirit_realm' ? 'night' : ''],
      connected_locations: [],
      map_filename: `map_${id}_${slug}.json`,
      preview_image: `preview_${id}_${slug}.png`,
      asset_prompt: mapPrompt(name, type, region.name, province.name, landmarks, locationIndex),
      is_safe_zone: ['barangay', 'market', 'chapel'].includes(type),
      is_dungeon: type === 'dungeon' || type === 'boss_arena',
      is_hidden: type === 'spirit_realm' || type === 'boss_arena',
      is_fast_travel_enabled: ['barangay', 'market', 'port', 'chapel'].includes(type),
      is_active: true,
    });
    locationIndex++;
  }
}

for (let i = 0; i < locations.length; i++) {
  const next = locations[(i + 1) % locations.length];
  const prev = locations[(i - 1 + locations.length) % locations.length];
  locations[i].connected_locations = [next.location_id, prev.location_id];
}

const routes = locations.filter((l) => ['route', 'river', 'mountain', 'coral_reef'].includes(l.location_type)).map((location, index) => ({
  route_id: `WROUTE${String(index + 1).padStart(5, '0')}`,
  name: `${location.name} Route`,
  from_location_id: location.location_id,
  to_location_id: location.connected_locations[0],
  route_type: location.location_type,
  travel_time_minutes: 5 + (index % 20),
  encounter_rate: Number((0.1 + (index % 5) * 0.05).toFixed(2)),
  condition_payload: { weather_sensitive: index % 3 === 0 },
  is_active: true,
}));

const transitions = locations.flatMap((location, index) => location.connected_locations.slice(0, 1).map((to, offset) => ({
  transition_id: `WTRANS${String(index + 1).padStart(6, '0')}${offset}`,
  from_location_id: location.location_id,
  to_location_id: to,
  transition_type: location.is_dungeon ? 'dungeon_exit' : 'walk',
  required_quest_id: location.is_hidden ? `QST${String((index % 260) + 1).padStart(6, '0')}` : null,
  required_item_id: null,
  required_level: location.recommended_level_min,
  condition_payload: { active_time: location.location_type === 'spirit_realm' ? 'night' : null },
  coordinates_payload: { from: { x: (index * 7) % 100, y: (index * 9) % 100 }, to: { x: (index * 11) % 100, y: (index * 13) % 100 } },
})));

const interiors = locations.filter((l) => ['market', 'chapel', 'barangay'].includes(l.location_type)).map((location, index) => ({
  interior_id: `WINT${String(index + 1).padStart(5, '0')}`,
  parent_location_id: location.location_id,
  name: `${location.name} Interior`,
  interior_type: location.location_type === 'market' ? 'shop' : 'community',
  map_filename: `interior_${location.location_id}.json`,
  asset_prompt: mapPrompt(`${location.name} Interior`, 'interior', regionName(location), provinceName(location), 'interior paths, counters, warm lights, practical collision objects', index),
  is_active: true,
}));

const dungeons = locations.filter((l) => l.is_dungeon).map((location, index) => ({
  dungeon_id: `WDUN${String(index + 1).padStart(5, '0')}`,
  location_id: location.location_id,
  name: location.name,
  floor_count: location.location_type === 'boss_arena' ? 1 : 3,
  boss_monster_id: `MON${String((index % monsterPoolSize) + 1).padStart(4, '0')}`,
  dungeon_rules_payload: { exit_allowed: true, corruption_level: location.location_type === 'boss_arena' ? 'legendary' : 'medium' },
  is_active: true,
}));

const fastTravel = locations.filter((l) => l.is_fast_travel_enabled).map((location, index) => ({
  fast_travel_id: `WFAST${String(index + 1).padStart(5, '0')}`,
  location_id: location.location_id,
  name: `${location.name} Travel Point`,
  unlock_condition_payload: { visit_location: location.location_id, story_chapter_min: index % 5 },
  cost_payload: { gold: 10 + index, item_id: null },
  is_active: true,
}));

const spawnZones = locations.filter((l) => !l.is_safe_zone).slice(0, 120).map((location, index) => ({
  spawn_zone_id: `WSPAWN${String(index + 1).padStart(6, '0')}`,
  location_id: location.location_id,
  monster_id: `MON${String((index % monsterPoolSize) + 1).padStart(4, '0')}`,
  spawn_rate: Number((0.15 + (index % 6) * 0.05).toFixed(2)),
  min_level: Math.max(1, location.recommended_level_min),
  max_level: Math.max(location.recommended_level_max, location.recommended_level_min + 3),
  weather_requirement: index % 4 === 0 ? location.default_weather : null,
  time_requirement: index % 5 === 0 ? 'night' : null,
  quest_requirement: location.is_hidden ? `QST${String((index % 260) + 1).padStart(6, '0')}` : null,
  condition_payload: { terrain: location.default_terrain },
}));

const weatherZones = locations.map((location, index) => ({
  weather_zone_id: `WWEATHER${String(index + 1).padStart(6, '0')}`,
  location_id: location.location_id,
  default_weather: location.default_weather,
  weather_table: weather.map((w, offset) => ({ weather: w, weight: offset === index % weather.length ? 4 : 1 })),
  season_payload: { dry: ['Clear', 'Humid'], rainy: ['Rain', 'Storm'], spirit: ['Mist', 'Moonlit'] },
  is_active: true,
}));

const npcPlacements = locations.slice(0, 180).map((location, index) => ({
  placement_id: `WNPCPLACE${String(index + 1).padStart(6, '0')}`,
  npc_id: `NPC${String((index % 1000) + 1).padStart(6, '0')}`,
  location_id: location.location_id,
  schedule_payload: { morning: 'work', afternoon: 'wander', evening: 'home' },
  coordinates_payload: { x: (index * 17) % 100, y: (index * 19) % 100 },
  condition_payload: { story_chapter_min: index % 8 },
}));

const questMarkers = locations.slice(0, 220).map((location, index) => ({
  world_quest_marker_id: `WQMARK${String(index + 1).padStart(6, '0')}`,
  quest_id: `QST${String((index % 260) + 1).padStart(6, '0')}`,
  location_id: location.location_id,
  marker_type: index % 3 === 0 ? 'quest_start' : 'objective',
  coordinates_payload: { x: (index * 23) % 100, y: (index * 29) % 100 },
  condition_payload: { hidden: index % 11 === 0 },
}));

const worldEvents = locations.slice(0, 80).map((location, index) => ({
  world_event_id: `WEVENT${String(index + 1).padStart(5, '0')}`,
  location_id: location.location_id,
  name: `${location.name} Event`,
  event_type: ['weather_shift', 'festival_spawn', 'spirit_echo', 'merchant_visit'][index % 4],
  trigger_payload: { story_chapter_min: index % 8, weather: index % 2 === 0 ? location.default_weather : null },
  result_payload: { spawn_bonus: index % 3 === 0, quest_flag: `world_event_${index + 1}` },
  is_active: true,
}));

const mapPrompts = locations.map((location) => ({
  map_asset_prompt_id: `WMAP${location.location_id.slice(4)}`,
  location_id: location.location_id,
  map_filename: location.map_filename,
  preview_image: location.preview_image,
  asset_prompt: location.asset_prompt,
  tileset_prompt: `Create reusable tiles for ${location.name}: ${location.default_terrain}, clear paths, collision objects, landmarks, and no text.`,
  design_notes: 'Use tile-friendly shapes for future Tiled or React map implementation.',
}));

write('world_regions.json', regions);
write('provinces.json', provinces);
write('location_types.json', locationTypes.map((type, index) => ({ type_id: `WTYPE${String(index + 1).padStart(4, '0')}`, code: type, name: title(type), slug: type.replaceAll('_', '-'), description: `${title(type)} location type.`, sort_order: index + 1, is_active: true })));
write('locations.json', locations);
write('routes.json', routes);
write('interiors.json', interiors);
write('dungeons.json', dungeons);
write('fast_travel_points.json', fastTravel);
write('map_transitions.json', transitions);
write('spawn_zones.json', spawnZones);
write('weather_zones.json', weatherZones);
write('npc_placements.json', npcPlacements);
write('quest_markers.json', questMarkers);
write('world_events.json', worldEvents);
write('map_asset_prompts.json', mapPrompts);

function regionName(location) { return regions.find((r) => r.region_id === location.region_id)?.name ?? 'Kapuluan'; }
function provinceName(location) { return provinces.find((p) => p.province_id === location.province_id)?.name ?? 'Province'; }

function mapPrompt(name, type, region, province, landmarks, index) {
  return `Create a top-down RPG map concept for ALAMAT.\n\nLocation Name: ${name}\nLocation Type: ${type}\nRegion: ${region}\nProvince: ${province}\nTheme: ${['community', 'mystery', 'restoration', 'travel', 'danger'][index % 5]}\n\nStyle:\nClassic handheld top-down Filipino fantasy RPG.\nReadable tile-based layout.\nNo text.\nNo UI.\nClear paths.\nClear collision objects.\nDistinct landmarks.\nPractical for Tiled/React implementation.\n\nInclude:\n${landmarks}\n\nMood:\n${['warm and grounded', 'misty and spiritual', 'bright and coastal', 'tense and mythic'][index % 4]}.`;
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
