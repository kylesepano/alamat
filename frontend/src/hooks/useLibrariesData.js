import { useLibraryContext } from './useLibraryContext'

export function useLibrariesData() {
  return useLibraryContext()
}

export function useLibraries() {
  return useLibraryContext()
}

export function useAffiliations() {
  return useLibraryContext().getLibrary('affiliations')
}

export function useCombatClasses() {
  return useLibraryContext().getLibrary('combat_classes')
}

export function useNilalangOrders() {
  return useLibraryContext().getLibrary('nilalang_orders')
}

export function usePersonalityTraits() {
  return useLibraryContext().getLibrary('personality_traits')
}

export function useAiBehaviors() {
  return useLibraryContext().getLibrary('ai_behaviors')
}

export function useTemperaments() {
  return useLibraryContext().getLibrary('temperaments')
}

export function useStatusEffects() {
  return useLibraryContext().getLibrary('status_effects')
}

export function useTrustMethods() {
  return useLibraryContext().getLibrary('trust_methods')
}

export function useHabitats() {
  return useLibraryContext().getLibrary('habitats')
}

export function useWeatherTypes() {
  return useLibraryContext().getLibrary('weather_types')
}

export function useActiveTimes() {
  return useLibraryContext().getLibrary('active_times')
}

export function useRarityTiers() {
  return useLibraryContext().getLibrary('rarity_tiers')
}

export function useGrowthRanks() {
  return useLibraryContext().getLibrary('growth_ranks')
}

export function useEquipmentCategories() {
  return useLibraryContext().getLibrary('equipment_categories')
}

export function useItemCategories() {
  return useLibraryContext().getLibrary('item_categories')
}

export function useSkillCategories() {
  return useLibraryContext().getLibrary('skill_categories')
}

export function useTargetTypes() {
  return useLibraryContext().getLibrary('target_types')
}

export function useDamageTypes() {
  return useLibraryContext().getLibrary('damage_types')
}
