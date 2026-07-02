import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

function paramsToQuery(params = {}) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

export const ItemService = {
  async getItems(params = {}) {
    const response = await api.get('/items', { params: paramsToQuery(params) })
    return response.data
  },
  async getItemBySlug(slug) {
    const response = await api.get(`/items/slug/${slug}`)
    return response.data.data
  },
  async getCategories() {
    const response = await api.get('/items/categories')
    return response.data.data
  },
  async getSummary() {
    const response = await api.get('/item-codex/summary')
    return response.data.data
  },
}
