import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

function paramsToQuery(params = {}) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

export const MonsterService = {
  async getMonsters(params = {}) {
    const response = await api.get('/monsters', { params: paramsToQuery(params) })
    return response.data
  },
  async getMonsterById(monsterId) {
    const response = await api.get(`/monsters/${monsterId}`)
    return response.data.data
  },
  async getMonsterBySlug(slug) {
    const response = await api.get(`/monsters/slug/${slug}`)
    return response.data.data
  },
  async filterMonsters(params = {}) {
    const response = await api.get('/monsters/filter', { params: paramsToQuery(params) })
    return response.data
  },
  async getMonsterCodexSummary() {
    const response = await api.get('/monster-codex/summary')
    return response.data.data
  },
}
