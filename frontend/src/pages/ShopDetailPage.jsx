import { useParams } from 'react-router-dom'
import { BarterPanel } from '../components/BarterPanel'
import { CurrencyBadge } from '../components/CurrencyBadge'
import { PageHeader } from '../components/PageHeader'
import { PriceModifierPanel } from '../components/PriceModifierPanel'
import { ShopInventoryTable } from '../components/ShopInventoryTable'
import { useShop } from '../hooks/useEconomy'

export function ShopDetailPage() {
  const { shopId } = useParams()
  const shop = useShop(shopId)
  if (!shop) return <p className="text-[#f7d98b]">Loading shop...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={shop.shop_id} title={shop.name} description={shop.shop_type.replaceAll('_', ' ')} />
      <section className="space-y-3">
        <CurrencyBadge currency={shop.currency} />
        <p className="text-[#d8c7a3]">{shop.description}</p>
      </section>
      <ShopInventoryTable inventory={shop.inventory} />
      <PriceModifierPanel payload={shop.price_modifier_payload} />
      <BarterPanel />
    </div>
  )
}
