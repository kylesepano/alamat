import { useCurrencies, useCraftingStations } from '../hooks/useEconomy'
import { CurrencyBadge } from '../components/CurrencyBadge'
import { CraftingStationBadge } from '../components/CraftingStationBadge'
import { PageHeader } from '../components/PageHeader'

export function EconomyDashboardPage() {
  const currencies = useCurrencies()
  const stations = useCraftingStations()
  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase J" title="Economy Dashboard" description="Currencies, crafting stations, and economy systems overview." />
      <section className="space-y-3"><h2 className="text-xl font-semibold text-[#fff5d6]">Currencies</h2><div className="flex flex-wrap gap-2">{currencies.map((currency) => <CurrencyBadge key={currency.currency_id} currency={currency} />)}</div></section>
      <section className="space-y-3"><h2 className="text-xl font-semibold text-[#fff5d6]">Crafting Stations</h2><div className="flex flex-wrap gap-2">{stations.slice(0, 40).map((station) => <CraftingStationBadge key={station.station_id} station={station} />)}</div></section>
    </div>
  )
}
