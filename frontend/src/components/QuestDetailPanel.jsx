import { CategoryBadge } from './CategoryBadge'
import { QuestStatusBadge } from './QuestStatusBadge'

export function QuestDetailPanel({ quest }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <CategoryBadge category={quest.category} />
        <QuestStatusBadge quest={quest} />
        <span className="rounded border border-[#7a5b2f]/50 px-2 py-1 text-xs text-[#d8c7a3]">{quest.region}</span>
      </div>
      <p className="text-[#d8c7a3]">{quest.full_description}</p>
      <p className="text-[#b8a986]">{quest.lore_context}</p>
    </section>
  )
}
