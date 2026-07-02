import { PageHeader } from '../components/PageHeader'
import { ProductionJobTable } from '../components/ProductionJobTable'
import { useQaReports } from '../hooks/useProduction'

export function QADashboardPage() {
  const { data: rows } = useQaReports()
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="QA Dashboard" description="Automated QA reports for broken quests, missing assets, invalid recipes, equipment, drop tables, map exits, and spawn zones." /><ProductionJobTable rows={rows} columns={[{ key: 'qa_report_id', label: 'Report' }, { key: 'suite', label: 'Suite' }, { key: 'status', label: 'Status', badge: true }, { key: 'report_path', label: 'Path' }]} /></div>
}
