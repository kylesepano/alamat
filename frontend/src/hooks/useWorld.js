import { useEffect, useMemo, useState } from 'react'
import { WorldService } from '../services/WorldService'

export function useLocations(filters = {}) {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    WorldService.getLocations(JSON.parse(filterKey)).then((payload) => {
      if (mounted) {
        setLocations(payload.data ?? [])
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [filterKey])

  return { locations, loading }
}

export function useLocation(slug) {
  const [location, setLocation] = useState(null)
  useEffect(() => {
    if (!slug) return
    WorldService.getLocation(slug).then(setLocation)
  }, [slug])
  return location
}

export function useWorldLookups() {
  const [lookups, setLookups] = useState({ regions: [], provinces: [] })
  useEffect(() => {
    Promise.all([WorldService.getRegions(), WorldService.getProvinces()]).then(([regions, provinces]) => setLookups({ regions, provinces }))
  }, [])
  return lookups
}

export function useFastTravelPoints() {
  const [points, setPoints] = useState([])
  useEffect(() => {
    WorldService.getFastTravel().then(setPoints)
  }, [])
  return points
}

export function useWorldRoutes() {
  const [routes, setRoutes] = useState([])
  useEffect(() => {
    WorldService.getRoutes().then(setRoutes)
  }, [])
  return routes
}
