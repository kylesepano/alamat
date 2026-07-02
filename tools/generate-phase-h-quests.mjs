import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataRoot = path.join(root, 'database', 'data', 'quests');

const categories = [
  ['QCAT0001', 'Main Story', 'main-story', 'Core ALAMAT story progression.', 'scroll', '#D6A85C'],
  ['QCAT0002', 'Side Quest', 'side-quest', 'Optional local stories and settlement needs.', 'map', '#38BDF8'],
  ['QCAT0003', 'Nilalang Trust', 'nilalang-trust', 'Trust-building quests for bonded Nilalang.', 'heart', '#22C55E'],
  ['QCAT0004', 'Legendary', 'legendary', 'High-impact mythic quest arcs.', 'star', '#F59E0B'],
  ['QCAT0005', 'Faction', 'faction', 'Faction reputation and political quest arcs.', 'flag', '#A78BFA'],
  ['QCAT0006', 'NPC Relationship', 'npc-relationship', 'Relationship and companion development quests.', 'users', '#F472B6'],
  ['QCAT0007', 'Festival', 'festival', 'Seasonal celebration and ritual quests.', 'sparkles', '#EC4899'],
  ['QCAT0008', 'Repeatable', 'repeatable', 'Daily and weekly repeatable activities.', 'refresh-cw', '#94A3B8'],
  ['QCAT0009', 'Hidden', 'hidden', 'Secret and discovery-based quests.', 'eye-off', '#64748B'],
];

const types = ['main_story', 'side_quest', 'monster_trust', 'legendary', 'faction', 'npc_relationship', 'daily', 'weekly', 'hidden', 'festival', 'crafting', 'collection', 'investigation', 'tutorial', 'boss_trial', 'companion'];
const statuses = ['not_started', 'available', 'active', 'completed', 'failed', 'locked', 'expired'];
const objectiveTypes = ['talk_to_npc', 'collect_item', 'deliver_item', 'defeat_monster', 'capture_monster', 'gain_monster_trust', 'reach_location', 'inspect_object', 'solve_puzzle', 'craft_item', 'equip_item', 'use_item', 'survive_battle', 'protect_npc', 'escort_npc', 'choose_dialogue', 'restore_shrine', 'cleanse_corruption', 'offer_item', 'wait_until_time', 'weather_condition', 'branch_choice'];
const rewardTypes = ['gold', 'experience', 'item', 'equipment', 'skill', 'passive', 'monster_trust', 'monster_unlock', 'faction_reputation', 'npc_relationship', 'crafting_recipe', 'map_unlock', 'title', 'achievement', 'story_flag'];
const branchTypes = ['mercy', 'combat', 'deception', 'truth', 'offering', 'sacrifice', 'restoration', 'exile', 'alliance', 'refusal'];
const regions = ['Luzon', 'Visayas', 'Mindanao', 'Kapuluan', 'Spirit Realm'];
const provinces = ['Laguna', 'Cebu', 'Davao', 'Palawan', 'Iloilo', 'Sulu', 'Benguet', 'Bohol', 'Samar', 'Aklan'];
const themes = ['restoration', 'truth', 'mercy', 'community duty', 'ancestral memory', 'balanced power', 'trust before force', 'shared stewardship'];

const questPlan = [
  ['QCAT0001', 'main_story', 20, 'Main Story'],
  ['QCAT0002', 'side_quest', 50, 'Side Quest'],
  ['QCAT0003', 'monster_trust', 50, 'Nilalang Trust'],
  ['QCAT0004', 'legendary', 20, 'Legendary'],
  ['QCAT0005', 'faction', 30, 'Faction'],
  ['QCAT0006', 'npc_relationship', 30, 'NPC Relationship'],
  ['QCAT0007', 'festival', 20, 'Festival'],
  ['QCAT0008', 'daily', 10, 'Daily'],
  ['QCAT0008', 'weekly', 10, 'Weekly'],
  ['QCAT0009', 'hidden', 20, 'Hidden'],
];

let questIndex = 1;
const quests = [];
const steps = [];
const objectives = [];
const rewards = [];
const requirements = [];
const dialogues = [];
const flags = [];
const branches = [];
const markers = [];
const assetPrompts = [];

for (const [categoryId, questType, count, label] of questPlan) {
  for (let local = 0; local < count; local++) {
    const quest = makeQuest(questIndex++, categoryId, questType, label, local);
    quests.push(quest);
    steps.push(...makeSteps(quest));
    objectives.push(...makeObjectives(quest));
    rewards.push(...makeRewards(quest));
    requirements.push(...makeRequirements(quest));
    dialogues.push(makeDialogue(quest));
    flags.push(makeFlag(quest));
    markers.push(makeMarker(quest));
    assetPrompts.push(makeAssetPrompt(quest));
    if (['main_story', 'legendary', 'faction', 'npc_relationship', 'hidden'].includes(quest.quest_type)) {
      branches.push(...makeBranches(quest));
    }
  }
}

const chains = [
  makeChain('QCHAIN0001', 'Kapuluan Restoration Chain', quests.filter((q) => q.quest_type === 'main_story').slice(0, 10)),
  makeChain('QCHAIN0002', 'Nilalang Trust Chain', quests.filter((q) => q.quest_type === 'monster_trust').slice(0, 12)),
  makeChain('QCHAIN0003', 'Faction Balance Chain', quests.filter((q) => q.quest_type === 'faction').slice(0, 10)),
  makeChain('QCHAIN0004', 'Legendary Echoes Chain', quests.filter((q) => q.quest_type === 'legendary').slice(0, 8)),
  makeChain('QCHAIN0005', 'Companion Roads Chain', quests.filter((q) => q.quest_type === 'npc_relationship').slice(0, 10)),
];

write('quest_categories.json', categories.map(([category_id, name, slug, description, icon, color_hint], index) => ({ category_id, name, slug, description, icon, color_hint, sort_order: index + 1, is_active: true })));
write('quest_types.json', types.map((type, index) => ({ type_id: `QTYPE${String(index + 1).padStart(4, '0')}`, code: type, name: title(type), slug: type.replaceAll('_', '-'), description: `${title(type)} quest type.`, sort_order: index + 1, is_active: true })));
write('quest_statuses.json', statuses.map((status, index) => ({ status_id: `QSTAT${String(index + 1).padStart(4, '0')}`, code: status, name: title(status), slug: status.replaceAll('_', '-'), description: `${title(status)} quest status.`, sort_order: index + 1, is_active: true })));
write('quests.json', quests);
write('quest_steps.json', steps);
write('quest_objectives.json', objectives);
write('quest_rewards.json', rewards);
write('quest_requirements.json', requirements);
write('quest_dialogues.json', dialogues);
write('quest_flags.json', flags);
write('quest_branches.json', branches);
write('quest_chains.json', chains);
write('quest_markers.json', markers);
write('quest_asset_prompts.json', assetPrompts);

function makeQuest(index, categoryId, questType, label, local) {
  const questId = `QST${String(index).padStart(6, '0')}`;
  const region = regions[index % regions.length];
  const province = provinces[index % provinces.length];
  const titleText = `${label}: ${questTitleSeed(index, questType)}`;
  const slug = slugify(`${titleText}-${questId}`);
  const relatedMonsterId = questType === 'monster_trust' || questType === 'legendary' ? `MON${String((index % 122) + 1).padStart(4, '0')}` : null;
  const startingNpcId = `NPC${String((index % 1000) + 1).padStart(6, '0')}`;
  const factionId = questType === 'faction' ? `NPCF${String((index % 15) + 1).padStart(4, '0')}` : null;
  const moralTheme = themes[index % themes.length];
  const iconFilename = `quest_icon_${questId}_${slug}.png`;
  const bannerFilename = `quest_banner_${questId}_${slug}.png`;

  return {
    quest_id: questId,
    slug,
    title: titleText,
    category_id: categoryId,
    quest_type: questType,
    region,
    province,
    location_id: `NPCLOC${String((index % 1000) + 1).padStart(6, '0')}`,
    starting_npc_id: startingNpcId,
    ending_npc_id: `NPC${String(((index + 17) % 1000) + 1).padStart(6, '0')}`,
    related_monster_id: relatedMonsterId,
    related_faction_id: factionId,
    required_level: questType === 'legendary' ? 30 : questType === 'main_story' ? Math.max(1, local + 1) : null,
    required_story_chapter: questType === 'main_story' ? local : Math.floor(index % 8),
    required_quest_id: index > 1 && questType === 'main_story' ? `QST${String(index - 1).padStart(6, '0')}` : null,
    repeatable: ['daily', 'weekly'].includes(questType),
    hidden: questType === 'hidden',
    time_limited: ['festival', 'daily', 'weekly'].includes(questType),
    start_condition_payload: { story_chapter_min: Math.floor(index % 8), weather: index % 9 === 0 ? ['Rain'] : [], active_time: index % 7 === 0 ? 'night' : null },
    failure_condition_payload: { fail_on_npc_defeat: questType === 'escort_npc', expires_after_days: ['daily', 'weekly'].includes(questType) ? (questType === 'daily' ? 1 : 7) : null },
    completion_condition_payload: { required_flags: [`flag_${questId}_complete`], required_steps_complete: 3 },
    short_description: `${titleText} is a ${questType.replaceAll('_', ' ')} template for ALAMAT's data-driven quest system.`,
    full_description: `This quest template connects NPCs, Nilalang, factions, items, equipment, locations, choices, rewards, and flags without hardcoded quest logic.`,
    lore_context: `Fictional ALAMAT lore hook in ${region}, shaped around ${moralTheme} and community-centered fantasy adventure.`,
    player_choice_notes: `Choices may support ${branchTypes[index % branchTypes.length]} or ${branchTypes[(index + 3) % branchTypes.length]} outcomes.`,
    moral_theme: moralTheme,
    reward_summary: rewardSummary(questType),
    icon_filename: iconFilename,
    banner_filename: bannerFilename,
    quest_marker_icon: `quest_marker_${questId}.png`,
    asset_prompt: iconPrompt(titleText, questType, moralTheme, region),
    is_active: true,
  };
}

function makeSteps(quest) {
  return [0, 1, 2].map((offset) => {
    const objectiveType = objectiveTypes[(Number(quest.quest_id.slice(3)) + offset) % objectiveTypes.length];
    return {
      quest_id: quest.quest_id,
      step_id: `${quest.quest_id}-STEP-${offset + 1}`,
      step_order: offset + 1,
      title: `${title(objectiveType)} ${offset + 1}`,
      description: `Complete ${objectiveType.replaceAll('_', ' ')} for ${quest.title}.`,
      objective_type: objectiveType,
      target_payload: targetPayload(quest, objectiveType, offset),
      location_id: quest.location_id,
      npc_id: offset === 0 ? quest.starting_npc_id : null,
      monster_id: objectiveType.includes('monster') ? (quest.related_monster_id ?? 'MON0001') : null,
      item_id: objectiveType.includes('item') || objectiveType === 'craft_item' ? `ITM${String((Number(quest.quest_id.slice(3)) % 1075) + 1).padStart(6, '0')}` : null,
      required_quantity: ['collect_item', 'deliver_item', 'offer_item'].includes(objectiveType) ? 3 + offset : null,
      optional: offset === 2 && quest.quest_type !== 'main_story',
      branch_key: objectiveType === 'branch_choice' ? branchTypes[offset] : null,
      completion_flag: `flag_${quest.quest_id}_step_${offset + 1}`,
    };
  });
}

function makeObjectives(quest) {
  return makeSteps(quest).map((step) => ({
    objective_id: `${step.step_id}-OBJ`,
    quest_id: quest.quest_id,
    step_id: step.step_id,
    objective_type: step.objective_type,
    description: step.description,
    target_payload: step.target_payload,
    required_quantity: step.required_quantity ?? 1,
    progress_key: `progress_${step.step_id.toLowerCase()}`,
    is_hidden: quest.hidden && step.step_order > 1,
  }));
}

function makeRewards(quest) {
  const base = Number(quest.quest_id.slice(3));
  return [0, 1].map((offset) => {
    const rewardType = rewardTypes[(base + offset) % rewardTypes.length];
    return {
      quest_id: quest.quest_id,
      reward_id: `${quest.quest_id}-REWARD-${offset + 1}`,
      reward_type: rewardType,
      item_id: rewardType === 'item' ? `ITM${String((base % 1075) + 1).padStart(6, '0')}` : null,
      equipment_id: rewardType === 'equipment' ? `EQP${String((base % 650) + 1).padStart(6, '0')}` : null,
      skill_id: rewardType === 'skill' ? `SKL-EQP-${String((base % 650) + 1).padStart(4, '0')}` : null,
      monster_id: rewardType.includes('monster') ? (quest.related_monster_id ?? 'MON0001') : null,
      npc_relationship_points: rewardType === 'npc_relationship' ? 30 : null,
      faction_reputation_points: rewardType === 'faction_reputation' ? 15 : null,
      gold: rewardType === 'gold' ? 100 + base : null,
      experience: rewardType === 'experience' ? 50 + base : null,
      quantity: 1 + offset,
      reward_payload: { summary: rewardSummary(quest.quest_type), title: rewardType === 'title' ? `Keeper of ${quest.region}` : null },
    };
  });
}

function makeRequirements(quest) {
  return [
    { requirement_type: 'story_chapter', required_value: quest.required_story_chapter ?? 0 },
    { requirement_type: 'player_level', required_value: quest.required_level ?? 1 },
  ].map((row, index) => ({
    quest_id: quest.quest_id,
    requirement_id: `${quest.quest_id}-REQ-${index + 1}`,
    required_id: index === 0 ? quest.required_quest_id : null,
    requirement_payload: { source: 'phase_h_seed', availability: quest.start_condition_payload },
    failure_message: `Requirement not met for ${quest.title}.`,
    ...row,
  }));
}

function makeDialogue(quest) {
  return {
    dialogue_id: `${quest.quest_id}-DIALOGUE`,
    quest_id: quest.quest_id,
    npc_id: quest.starting_npc_id,
    dialogue_key: 'quest_intro',
    nodes: [
      { id: 'intro', text: `There is work to do: ${quest.title}.`, next: ['accept', 'decline'] },
      { id: 'accept', text: 'Then let us begin with care.', next: [] },
      { id: 'decline', text: 'Return when the path calls you again.', next: [] },
    ],
    condition_payload: quest.start_condition_payload,
  };
}

function makeFlag(quest) {
  return {
    flag_id: `QFLAG${quest.quest_id.slice(3)}`,
    quest_id: quest.quest_id,
    flag_name: `${quest.quest_id} Complete`,
    slug: slugify(`${quest.quest_id}-complete`),
    description: `Tracks completion state for ${quest.title}.`,
    default_value: false,
    scope: quest.quest_type === 'main_story' ? 'world' : 'player',
  };
}

function makeBranches(quest) {
  return [0, 1].map((offset) => {
    const branch = branchTypes[(Number(quest.quest_id.slice(3)) + offset) % branchTypes.length];
    return {
      quest_id: quest.quest_id,
      branch_id: `${quest.quest_id}-BRANCH-${branch}`,
      branch_name: title(branch),
      condition_payload: { choice: branch, relationship_min: offset === 0 ? 'Acquaintance' : 'Trusted' },
      result_payload: { faction_reputation_delta: offset === 0 ? 5 : -5, monster_trust_delta: offset === 0 ? 10 : 0, world_flag: `${quest.quest_id}_${branch}` },
      moral_alignment: branch,
      unlocks_quest_id: null,
      locks_quest_id: null,
    };
  });
}

function makeMarker(quest) {
  return {
    marker_id: `${quest.quest_id}-MARKER`,
    quest_id: quest.quest_id,
    marker_type: quest.hidden ? 'hidden_area' : 'quest_start',
    region: quest.region,
    province: quest.province,
    location_id: quest.location_id,
    map_key: slugify(`${quest.region}-${quest.province}`),
    x: (Number(quest.quest_id.slice(3)) * 7) % 100,
    y: (Number(quest.quest_id.slice(3)) * 11) % 100,
    icon_filename: quest.quest_marker_icon,
    condition_payload: quest.start_condition_payload,
  };
}

function makeAssetPrompt(quest) {
  return {
    asset_prompt_id: `${quest.quest_id}-ASSET`,
    quest_id: quest.quest_id,
    icon_filename: quest.icon_filename,
    banner_filename: quest.banner_filename,
    quest_marker_icon: quest.quest_marker_icon,
    asset_prompt: quest.asset_prompt,
    icon_prompt: iconPrompt(quest.title, quest.quest_type, quest.moral_theme, quest.region),
    banner_prompt: `Create a cinematic quest banner for ALAMAT.\n\nQuest Title: ${quest.title}\nRegion: ${quest.region}\nRelated Monster: ${quest.related_monster_id ?? 'None'}\nRelated NPC: ${quest.starting_npc_id}\n\nStyle:\nPainterly Filipino fantasy RPG.\nAtmospheric lighting.\nNo text.\nNo UI.\n\nScene:\nA mythic quest scene about ${quest.moral_theme} in ${quest.province}.`,
    design_notes: 'Keep quest icon and banner assets separate from item, equipment, NPC, and Nilalang assets.',
  };
}

function makeChain(chainId, name, chainQuests) {
  return {
    chain_id: chainId,
    name,
    slug: slugify(name),
    description: `${name} connects multiple Phase H quest templates into a future progression arc.`,
    quest_ids: chainQuests.map((quest) => quest.quest_id),
    chain_order: chainQuests.map((quest, index) => ({ quest_id: quest.quest_id, order: index + 1 })),
    completion_reward_payload: { gold: 500, title: name, world_flag: `${slugify(name)}_complete` },
  };
}

function targetPayload(quest, objectiveType, offset) {
  return { objective_type: objectiveType, quest_id: quest.quest_id, region: quest.region, target_count: 1 + offset, moral_theme: quest.moral_theme };
}

function rewardSummary(questType) {
  if (questType === 'monster_trust') return 'Nilalang trust, relationship points, and support items.';
  if (questType === 'faction') return 'Faction reputation, gold, and world flags.';
  if (questType === 'legendary') return 'Legendary equipment hooks, titles, and story flags.';
  return 'Gold, experience, items, and progression flags.';
}

function questTitleSeed(index, questType) {
  const nouns = ['Balete Echo', 'River Oath', 'Coral Lantern', 'Moon Road', 'Hidden Drum', 'Storm Shrine', 'Ancestor Thread', 'Pearl Witness', 'Forest Debt', 'Skyward Bell'];
  return `${nouns[index % nouns.length]} ${title(questType)}`;
}

function iconPrompt(questTitle, questType, moralTheme, region) {
  return `Create a clean 2D RPG quest icon for ALAMAT.\n\nQuest Title: ${questTitle}\nQuest Type: ${questType}\nTheme: ${moralTheme}\nRegion: ${region}\n\nStyle:\nFilipino mythology fantasy RPG.\nReadable at 32x32 and 64x64.\nNo text.\nNo UI.\nTransparent background.\nStrong silhouette.\n\nVisual concept:\nA quest symbol using natural materials, woven motifs, shrine shapes, travel marks, or spirit-realm glow.`;
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
