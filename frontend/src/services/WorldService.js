import axios from 'axios'

const api = axios.create({ baseURL: '/api', timeout: 10000 })

function paramsToQuery(params = {}) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

export const WorldService = {
  async getLocations(params = {}) {
    const response = await api.get('/world/locations', { params: paramsToQuery(params) })
    return response.data
  },
  async getLocation(slug) {
    const response = await api.get(`/world/locations/slug/${slug}`)
    return response.data.data
  },
  async getRegions() {
    const response = await api.get('/world/regions')
    return response.data.data
  },
  async getProvinces() {
    const response = await api.get('/world/provinces')
    return response.data.data
  },
  async getRoutes() {
    const response = await api.get('/world/routes')
    return response.data.data
  },
  async getFastTravel() {
    const response = await api.get('/world/fast-travel')
    return response.data.data
  },
  async getEvents() {
    const response = await api.get('/world/events')
    return response.data.data
  },
  async getSummary() {
    const response = await api.get('/world-codex/summary')
    return response.data.data
  },
}
