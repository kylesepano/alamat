import { EndingCard } from '../components/EndingCard'
import { PageHeader } from '../components/PageHeader'
import { useStoryEndings } from '../hooks/useStory'

export function EndingGalleryPage() {
  const { data: endings } = useStoryEndings()
  return <div className="space-y-5"><PageHeader kicker="Phase K" title="Ending Gallery" description="True, regional, faction, companion, legendary, hidden, postgame, and expansion ending route definitions." />{endings.map((ending) => <EndingCard key={ending.ending_id} ending={ending} />)}</div>
}
