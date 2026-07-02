import { useEffect, useState } from 'react'
import { ProductionService } from '../services/ProductionService'

const EMPTY_ARRAY = []
const EMPTY_OBJECT = {}

function useProductionQuery(loader, fallback) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true
    loader().then((payload) => {
      if (mounted) {
        setData(payload ?? fallback)
        setLoading(false)
      }
    }).catch(() => {
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [loader, fallback])
  return { data, loading }
}

export function useProductionSummary() { return useProductionQuery(ProductionService.getSummary, EMPTY_OBJECT) }
export function useImportStatus() { return useProductionQuery(ProductionService.getImportStatus, EMPTY_ARRAY) }
export function useExportJobs() { return useProductionQuery(ProductionService.getExportJobs, EMPTY_ARRAY) }
export function useValidationReports() { return useProductionQuery(ProductionService.getValidationReports, EMPTY_ARRAY) }
export function useProductionAssets() { return useProductionQuery(ProductionService.getAssets, EMPTY_ARRAY) }
export function useLocalizationStrings() { return useProductionQuery(ProductionService.getLocalization, EMPTY_ARRAY) }
export function useBuildStatus() { return useProductionQuery(ProductionService.getBuildStatus, EMPTY_ARRAY) }
export function useQaReports() { return useProductionQuery(ProductionService.getQaReports, EMPTY_ARRAY) }
export function useAnalyticsSummary() { return useProductionQuery(ProductionService.getAnalyticsSummary, EMPTY_OBJECT) }
export function useModPacks() { return useProductionQuery(ProductionService.getModPacks, EMPTY_ARRAY) }
