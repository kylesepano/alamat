import { LibraryCard } from './LibraryCard'

export function LibraryGrid({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-[#d8b765]/20 bg-[#222819]/70 p-8 text-center text-[#d9ceb7]">
        No library entries match the current filters.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {entries.map((entry) => (
        <LibraryCard key={entry.code} entry={entry} />
      ))}
    </div>
  )
}
