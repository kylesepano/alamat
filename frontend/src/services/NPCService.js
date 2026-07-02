import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

function paramsToQuery(params = {}) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

export const NPCService = {
  async getNPCs(params = {}) {
    const response = await api.get('/npcs', { params: paramsToQuery(params) })
    return response.data
  },
  async getNPC(npcId) {
    const response = await api.get(`/npcs/${npcId}`)
    return response.data.data
  },
  async getCategories() {
    const response = await api.get('/npcs/categories')
    return response.data.data
  },
  async getRoles() {
    const response = await api.get('/npcs/roles')
    return response.data.data
  },
  async getFactions() {
    const response = await api.get('/npcs/factions')
    return response.data.data
  },
  async getSummary() {
    const response = await api.get('/npc-codex/summary')
    return response.data.data
  },
}
