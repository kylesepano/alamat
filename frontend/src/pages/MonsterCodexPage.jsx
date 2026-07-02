import { useEffect, useState } from 'react'
import { MonsterFilterPanel } from '../components/MonsterFilterPanel'
import { MonsterGrid } from '../components/MonsterGrid'
import { PageHeader } from '../components/PageHeader'
import { StatBadge } from '../components/StatBadge'
import { useLibraries } from '../hooks/useLibrariesData'
import { MonsterService } from '../services/MonsterService'

export function MonsterCodexPage() {
  const libraries = useLibraries()
  const [filters, setFilters] = useState({})
  const [monsters, setMonsters] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    MonsterService.filterMonsters(filters).then((payload) => {
      if (isMounted) {
        setMonsters(payload.data ?? [])
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [filters])

  useEffect(() => {
    MonsterService.getMonsterCodexSummary().then(setSummary)
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Phase C"
        title="Nilalang Codex"
        description="Browse, search, and filter imported Nilalang entries. This foundation is ready for batch imports without implementing full combat or inventory."
      />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="Total" value={summary?.total ?? 0} />
        <StatBadge label="Active" value={summary?.active ?? 0} />
        <StatBadge label="Recruitable" value={summary?.recruitable ?? 0} />
        <StatBadge label="Bosses" value={summary?.bosses ?? 0} />
      </div>
      <MonsterFilterPanel filters={filters} onChange={setFilters} libraries={libraries} />
      {loading ? <p className="text-[#f7d98b]">Loading Codex...</p> : <MonsterGrid monsters={monsters} />}
    </div>
  )
}
