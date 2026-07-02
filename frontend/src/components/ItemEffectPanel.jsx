export function ItemEffectPanel({ item }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Effects</h2>
      <p className="text-[#d8c7a3]">{item.effect_summary ?? 'No direct effect.'}</p>
      <pre className="overflow-auto rounded border border-[#5f4528] bg-[#110b07] p-3 text-xs text-[#b8ddff]">{JSON.stringify(item.effect_payload ?? {}, null, 2)}</pre>
    </section>
  )
}
