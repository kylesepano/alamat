import { SearchBar } from './SearchBar'

function SelectFilter({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#b8a986]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-[#d8b765]/25 bg-[#171b16] px-3 py-2 text-sm text-[#fff6df]"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.code} value={option.slug}>{option.name}</option>
        ))}
      </select>
    </label>
  )
}

export function MonsterFilterPanel({ filters, onChange, libraries }) {
  const set = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <section className="space-y-4 rounded-lg border border-[#d8b765]/20 bg-[#121610]/80 p-4">
      <SearchBar value={filters.search ?? ''} onChange={(value) => set('search', value)} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SelectFilter label="Affiliation" value={filters.affiliation ?? ''} onChange={(value) => set('affiliation', value)} options={libraries.getLibrary('affiliations')} />
        <SelectFilter label="Class" value={filters.class ?? ''} onChange={(value) => set('class', value)} options={libraries.getLibrary('combat_classes')} />
        <SelectFilter label="Rarity" value={filters.rarity ?? ''} onChange={(value) => set('rarity', value)} options={libraries.getLibrary('rarity_tiers')} />
        <SelectFilter label="Order" value={filters.order ?? ''} onChange={(value) => set('order', value)} options={libraries.getLibrary('nilalang_orders')} />
        <SelectFilter label="Habitat" value={filters.habitat ?? ''} onChange={(value) => set('habitat', value)} options={libraries.getLibrary('habitats')} />
        <SelectFilter label="Active Time" value={filters.active_time ?? ''} onChange={(value) => set('active_time', value)} options={libraries.getLibrary('active_times')} />
        <SelectFilter label="Weather" value={filters.weather ?? ''} onChange={(value) => set('weather', value)} options={libraries.getLibrary('weather_types')} />
        <SelectFilter label="Temperament" value={filters.temperament ?? ''} onChange={(value) => set('temperament', value)} options={libraries.getLibrary('temperaments')} />
      </div>
    </section>
  )
}
