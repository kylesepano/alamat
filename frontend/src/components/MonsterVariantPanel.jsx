export function MonsterVariantPanel({ variants }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(variants ?? {}).map(([key, value]) => (
        <section key={key} className="rounded-lg border border-[#d8b765]/20 bg-[#222819] p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#f7d98b]">{key}</h3>
          <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{value || 'No variant notes yet.'}</p>
        </section>
      ))}
    </div>
  )
}
