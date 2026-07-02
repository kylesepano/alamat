import { useEffect, useState } from 'react'
import { ItemFilterPanel } from '../components/ItemFilterPanel'
import { ItemGrid } from '../components/ItemGrid'
import { PageHeader } from '../components/PageHeader'
import { StatBadge } from '../components/StatBadge'
import { useItemCategories, useItems } from '../hooks/useItems'
import { ItemService } from '../services/ItemService'

export function ItemCodexPage({ fixedFilters = {}, title = 'Item Codex', description = 'Browse ALAMAT items, materials, offerings, and lore collectibles.' }) {
  const [filters, setFilters] = useState(fixedFilters)
  const [summary, setSummary] = useState(null)
  const categories = useItemCategories()
  const { items, loading } = useItems(filters)

  useEffect(() => {
    ItemService.getSummary().then(setSummary)
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase E" title={title} description={description} />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="Items" value={summary?.total ?? 0} />
        <StatBadge label="Categories" value={summary?.categories ?? 0} />
        <StatBadge label="Asset Ready" value={summary?.asset_ready ?? 0} />
      </div>
      <ItemFilterPanel filters={filters} onChange={setFilters} categories={categories} />
      {loading ? <p className="text-[#f7d98b]">Loading items...</p> : <ItemGrid items={items} />}
    </div>
  )
}
