import { Link } from 'react-router-dom'
import { CategoryBadge } from './CategoryBadge'
import { FactionBadge } from './FactionBadge'
import { NPCPortrait } from './NPCPortrait'

export function NPCCard({ npc }) {
  return (
    <Link to={`/npcs/${npc.slug}`} className="block rounded border border-[#5f4528] bg-[#1a120b] p-4 transition hover:border-[#f7d98b]">
      <div className="flex items-start gap-3">
        <NPCPortrait npc={npc} />
        <div>
          <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{npc.npc_id}</p>
          <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{npc.full_name}</h3>
          <p className="text-sm text-[#b8a986]">{npc.title}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-[#d8c7a3]">{npc.biography}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <CategoryBadge category={npc.category} />
        <FactionBadge faction={npc.faction} />
        {npc.recruitable ? <span className="rounded border border-[#7a5b2f]/50 bg-[#21170d] px-2 py-1 text-xs text-[#f7d98b]">companion</span> : null}
      </div>
    </Link>
  )
}
