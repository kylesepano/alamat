export function SearchBar({ value, onChange }) {
  return (
    <label className="block">
      <span className="sr-only">Search libraries</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, code, slug, description, or rule..."
        className="w-full rounded-lg border border-[#d8b765]/25 bg-[#121610]/90 px-4 py-3 text-[#fff6df] outline-none transition placeholder:text-[#8f846d] focus:border-[#d8b765]"
      />
    </label>
  )
}
