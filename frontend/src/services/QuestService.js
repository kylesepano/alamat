import axios from 'axios'

const api = axios.create({ baseURL: '/api', timeout: 10000 })

function paramsToQuery(params = {}) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

export const QuestService = {
  async getQuests(params = {}) {
    const response = await api.get('/quests', { params: paramsToQuery(params) })
    return response.data
  },
  async getQuest(slug) {
    const response = await api.get(`/quests/slug/${slug}`)
    return response.data.data
  },
  async getCategories() {
    const response = await api.get('/quests/categories')
    return response.data.data
  },
  async getChains() {
    const response = await api.get('/quests/chains')
    return response.data.data
  },
  async getChain(chainId) {
    const response = await api.get(`/quests/chain/${chainId}`)
    return response.data.data
  },
  async getSummary() {
    const response = await api.get('/quest-codex/summary')
    return response.data.data
  },
}
