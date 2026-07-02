export function ItemBadge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'border-[#7a5b2f]/50 bg-[#21170d] text-[#f7d98b]',
    green: 'border-[#4f7b52]/50 bg-[#102015] text-[#b7f7bd]',
    blue: 'border-[#3f6f8f]/50 bg-[#101c2a] text-[#b8ddff]',
  }

  return <span className={`rounded border px-2 py-1 text-xs ${tones[tone] ?? tones.neutral}`}>{children}</span>
}
