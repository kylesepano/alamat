import axios from 'axios'

const api = axios.create({ baseURL: '/api', timeout: 10000 })

export const StoryService = {
  async getSummary() {
    const response = await api.get('/story-codex/summary')
    return response.data.data
  },
  async getActs() {
    const response = await api.get('/story/acts')
    return response.data.data
  },
  async getChapters(params = {}) {
    const response = await api.get('/story/chapters', { params })
    return response.data.data
  },
  async getScenes(params = {}) {
    const response = await api.get('/story/scenes', { params })
    return response.data.data
  },
  async getDialogues() {
    const response = await api.get('/story/dialogues')
    return response.data.data
  },
  async getTimeline() {
    const response = await api.get('/story/timeline')
    return response.data.data
  },
  async getLore() {
    const response = await api.get('/story/lore')
    return response.data.data
  },
  async getEndings() {
    const response = await api.get('/story/endings')
    return response.data.data
  },
  async getMythology() {
    const response = await api.get('/story/mythology')
    return response.data.data
  },
  async getRelationships() {
    const response = await api.get('/story/relationships')
    return response.data.data
  },
}
