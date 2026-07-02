export function ItemSearchBar({ value, onChange }) {
  return (
    <input
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search items, effects, lore..."
      className="w-full rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-[#fff5d6] outline-none focus:border-[#f7d98b]"
    />
  )
}
