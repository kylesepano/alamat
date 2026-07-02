import { CategoryBadge } from './CategoryBadge'
import { RarityBadge } from './RarityBadge'

export function ItemDetailPanel({ item }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <CategoryBadge category={item.category} />
        <RarityBadge rarity={item.rarity} />
      </div>
      <p className="text-[#d8c7a3]">{item.description}</p>
      <p className="text-[#d8c7a3]">{item.lore}</p>
    </section>
  )
}
