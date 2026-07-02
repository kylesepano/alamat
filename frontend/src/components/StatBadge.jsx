export function StatBadge({ label, value }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-[#d8b765]/25 bg-black/20 px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#f7d98b]">
      <span className="text-[#b8a986]">{label}</span>
      <span>{value}</span>
    </span>
  )
}
