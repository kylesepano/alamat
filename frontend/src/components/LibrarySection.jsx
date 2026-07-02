import { LibraryGrid } from './LibraryGrid'
import { TagBadge } from './TagBadge'

export function LibrarySection({ title, entries }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-[#fff6df]">{title}</h2>
        <TagBadge tone="blue">{entries.length} entries</TagBadge>
      </div>
      <LibraryGrid entries={entries} />
    </section>
  )
}
