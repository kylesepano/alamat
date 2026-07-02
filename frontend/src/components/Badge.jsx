export function Badge({ children, style }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-[#d8b765]/40 bg-[#d8b765]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#f7d98b]"
      style={style}
    >
      {children}
    </span>
  )
}
