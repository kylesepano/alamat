import { MonsterCard } from './MonsterCard'

export function MonsterGrid({ monsters }) {
  if (!monsters.length) {
    return (
      <div className="rounded-lg border border-[#d8b765]/20 bg-[#222819]/80 p-10 text-center text-[#d9ceb7]">
        No Nilalang entries match the current filters. Import a batch to begin filling the Codex.
      </div>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {monsters.map((monster) => <MonsterCard key={monster.monster_id} monster={monster} />)}
    </div>
  )
}
