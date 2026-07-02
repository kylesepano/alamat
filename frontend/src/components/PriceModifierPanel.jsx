export function PriceModifierPanel({ payload }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Pricing Rules</h2>
      <pre className="overflow-auto rounded border border-[#5f4528] bg-[#110b07] p-4 text-xs text-[#b8ddff]">{JSON.stringify(payload ?? {}, null, 2)}</pre>
    </section>
  )
}
