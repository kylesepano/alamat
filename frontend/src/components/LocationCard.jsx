import { Link } from 'react-router-dom'
import { ItemBadge } from './ItemBadge'

export function LocationCard({ location }) {
  return (
    <Link to={`/world/locations/${location.slug}`} className="block rounded border border-[#5f4528] bg-[#1a120b] p-4 transition hover:border-[#f7d98b]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{location.location_id}</p>
          <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{location.name}</h3>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded border border-[#7a5b2f] bg-[#2a1b10] text-xs text-[#f7d98b]">map</div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-[#d8c7a3]">{location.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <ItemBadge tone="green">{location.location_type.replaceAll('_', ' ')}</ItemBadge>
        <ItemBadge tone="blue">{location.danger_level ?? 'unknown'}</ItemBadge>
        {location.flags?.fast_travel_enabled ? <ItemBadge>fast travel</ItemBadge> : null}
      </div>
    </Link>
  )
}
