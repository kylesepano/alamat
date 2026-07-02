import { useEffect, useState } from 'react'
import { ItemService } from '../services/ItemService'

export function useItems(filters = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    ItemService.getItems(filters).then((payload) => {
      if (mounted) {
        setItems(payload.data ?? [])
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [filters])

  return { items, loading }
}

export function useItem(slug) {
  const [item, setItem] = useState(null)
  useEffect(() => {
    if (!slug) return
    ItemService.getItemBySlug(slug).then(setItem)
  }, [slug])
  return item
}

export function useItemCategories() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    ItemService.getCategories().then(setCategories)
  }, [])
  return categories
}
