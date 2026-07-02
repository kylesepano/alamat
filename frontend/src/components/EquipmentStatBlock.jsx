const labels = {
  hp: 'HP',
  mana: 'Mana',
  faith: 'Faith',
  stamina: 'Stamina',
  attack: 'Attack',
  magic: 'Magic',
  defense: 'Defense',
  spirit_defense: 'Spirit Def',
  speed: 'Speed',
  luck: 'Luck',
}

export function EquipmentStatBlock({ stats = {} }) {
  const activeStats = Object.entries(stats).filter(([, value]) => Number(value) !== 0)

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Stat Modifiers</h2>
      {activeStats.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {activeStats.map(([key, value]) => (
            <div key={key} className="rounded border border-[#5f4528] bg-[#160f09] p-3">
              <p className="text-xs uppercase tracking-wide text-[#b8a986]">{labels[key] ?? key}</p>
              <p className="mt-1 text-2xl font-black text-[#f7d98b]">+{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#d8c7a3]">No direct stat modifier.</p>
      )}
    </section>
  )
}
