export function MonsterStatBlock({ stats }) {
  const rows = [
    ['HP', stats.hp],
    ['Attack', stats.attack],
    ['Magic', stats.magic],
    ['Defense', stats.defense],
    ['Spirit Defense', stats.spirit_defense],
    ['Speed', stats.speed],
    ['Luck', stats.luck],
    ['Faith', stats.faith],
    ['Trust Difficulty', stats.trust_difficulty],
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {rows.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-[#d8b765]/20 bg-[#222819] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#b8a986]">{label}</p>
          <p className="mt-1 text-2xl font-black text-[#f7d98b]">{value ?? 0}</p>
        </div>
      ))}
    </div>
  )
}
