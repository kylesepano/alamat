export function NPCPlacementPanel({ placements = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">NPC Placements</h2>
      <div className="flex flex-wrap gap-2">
        {placements.map((placement) => <span key={placement.placement_id} className="rounded border border-[#7a5b2f]/50 bg-[#21170d] px-3 py-2 text-xs text-[#f7d98b]">{placement.placement_id}</span>)}
      </div>
    </section>
  )
}
