import { PageHeader } from '../components/PageHeader'
import { ProductionJobTable } from '../components/ProductionJobTable'
import { useProductionAssets } from '../hooks/useProduction'

export function AssetManagerPage() {
  const { data: assets } = useProductionAssets()
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="Asset Manager" description="Track placeholders, AI-generated assets, reviews, approvals, deprecations, artists, prompts, and versions." /><ProductionJobTable rows={assets} columns={[{ key: 'asset_id', label: 'Asset' }, { key: 'asset_type', label: 'Type' }, { key: 'filename', label: 'Filename' }, { key: 'status', label: 'Status', badge: true }, { key: 'approval_status', label: 'Approval', badge: true }]} /></div>
}
