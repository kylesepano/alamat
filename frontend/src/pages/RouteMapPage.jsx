import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { WorldService } from '../services/WorldService'

export function RouteMapPage() {
  const [routes, setRoutes] = useState([])
  useEffect(() => { WorldService.getRoutes().then(setRoutes) }, [])
  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase I" title="Routes" description="Route connections, encounter rates, travel timing, and future map links." />
      <div className="grid gap-4 md:grid-cols-2">
        {routes.map((route) => <div key={route.route_id} className="rounded border border-[#5f4528] bg-[#1a120b] p-4"><p className="text-xs uppercase tracking-wide text-[#d6a85c]">{route.route_id}</p><h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{route.name}</h3><p className="text-sm text-[#d8c7a3]">{route.route_type} · {route.travel_time_minutes} min · encounter {route.encounter_rate}</p></div>)}
      </div>
    </div>
  )
}
