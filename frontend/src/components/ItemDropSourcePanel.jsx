export function ItemDropSourcePanel({ drops = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Drop Sources</h2>
      {drops.length === 0 ? <p className="text-[#d8c7a3]">No drop sources yet.</p> : drops.map((drop, index) => (
        <div key={`${drop.monster_id}-${index}`} className="rounded border border-[#5f4528] bg-[#160f09] p-3 text-sm text-[#d8c7a3]">
          {drop.monster_id} · {Number(drop.drop_rate) * 100}% · {drop.min_quantity}-{drop.max_quantity}
        </div>
      ))}
    </section>
  )
}
