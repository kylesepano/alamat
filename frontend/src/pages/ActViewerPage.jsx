import { PageHeader } from '../components/PageHeader'
import { StoryActCard } from '../components/StoryActCard'
import { useStoryActs } from '../hooks/useStory'

export function ActViewerPage() {
  const { data: acts } = useStoryActs()
  return <div className="space-y-5"><PageHeader kicker="Phase K" title="Act Viewer" description="Prologue through expansion hooks, with themes, level targets, and opening and closing scene anchors." />{acts.map((act) => <StoryActCard key={act.act_id} act={act} />)}</div>
}
