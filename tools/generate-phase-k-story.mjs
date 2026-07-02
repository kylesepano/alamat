import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataRoot = path.join(root, 'database', 'data', 'story');
fs.mkdirSync(dataRoot, { recursive: true });

const acts = [
  ['STACT001', 'Prologue', 'The Waking River', 'The player returns to a riverside town as old songs begin waking Nilalang beyond their remembered habitats.', 'Memory and return', 'scene_river_homecoming', 'scene_first_oath', 1],
  ['STACT002', 'Act I', 'The Broken Offerings', 'Local shrines, farms, and markets reveal that trust between people and spirits has been weakened by fear and rushed change.', 'Trust before power', 'scene_shrine_market', 'scene_balete_vigil', 5],
  ['STACT003', 'Act II', 'Roads of Rain and Ash', 'Regional journeys expose conflicts between factions that protect tradition, commerce, safety, and survival in different ways.', 'Many duties, one land', 'scene_rain_road', 'scene_ash_council', 15],
  ['STACT004', 'Act III', 'The Dream Below', 'The Dream Realm and Underworld echo each other, revealing that forgotten promises can become dangerous when buried.', 'Ancestry and consequence', 'scene_dream_gate', 'scene_underworld_lamp', 28],
  ['STACT005', 'Act IV', 'Sky, Sea, and Storm', 'The player negotiates with coastal, mountain, and sky-linked powers as weather and memory reshape travel routes.', 'Humility before vastness', 'scene_tide_court', 'scene_thunder_pact', 40],
  ['STACT006', 'Act V', 'The Last Balancing', 'Allies, rival factions, companion Nilalang, and local communities converge to decide what balance should mean in the present age.', 'Balance as living work', 'scene_many_councils', 'scene_final_threshold', 55],
  ['STACT007', 'Finale', 'The Song Returned', 'The final route resolves through accumulated choices: mercy, justice, curiosity, wisdom, duty, compassion, honor, tradition, balance, and sacrifice.', 'Choice without purity tests', 'scene_final_song', 'scene_world_after', 65],
  ['STACT008', 'Postgame', 'New Fires at Dawn', 'Postgame stories examine rebuilding, remaining mysteries, legendary Nilalang, and the responsibilities left after victory.', 'Repair and stewardship', 'scene_dawn_repairs', 'scene_new_map', 70],
  ['STACT009', 'Expansion Hooks', 'Islands Beyond the Map', 'Future stories can add islands, diaspora communities, seasonal festivals, novels, comics, animation, and sequels without rewriting the base arc.', 'The world continues', 'scene_far_sail', 'scene_unwritten_bell', 75],
].map(([act_id, title, slugBase, summary, theme, opening_scene, closing_scene, recommended_level], index) => ({
  act_id,
  title,
  slug: slugify(slugBase),
  summary,
  theme,
  opening_scene,
  closing_scene,
  recommended_level,
  sort_order: index + 1,
}));

const chapterSeeds = [
  ['STCH001', 'STACT001', 0, 'Home by the River', 'The player learns that familiar places remember more than people admit.', 'WREG0001', 1],
  ['STCH002', 'STACT001', 1, 'First Oath of Trust', 'A companion Nilalang bond begins through care instead of capture.', 'WREG0001', 2],
  ['STCH003', 'STACT002', 2, 'Market of Broken Bowls', 'Village offerings vanish, prices rise, and rumors blame the wrong spirits.', 'WREG0004', 5],
  ['STCH004', 'STACT002', 3, 'The Balete Vigil', 'The player mediates between frightened townsfolk and a wounded guardian presence.', 'WREG0004', 9],
  ['STCH005', 'STACT003', 4, 'Rain Roads', 'Caravan routes and shelter towns reveal how weather changes trust, prices, and safety.', 'WREG0007', 15],
  ['STCH006', 'STACT003', 5, 'Council of Ash', 'Factions argue over whether to seal, study, trade with, or appease awakened forces.', 'WREG0007', 21],
  ['STCH007', 'STACT004', 6, 'Dream Gate', 'Personal memories become explorable spaces shaped by unresolved obligations.', 'WREG0012', 28],
  ['STCH008', 'STACT004', 7, 'Lamp of the Below', 'Underworld myths are treated as fictional ALAMAT realms of memory, grief, and unfinished oaths.', 'WREG0012', 34],
  ['STCH009', 'STACT005', 8, 'Court of Tides', 'Coastal communities negotiate safe passage, fishing rights, and sea-linked Nilalang trust.', 'WREG0015', 40],
  ['STCH010', 'STACT005', 9, 'Pact of Thunder', 'Sky and mountain storylines test whether strength can protect without domination.', 'WREG0015', 47],
  ['STCH011', 'STACT006', 10, 'Many Councils', 'Old enemies and uneasy allies gather as the player weighs regional needs.', 'WREG0001', 55],
  ['STCH012', 'STACT006', 11, 'Final Threshold', 'Companion trust and faction reputation alter the final route into the source of imbalance.', 'WREG0004', 60],
  ['STCH013', 'STACT007', 12, 'Song Returned', 'The finale resolves through accumulated values, not a single good or evil meter.', 'WREG0007', 65],
  ['STCH014', 'STACT008', 13, 'New Fires at Dawn', 'Communities rebuild, shops reopen, and postgame legendary encounters become available.', 'WREG0012', 70],
  ['STCH015', 'STACT009', 14, 'Islands Beyond the Map', 'Expansion hooks preserve continuity while leaving room for new regions and media.', 'WREG0015', 75],
];

const chapters = chapterSeeds.map(([chapter_id, act_id, chapter_number, title, summary, region, recommended_level]) => ({
  chapter_id,
  act_id,
  chapter_number,
  title,
  slug: slugify(title),
  summary,
  region,
  recommended_level,
  major_quests: [`QST${String(chapter_number * 3 + 1).padStart(6, '0')}`, `QST${String(chapter_number * 3 + 2).padStart(6, '0')}`],
  important_npcs: [`NPC${String(chapter_number * 2 + 1).padStart(6, '0')}`, `NPC${String(chapter_number * 2 + 2).padStart(6, '0')}`],
  major_monsters: [`ALM-${String(chapter_number * 2 + 1).padStart(4, '0')}`, `ALM-${String(chapter_number * 2 + 2).padStart(4, '0')}`],
  legendary_encounters: chapter_number % 3 === 0 ? [`LEG-${String(chapter_number + 1).padStart(3, '0')}`] : [],
  emotional_climax: `A choice about ${['mercy', 'justice', 'curiosity', 'wisdom', 'duty'][chapter_number % 5]} changes how the chapter is remembered.`,
  regional_exploration: { region, unlocks: ['settlement rumors', 'field notes', 'optional shrine path'] },
  moral_choices: ['Mercy', 'Justice', 'Curiosity', 'Wisdom', 'Duty', 'Compassion', 'Honor', 'Tradition', 'Balance', 'Sacrifice'].slice(chapter_number % 5, chapter_number % 5 + 3),
  unlock_conditions: { min_level: recommended_level, flags: chapter_number === 0 ? [] : [`chapter_${chapter_number - 1}_complete`] },
  completion_conditions: { required_scene: `STSC${String(chapter_number * 2 + 2).padStart(5, '0')}`, set_flag: `chapter_${chapter_number}_complete` },
}));

const sceneTypes = ['story', 'quest', 'festival', 'relationship', 'cinematic', 'choice'];
const scenes = chapters.flatMap((chapter, chapterIndex) => [0, 1].map((offset) => {
  const n = chapterIndex * 2 + offset + 1;
  return {
    scene_id: `STSC${String(n).padStart(5, '0')}`,
    chapter_id: chapter.chapter_id,
    scene_order: offset + 1,
    title: `${chapter.title}: ${offset === 0 ? 'Arrival' : 'Decision'}`,
    scene_type: sceneTypes[n % sceneTypes.length],
    location_id: `WLOC${String((n % 170) + 1).padStart(6, '0')}`,
    participating_npcs: chapter.important_npcs,
    participating_monsters: chapter.major_monsters,
    dialogue_root: `DLG${String(n).padStart(5, '0')}`,
    cinematic_id: n % 2 === 0 ? `CIN${String(n).padStart(5, '0')}` : null,
    music_track: `${slugify(chapter.title)}_${offset === 0 ? 'theme' : 'choice'}`,
    weather: ['Clear', 'Rain', 'Storm', 'Mist', 'New Moon'][n % 5],
    time_of_day: ['Dawn', 'Day', 'Dusk', 'Night'][n % 4],
    story_flags: { grants: [`scene_${n}_seen`], requires: offset === 0 ? [] : [`scene_${n - 1}_seen`] },
  };
}));

const dialogues = scenes.map((scene, index) => ({
  dialogue_id: scene.dialogue_root,
  scene_id: scene.scene_id,
  speaker: index % 3 === 0 ? 'Player Mentor' : index % 3 === 1 ? 'Local Witness' : 'Companion Nilalang',
  portrait: `portrait_${scene.dialogue_root}.png`,
  emotion: ['calm', 'worried', 'resolute', 'warm', 'haunted'][index % 5],
  text: `This node anchors ${scene.title}. Writers can localize, branch, and replace this text without changing scene code.`,
  voice_cue: ['soft', 'urgent', 'ritual', 'whisper', 'steady'][index % 5],
  animation_cue: ['idle_listen', 'gesture_open', 'look_to_sky', 'kneel_offering'][index % 4],
  player_choices: [`DCH${String(index + 1).padStart(5, '0')}A`, `DCH${String(index + 1).padStart(5, '0')}B`],
  conditions: { flags: scene.story_flags.requires, relationship_min: index % 4 === 0 ? 'Acquaintance' : null },
  consequences: { flags: scene.story_flags.grants, values: ['Mercy', 'Wisdom', 'Balance'][index % 3] },
  locale_key: `story.${scene.dialogue_root}.root`,
  voice_direction_notes: 'Respectful, grounded, and region-aware; avoid caricatured dialect.',
}));

const dialogueChoices = dialogues.flatMap((dialogue, index) => ['A', 'B'].map((suffix, choiceIndex) => ({
  choice_id: `DCH${String(index + 1).padStart(5, '0')}${suffix}`,
  dialogue_id: dialogue.dialogue_id,
  choice_text: choiceIndex === 0 ? 'Listen before deciding.' : 'Ask what was forgotten.',
  value_axis: choiceIndex === 0 ? 'Compassion' : 'Curiosity',
  next_dialogue_id: null,
  condition_payload: { min_trust: choiceIndex === 0 ? 0 : 5 },
  consequence_payload: {
    npc_trust: choiceIndex === 0 ? 1 : 0,
    monster_trust: choiceIndex === 0 ? 1 : 0,
    faction_reputation: choiceIndex === 1 ? 1 : 0,
    quest_routes: [`route_${choiceIndex + 1}`],
    endings: choiceIndex === 0 ? ['true-ending'] : ['hidden-ending'],
    world_state: [`choice_${dialogue.dialogue_id}_${suffix}`],
  },
  sort_order: choiceIndex + 1,
})));

const dialogueFlags = Array.from({ length: 40 }, (_, index) => ({
  flag_id: `SFLG${String(index + 1).padStart(5, '0')}`,
  code: `story_flag_${index + 1}`,
  name: `Story Flag ${index + 1}`,
  description: 'Reusable flag for story, quest, shop, crafting, and world-state conditions.',
  scope: ['global', 'npc', 'faction', 'chapter', 'ending'][index % 5],
  default_value: false,
  is_persistent: true,
}));

const cutscenes = scenes.filter((scene) => scene.cinematic_id).map((scene, index) => ({
  cutscene_id: `CUT${String(index + 1).padStart(5, '0')}`,
  scene_id: scene.scene_id,
  cinematic_id: scene.cinematic_id,
  title: `${scene.title} Cutscene`,
  trigger_payload: { flags: scene.story_flags.requires, chapter_id: scene.chapter_id },
  storyboard_payload: [
    { panel: 1, shot: 'wide establishing view', camera: 'slow dolly' },
    { panel: 2, shot: 'character reaction', camera: 'still close' },
  ],
  skippable: true,
  replayable: true,
}));

const cinematics = cutscenes.map((cutscene, index) => ({
  cinematic_id: cutscene.cinematic_id,
  title: cutscene.title.replace(' Cutscene', ' Cinematic'),
  cinematic_type: ['opening', 'memory', 'festival', 'ending'][index % 4],
  camera_direction: 'Painterly 2.5D cinematic with grounded human gestures and respectful Filipino fantasy motifs.',
  music_reference: `music_${slugify(cutscene.title)}`,
  duration_seconds: 45 + index * 5,
  asset_prompt_id: `STAP${String(index + 1).padStart(5, '0')}`,
}));

const loreBooks = Array.from({ length: 24 }, (_, index) => ({
  lore_book_id: `LBOOK${String(index + 1).padStart(5, '0')}`,
  title: ['Old Letters from the River', 'Field Notes on Trust', 'Maps of Rain Roads', 'Shrine Inscriptions', 'Family Records'][index % 5] + ` ${Math.floor(index / 5) + 1}`,
  slug: slugify(`lore-book-${index + 1}`),
  collectible_type: ['folklore_book', 'old_letter', 'field_note', 'historical_journal', 'map', 'shrine_inscription', 'family_record'][index % 7],
  excerpt: 'A fictional ALAMAT collectible that enriches world context without becoming mandatory progression.',
  full_text: 'This entry records local memory, uncertainty, and care. It avoids claiming authority over real-world traditions and remains internal to ALAMAT.',
  region_id: `WREG${String((index % 15) + 1).padStart(4, '0')}`,
  location_id: `WLOC${String((index % 170) + 1).padStart(6, '0')}`,
  unlock_condition_payload: { chapter: chapters[index % chapters.length].chapter_id },
  sort_order: index + 1,
}));

const folkTales = Array.from({ length: 18 }, (_, index) => ({
  tale_id: `FTALE${String(index + 1).padStart(5, '0')}`,
  title: ['The River That Remembered Names', 'The Lamp Below the House', 'The Bird Who Carried Thunder', 'The Net of Moonlight'][index % 4],
  slug: slugify(`folk-tale-${index + 1}`),
  region: `Region ${index % 6 + 1}`,
  narrator: ['elder', 'child', 'traveler', 'keeper'][index % 4],
  summary: 'A fictional in-world folk tale used as tone reference for quests, not a claim about real belief.',
  moral_axes: ['Mercy', 'Wisdom', 'Balance'].slice(0, 2 + (index % 2)),
  related_monsters: [`ALM-${String(index + 1).padStart(4, '0')}`],
  localization_notes: 'Preserve respect and avoid flattening regional voices.',
}));

const songs = Array.from({ length: 12 }, (_, index) => ({
  song_id: `SONG${String(index + 1).padStart(5, '0')}`,
  title: ['Rice Field Dawn', 'Storm Boat Lullaby', 'Market Lantern Song', 'Mountain Return'][index % 4],
  song_type: ['village_theme', 'forest_theme', 'battle_theme', 'boss_theme', 'festival_theme', 'spirit_theme', 'ocean_theme', 'ending_theme'][index % 8],
  lyrics_excerpt: 'Metadata only; final composition and lyrics remain asset-pipeline tasks.',
  music_reference: `music_story_${index + 1}`,
  mood: ['warm', 'tense', 'mournful', 'hopeful'][index % 4],
  usage_context: ['village', 'forest', 'battle', 'festival'][index % 4],
}));

const poems = Array.from({ length: 12 }, (_, index) => ({
  poem_id: `POEM${String(index + 1).padStart(5, '0')}`,
  title: ['Before the Rain', 'Names in Smoke', 'The Bowl Repaired', 'Dawn Has Many Doors'][index % 4],
  poem_type: ['shrine', 'memory', 'letter', 'ending'][index % 4],
  text: 'A short in-world poetic placeholder for localization and narrative tone testing.',
  related_chapter_id: chapters[index % chapters.length].chapter_id,
}));

const timelineAges = ['Age of Origins', 'Age of Spirits', 'Age of Heroes', 'Age of Kingdoms', 'Colonial Era', 'Modern Era', 'The Awakening', 'Current Story', 'Future Timeline'];
const timeline = timelineAges.map((age, index) => ({
  timeline_id: `TIME${String(index + 1).padStart(5, '0')}`,
  age,
  slug: slugify(age),
  sequence_order: index + 1,
  summary: `${age} is part of ALAMAT's fictional chronology and supports writers without overruling real histories or beliefs.`,
  cause: index === 0 ? 'Creation memory begins in multiple traditions.' : `${timelineAges[index - 1]} leaves unresolved obligations.`,
  effect: index === timelineAges.length - 1 ? 'Future media can extend the setting.' : `${timelineAges[index + 1]} becomes possible.`,
  participating_factions: [`NPCF${String((index % 15) + 1).padStart(4, '0')}`],
  participating_monsters: [`ALM-${String(index + 1).padStart(4, '0')}`],
  lasting_consequences: ['changed travel routes', 'new rituals of trust', 'contested histories'],
}));

const historicalEvents = Array.from({ length: 36 }, (_, index) => ({
  event_id: `HIST${String(index + 1).padStart(5, '0')}`,
  timeline_id: timeline[index % timeline.length].timeline_id,
  title: `Historical Event ${index + 1}`,
  date_label: `ALAMAT Era ${index + 1}`,
  cause: 'A local imbalance, alliance, migration, festival, or promise changes regional life.',
  effect: 'Communities remember the event differently, creating quest hooks and faction viewpoints.',
  participating_factions: [`NPCF${String((index % 15) + 1).padStart(4, '0')}`],
  participating_monsters: [`ALM-${String((index % 130) + 1).padStart(4, '0')}`],
  lasting_consequences: ['field notes updated', 'regional reputation shifts', 'new lore collectible appears'],
  source_type: ['oral_history', 'journal', 'map', 'song'][index % 4],
}));

const worldHistory = timeline.map((entry, index) => ({
  history_id: `WHIS${String(index + 1).padStart(5, '0')}`,
  topic: entry.age,
  summary: entry.summary,
  writer_notes: 'Treat this as ALAMAT fiction inspired by many Philippine cultural currents, never as a replacement for real-world belief.',
  related_timeline_id: entry.timeline_id,
  design_use: ['quest framing', 'location dressing', 'NPC memory', 'cutscene motif'][index % 4],
}));

const mythology = [
  ['MYTH001', 'Creation Myths', 'Multiple creation stories coexist as local memories inside ALAMAT.'],
  ['MYTH002', 'Spirit Realms', 'Spirit realms overlap with daily life through dreams, festivals, places, and vows.'],
  ['MYTH003', 'Sacred Places', 'Sacred places are approached with consent, humility, and community context.'],
  ['MYTH004', 'Nilalang Origins', 'Nilalang arise through nature, memory, fear, care, and unfinished promises.'],
  ['MYTH005', 'Human Settlements', 'Settlements adapt through trade, ritual, weather, and relationships with nearby Nilalang.'],
  ['MYTH006', 'Balance of Nature', 'Balance is active stewardship, not a static return to one past.'],
  ['MYTH007', 'Ancestral Traditions', 'Ancestral memory guides choices while leaving room for disagreement and change.'],
  ['MYTH008', 'Dream Realm', 'Dream spaces reveal hidden feelings, warnings, and symbolic geography.'],
  ['MYTH009', 'Underworld', 'The fictional Underworld holds grief, oath, memory, and restoration.'],
  ['MYTH010', 'Sky Realm', 'The sky realm frames weather, distance, and humility before powers larger than people.'],
  ['MYTH011', 'Sea Realm', 'The sea realm carries trade, migration, danger, generosity, and remembered names.'],
].map(([mythology_id, topic, summary], index) => ({
  mythology_id,
  topic,
  slug: slugify(topic),
  summary,
  rules: ['No single tradition is treated as the only truth.', 'Respect living cultures.', 'Keep ALAMAT fictional and plural.'],
  related_realms: ['Dream', 'Underworld', 'Sky', 'Sea'].slice(index % 4, index % 4 + 1),
  narrative_use: ['quest motif', 'location rule', 'Nilalang behavior', 'ending logic'][index % 4],
  sort_order: index + 1,
}));

const relationshipTypes = ['Parent', 'Sibling', 'Teacher', 'Student', 'Rival', 'Friend', 'Enemy', 'Companion', 'Mentor', 'Guardian', 'Political Alliance', 'Faction Loyalty', 'Secret Identity', 'Family Tree'];
const characterRelationships = Array.from({ length: 70 }, (_, index) => ({
  relationship_id: `SREL${String(index + 1).padStart(5, '0')}`,
  source_type: index % 4 === 0 ? 'monster' : 'npc',
  source_id: index % 4 === 0 ? `ALM-${String((index % 130) + 1).padStart(4, '0')}` : `NPC${String((index % 1000) + 1).padStart(6, '0')}`,
  target_type: index % 5 === 0 ? 'faction' : 'npc',
  target_id: index % 5 === 0 ? `NPCF${String((index % 15) + 1).padStart(4, '0')}` : `NPC${String(((index + 7) % 1000) + 1).padStart(6, '0')}`,
  relationship_type: relationshipTypes[index % relationshipTypes.length],
  trust_level: index % 10,
  conflict_level: index % 6,
  visibility: ['public', 'private', 'secret'][index % 3],
  unlock_condition_payload: { chapter: chapters[index % chapters.length].chapter_id },
  story_impact_payload: { affects_dialogue: true, affects_ending: index % 4 === 0 },
}));

const endingRoutes = [
  ['END001', 'True Ending', 'Song Returned', 'Requires high balance, companion trust, and repaired regional bonds.'],
  ['END002', 'Regional Ending', 'Islands Remembered', 'Prioritizes one region while leaving others with unresolved work.'],
  ['END003', 'Faction Ending', 'Council Oath', 'A faction alliance defines the final restoration plan.'],
  ['END004', 'Companion Ending', 'Beside the First Friend', 'Companion Nilalang trust reshapes the final scene.'],
  ['END005', 'Legendary Ending', 'Doors of the Great Ones', 'Legendary encounters open an older route.'],
  ['END006', 'Hidden Ending', 'The Quiet Name', 'Curiosity and secret flags reveal a hidden memory path.'],
  ['END007', 'Postgame Ending', 'New Fires at Dawn', 'Postgame restoration becomes the main reward.'],
  ['END008', 'Expansion Ending', 'Sail Beyond the Map', 'Hooks future regions, seasonal arcs, and transmedia stories.'],
].map(([ending_id, ending_type, title, summary], index) => ({
  ending_id,
  ending_type,
  title,
  slug: slugify(title),
  summary,
  requirement_payload: { values: ['Balance', 'Compassion', 'Wisdom'].slice(0, 1 + (index % 3)), flags: [`ending_route_${index + 1}`] },
  consequence_payload: { unlocks: ['postgame_scene', 'ending_gallery_art'], world_state: `ending_${slugify(title)}` },
  is_canonical_optional: index === 0,
  sort_order: index + 1,
}));

const epilogues = endingRoutes.flatMap((ending, index) => [0, 1].map((offset) => ({
  epilogue_id: `EPI${String(index * 2 + offset + 1).padStart(5, '0')}`,
  ending_id: ending.ending_id,
  title: `${ending.title}: ${offset === 0 ? 'Community' : 'Companion'} Epilogue`,
  text: 'An epilogue card describing consequences without declaring one culture, faction, or belief system superior.',
  affected_regions: [`WREG${String((index % 15) + 1).padStart(4, '0')}`],
  affected_characters: [`NPC${String((index % 1000) + 1).padStart(6, '0')}`],
  asset_prompt_id: `STAP${String(60 + index * 2 + offset + 1).padStart(5, '0')}`,
})));

const storyAssetPrompts = [
  ...acts.map((act, index) => ({
    asset_prompt_id: `STAP${String(index + 1).padStart(5, '0')}`,
    asset_type: 'act_key_art',
    owner_type: 'story_act',
    owner_id: act.act_id,
    filename: `act_${act.act_id}_${act.slug}.png`,
    prompt: `Filipino fantasy RPG key art for ${act.title}, theme ${act.theme}, warm natural light, woven textures, respectful fictional cultural motifs, no text, no logo.`,
    negative_prompt: 'No stereotypes, no religious superiority, no gore, no modern brand marks.',
    style_notes: 'Painterly 2.5D storybook realism with clean game UI readability.',
  })),
  ...chapters.map((chapter, index) => ({
    asset_prompt_id: `STAP${String(20 + index + 1).padStart(5, '0')}`,
    asset_type: 'chapter_banner',
    owner_type: 'story_chapter',
    owner_id: chapter.chapter_id,
    filename: `chapter_${chapter.chapter_id}_${chapter.slug}.png`,
    prompt: `Wide chapter banner for ${chapter.title}, ALAMAT Filipino fantasy region ${chapter.region}, atmospheric but readable, natural materials, community details, no text.`,
    negative_prompt: 'No stock-photo look, no caricature, no text overlays.',
    style_notes: 'Cinematic banner suitable for codex and chapter selection.',
  })),
  ...dialogues.slice(0, 30).map((dialogue, index) => ({
    asset_prompt_id: `STAP${String(40 + index + 1).padStart(5, '0')}`,
    asset_type: 'dialogue_portrait',
    owner_type: 'dialogue',
    owner_id: dialogue.dialogue_id,
    filename: dialogue.portrait,
    prompt: `Dialogue portrait for ${dialogue.speaker}, emotion ${dialogue.emotion}, Filipino fantasy RPG, expressive face, practical clothing, transparent background friendly, no text.`,
    negative_prompt: 'No exaggerated stereotypes, no religious icon misuse, no horror gore.',
    style_notes: 'Consistent portrait crop for dialogue UI.',
  })),
  ...endingRoutes.map((ending, index) => ({
    asset_prompt_id: `STAP${String(80 + index + 1).padStart(5, '0')}`,
    asset_type: 'ending_illustration',
    owner_type: 'ending_route',
    owner_id: ending.ending_id,
    filename: `ending_${ending.ending_id}_${ending.slug}.png`,
    prompt: `Ending illustration for ${ending.title}, ${ending.summary}, hopeful Filipino fantasy storybook composition, community and landscape visible, no text.`,
    negative_prompt: 'No single religion shown as final truth, no conquest imagery, no logo.',
    style_notes: 'Gallery art with room for UI overlay.',
  })),
];

const files = {
  'story_acts.json': acts,
  'story_chapters.json': chapters,
  'story_scenes.json': scenes,
  'cutscenes.json': cutscenes,
  'dialogues.json': dialogues,
  'dialogue_choices.json': dialogueChoices,
  'dialogue_flags.json': dialogueFlags,
  'cinematics.json': cinematics,
  'lore_books.json': loreBooks,
  'folk_tales.json': folkTales,
  'songs.json': songs,
  'poems.json': poems,
  'timeline.json': timeline,
  'historical_events.json': historicalEvents,
  'world_history.json': worldHistory,
  'mythology.json': mythology,
  'character_relationships.json': characterRelationships,
  'ending_routes.json': endingRoutes,
  'epilogues.json': epilogues,
  'story_asset_prompts.json': storyAssetPrompts,
};

for (const [file, rows] of Object.entries(files)) {
  fs.writeFileSync(path.join(dataRoot, file), `${JSON.stringify(rows, null, 2)}\n`);
}

console.log(`Generated Phase K story data in ${dataRoot}`);
for (const [file, rows] of Object.entries(files)) {
  console.log(`${file}: ${rows.length}`);
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
