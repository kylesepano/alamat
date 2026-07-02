import { PageHeader } from '../components/PageHeader'

export function SaveInspectorPage() {
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="Save Inspector" description="Versioned save architecture for story progress, quests, inventory, equipment, Nilalang trust, relationships, world state, reputation, and settings." /><div className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5 text-[#d9ceb7]">Current save schema is seeded through the production defaults and migration-ready for future save imports.</div></div>
}
