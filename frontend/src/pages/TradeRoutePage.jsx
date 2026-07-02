import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { TradeRouteMap } from '../components/TradeRouteMap'
import { EconomyService } from '../services/EconomyService'

export function TradeRoutePage() {
  const [routes, setRoutes] = useState([])
  useEffect(() => { EconomyService.getTradeRoutes().then(setRoutes) }, [])
  return <div className="space-y-8"><PageHeader kicker="Phase J" title="Trade Routes" description="Regional goods flow, risk levels, travel times, and price effects." /><TradeRouteMap routes={routes} /></div>
}
