import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { QuestFilterPanel } from '../components/QuestFilterPanel'
import { QuestList } from '../components/QuestList'
import { StatBadge } from '../components/StatBadge'
import { useQuestCategories, useQuests } from '../hooks/useQuests'
import { QuestService } from '../services/QuestService'

export function QuestCodexPage({ fixedFilters = {}, title = 'Quest Codex', description = 'Browse ALAMAT story, faction, Nilalang trust, festival, hidden, and branching quest templates.' }) {
  const [filters, setFilters] = useState(fixedFilters)
  const [summary, setSummary] = useState(null)
  const categories = useQuestCategories()
  const { quests, loading } = useQuests(filters)

  useEffect(() => {
    QuestService.getSummary().then(setSummary)
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase H" title={title} description={description} />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="Quests" value={summary?.total ?? 0} />
        <StatBadge label="Hidden" value={summary?.hidden ?? 0} />
        <StatBadge label="Repeatable" value={summary?.repeatable ?? 0} />
        <StatBadge label="Asset Ready" value={summary?.asset_ready ?? 0} />
      </div>
      <QuestFilterPanel filters={filters} onChange={setFilters} categories={categories} />
      {loading ? <p className="text-[#f7d98b]">Loading quests...</p> : <QuestList quests={quests} />}
    </div>
  )
}
