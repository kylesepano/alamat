import { ItemSearchBar } from './ItemSearchBar'

const itemTypes = ['consumable', 'food', 'herb', 'crafting_material', 'monster_drop', 'quest_item', 'key_item', 'offering', 'relic_material', 'skill_material', 'event_item', 'lore_collectible']
const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']

export function ItemFilterPanel({ filters, onChange, categories }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="grid gap-3 rounded border border-[#5f4528] bg-[#160f09] p-4 md:grid-cols-5">
      <div className="md:col-span-2">
        <ItemSearchBar value={filters.search} onChange={(value) => update('search', value)} />
      </div>
      <select value={filters.category ?? ''} onChange={(event) => update('category', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All categories</option>
        {categories.map((category) => <option key={category.category_id} value={category.slug}>{category.name}</option>)}
      </select>
      <select value={filters.item_type ?? ''} onChange={(event) => update('item_type', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All types</option>
        {itemTypes.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}
      </select>
      <select value={filters.rarity ?? ''} onChange={(event) => update('rarity', event.target.value)} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6]">
        <option value="">All rarities</option>
        {rarities.map((rarity) => <option key={rarity} value={rarity}>{rarity}</option>)}
      </select>
    </div>
  )
}
