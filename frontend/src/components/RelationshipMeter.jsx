export function RelationshipMeter({ npc }) {
  const points = npc.friendship_points ?? 0
  const percent = Math.min(100, Math.round((points / 900) * 100))

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Relationship</h2>
      <div className="rounded border border-[#5f4528] bg-[#160f09] p-4">
        <div className="flex justify-between text-sm text-[#d8c7a3]">
          <span>{npc.relationship_level?.name ?? 'Stranger'}</span>
          <span>{points} friendship · {npc.trust_points} trust</span>
        </div>
        <div className="mt-3 h-3 rounded bg-[#110b07]">
          <div className="h-3 rounded bg-[#d8b765]" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </section>
  )
}
