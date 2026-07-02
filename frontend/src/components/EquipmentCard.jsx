import { Link } from 'react-router-dom'
import { CategoryBadge } from './CategoryBadge'
import { RarityBadge } from './RarityBadge'
import { SlotBadge } from './SlotBadge'

export function EquipmentCard({ equipment }) {
  return (
    <Link to={`/equipment/${equipment.slug}`} className="block rounded border border-[#5f4528] bg-[#1a120b] p-4 transition hover:border-[#f7d98b]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{equipment.equipment_id}</p>
          <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{equipment.name}</h3>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded border border-[#7a5b2f] bg-[#2a1b10] text-xs text-[#f7d98b]">gear</div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-[#d8c7a3]">{equipment.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <CategoryBadge category={equipment.category} />
        <RarityBadge rarity={equipment.rarity} />
        <SlotBadge slot={equipment.slot_type} />
      </div>
    </Link>
  )
}
