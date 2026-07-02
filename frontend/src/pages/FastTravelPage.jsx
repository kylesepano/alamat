import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { WorldService } from '../services/WorldService'

export function FastTravelPage() {
  const [points, setPoints] = useState([])
  useEffect(() => { WorldService.getFastTravel().then(setPoints) }, [])
  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase I" title="Fast Travel" description="Travel unlock points, costs, and future route shortcuts." />
      <div className="grid gap-4 md:grid-cols-2">
        {points.map((point) => <div key={point.fast_travel_id} className="rounded border border-[#5f4528] bg-[#1a120b] p-4"><p className="text-xs uppercase tracking-wide text-[#d6a85c]">{point.fast_travel_id}</p><h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{point.name}</h3><pre className="mt-3 overflow-auto rounded bg-[#110b07] p-3 text-xs text-[#b8ddff]">{JSON.stringify(point.cost_payload ?? {}, null, 2)}</pre></div>)}
      </div>
    </div>
  )
}
