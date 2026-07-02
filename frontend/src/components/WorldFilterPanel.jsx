import { WorldSearchBar } from './WorldSearchBar'

const locationTypes = ['barangay', 'market', 'chapel', 'forest', 'river', 'mountain', 'dungeon', 'coral_reef', 'spirit_realm', 'boss_arena']

export function WorldFilterPanel({ filters, onChange, lookups }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="grid gap-3 rounded border border-[#5f4528] bg-[#160f09] p-4 md:grid-cols-5">
      <div className="md:col-span-2">
        <WorldSearchBar value={filters.search} onChange={(value) => update('search', value)} />
      </div>
      <select value={filters.type ?? ''} onChange={(event) => update('type', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All types</option>
        {locationTypes.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}
      </select>
      <select value={filters.region ?? ''} onChange={(event) => update('region', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All regions</option>
        {lookups.regions.map((region) => <option key={region.region_id} value={region.slug}>{region.name}</option>)}
      </select>
      <select value={filters.province ?? ''} onChange={(event) => update('province', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All provinces</option>
        {lookups.provinces.map((province) => <option key={province.province_id} value={province.slug}>{province.name}</option>)}
      </select>
    </div>
  )
}
