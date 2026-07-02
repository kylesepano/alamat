import { PageHeader } from '../components/PageHeader'
import { ProductionMetricGrid } from '../components/ProductionMetricGrid'
import { useAnalyticsSummary } from '../hooks/useProduction'

export function AnalyticsDashboardPage() {
  const { data } = useAnalyticsSummary()
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="Analytics Dashboard" description="Opt-in analytics summary for usage, completion, crafting, trust, battle, and content balancing signals." /><ProductionMetricGrid summary={{ imports: data.events, qa_reports: Object.keys(data.by_type ?? {}).length }} /></div>
}
