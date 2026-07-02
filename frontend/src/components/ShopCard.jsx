import { Link } from 'react-router-dom'
import { CurrencyBadge } from './CurrencyBadge'
import { ItemBadge } from './ItemBadge'

export function ShopCard({ shop }) {
  return (
    <Link to={`/economy/shops/${shop.slug}`} className="block rounded border border-[#5f4528] bg-[#1a120b] p-4 transition hover:border-[#f7d98b]">
      <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{shop.shop_id}</p>
      <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{shop.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-[#d8c7a3]">{shop.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <ItemBadge>{shop.shop_type.replaceAll('_', ' ')}</ItemBadge>
        <CurrencyBadge currency={shop.currency} />
      </div>
    </Link>
  )
}
