import { PageHeader } from '../components/PageHeader'
import { useProductionSummary } from '../hooks/useProduction'

export function PromptManagerPage() {
  const { data: summary } = useProductionSummary()
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="Prompt Manager" description="Reproducible, versioned prompt generation for Nilalang, NPCs, items, equipment, skills, maps, cutscenes, props, buildings, and environments." /><div className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5 text-[#d9ceb7]">Tracked prompt records: {summary.asset_pipeline?.prompts ?? 0}</div></div>
}
