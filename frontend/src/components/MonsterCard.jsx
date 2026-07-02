import { Link } from 'react-router-dom'
import { MonsterBadgeList } from './MonsterBadgeList'

export function MonsterCard({ monster }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#222819]/90 p-5 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#c7a563]">{monster.monster_id}</p>
          <h3 className="mt-1 text-2xl font-black text-[#fff6df]">{monster.filipino_name}</h3>
          <p className="text-sm text-[#b8a986]">{monster.english_name}</p>
        </div>
        <span className="rounded-md border border-[#d8b765]/30 px-2 py-1 text-xs font-bold uppercase text-[#f7d98b]">
          {monster.rarity?.name ?? 'Unknown'}
        </span>
      </div>
      <p className="mb-4 line-clamp-3 text-sm leading-6 text-[#d9ceb7]">{monster.folklore_summary}</p>
      <div className="space-y-3">
        <MonsterBadgeList items={monster.affiliations} />
        <div className="grid grid-cols-2 gap-2 text-xs text-[#d9ceb7]">
          <span>Class: <strong className="text-[#fff6df]">{monster.combat_class?.name ?? 'TBD'}</strong></span>
          <span>Order: <strong className="text-[#fff6df]">{monster.nilalang_order?.name ?? 'TBD'}</strong></span>
          <span>Region: <strong className="text-[#fff6df]">{monster.region_of_origin}</strong></span>
          <span>Trust: <strong className="text-[#fff6df]">{monster.stats?.trust_difficulty ?? 0}</strong></span>
        </div>
      </div>
      <Link className="mt-5 inline-flex rounded-md bg-[#d8b765] px-4 py-2 text-sm font-bold text-[#171b16]" to={`/codex/${monster.slug}`}>
        Open Codex Entry
      </Link>
    </article>
  )
}
