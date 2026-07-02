import axios from 'axios'

const api = axios.create({ baseURL: '/api', timeout: 10000 })

function paramsToQuery(params = {}) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined))
}

export const EconomyService = {
  async getRecipes(params = {}) {
    const response = await api.get('/economy/recipes', { params: paramsToQuery(params) })
    return response.data
  },
  async getRecipe(recipeId) {
    const response = await api.get(`/economy/recipes/${recipeId}`)
    return response.data.data
  },
  async getShops(params = {}) {
    const response = await api.get('/economy/shops', { params: paramsToQuery(params) })
    return response.data
  },
  async getShop(shopId) {
    const response = await api.get(`/economy/shops/${shopId}`)
    return response.data.data
  },
  async getShopInventory(shopId) {
    const response = await api.get(`/economy/shops/${shopId}/inventory`)
    return response.data.data
  },
  async getCurrencies() {
    const response = await api.get('/economy/currencies')
    return response.data.data
  },
  async getStations() {
    const response = await api.get('/economy/stations')
    return response.data.data
  },
  async getTradeRoutes() {
    const response = await api.get('/economy/trade-routes')
    return response.data.data
  },
  async getFestivalMarkets() {
    const response = await api.get('/economy/festival-markets')
    return response.data.data
  },
  async getSummary() {
    const response = await api.get('/economy-codex/summary')
    return response.data.data
  },
}
