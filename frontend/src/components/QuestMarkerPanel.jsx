export function QuestMarkerPanel({ markers = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Quest Markers</h2>
      <div className="flex flex-wrap gap-2">
        {markers.map((marker) => <span key={marker.world_quest_marker_id} className="rounded border border-[#7a5b2f]/50 bg-[#21170d] px-3 py-2 text-xs text-[#f7d98b]">{marker.marker_type?.replaceAll('_', ' ')}</span>)}
      </div>
    </section>
  )
}
