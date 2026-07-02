import { ItemBadge } from './ItemBadge'

export function CurrencyBadge({ currency }) {
  return <ItemBadge tone="blue">{currency?.symbol ?? ''} {currency?.name ?? 'Currency'}</ItemBadge>
}
