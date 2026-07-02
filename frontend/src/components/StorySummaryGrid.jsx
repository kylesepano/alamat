export function StorySummaryGrid({ summary = {} }) {
  const metrics = [
    ['Acts', summary.acts],
    ['Chapters', summary.chapters],
    ['Scenes', summary.scenes],
    ['Dialogues', summary.dialogues],
    ['Timeline', summary.timeline_entries],
    ['Endings', summary.ending_routes],
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#b8a986]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#fff6df]">{value ?? 0}</p>
        </div>
      ))}
    </section>
  )
}
