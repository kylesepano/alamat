const PERIODS = [
  { id: 'dawn', start: 5, end: 8 },
  { id: 'day', start: 8, end: 17 },
  { id: 'dusk', start: 17, end: 20 },
  { id: 'night', start: 20, end: 29 },
]

const SCHEDULES = {
  NPC000001: {
    dawn: { x: 7, y: 6, activity: 'checking the barangay paths' },
    day: { x: 9, y: 6, activity: 'meeting villagers near the hall' },
    dusk: { x: 7, y: 7, activity: 'closing the day at the plaza' },
    night: { x: 6, y: 6, activity: 'keeping watch near the hall' },
  },
  NPC000002: {
    dawn: { x: 11, y: 8, activity: 'gathering the morning notices' },
    day: { x: 12, y: 7, activity: 'helping new arrivals' },
    dusk: { x: 10, y: 9, activity: 'listening to returning travelers' },
    night: { x: 11, y: 8, activity: 'recording the day in the barangay log' },
  },
  NPC000301: {
    dawn: { x: 5, y: 7, activity: 'opening the store shutters' },
    day: { x: 6, y: 7, activity: 'serving customers' },
    dusk: { x: 5, y: 8, activity: 'counting the remaining supplies' },
    night: { x: 5, y: 7, activity: 'keeping the counter open for late travelers' },
  },
  NPC000481: {
    dawn: { x: 15, y: 7, activity: 'heating the forge' },
    day: { x: 14, y: 7, activity: 'working the anvil' },
    dusk: { x: 15, y: 8, activity: 'sorting finished tools' },
    night: { x: 15, y: 7, activity: 'banking the coals' },
  },
  NPC000004: {
    dawn: { x: 7, y: 8, activity: 'tending the courtyard garden' },
    day: { x: 8, y: 8, activity: 'welcoming courtyard visitors' },
    dusk: { x: 7, y: 9, activity: 'lighting the shared lamps' },
    night: { x: 7, y: 8, activity: 'keeping a quiet vigil' },
  },
  NPC000582: {
    dawn: { x: 15, y: 8, activity: 'reading the wind over the courtyard' },
    day: { x: 14, y: 8, activity: 'speaking with villagers' },
    dusk: { x: 15, y: 9, activity: 'preparing for the forest sounds' },
    night: { x: 16, y: 8, activity: 'watching the path toward Balete' },
  },
  NPC000008: {
    dawn: { x: 4, y: 8, activity: 'checking fresh tracks' },
    day: { x: 5, y: 8, activity: 'marking safe roots' },
    dusk: { x: 4, y: 9, activity: 'listening for the old tree' },
    night: { x: 4, y: 8, activity: 'guarding the forest path' },
  },
  NPC000601: {
    dawn: { x: 12, y: 17, activity: 'reading the river current at the lake inlet' },
    day: { x: 15, y: 16, activity: 'checking community boundary markers' },
    dusk: { x: 11, y: 18, activity: 'recording changes in the shallows' },
    night: { x: 12, y: 17, activity: 'keeping watch beside the Reedwater Balon' },
  },
  NPC000602: {
    dawn: { x: 19, y: 21, activity: 'gathering only mature medicinal leaves' },
    day: { x: 23, y: 20, activity: 'tending the reed nursery' },
    dusk: { x: 20, y: 22, activity: 'sorting herbs away from spawning grass' },
    night: { x: 20, y: 21, activity: 'drying remedies beneath a covered lamp' },
  },
  NPC000603: {
    dawn: { x: 34, y: 11, activity: 'checking the bangka lashings' },
    day: { x: 36, y: 11, activity: 'repairing a paddle beside the jetty' },
    dusk: { x: 35, y: 12, activity: 'drawing the bangka above the evening waterline' },
    night: { x: 34, y: 11, activity: 'watching the distant channel lights' },
  },
}

export function currentWorldPeriod(date = new Date()) {
  const hour = date.getHours()
  return PERIODS.find((period) => {
    const normalizedEnd = period.end > 24 ? period.end - 24 : period.end
    return period.end > 24 ? hour >= period.start || hour < normalizedEnd : hour >= period.start && hour < period.end
  })?.id ?? 'night'
}

export function applyNpcSchedules(map, period = currentWorldPeriod()) {
  return {
    ...map,
    worldPeriod: period,
    objects: (map.objects ?? []).map((object) => {
      const schedule = object.type === 'npc' ? SCHEDULES[object.id]?.[period] : null
      return schedule ? { ...object, ...schedule, worldPeriod: period } : object
    }),
  }
}
