import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

function paramsToQuery(params = {}) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

export const EquipmentService = {
  async getEquipment(params = {}) {
    const response = await api.get('/equipment', { params: paramsToQuery(params) })
    return response.data
  },
  async getEquipmentBySlug(slug) {
    const response = await api.get(`/equipment/slug/${slug}`)
    return response.data.data
  },
  async getCategories() {
    const response = await api.get('/equipment/categories')
    return response.data.data
  },
  async getSets() {
    const response = await api.get('/equipment/sets')
    return response.data.data
  },
  async getSet(setId) {
    const response = await api.get(`/equipment/sets/${setId}`)
    return response.data.data
  },
  async getSummary() {
    const response = await api.get('/equipment-codex/summary')
    return response.data.data
  },
}
