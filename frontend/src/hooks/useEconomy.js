import { useEffect, useMemo, useState } from 'react'
import { EconomyService } from '../services/EconomyService'

export function useRecipes(filters = {}) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const filterKey = useMemo(() => JSON.stringify(filters), [filters])
  useEffect(() => {
    let mounted = true
    setLoading(true)
    EconomyService.getRecipes(JSON.parse(filterKey)).then((payload) => {
      if (mounted) {
        setRecipes(payload.data ?? [])
        setLoading(false)
      }
    })
    return () => { mounted = false }
  }, [filterKey])
  return { recipes, loading }
}

export function useRecipe(recipeId) {
  const [recipe, setRecipe] = useState(null)
  useEffect(() => { if (recipeId) EconomyService.getRecipe(recipeId).then(setRecipe) }, [recipeId])
  return recipe
}

export function useShops(filters = {}) {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const filterKey = useMemo(() => JSON.stringify(filters), [filters])
  useEffect(() => {
    let mounted = true
    setLoading(true)
    EconomyService.getShops(JSON.parse(filterKey)).then((payload) => {
      if (mounted) {
        setShops(payload.data ?? [])
        setLoading(false)
      }
    })
    return () => { mounted = false }
  }, [filterKey])
  return { shops, loading }
}

export function useShop(shopId) {
  const [shop, setShop] = useState(null)
  useEffect(() => { if (shopId) EconomyService.getShop(shopId).then(setShop) }, [shopId])
  return shop
}

export function useCurrencies() {
  const [currencies, setCurrencies] = useState([])
  useEffect(() => { EconomyService.getCurrencies().then(setCurrencies) }, [])
  return currencies
}

export function useCraftingStations() {
  const [stations, setStations] = useState([])
  useEffect(() => { EconomyService.getStations().then(setStations) }, [])
  return stations
}
