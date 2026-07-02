import { libraryFilterTabs } from '../constants/libraryTabs'

export function LibraryFilterTabs({ activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-[#d8b765]/20 bg-[#121610]/80 p-2">
      {libraryFilterTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            'rounded-md px-4 py-2 text-sm font-bold transition',
            activeTab === tab.id ? 'bg-[#d8b765] text-[#171b16]' : 'text-[#e7dcc4] hover:bg-white/10',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
