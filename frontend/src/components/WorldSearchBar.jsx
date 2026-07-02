export function WorldSearchBar({ value = '', onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search locations, IDs, terrain..."
      className="w-full rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6] placeholder:text-[#8d7b5f]"
    />
  )
}
