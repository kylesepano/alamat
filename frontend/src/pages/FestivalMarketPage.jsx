import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { EconomyService } from '../services/EconomyService'

export function FestivalMarketPage() {
  const [markets, setMarkets] = useState([])
  useEffect(() => { EconomyService.getFestivalMarkets().then(setMarkets) }, [])
  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase J" title="Festival Markets" description="Seasonal markets, special currencies, discounts, and featured goods." />
      <div className="grid gap-4 md:grid-cols-2">{markets.map((market) => <div key={market.festival_market_id} className="rounded border border-[#5f4528] bg-[#1a120b] p-4"><p className="text-xs uppercase tracking-wide text-[#d6a85c]">{market.festival_market_id}</p><h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{market.name}</h3><pre className="mt-3 overflow-auto rounded bg-[#110b07] p-3 text-xs text-[#b8ddff]">{JSON.stringify(market.featured_goods_payload ?? {}, null, 2)}</pre></div>)}</div>
    </div>
  )
}
