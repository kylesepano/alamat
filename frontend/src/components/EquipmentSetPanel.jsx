import { Link } from 'react-router-dom'

export function EquipmentSetPanel({ sets = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Equipment Sets</h2>
      {sets.length ? (
        <div className="flex flex-wrap gap-2">
          {sets.map((set) => (
            <Link key={set.set_id} to={`/equipment/sets/${set.slug ?? set.set_id}`} className="rounded border border-[#7a5b2f] bg-[#160f09] px-3 py-2 text-sm font-semibold text-[#f7d98b] hover:border-[#f7d98b]">
              {set.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[#d8c7a3]">No set membership.</p>
      )}
    </section>
  )
}
