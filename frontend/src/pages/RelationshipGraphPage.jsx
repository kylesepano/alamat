import { PageHeader } from '../components/PageHeader'
import { RelationshipGraph } from '../components/RelationshipGraph'
import { useStoryRelationships } from '../hooks/useStory'

export function RelationshipGraphPage() {
  const { data: graph } = useStoryRelationships()
  return <div className="space-y-6"><PageHeader kicker="Phase K" title="Relationship Graph" description="Narrative relationship edges for families, mentors, rivals, companions, factions, secrets, and ending consequences." /><RelationshipGraph graph={graph} /></div>
}
