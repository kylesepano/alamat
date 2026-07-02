import { PageHeader } from '../components/PageHeader'
import { ProductionJobTable } from '../components/ProductionJobTable'
import { useExportJobs, useImportStatus } from '../hooks/useProduction'

export function ImportCenterPage() {
  const { data: imports } = useImportStatus()
  const { data: exports } = useExportJobs()
  const importColumns = [{ key: 'job_id', label: 'Job' }, { key: 'codex', label: 'Codex' }, { key: 'status', label: 'Status', badge: true }, { key: 'dry_run', label: 'Dry Run' }]
  const exportColumns = [{ key: 'job_id', label: 'Job' }, { key: 'codex', label: 'Codex' }, { key: 'format', label: 'Format' }, { key: 'status', label: 'Status', badge: true }]
  return <div className="space-y-8"><PageHeader kicker="Phase L" title="Import Center" description="Track codex imports, dry runs, reports, rollbacks, and export jobs." /><ProductionJobTable rows={imports} columns={importColumns} /><ProductionJobTable rows={exports} columns={exportColumns} /></div>
}
