import { PageHeader } from '../components/PageHeader'
import { StoryTimeline } from '../components/StoryTimeline'
import { useStoryTimeline } from '../hooks/useStory'

export function TimelineViewerPage() {
  const { data: timeline } = useStoryTimeline()
  return <div className="space-y-6"><PageHeader kicker="Phase K" title="Timeline Viewer" description="Canonical ALAMAT history from origins through future hooks, with causes, effects, factions, Nilalang, and consequences." /><StoryTimeline entries={timeline} /></div>
}
