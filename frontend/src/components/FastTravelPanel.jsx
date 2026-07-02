export function FastTravelPanel({ point }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Fast Travel</h2>
      {point ? <pre className="overflow-auto rounded border border-[#5f4528] bg-[#110b07] p-4 text-xs text-[#b8ddff]">{JSON.stringify(point, null, 2)}</pre> : <p className="text-[#d8c7a3]">Fast travel not enabled.</p>}
    </section>
  )
}
