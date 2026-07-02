import axios from 'axios'
import fallbackLibraries from '../data/libraries/index.json'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

async function getLibrary(path, fallbackKey) {
  try {
    const response = await api.get(`/libraries/${path}`)

    return {
      data: response.data.data,
      source: 'api',
    }
  } catch {
    return {
      data: fallbackLibraries.libraries[fallbackKey],
      source: 'static',
    }
  }
}

export const LibraryService = {
  async getLibraries() {
    try {
      const response = await api.get('/libraries')

      return {
        data: response.data.data,
        source: 'api',
      }
    } catch {
      return {
        data: fallbackLibraries,
        source: 'static',
      }
    }
  },
  getAffiliations: () => getLibrary('affiliations', 'affiliations'),
  getCombatClasses: () => getLibrary('combat-classes', 'combat_classes'),
  getNilalangOrders: () => getLibrary('nilalang-orders', 'nilalang_orders'),
  getPersonalityTraits: () => getLibrary('personality-traits', 'personality_traits'),
  getAiBehaviors: () => getLibrary('ai-behaviors', 'ai_behaviors'),
  getTemperaments: () => getLibrary('temperaments', 'temperaments'),
  getStatusEffects: () => getLibrary('status-effects', 'status_effects'),
  getTrustMethods: () => getLibrary('trust-methods', 'trust_methods'),
  getHabitats: () => getLibrary('habitats', 'habitats'),
  getWeatherTypes: () => getLibrary('weather-types', 'weather_types'),
  getActiveTimes: () => getLibrary('active-times', 'active_times'),
  getRarityTiers: () => getLibrary('rarity-tiers', 'rarity_tiers'),
  getGrowthRanks: () => getLibrary('growth-ranks', 'growth_ranks'),
  getEquipmentCategories: () => getLibrary('equipment-categories', 'equipment_categories'),
  getItemCategories: () => getLibrary('item-categories', 'item_categories'),
  getSkillCategories: () => getLibrary('skill-categories', 'skill_categories'),
  getTargetTypes: () => getLibrary('target-types', 'target_types'),
  getDamageTypes: () => getLibrary('damage-types', 'damage_types'),
}
