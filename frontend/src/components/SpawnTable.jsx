export function SpawnTable({ spawns = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Spawn Zones</h2>
      {spawns.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {spawns.map((spawn) => (
            <div key={spawn.spawn_zone_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4 text-sm text-[#d8c7a3]">
              <p className="font-semibold text-[#fff5d6]">{spawn.spawn_zone_id}</p>
              <p>Rate {spawn.spawn_rate} · Lv {spawn.min_level}-{spawn.max_level}</p>
            </div>
          ))}
        </div>
      ) : <p className="text-[#d8c7a3]">No spawn zones assigned.</p>}
    </section>
  )
}
