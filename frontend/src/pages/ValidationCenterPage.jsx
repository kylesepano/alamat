import { PageHeader } from '../components/PageHeader'
import { ProductionJobTable } from '../components/ProductionJobTable'
import { useValidationReports } from '../hooks/useProduction'

export function ValidationCenterPage() {
  const { data: reports } = useValidationReports()
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="Validation Center" description="JSON, duplicate ID, slug, asset, quest, recipe, schedule, map, and reference validation reports." /><ProductionJobTable rows={reports} columns={[{ key: 'report_id', label: 'Report' }, { key: 'scope', label: 'Scope' }, { key: 'status', label: 'Status', badge: true }, { key: 'json_report_path', label: 'JSON Path' }]} /></div>
}
