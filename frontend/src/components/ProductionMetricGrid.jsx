export function ProductionMetricGrid({ summary = {} }) {
  const metrics = [
    ['Imports', summary.imports],
    ['Assets', summary.asset_pipeline?.assets],
    ['Prompts', summary.asset_pipeline?.prompts],
    ['QA Reports', summary.qa_reports],
    ['Builds', summary.builds],
    ['Localization', summary.localization_strings],
    ['Save Versions', summary.save_versions],
    ['Mod Packs', summary.mod_packs],
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#b8a986]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#fff6df]">{value ?? 0}</p>
        </div>
      ))}
    </section>
  )
}
