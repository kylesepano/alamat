import { Link, useParams } from 'react-router-dom'
import { EquipmentGrid } from '../components/EquipmentGrid'
import { PageHeader } from '../components/PageHeader'
import { StatBadge } from '../components/StatBadge'
import { useEquipmentSet, useEquipmentSets } from '../hooks/useEquipment'

export function EquipmentSetsPage() {
  const sets = useEquipmentSets()

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase F" title="Equipment Sets" description="Loadout families for future set bonuses and character builds." />
      <div className="grid gap-4 md:grid-cols-2">
        {sets.map((set) => (
          <Link key={set.set_id} to={`/equipment/sets/${set.slug}`} className="rounded border border-[#5f4528] bg-[#1a120b] p-5 transition hover:border-[#f7d98b]">
            <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{set.set_id}</p>
            <h2 className="mt-1 text-xl font-semibold text-[#fff5d6]">{set.name}</h2>
            <p className="mt-3 text-sm text-[#d8c7a3]">{set.description}</p>
            <div className="mt-4">
              <StatBadge label="Pieces" value={set.equipment?.length ?? 0} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function EquipmentSetDetailPage() {
  const { setId } = useParams()
  const set = useEquipmentSet(setId)

  if (!set) return <p className="text-[#f7d98b]">Loading equipment set...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={set.set_id} title={set.name} description={set.description} />
      <p className="text-[#d8c7a3]">{set.lore}</p>
      <pre className="overflow-auto rounded border border-[#5f4528] bg-[#110b07] p-4 text-xs text-[#b8ddff]">{JSON.stringify(set.set_bonus_payload ?? {}, null, 2)}</pre>
      <EquipmentGrid equipment={set.equipment ?? []} />
    </div>
  )
}
