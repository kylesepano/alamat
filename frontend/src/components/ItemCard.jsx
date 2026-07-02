import { Link } from 'react-router-dom'
import { CategoryBadge } from './CategoryBadge'
import { RarityBadge } from './RarityBadge'

export function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.slug}`} className="block rounded border border-[#5f4528] bg-[#1a120b] p-4 transition hover:border-[#f7d98b]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{item.item_id}</p>
          <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{item.name}</h3>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded border border-[#7a5b2f] bg-[#2a1b10] text-xs text-[#f7d98b]">icon</div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-[#d8c7a3]">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <CategoryBadge category={item.category} />
        <RarityBadge rarity={item.rarity} />
        <span className="rounded border border-[#7a5b2f]/50 px-2 py-1 text-xs text-[#d8c7a3]">{item.item_type.replaceAll('_', ' ')}</span>
      </div>
    </Link>
  )
}
