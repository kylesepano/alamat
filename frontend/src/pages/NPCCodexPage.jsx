import { useEffect, useState } from 'react'
import { NPCFilterPanel } from '../components/NPCFilterPanel'
import { NPCGrid } from '../components/NPCGrid'
import { PageHeader } from '../components/PageHeader'
import { StatBadge } from '../components/StatBadge'
import { useNPCLookups, useNPCs } from '../hooks/useNPCs'
import { NPCService } from '../services/NPCService'

export function NPCCodexPage({ fixedFilters = {}, title = 'NPC Codex', description = 'Browse ALAMAT characters, factions, schedules, services, shops, trainers, and companion hooks.' }) {
  const [filters, setFilters] = useState(fixedFilters)
  const [summary, setSummary] = useState(null)
  const lookups = useNPCLookups()
  const { npcs, loading } = useNPCs(filters)

  useEffect(() => {
    NPCService.getSummary().then(setSummary)
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase G" title={title} description={description} />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="NPCs" value={summary?.total ?? 0} />
        <StatBadge label="Companions" value={summary?.companions ?? 0} />
        <StatBadge label="Shops" value={summary?.shopkeepers ?? 0} />
        <StatBadge label="Trainers" value={summary?.trainers ?? 0} />
        <StatBadge label="Asset Ready" value={summary?.asset_ready ?? 0} />
      </div>
      <NPCFilterPanel filters={filters} onChange={setFilters} lookups={lookups} />
      {loading ? <p className="text-[#f7d98b]">Loading NPCs...</p> : <NPCGrid npcs={npcs} />}
    </div>
  )
}
