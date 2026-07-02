import { useEffect, useMemo, useState } from 'react'
import { EquipmentService } from '../services/EquipmentService'

export function useEquipment(filters = {}) {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    EquipmentService.getEquipment(JSON.parse(filterKey)).then((payload) => {
      if (mounted) {
        setEquipment(payload.data ?? [])
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [filterKey])

  return { equipment, loading }
}

export function useEquipmentItem(slug) {
  const [equipment, setEquipment] = useState(null)
  useEffect(() => {
    if (!slug) return
    EquipmentService.getEquipmentBySlug(slug).then(setEquipment)
  }, [slug])
  return equipment
}

export function useEquipmentCategories() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    EquipmentService.getCategories().then(setCategories)
  }, [])
  return categories
}

export function useEquipmentSets() {
  const [sets, setSets] = useState([])
  useEffect(() => {
    EquipmentService.getSets().then(setSets)
  }, [])
  return sets
}

export function useEquipmentSet(setId) {
  const [set, setSet] = useState(null)
  useEffect(() => {
    if (!setId) return
    EquipmentService.getSet(setId).then(setSet)
  }, [setId])
  return set
}
