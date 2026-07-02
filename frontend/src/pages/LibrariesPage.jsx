import { useMemo, useState } from 'react'
import { FilterBar } from '../components/FilterBar'
import { LibraryCategory } from '../components/LibraryCategory'
import { LibraryFilterTabs } from '../components/LibraryFilterTabs'
import { LibraryGrid } from '../components/LibraryGrid'
import { PageHeader } from '../components/PageHeader'
import { SearchBar } from '../components/SearchBar'
import { StatBadge } from '../components/StatBadge'
import { useLibrariesData } from '../hooks/useLibrariesData'

export function LibrariesPage() {
  const { libraries, source, isLoading } = useLibrariesData()
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [activeOnly, setActiveOnly] = useState(true)
  const [pageSize, setPageSize] = useState(24)
  const [page, setPage] = useState(1)

  const visibleKeys = useMemo(() => {
    if (!libraries) {
      return []
    }

    if (activeTab === 'all') {
      return Object.keys(libraries.libraries)
    }

    return libraries.categories[activeTab] ?? []
  }, [activeTab, libraries])

  const visibleEntries = useMemo(() => {
    if (!libraries) {
      return []
    }

    const normalizedSearch = search.trim().toLowerCase()

    return visibleKeys.flatMap((key) =>
      libraries.libraries[key].map((entry) => ({
        ...entry,
        library_key: key,
        library_label: libraries.labels[key],
      })),
    ).filter((entry) => {
      if (activeOnly && !entry.is_active) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return Object.values(entry).some((value) =>
        String(value ?? '').toLowerCase().includes(normalizedSearch),
      )
    })
  }, [activeOnly, libraries, search, visibleKeys])

  if (isLoading) {
    return <div className="text-[#f7d98b]">Loading libraries...</div>
  }

  const totalEntries = Object.values(libraries.libraries).reduce((count, entries) => count + entries.length, 0)
  const totalPages = Math.max(1, Math.ceil(visibleEntries.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginatedEntries = visibleEntries.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div className="space-y-8">
      <PageHeader
        kicker={libraries.meta.phase}
        title="Core Libraries"
        description="Reusable master data for future Nilalang entries, skills, items, quests, habitats, battle rules, and progression systems."
      />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="Libraries" value={Object.keys(libraries.libraries).length} />
        <StatBadge label="Entries" value={totalEntries} />
        <StatBadge label="Showing" value={visibleEntries.length} />
        <StatBadge label="Source" value={source === 'api' ? 'Laravel API' : 'Static JSON'} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {Object.entries(libraries.categories).map(([category, keys]) => (
          <LibraryCategory key={category} title={category.replace('_', ' ')} count={keys.length} />
        ))}
      </div>
      <LibraryFilterTabs activeTab={activeTab} onChange={setActiveTab} />
      <SearchBar value={search} onChange={(value) => { setSearch(value); setPage(1) }} />
      <FilterBar
        activeOnly={activeOnly}
        onActiveOnlyChange={(value) => { setActiveOnly(value); setPage(1) }}
        pageSize={pageSize}
        onPageSizeChange={(value) => { setPageSize(value); setPage(1) }}
      />
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-[#fff6df]">
            {activeTab === 'all' ? 'All Libraries' : activeTab.replace('_', ' ')}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b] disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm font-semibold text-[#d9ceb7]">
              Page {safePage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
        <LibraryGrid entries={paginatedEntries} />
      </div>
    </div>
  )
}
