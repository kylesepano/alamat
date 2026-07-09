import { addEquipment, addInventoryItem, equipmentById } from './inventoryRuntimeData'

export const QUEST_DEFINITIONS = {
  QST000001: {
    id: 'QST000001',
    title: 'Arrival in San Isidro',
    category: 'Main Story',
    summary: 'Meet the village anchors, learn basic interaction, and collect a simple field remedy.',
    objectives: [
      { id: 'talk_datu', type: 'talk', target_id: 'NPC000001', label: 'Speak with Datu Magsalin' },
      { id: 'talk_lira', type: 'talk', target_id: 'NPC000002', label: 'Speak with Lira Lakandula' },
      { id: 'collect_herb', type: 'collect', target_id: 'ITM000001', label: 'Pick up the Healing Herb' },
      { id: 'reach_market', type: 'reach', target_id: 'WLOC000002', label: 'Visit the marketplace' },
    ],
    rewards: { pilak: 12, items: [{ id: 'healing_herb', quantity: 1 }] },
    unlocks: ['QST000002'],
  },
  QST000002: {
    id: 'QST000002',
    title: 'Prepare for the Forest',
    category: 'Main Story',
    summary: 'Learn how the barangay prepares travelers before the Balete Forest path.',
    objectives: [
      { id: 'talk_store', type: 'talk', target_id: 'NPC000301', label: 'Visit the General Store' },
      { id: 'talk_smith', type: 'talk', target_id: 'NPC000481', label: 'Visit the Blacksmith' },
      { id: 'talk_babaylan', type: 'talk', target_id: 'NPC000582', label: 'Ask Babaylan Lira about Nilalang trust' },
      { id: 'reach_forest', type: 'reach', target_id: 'WLOC000004', label: 'Enter Balete Forest' },
    ],
    rewards: { pilak: 18, items: [{ id: 'sacred_river_water', quantity: 1 }] },
    unlocks: ['QST000004', 'QST000024'],
  },
  QST000004: {
    id: 'QST000004',
    title: 'Balete Warning',
    category: 'Main Story',
    summary: 'Follow the forest rumors and face the first real danger on the route.',
    objectives: [
      { id: 'talk_kidlat', type: 'talk', target_id: 'NPC000008', label: 'Hear Kidlat Balagtas out' },
      { id: 'defeat_ungo', type: 'defeat', target_id: 'MON0028', label: 'Survive the Ungo encounter' },
      { id: 'meet_aghoy', type: 'defeat', target_id: 'MON0038', label: 'Learn how Aghoy tests travelers' },
      { id: 'reach_shrine', type: 'reach', target_id: 'WLOC000009', label: 'Find the Spirit Shrine threshold' },
    ],
    rewards: { pilak: 24, items: [{ id: 'healing_herb', quantity: 2 }], equipment: [{ id: 'leaf_thread_charm' }] },
    unlocks: ['QST000005'],
  },
  QST000005: {
    id: 'QST000005',
    title: 'Storm Shrine',
    category: 'Main Story',
    summary: 'Confront the nightmare presence and open the first true bond opportunity.',
    objectives: [
      { id: 'defeat_batibat', type: 'defeat', target_id: 'MON0007', label: 'Clear the Batibat presence' },
      { id: 'hear_umalag_advice', type: 'talk', target_id: 'MON0040', label: 'Listen to the Umalagad Echo' },
    ],
    rewards: { pilak: 35, items: [{ id: 'sacred_river_water', quantity: 1 }], equipment: [{ id: 'balete_keepsake' }] },
    completionFlags: ['scene_4_seen', 'first_shrine_boss_cleared'],
    unlocks: [],
  },
  QST000024: {
    id: 'QST000024',
    title: 'Hidden Drum',
    category: 'Side Quest',
    summary: 'Notice the smaller forest signs and recover materials without treating Nilalang as loot.',
    objectives: [
      { id: 'duwende_sign', type: 'defeat', target_id: 'MON0032', label: 'Follow the Duwende mound signs' },
      { id: 'ungo_bark', type: 'item', target_id: 'drum_bark', label: 'Recover Drum Bark from forest rewards' },
    ],
    rewards: { pilak: 10, items: [{ id: 'healing_herb', quantity: 1 }], equipment: [{ id: 'leaf_thread_charm' }] },
    unlocks: [],
  },
  QST000025: {
    id: 'QST000025',
    title: 'Courtyard of Many Stories',
    category: 'Side Quest',
    summary: 'Help Mayumi restore shared gathering places without erasing the different traditions that use them.',
    objectives: [
      { id: 'inspect_garden', type: 'inspect', target_id: 'AMBIENT_CHAPEL_GARDEN', label: 'Tend the courtyard garden' },
      { id: 'inspect_lamps', type: 'inspect', target_id: 'AMBIENT_CHAPEL_LAMPS', label: 'Relight the shared lamps' },
      { id: 'return_mayumi', type: 'talk', target_id: 'NPC000004', label: 'Return to Mayumi Bagwis' },
    ],
    rewards: { pilak: 14, items: [{ id: 'healing_herb', quantity: 2 }] },
    completionFlags: ['courtyard_restored'],
    unlocks: [],
  },
  QST000026: {
    id: 'QST000026',
    title: 'Signs Beneath the Leaves',
    category: 'Side Quest',
    summary: 'Follow Aghoy signs and repair a damaged root crossing without forcing the shy Nilalang to appear.',
    objectives: [
      { id: 'inspect_tracks', type: 'inspect', target_id: 'AMBIENT_AGHOY_TRACKS', label: 'Study the small leaf tracks' },
      { id: 'repair_roots', type: 'inspect', target_id: 'AMBIENT_DAMAGED_ROOTS', label: 'Clear debris from the damaged roots' },
      { id: 'return_kidlat', type: 'talk', target_id: 'NPC000008', label: 'Tell Kidlat what you found' },
    ],
    rewards: { pilak: 16, items: [{ id: 'leaf_basket_fiber', quantity: 1 }] },
    completionFlags: ['aghoy_path_restored'],
    unlocks: [],
  },
  QST000027: {
    id: 'QST000027',
    title: 'Where River Meets Lake',
    category: 'Exploration',
    summary: 'Carry the shrine lesson toward the lakeshore and learn what is disturbing the shallow waters.',
    objectives: [
      { id: 'reach_lakeshore', type: 'reach', target_id: 'WLOC000010', label: 'Find the Laguna Lakeshore' },
      { id: 'meet_steward', type: 'talk', target_id: 'NPC000601', label: 'Ask Ka Amihan about the disturbed current' },
      { id: 'inspect_nets', type: 'inspect', target_id: 'AMBIENT_TANGLED_NETS', label: 'Inspect the abandoned nets' },
      { id: 'meet_mambubuno', type: 'defeat', target_id: 'MON0041', label: 'Understand the Mambubuno current warning' },
    ],
    rewards: { pilak: 30, items: [{ id: 'sacred_river_water', quantity: 1 }] },
    completionFlags: ['lakeshore_warning_understood'],
    unlocks: [],
  },
  QST000028: {
    id: 'QST000028',
    title: 'What the Reeds Must Keep',
    category: 'Side Quest',
    summary: 'Help Aling Sela restore damaged nursery reeds while preserving the plants and water needed by the lakeshore.',
    objectives: [
      { id: 'inspect_nursery', type: 'inspect', target_id: 'AMBIENT_REED_NURSERY', label: 'Support the damaged nursery reeds' },
      { id: 'clear_water', type: 'inspect', target_id: 'AMBIENT_CLEAR_WATER_PATCH', label: 'Clear loose cord from the spawning grass' },
      { id: 'return_sela', type: 'talk', target_id: 'NPC000602', label: 'Report back to Aling Sela' },
    ],
    rewards: { pilak: 18, items: [{ id: 'healing_herb', quantity: 2 }, { id: 'sacred_river_water', quantity: 1 }] },
    completionFlags: ['reed_nursery_restored'],
    unlocks: [],
  },
}

export function questById(questId) {
  return QUEST_DEFINITIONS[questId] ?? null
}

export function ensureQuestState(save) {
  save.quests ??= { tracked_id: null, active: {}, completed: {}, log: [] }
  if (!save.quests.active.QST000001 && !save.quests.completed.QST000001) {
    startQuest(save, 'QST000001')
  }
  return save.quests
}

export function startQuest(save, questId) {
  const quest = questById(questId)
  if (!quest || save.quests.completed[questId] || save.quests.active[questId]) return null
  save.quests.active[questId] = {
    id: questId,
    status: 'active',
    objectives: Object.fromEntries(quest.objectives.map((objective) => [objective.id, 0])),
    started_at: new Date().toISOString(),
  }
  save.quests.tracked_id ??= questId
  save.quests.log.unshift({ quest_id: questId, event: 'started', at: new Date().toISOString() })
  save.quests.log = save.quests.log.slice(0, 30)
  return save.quests.active[questId]
}

export function advanceQuests(save, event) {
  ensureQuestState(save)
  const changes = []
  for (const [questId, state] of Object.entries(save.quests.active)) {
    const quest = questById(questId)
    if (!quest) continue
    let touched = false
    for (const objective of quest.objectives) {
      if (objective.type !== event.type || objective.target_id !== event.target_id) continue
      state.objectives[objective.id] = 1
      touched = true
    }
    if (touched) {
      changes.push({ type: 'progress', quest_id: questId, title: quest.title })
      if (isQuestComplete(quest, state)) {
        completeQuest(save, questId)
        changes.push({ type: 'completed', quest_id: questId, title: quest.title })
      }
    }
  }
  return changes
}

export function advanceItemQuest(save, itemId) {
  return advanceQuests(save, { type: 'item', target_id: itemId })
}

export function completeQuest(save, questId) {
  const quest = questById(questId)
  const state = save.quests.active[questId]
  if (!quest || !state) return null

  delete save.quests.active[questId]
  save.quests.completed[questId] = {
    ...state,
    status: 'completed',
    completed_at: new Date().toISOString(),
  }

  for (const [currency, amount] of Object.entries(quest.rewards?.pilak ? { pilak: quest.rewards.pilak } : {})) {
    save.progression.currencies[currency] = (save.progression.currencies[currency] ?? 0) + amount
  }
  for (const item of quest.rewards?.items ?? []) addInventoryItem(save, item.id, item.quantity)
  for (const equipment of quest.rewards?.equipment ?? []) {
    addEquipment(save, equipment.id)
    const item = equipmentById(equipment.id)
    save.progression.field_log.push({
      source_id: questId,
      name: item?.name ?? equipment.id,
      type: 'quest_equipment_reward',
      acquired_at: new Date().toISOString(),
    })
  }
  save.progression.field_log = save.progression.field_log.slice(-30)
  for (const flag of quest.completionFlags ?? []) {
    if (!save.world.story_flags.includes(flag)) save.world.story_flags.push(flag)
  }
  for (const nextQuestId of quest.unlocks ?? []) startQuest(save, nextQuestId)

  if (save.quests.tracked_id === questId) {
    save.quests.tracked_id = Object.keys(save.quests.active)[0] ?? null
  }
  save.quests.log.unshift({ quest_id: questId, event: 'completed', at: new Date().toISOString() })
  save.quests.log = save.quests.log.slice(0, 30)
  return save.quests.completed[questId]
}

export function trackedQuest(save) {
  const quests = save.quests ?? { tracked_id: null, active: {}, completed: {}, log: [] }
  const questId = quests.tracked_id ?? Object.keys(quests.active).find((activeQuestId) => questById(activeQuestId)) ?? null
  const quest = questById(questId)
  const state = questId ? quests.active[questId] : null
  return quest && state ? { quest, state } : null
}

export function questProgress(quest, state) {
  const done = quest.objectives.filter((objective) => state.objectives[objective.id] >= 1).length
  return { done, total: quest.objectives.length }
}

export function isActiveQuestTarget(save, object) {
  ensureQuestState(save)
  const targetEvents = eventTargetsForObject(object)
  if (targetEvents.length === 0) return false
  return Object.entries(save.quests.active).some(([questId, state]) => {
    const quest = questById(questId)
    return quest?.objectives.some((objective) => {
      if (state.objectives[objective.id] >= 1) return false
      return targetEvents.some((event) => event.type === objective.type && event.target_id === objective.target_id)
    })
  })
}

function eventTargetsForObject(object) {
  if (object.type === 'npc') return [{ type: 'talk', target_id: object.id }]
  if (object.type === 'item') return [{ type: 'collect', target_id: object.id }]
  if (object.type === 'encounter' || object.type === 'boss') return [{ type: 'defeat', target_id: object.id }]
  if (object.type === 'transition') return [{ type: 'reach', target_id: object.target }]
  if (object.type === 'ambient') return [{ type: 'inspect', target_id: object.id }]
  return []
}

function isQuestComplete(quest, state) {
  return quest.objectives.every((objective) => state.objectives[objective.id] >= 1)
}
