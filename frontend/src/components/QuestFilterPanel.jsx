import { QuestSearchBar } from './QuestSearchBar'

const questTypes = ['main_story', 'side_quest', 'monster_trust', 'legendary', 'faction', 'npc_relationship', 'daily', 'weekly', 'hidden', 'festival', 'crafting', 'collection', 'investigation', 'tutorial', 'boss_trial', 'companion']
const regions = ['Luzon', 'Visayas', 'Mindanao', 'Kapuluan', 'Spirit Realm']

export function QuestFilterPanel({ filters, onChange, categories }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="grid gap-3 rounded border border-[#5f4528] bg-[#160f09] p-4 md:grid-cols-5">
      <div className="md:col-span-2">
        <QuestSearchBar value={filters.search} onChange={(value) => update('search', value)} />
      </div>
      <select value={filters.category ?? ''} onChange={(event) => update('category', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All categories</option>
        {categories.map((category) => <option key={category.category_id} value={category.slug}>{category.name}</option>)}
      </select>
      <select value={filters.type ?? ''} onChange={(event) => update('type', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All types</option>
        {questTypes.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}
      </select>
      <select value={filters.region ?? ''} onChange={(event) => update('region', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All regions</option>
        {regions.map((region) => <option key={region} value={region}>{region}</option>)}
      </select>
    </div>
  )
}
