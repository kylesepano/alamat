export function RegionCard({ region }) {
  return (
    <div className="rounded border border-[#5f4528] bg-[#1a120b] p-4">
      <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{region.region_id}</p>
      <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{region.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-[#d8c7a3]">{region.description}</p>
    </div>
  )
}
