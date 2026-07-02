import { PageHeader } from '../components/PageHeader'
import { ProductionJobTable } from '../components/ProductionJobTable'
import { useLocalizationStrings } from '../hooks/useProduction'

export function LocalizationManagerPage() {
  const { data: rows } = useLocalizationStrings()
  return <div className="space-y-6"><PageHeader kicker="Phase L" title="Localization Manager" description="Translation-key workflow for dialogue, items, Nilalang, UI, tutorials, quests, and future languages." /><ProductionJobTable rows={rows} columns={[{ key: 'translation_key', label: 'Key' }, { key: 'language_code', label: 'Language' }, { key: 'category', label: 'Category' }, { key: 'status', label: 'Status', badge: true }]} /></div>
}
