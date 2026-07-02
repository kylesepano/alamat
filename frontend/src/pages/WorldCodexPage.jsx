import { useEffect, useState } from 'react'
import { LocationCard } from '../components/LocationCard'
import { PageHeader } from '../components/PageHeader'
import { RegionCard } from '../components/RegionCard'
import { StatBadge } from '../components/StatBadge'
import { WorldFilterPanel } from '../components/WorldFilterPanel'
import { useLocations, useWorldLookups } from '../hooks/useWorld'
import { WorldService } from '../services/WorldService'

export function WorldCodexPage({ fixedFilters = {}, title = 'World Codex', description = 'Browse ALAMAT regions, provinces, routes, dungeons, shrines, spawns, NPC placements, weather, and map prompts.' }) {
  const [filters, setFilters] = useState(fixedFilters)
  const [summary, setSummary] = useState(null)
  const lookups = useWorldLookups()
  const { locations, loading } = useLocations(filters)

  useEffect(() => {
    WorldService.getSummary().then(setSummary)
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase I" title={title} description={description} />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="Regions" value={summary?.regions ?? 0} />
        <StatBadge label="Provinces" value={summary?.provinces ?? 0} />
        <StatBadge label="Locations" value={summary?.locations ?? 0} />
        <StatBadge label="Dungeons" value={summary?.dungeons ?? 0} />
        <StatBadge label="Asset Ready" value={summary?.asset_ready ?? 0} />
      </div>
      <WorldFilterPanel filters={filters} onChange={setFilters} lookups={lookups} />
      <section className="grid gap-4 md:grid-cols-3">
        {lookups.regions.slice(0, 3).map((region) => <RegionCard key={region.region_id} region={region} />)}
      </section>
      {loading ? <p className="text-[#f7d98b]">Loading locations...</p> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{locations.map((location) => <LocationCard key={location.location_id} location={location} />)}</div>}
    </div>
  )
}
