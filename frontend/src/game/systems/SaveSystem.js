import { DEFAULT_SAVE, SAVE_KEY } from '../config/gameConstants'

export class SaveSystem {
  static load() {
    try {
      const raw = window.localStorage.getItem(SAVE_KEY)
      if (!raw) return structuredClone(DEFAULT_SAVE)
      return this.mergeDefaults(JSON.parse(raw))
    } catch {
      return structuredClone(DEFAULT_SAVE)
    }
  }

  static write(save) {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(save))
    return save
  }

  static clear() {
    window.localStorage.removeItem(SAVE_KEY)
  }

  static createCharacter({ name, body, hair, outfit }) {
    const save = structuredClone(DEFAULT_SAVE)
    save.player.name = name.trim() || 'Manlalakbay'
    save.player.appearance = { body, hair, outfit }
    return this.write(save)
  }

  static mergeDefaults(save) {
    const merged = {
      ...structuredClone(DEFAULT_SAVE),
      ...save,
      save_version: DEFAULT_SAVE.save_version,
      player: {
        ...structuredClone(DEFAULT_SAVE.player),
        ...save.player,
        appearance: {
          ...structuredClone(DEFAULT_SAVE.player.appearance),
          ...save.player?.appearance,
        },
      },
      world: {
        ...structuredClone(DEFAULT_SAVE.world),
        ...save.world,
        story_flags: save.world?.story_flags ?? [],
        dialogue_choices: save.world?.dialogue_choices ?? {},
      },
      player_state: {
        ...structuredClone(DEFAULT_SAVE.player_state),
        ...save.player_state,
        spawn: {
          ...structuredClone(DEFAULT_SAVE.player_state.spawn),
          ...save.player_state?.spawn,
        },
      },
      companions: {
        ...structuredClone(DEFAULT_SAVE.companions),
        ...save.companions,
        party_slots: save.companions?.party_slots ?? [save.companions?.active_companion_id ?? null],
        collection: save.companions?.collection ?? [],
        bond_state: save.companions?.bond_state ?? {},
        runtime: save.companions?.runtime ?? {},
        progression: save.companions?.progression ?? {},
        equipment: save.companions?.equipment ?? {},
      },
      battles: {
        ...structuredClone(DEFAULT_SAVE.battles),
        ...save.battles,
      },
      progression: {
        ...structuredClone(DEFAULT_SAVE.progression),
        ...save.progression,
        currencies: {
          ...structuredClone(DEFAULT_SAVE.progression.currencies),
          ...save.progression?.currencies,
        },
        field_log: save.progression?.field_log ?? [],
        reward_log: save.progression?.reward_log ?? [],
        unlocked_skills: save.progression?.unlocked_skills ?? structuredClone(DEFAULT_SAVE.progression.unlocked_skills),
        active_skills: save.progression?.active_skills ?? save.progression?.unlocked_skills?.slice(0, 6) ?? structuredClone(DEFAULT_SAVE.progression.active_skills),
        skill_unlock_log: save.progression?.skill_unlock_log ?? [],
        stat_points: save.progression?.stat_points ?? 0,
        allocated_stats: {
          ...structuredClone(DEFAULT_SAVE.progression.allocated_stats),
          ...save.progression?.allocated_stats,
        },
      },
      inventory: {
        ...structuredClone(DEFAULT_SAVE.inventory),
        ...save.inventory,
        items: {
          ...structuredClone(DEFAULT_SAVE.inventory.items),
          ...save.inventory?.items,
        },
        equipment: save.inventory?.equipment ?? [],
      },
      equipment: {
        ...structuredClone(DEFAULT_SAVE.equipment),
        ...save.equipment,
        slots: {
          ...structuredClone(DEFAULT_SAVE.equipment.slots),
          ...save.equipment?.slots,
        },
      },
      quests: {
        ...structuredClone(DEFAULT_SAVE.quests),
        ...save.quests,
        active: save.quests?.active ?? {},
        completed: save.quests?.completed ?? {},
        log: save.quests?.log ?? [],
      },
    }

    return migrateMergedSanIsidroLocations(merged)
  }
}

const MERGED_SAN_ISIDRO_DESTINATIONS = {
  WLOC000002: { x: 984, y: 840 },
  WLOC000003: { x: 1512, y: 888 },
}

function migrateMergedSanIsidroLocations(save) {
  const worldDestination = MERGED_SAN_ISIDRO_DESTINATIONS[save.world.location_id]
  if (worldDestination) {
    save.world.location_id = 'WLOC000001'
    save.world.x = worldDestination.x
    save.world.y = worldDestination.y
  }

  const spawnDestination = MERGED_SAN_ISIDRO_DESTINATIONS[save.player_state.spawn.location_id]
  if (spawnDestination) {
    save.player_state.spawn.location_id = 'WLOC000001'
    save.player_state.spawn.x = spawnDestination.x
    save.player_state.spawn.y = spawnDestination.y
  }

  return save
}
