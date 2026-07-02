import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { StorySummaryGrid } from '../components/StorySummaryGrid'
import { StoryActCard } from '../components/StoryActCard'
import { useStoryActs, useStorySummary } from '../hooks/useStory'

export function StoryCodexPage() {
  const { data: summary } = useStorySummary()
  const { data: acts } = useStoryActs()
  const links = [
    ['Acts', '/story/acts'],
    ['Chapters', '/story/chapters'],
    ['Timeline', '/story/timeline'],
    ['Lore', '/story/lore'],
    ['Dialogues', '/story/dialogues'],
    ['Relationships', '/story/relationships'],
    ['Endings', '/story/endings'],
    ['Mythology', '/story/mythology'],
  ]

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase K" title="Story Codex" description="Canonical narrative architecture for ALAMAT acts, chapters, scenes, dialogue, lore, relationships, choices, endings, and future expansions." />
      <StorySummaryGrid summary={summary} />
      <nav className="flex flex-wrap gap-2">
        {links.map(([label, path]) => <Link key={path} className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#171b16]" to={path}>{label}</Link>)}
      </nav>
      <section className="grid gap-4 lg:grid-cols-2">
        {acts.slice(0, 6).map((act) => <StoryActCard key={act.act_id} act={act} />)}
      </section>
    </div>
  )
}
