export function MonsterAssetPromptPanel({ monster }) {
  return (
    <div className="space-y-4">
      {Object.entries(monster.asset_prompts ?? {}).map(([key, value]) => (
        <section key={key} className="rounded-lg border border-[#d8b765]/20 bg-[#222819] p-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#f7d98b]">{key.replaceAll('_', ' ')}</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#d9ceb7]">{value}</p>
        </section>
      ))}
    </div>
  )
}
