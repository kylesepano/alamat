import { StatBadge } from './StatBadge'
import { TagBadge } from './TagBadge'

export function LibraryCard({ entry }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#222819]/90 p-5 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/20 text-sm font-black uppercase text-white shadow-inner"
            style={{ background: entry.color_hint }}
            title={entry.icon_hint}
          >
            {entry.icon_hint?.slice(0, 2) ?? 'li'}
          </span>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#c7a563]">{entry.code}</p>
            <h3 className="text-xl font-bold text-[#fff6df]">{entry.name}</h3>
          </div>
        </div>
        <TagBadge tone={entry.is_active ? 'green' : 'gold'}>{entry.is_active ? 'Active' : 'Inactive'}</TagBadge>
      </div>
      <p className="min-h-16 text-sm leading-6 text-[#d9ceb7]">{entry.description}</p>
      <div className="mt-4 space-y-2 text-sm text-[#cfc2aa]">
        {entry.theme ? <p><span className="font-bold text-[#f7d98b]">Theme:</span> {entry.theme}</p> : null}
        {entry.battle_role ? <p><span className="font-bold text-[#f7d98b]">Battle role:</span> {entry.battle_role}</p> : null}
        {entry.stat_focus ? <p><span className="font-bold text-[#f7d98b]">Stat focus:</span> {entry.stat_focus}</p> : null}
        {entry.gameplay_role ? <p><span className="font-bold text-[#f7d98b]">Gameplay role:</span> {entry.gameplay_role}</p> : null}
        {entry.behavior_rule ? <p><span className="font-bold text-[#f7d98b]">Behavior:</span> {entry.behavior_rule}</p> : null}
        {entry.effect_type ? <p><span className="font-bold text-[#f7d98b]">Effect:</span> {entry.effect_type}</p> : null}
        {entry.example_use_case ? <p><span className="font-bold text-[#f7d98b]">Example:</span> {entry.example_use_case}</p> : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <StatBadge label="Slug" value={entry.slug} />
        <StatBadge label="Order" value={entry.sort_order} />
        {entry.default_duration ? <StatBadge label="Turns" value={entry.default_duration} /> : null}
        {entry.stackable !== undefined ? <StatBadge label="Stack" value={entry.stackable ? 'Yes' : 'No'} /> : null}
        {entry.rank_order ? <StatBadge label="Rank" value={entry.rank_order} /> : null}
      </div>
    </article>
  )
}
