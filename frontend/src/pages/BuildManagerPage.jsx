import { PageHeader } from '../components/PageHeader'
import { ProductionJobTable } from '../components/ProductionJobTable'
import { useBuildStatus } from '../hooks/useProduction'

export function BuildManagerPage() {
  const { data: rows } = useBuildStatus()
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="Build Manager" description="Build automation tracking for asset optimization, JSON validation, cache generation, minification, version stamping, and manifests." /><ProductionJobTable rows={rows} columns={[{ key: 'build_id', label: 'Build' }, { key: 'environment', label: 'Env' }, { key: 'status', label: 'Status', badge: true }, { key: 'version_stamp', label: 'Version' }]} /></div>
}
