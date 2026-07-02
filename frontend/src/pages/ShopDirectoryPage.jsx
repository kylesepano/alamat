import { PageHeader } from '../components/PageHeader'
import { ShopCard } from '../components/ShopCard'
import { useShops } from '../hooks/useEconomy'

export function ShopDirectoryPage() {
  const { shops, loading } = useShops()
  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase J" title="Shop Directory" description="Browse shops, vendors, currencies, restock rules, and inventories." />
      {loading ? <p className="text-[#f7d98b]">Loading shops...</p> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{shops.map((shop) => <ShopCard key={shop.shop_id} shop={shop} />)}</div>}
    </div>
  )
}
