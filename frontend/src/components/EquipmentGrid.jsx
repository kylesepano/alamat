import { EquipmentCard } from './EquipmentCard'

export function EquipmentGrid({ equipment }) {
  if (!equipment.length) return <p className="text-[#f7d98b]">No equipment matches these filters.</p>

  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{equipment.map((item) => <EquipmentCard key={item.equipment_id} equipment={item} />)}</div>
}
