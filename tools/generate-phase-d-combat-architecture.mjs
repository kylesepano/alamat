import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const combatRoot = path.join(root, 'database', 'combat');

const commonMeta = {
  id: { type: 'integer', minimum: 1 },
  uuid: { type: 'string', format: 'uuid' },
  slug: { type: 'string', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
  created_at: { type: 'string', format: 'date-time' },
  updated_at: { type: 'string', format: 'date-time' },
  version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' },
  source: { type: 'string', minLength: 1 },
  notes: { type: 'string' },
};

const commonRequired = ['id', 'uuid', 'slug', 'created_at', 'updated_at', 'version', 'source', 'notes'];
let exampleCounter = 1;

const modules = [
  {
    path: 'skills/common_skills.json',
    module: 'skills',
    category: 'common',
    idField: 'skill_id',
    description: 'Common skill definitions available through broad monster, NPC, item, or quest rules.',
    properties: skillProps(),
    required: skillRequired(),
    example: skillExample('SKL-COM-0001', 'guard', 'Guard', 'common'),
  },
  {
    path: 'skills/class_skills.json',
    module: 'skills',
    category: 'class',
    idField: 'skill_id',
    description: 'Class-gated skill definitions referenced by combat classes.',
    properties: skillProps(),
    required: skillRequired(),
    example: { ...skillExample('SKL-CLS-0001', 'shield-vow', 'Shield Vow', 'class'), required_class: 'CLS001' },
  },
  {
    path: 'skills/affiliation_skills.json',
    module: 'skills',
    category: 'affiliation',
    idField: 'skill_id',
    description: 'Affiliation-gated skill definitions referenced by Phase B affiliations or Phase D affinity IDs.',
    properties: skillProps(),
    required: skillRequired(),
    example: { ...skillExample('SKL-AFF-0001', 'forest-thorn', 'Forest Thorn', 'affiliation'), required_affiliation: 'AFF001', affiliation: 'AFF001' },
  },
  {
    path: 'skills/signature_skills.json',
    module: 'skills',
    category: 'signature',
    idField: 'skill_id',
    description: 'Unique signature skill definitions referenced by individual Nilalang through learning records.',
    properties: skillProps(),
    required: skillRequired(),
    example: { ...skillExample('SKL-SIG-0001', 'moon-devour', 'Moon Devour', 'signature'), source: 'Phase C Monster Codex' },
  },
  {
    path: 'skills/boss_skills.json',
    module: 'skills',
    category: 'boss',
    idField: 'skill_id',
    description: 'Boss-only skill definitions referenced by boss phase and scaling systems.',
    properties: skillProps(),
    required: skillRequired(),
    example: { ...skillExample('SKL-BOS-0001', 'arena-break', 'Arena Break', 'boss'), priority: 2 },
  },
  {
    path: 'skills/npc_skills.json',
    module: 'skills',
    category: 'npc',
    idField: 'skill_id',
    description: 'NPC skill definitions referenced by NPC combat profiles and mentor learning.',
    properties: skillProps(),
    required: skillRequired(),
    example: skillExample('SKL-NPC-0001', 'mentor-ward', 'Mentor Ward', 'npc'),
  },
  {
    path: 'skills/hidden_skills.json',
    module: 'skills',
    category: 'hidden',
    idField: 'skill_id',
    description: 'Secret or unlockable skill definitions referenced by quests, relics, shrines, or legend events.',
    properties: skillProps(),
    required: skillRequired(),
    example: skillExample('SKL-HID-0001', 'sealed-omen', 'Sealed Omen', 'hidden'),
  },
  {
    path: 'passives/passives.json',
    module: 'passives',
    category: 'passive',
    idField: 'passive_id',
    description: 'Passive ability definitions referenced by Nilalang, equipment, bosses, and events.',
    properties: {
      passive_id: idString('PAS'),
      name: str(),
      trigger: enumOf(['battle_start', 'turn_start', 'turn_end', 'on_hit', 'on_crit', 'on_status', 'on_down', 'on_capture_check']),
      condition: refOrExpression(),
      duration: duration(),
      stacking: enumOf(['none', 'refresh', 'stack_additive', 'stack_multiplicative', 'unique']),
      cooldown: int(0),
      effect_formula: ref('formula_id'),
      icon: str(),
      animation: str(),
      lore: str(),
    },
    required: ['passive_id', 'name', 'trigger', 'condition', 'duration', 'stacking', 'cooldown', 'effect_formula', 'icon', 'animation', 'lore'],
    example: meta({ passive_id: 'PAS-0001', slug: 'guardian-vow', name: 'Guardian Vow', trigger: 'battle_start', condition: 'owner.hp_percent >= 50', duration: { type: 'turns', value: 3 }, stacking: 'refresh', cooldown: 4, effect_formula: 'FRM-BUFF-DEFENSE-001', icon: 'shield', animation: 'ward_green', lore: 'A protective vow strengthens the Nilalang at the start of combat.' }),
  },
  {
    path: 'status/status_effects.json',
    module: 'status',
    category: 'status_effect',
    idField: 'status_effect_id',
    description: 'Combat status effects. Phase B status effects can reference these richer rules by slug or ID.',
    properties: {
      status_effect_id: idString('STE'),
      name: str(),
      duration: duration(),
      stack_limit: int(1),
      priority: int(0),
      damage_formula: ref('formula_id'),
      healing_formula: ref('formula_id'),
      removable: bool(),
      dispellable: bool(),
      immunity: arr('string'),
      animation: str(),
      icon: str(),
      ai_weight: num(0),
      description: str(),
    },
    required: ['status_effect_id', 'name', 'duration', 'stack_limit', 'priority', 'removable', 'dispellable', 'immunity', 'animation', 'icon', 'ai_weight', 'description'],
    example: meta({ status_effect_id: 'STE-CBT-0001', slug: 'reveal', name: 'Reveal', duration: { type: 'turns', value: 3 }, stack_limit: 1, priority: 40, damage_formula: null, healing_formula: null, removable: true, dispellable: true, immunity: ['blind'], animation: 'gold_eye', icon: 'eye', ai_weight: 1.2, description: 'Exposes hidden targets, illusions, and concealed weaknesses.' }),
  },
  {
    path: 'affinity/affiliations.json',
    module: 'affinity',
    category: 'affiliation',
    idField: 'affiliation_id',
    description: 'Phase D affinity definitions. Prefer referencing Phase B library affiliation codes where possible.',
    properties: {
      affiliation_id: idString('AFF'),
      name: str(),
      phase_b_code: ref('library_affiliations.code'),
      strengths: arr('string'),
      weaknesses: arr('string'),
      resistances: arr('string'),
      immunities: arr('string'),
      combo_bonuses: arr('object'),
      terrain_bonuses: arr('object'),
      weather_bonuses: arr('object'),
      description: str(),
    },
    required: ['affiliation_id', 'name', 'phase_b_code', 'strengths', 'weaknesses', 'resistances', 'immunities', 'combo_bonuses', 'terrain_bonuses', 'weather_bonuses', 'description'],
    example: meta({ affiliation_id: 'AFF-CBT-FOREST', slug: 'forest', name: 'Forest', phase_b_code: 'AFF001', strengths: ['water'], weaknesses: ['fire'], resistances: ['earth'], immunities: [], combo_bonuses: [{ with: 'spirit', bonus: 'rootward' }], terrain_bonuses: [{ terrain_id: 'TRN-FOREST', modifier: 1.1 }], weather_bonuses: [{ weather_id: 'WTH-RAIN', modifier: 1.05 }], description: 'Forest affinity covers root, leaf, thorn, old groves, and living wood.' }),
  },
  {
    path: 'affinity/affinity_chart.json',
    module: 'affinity',
    category: 'affinity_chart',
    idField: 'chart_id',
    description: 'Type-effectiveness rows. Never duplicate affiliation definitions here; reference affiliation IDs.',
    properties: {
      chart_id: idString('AFC'),
      attacker_affiliation_id: ref('affiliation_id'),
      defender_affiliation_id: ref('affiliation_id'),
      multiplier: num(0),
      rule: str(),
    },
    required: ['chart_id', 'attacker_affiliation_id', 'defender_affiliation_id', 'multiplier', 'rule'],
    example: meta({ chart_id: 'AFC-0001', slug: 'forest-vs-water', attacker_affiliation_id: 'AFF-CBT-FOREST', defender_affiliation_id: 'AFF-CBT-WATER', multiplier: 1.15, rule: 'Roots and growth disrupt water-aligned recovery.' }),
  },
  file('formulas/damage_formulas.json', 'formulas', 'damage_formula', 'formula_id', formulaProps('damage'), formulaExample('FRM-DMG-0001', 'standard-physical-damage', 'damage')),
  file('formulas/healing_formulas.json', 'formulas', 'healing_formula', 'formula_id', formulaProps('healing'), formulaExample('FRM-HEAL-0001', 'standard-healing', 'healing')),
  file('formulas/capture_formulas.json', 'formulas', 'capture_formula', 'formula_id', formulaProps('capture'), formulaExample('FRM-CAP-0001', 'trust-capture-check', 'capture')),
  file('battlefield/weather.json', 'battlefield', 'weather', 'weather_id', battlefieldProps('weather'), battlefieldExample('WTH-CBT-RAIN', 'rain', 'Rain', 'weather')),
  file('battlefield/terrain.json', 'battlefield', 'terrain', 'terrain_id', battlefieldProps('terrain'), battlefieldExample('TRN-FOREST', 'forest', 'Forest', 'terrain')),
  file('battlefield/battlefield_effects.json', 'battlefield', 'battlefield_effect', 'field_effect_id', battlefieldEffectProps(), meta({ field_effect_id: 'BFE-0001', slug: 'blessed-ground', name: 'Blessed Ground', trigger: 'turn_start', duration: { type: 'turns', value: 5 }, formula_modifiers: [{ formula_id: 'FRM-HEAL-0001', multiplier: 1.15 }], affected_affiliations: ['holy', 'ancestor'], description: 'A sanctified field effect that strengthens healing and protective rites.' })),
  file('ai/ai_profiles.json', 'ai', 'ai_profile', 'ai_profile_id', aiProfileProps(), meta({ ai_profile_id: 'AIP-0001', slug: 'guardian', name: 'Guardian', decision_tree: [{ when: 'ally.hp_percent < 40', action: 'protect_ally' }], priority_table: [{ action: 'taunt', weight: 1.2 }], target_selection: 'lowest_hp_ally', resource_management: { conserve_mana_below_percent: 20 }, escape_logic: { can_escape: false }, description: 'Prioritizes protection, taunts, and ally survival.' })),
  file('ai/targeting_profiles.json', 'ai', 'targeting_profile', 'targeting_profile_id', targetingProps(), meta({ targeting_profile_id: 'TGP-0001', slug: 'lowest-hp-enemy', name: 'Lowest HP Enemy', target_type: 'lowest_hp', filters: ['enemy', 'alive'], tie_breaker: 'nearest', description: 'Selects the living enemy with the lowest HP percentage.' })),
  file('scaling/rarity_scaling.json', 'scaling', 'rarity_scaling', 'scaling_id', scalingProps(), meta({ scaling_id: 'SCL-RAR-0001', slug: 'rare-baseline', applies_to: 'rarity', reference_id: 'RAR003', stat_multipliers: { hp: 1.12, attack: 1.08, magic: 1.08, defense: 1.06 }, ai_modifier: 1, loot_modifier: 1.1, capture_modifier: 0.95, experience_modifier: 1.15 })),
  file('scaling/boss_scaling.json', 'scaling', 'boss_scaling', 'scaling_id', scalingProps(), meta({ scaling_id: 'SCL-BOS-0001', slug: 'boss-baseline', applies_to: 'boss_rank', reference_id: 'Boss', stat_multipliers: { hp: 2.5, attack: 1.25, magic: 1.2, defense: 1.15 }, ai_modifier: 1.25, loot_modifier: 2, capture_modifier: 0.4, experience_modifier: 2 })),
  file('scaling/stat_growth.json', 'scaling', 'stat_growth', 'growth_id', statGrowthProps(), meta({ growth_id: 'GRW-CBT-0001', slug: 'balanced-growth', class_id: 'CLS003', growth_curve: 'medium', per_level: { hp: 5, attack: 2, magic: 1, defense: 2, speed: 1 }, formula_id: 'FRM-GRW-0001' })),
  file('combos/combo_skills.json', 'combos', 'combo_skill', 'combo_id', comboProps(), meta({ combo_id: 'CMB-0001', slug: 'moon-eclipse-devour', required_monster_ids: ['MON0015', 'MON0020'], required_skill_ids: [], result_skill_id: 'SKL-CMB-0001', conditions: ['weather:eclipse'], cooldown: 5, description: 'A future combo hook for Bakunawa and Minokawa during eclipse conditions.' })),
  file('events/combat_events.json', 'events', 'combat_event', 'event_id', eventProps(), meta({ event_id: 'EVT-CBT-0001', slug: 'spirit-eclipse', name: 'Spirit Eclipse', trigger: 'round_start', duration: { type: 'rounds', value: 3 }, modifiers: [{ target: 'spirit', effect: 'power_multiplier', value: 1.15 }], description: 'A dynamic battle event that strengthens spirit-aligned effects.' })),
  file('learning/monster_skill_learning.json', 'learning', 'monster_skill_learning', 'learning_id', learningProps('monster'), meta({ learning_id: 'LRN-MON-0001', slug: 'mon0015-moon-devour-level', learner_type: 'monster', learner_id: 'MON0015', skill_id: 'SKL-SIG-0001', unlock_method: 'level', unlock_value: '30', prerequisites: [], notes: 'Example only; production records should reference approved skill IDs.' })),
  file('learning/npc_skill_learning.json', 'learning', 'npc_skill_learning', 'learning_id', learningProps('npc'), meta({ learning_id: 'LRN-NPC-0001', slug: 'mentor-ward-training', learner_type: 'npc', learner_id: 'NPC-MENTOR-0001', skill_id: 'SKL-NPC-0001', unlock_method: 'npc_mentor', unlock_value: 'mentor_trust_rank_2', prerequisites: [], notes: 'Example mentor teaching rule.' })),
  file('balance/combat_balance_rules.json', 'balance', 'combat_balance_rule', 'rule_id', balanceProps(), meta({ rule_id: 'BAL-0001', slug: 'critical-rate-limit', name: 'Critical Rate Limit', scope: 'skills', rule_type: 'limit', value: { max_critical_rate: 35 }, rationale: 'Keeps burst damage readable and prevents permanent critical chains.' })),
];

for (const mod of modules) {
  writeJson(path.join(combatRoot, mod.path), schemaFor(mod));
  writeJson(path.join(combatRoot, 'examples', mod.path), [mod.example]);
}

writeJson(path.join(combatRoot, 'manifest.json'), {
  version: '1.0.0',
  phase: 'Phase D',
  name: 'ALAMAT Combat Bible Architecture',
  generated_at: '2026-07-02T00:00:00+08:00',
  modules: modules.map(({ path: p, module, category, idField }) => ({ path: p, module, category, id_field: idField })),
});

function schemaFor(mod) {
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `alamat://combat/${mod.path}`,
    title: `ALAMAT Combat Bible - ${mod.category}`,
    description: mod.description,
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ...commonMeta,
        [mod.idField]: idString(mod.idField.toUpperCase().replace(/_ID$/, '')),
        ...mod.properties,
      },
      required: [...commonRequired, mod.idField, ...mod.required],
    },
    examples: [[mod.example]],
  };
}

function writeJson(target, payload) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`);
}

function file(pathValue, module, category, idField, properties, example) {
  return { path: pathValue, module, category, idField, description: `${category.replaceAll('_', ' ')} records for the Combat Bible.`, properties, required: Object.keys(properties), example };
}

function meta(fields) {
  const counter = exampleCounter++;

  return {
    id: counter,
    uuid: `00000000-0000-4000-8000-${String(counter).padStart(12, '0')}`,
    created_at: '2026-07-02T00:00:00+08:00',
    updated_at: '2026-07-02T00:00:00+08:00',
    version: '1.0.0',
    source: 'Phase D architecture example',
    notes: 'Example record for schema validation only; not production balance content.',
    ...fields,
  };
}

function skillProps() {
  return {
    name: str(),
    category: ref('library_skill_categories.code'),
    type: enumOf(['physical', 'magical', 'spiritual', 'support', 'healing', 'status', 'summon', 'field', 'capture']),
    affiliation: nullableRef('affiliation_id'),
    element: nullableRef('damage_type_id'),
    power: int(0),
    accuracy: int(0, 100),
    critical_rate: int(0, 100),
    mana_cost: int(0),
    stamina_cost: int(0),
    faith_cost: int(0),
    cooldown: int(0),
    cast_time: int(0),
    range: str(),
    area_pattern: enumOf(['single', 'row', 'column', 'aoe', 'cross', 'cone', 'chain', 'random', 'self', 'ally', 'party', 'battlefield']),
    target_type: ref('library_target_types.code'),
    priority: int(-10, 10),
    animation_id: str(),
    sound_id: str(),
    icon: str(),
    icon_filename: str(),
    effect_animation_filename: str(),
    cast_animation_filename: str(),
    impact_animation_filename: str(),
    icon_prompt: str(),
    effect_prompt: str(),
    animation_prompt: str(),
    sound_effect_prompt: str(),
    status_effect_id: nullableRef('status_effect_id'),
    status_chance: int(0, 100),
    can_crit: bool(),
    can_miss: bool(),
    required_weapon: nullableRef('equipment_categories.code'),
    required_class: nullableRef('combat_classes.code'),
    required_affiliation: nullableRef('affiliation_id'),
    required_weather: nullableRef('weather_id'),
    required_terrain: nullableRef('terrain_id'),
    required_time: nullableRef('active_times.code'),
    ai_weight: num(0),
    description: str(),
    lore: str(),
  };
}

function skillRequired() {
  return Object.keys(skillProps());
}

function skillExample(skillId, slug, name, category) {
  return meta({
    skill_id: skillId,
    slug,
    name,
    category: 'SKC001',
    type: 'physical',
    affiliation: null,
    element: null,
    power: 40,
    accuracy: 95,
    critical_rate: 5,
    mana_cost: 0,
    stamina_cost: 8,
    faith_cost: 0,
    cooldown: 0,
    cast_time: 0,
    range: 'melee',
    area_pattern: 'single',
    target_type: 'TGT001',
    priority: 0,
    animation_id: `anim_${slug}`,
    sound_id: `sfx_${slug}`,
    icon: slug,
    icon_filename: `icon_${skillId}_${slug}.png`,
    effect_animation_filename: `effect_${skillId}_${slug}.png`,
    cast_animation_filename: `cast_${skillId}_${slug}.png`,
    impact_animation_filename: `impact_${skillId}_${slug}.png`,
    icon_prompt: `Create a clean 2D RPG skill icon for ALAMAT. Skill: ${name}. Element/Affiliation: neutral. Category: ${category}. Style: readable at 32x32 and 64x64, magical Filipino fantasy RPG aesthetic, transparent background, no text, no UI.`,
    effect_prompt: `Create a transparent skill effect animation concept for ${name}, with readable magical motion and no UI text.`,
    animation_prompt: `Animate ${name} with clear cast, travel, and impact beats suitable for a 2D RPG battle scene.`,
    sound_effect_prompt: `Design a short polished RPG sound effect for ${name}, matching its category and impact without spoken words.`,
    status_effect_id: null,
    status_chance: 0,
    can_crit: true,
    can_miss: true,
    required_weapon: null,
    required_class: null,
    required_affiliation: null,
    required_weather: null,
    required_terrain: null,
    required_time: null,
    ai_weight: 1,
    description: `${name} is an example ${category} skill schema record.`,
    lore: 'Example lore text for architecture validation.',
  });
}

function formulaProps(kind) {
  return {
    formula_id: idString('FRM'),
    name: str(),
    kind: enumOf(['physical', 'magic', 'healing', 'critical', 'status', 'counter', 'reflect', 'capture', 'escape', 'summon', 'dot', 'hot', kind]),
    expression: str(),
    variables: arr('string'),
    clamps: arr('object'),
    rounding: enumOf(['none', 'floor', 'ceil', 'round']),
    documentation: str(),
  };
}

function formulaExample(formulaId, slug, kind) {
  return meta({ formula_id: formulaId, slug, name: slug.replaceAll('-', ' '), kind, expression: '(power + attack) * defense_modifier', variables: ['power', 'attack', 'defense_modifier'], clamps: [{ min: 1 }], rounding: 'floor', documentation: 'Example formula record; production tuning belongs in balance passes.' });
}

function battlefieldProps(kind) {
  return {
    [`${kind}_id`]: idString(kind === 'weather' ? 'WTH' : 'TRN'),
    name: str(),
    phase_b_code: nullableRef(`${kind}.phase_b_code`),
    duration: duration(),
    modifiers: arr('object'),
    affected_affiliations: arr('string'),
    description: str(),
  };
}

function battlefieldExample(id, slug, name, kind) {
  return meta({ [`${kind}_id`]: id, slug, name, phase_b_code: null, duration: { type: 'battle', value: 1 }, modifiers: [], affected_affiliations: [], description: `Example ${kind} definition.` });
}

function battlefieldEffectProps() {
  return { field_effect_id: idString('BFE'), name: str(), trigger: str(), duration: duration(), formula_modifiers: arr('object'), affected_affiliations: arr('string'), description: str() };
}

function aiProfileProps() {
  return { ai_profile_id: idString('AIP'), name: str(), decision_tree: arr('object'), priority_table: arr('object'), target_selection: str(), resource_management: { type: 'object' }, escape_logic: { type: 'object' }, description: str() };
}

function targetingProps() {
  return { targeting_profile_id: idString('TGP'), name: str(), target_type: enumOf(['single', 'row', 'column', 'aoe', 'cross', 'cone', 'chain', 'random', 'lowest_hp', 'highest_attack', 'nearest', 'farthest', 'self', 'ally', 'entire_party', 'entire_battlefield']), filters: arr('string'), tie_breaker: str(), description: str() };
}

function scalingProps() {
  return { scaling_id: idString('SCL'), applies_to: str(), reference_id: str(), stat_multipliers: { type: 'object' }, ai_modifier: num(0), loot_modifier: num(0), capture_modifier: num(0), experience_modifier: num(0) };
}

function statGrowthProps() {
  return { growth_id: idString('GRW'), class_id: nullableRef('combat_classes.code'), growth_curve: enumOf(['slow', 'medium', 'fast', 'legend']), per_level: { type: 'object' }, formula_id: ref('formula_id') };
}

function comboProps() {
  return { combo_id: idString('CMB'), required_monster_ids: arr('string'), required_skill_ids: arr('string'), result_skill_id: ref('skill_id'), conditions: arr('string'), cooldown: int(0), description: str() };
}

function eventProps() {
  return { event_id: idString('EVT'), name: str(), trigger: str(), duration: duration(), modifiers: arr('object'), description: str() };
}

function learningProps(type) {
  return { learning_id: idString('LRN'), learner_type: enumOf(['monster', 'npc', type]), learner_id: str(), skill_id: ref('skill_id'), unlock_method: enumOf(['level', 'quest', 'affinity', 'equipment', 'npc_mentor', 'ancient_scroll', 'shrine', 'legend_event']), unlock_value: str(), prerequisites: arr('string') };
}

function balanceProps() {
  return { rule_id: idString('BAL'), name: str(), scope: str(), rule_type: enumOf(['range', 'limit', 'multiplier', 'benchmark', 'cost', 'cooldown', 'ai']), value: { type: 'object' }, rationale: str() };
}

function idString(prefix) {
  return { type: 'string', pattern: `^${prefix.replaceAll('_', '-')}-?[A-Z0-9-]+$` };
}

function str() {
  return { type: 'string', minLength: 1 };
}

function ref(name) {
  return { type: 'string', minLength: 1, description: `Reference to ${name}; resolve through Combat Bible registry or Phase B library.` };
}

function nullableRef(name) {
  return { anyOf: [ref(name), { type: 'null' }] };
}

function refOrExpression() {
  return { type: 'string', minLength: 1, description: 'Formula reference or documented condition expression.' };
}

function enumOf(values) {
  return { type: 'string', enum: [...new Set(values)] };
}

function bool() {
  return { type: 'boolean' };
}

function int(min = undefined, max = undefined) {
  const schema = { type: 'integer' };
  if (min !== undefined) schema.minimum = min;
  if (max !== undefined) schema.maximum = max;
  return schema;
}

function num(min = undefined) {
  const schema = { type: 'number' };
  if (min !== undefined) schema.minimum = min;
  return schema;
}

function arr(itemType) {
  return { type: 'array', items: itemType === 'object' ? { type: 'object' } : { type: itemType } };
}

function duration() {
  return {
    type: 'object',
    additionalProperties: false,
    properties: { type: enumOf(['instant', 'turns', 'rounds', 'battle', 'permanent']), value: int(0) },
    required: ['type', 'value'],
  };
}
