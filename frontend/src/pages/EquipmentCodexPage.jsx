import { useEffect, useState } from 'react'
import { EquipmentFilterPanel } from '../components/EquipmentFilterPanel'
import { EquipmentGrid } from '../components/EquipmentGrid'
import { PageHeader } from '../components/PageHeader'
import { StatBadge } from '../components/StatBadge'
import { useEquipment, useEquipmentCategories } from '../hooks/useEquipment'
import { EquipmentService } from '../services/EquipmentService'

export function EquipmentCodexPage({ fixedFilters = {}, title = 'Equipment Codex', description = 'Browse ALAMAT weapons, armor, relics, monster gear, and loadout-ready equipment.' }) {
  const [filters, setFilters] = useState(fixedFilters)
  const [summary, setSummary] = useState(null)
  const categories = useEquipmentCategories()
  const { equipment, loading } = useEquipment(filters)

  useEffect(() => {
    EquipmentService.getSummary().then(setSummary)
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase F" title={title} description={description} />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="Equipment" value={summary?.total ?? 0} />
        <StatBadge label="Sets" value={summary?.sets ?? 0} />
        <StatBadge label="Asset Ready" value={summary?.asset_ready ?? 0} />
      </div>
      <EquipmentFilterPanel filters={filters} onChange={setFilters} categories={categories} />
      {loading ? <p className="text-[#f7d98b]">Loading equipment...</p> : <EquipmentGrid equipment={equipment} />}
    </div>
  )
}
