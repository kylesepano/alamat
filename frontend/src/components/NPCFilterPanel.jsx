import { NPCSearchBar } from './NPCSearchBar'

const regions = ['Luzon', 'Visayas', 'Mindanao', 'Kapuluan', 'Spirit Realm']

export function NPCFilterPanel({ filters, onChange, lookups }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="grid gap-3 rounded border border-[#5f4528] bg-[#160f09] p-4 md:grid-cols-5">
      <div className="md:col-span-2">
        <NPCSearchBar value={filters.search} onChange={(value) => update('search', value)} />
      </div>
      <select value={filters.category ?? ''} onChange={(event) => update('category', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All categories</option>
        {lookups.categories.map((category) => <option key={category.category_id} value={category.slug}>{category.name}</option>)}
      </select>
      <select value={filters.region ?? ''} onChange={(event) => update('region', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All regions</option>
        {regions.map((region) => <option key={region} value={region}>{region}</option>)}
      </select>
      <select value={filters.faction ?? ''} onChange={(event) => update('faction', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All factions</option>
        {lookups.factions.map((faction) => <option key={faction.faction_id} value={faction.slug}>{faction.name}</option>)}
      </select>
    </div>
  )
}
