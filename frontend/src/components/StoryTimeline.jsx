export function StoryTimeline({ entries = [] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <article key={entry.timeline_id} className="border-l-2 border-[#d8b765] bg-[#151a13]/80 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">Era {entry.sequence_order}</p>
          <h3 className="mt-1 text-xl font-black text-[#fff6df]">{entry.age}</h3>
          <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{entry.summary}</p>
          <div className="mt-3 grid gap-3 text-xs text-[#b8a986] md:grid-cols-2">
            <span>Cause: {entry.cause}</span>
            <span>Effect: {entry.effect}</span>
          </div>
        </article>
      ))}
    </div>
  )
}
