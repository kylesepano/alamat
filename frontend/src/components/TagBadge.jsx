export function TagBadge({ children, tone = 'gold' }) {
  const tones = {
    gold: 'border-[#d8b765]/40 bg-[#d8b765]/10 text-[#f7d98b]',
    green: 'border-[#6f8f55]/40 bg-[#6f8f55]/15 text-[#cde0b5]',
    blue: 'border-[#2f8ca3]/40 bg-[#2f8ca3]/15 text-[#b7e5ee]',
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  )
}
