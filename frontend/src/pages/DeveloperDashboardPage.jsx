import { PageHeader } from '../components/PageHeader'
import { ProductionLinkGrid } from '../components/ProductionLinkGrid'
import { ProductionMetricGrid } from '../components/ProductionMetricGrid'
import { useProductionSummary } from '../hooks/useProduction'

export function DeveloperDashboardPage() {
  const { data: summary } = useProductionSummary()
  return <div className="space-y-8"><PageHeader kicker="Phase L" title="Developer Dashboard" description="Internal production pipeline status for imports, exports, validation, assets, localization, QA, builds, analytics, saves, and mod support." /><ProductionMetricGrid summary={summary} /><ProductionLinkGrid /></div>
}
