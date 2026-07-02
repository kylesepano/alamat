import axios from 'axios'

const api = axios.create({ baseURL: '/api', timeout: 10000 })

export const ProductionService = {
  async getSummary() {
    const response = await api.get('/production/summary')
    return response.data.data
  },
  async getImportStatus() {
    const response = await api.get('/production/import-status')
    return response.data.data
  },
  async getExportJobs() {
    const response = await api.get('/production/export-jobs')
    return response.data.data
  },
  async getValidationReports() {
    const response = await api.get('/production/validation-reports')
    return response.data.data
  },
  async getAssets() {
    const response = await api.get('/production/assets')
    return response.data.data
  },
  async getLocalization() {
    const response = await api.get('/production/localization')
    return response.data.data
  },
  async getBuildStatus() {
    const response = await api.get('/production/build-status')
    return response.data.data
  },
  async getQaReports() {
    const response = await api.get('/production/qa-reports')
    return response.data.data
  },
  async getAnalyticsSummary() {
    const response = await api.get('/production/analytics-summary')
    return response.data.data
  },
  async getModPacks() {
    const response = await api.get('/production/mod-packs')
    return response.data.data
  },
}
