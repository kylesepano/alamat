import { NPCCard } from './NPCCard'

export function NPCGrid({ npcs }) {
  if (!npcs.length) return <p className="text-[#f7d98b]">No NPCs match these filters.</p>

  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{npcs.map((npc) => <NPCCard key={npc.npc_id} npc={npc} />)}</div>
}
