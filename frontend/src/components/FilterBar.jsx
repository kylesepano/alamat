export function FilterBar({ activeOnly, onActiveOnlyChange, pageSize, onPageSizeChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[#d8b765]/20 bg-[#121610]/80 p-3">
      <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#e7dcc4]">
        <input
          type="checkbox"
          checked={activeOnly}
          onChange={(event) => onActiveOnlyChange(event.target.checked)}
          className="h-4 w-4 accent-[#d8b765]"
        />
        Active only
      </label>
      <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#e7dcc4]">
        Page size
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="rounded-md border border-[#d8b765]/25 bg-[#171b16] px-2 py-1 text-[#fff6df]"
        >
          {[12, 24, 48, 96].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
