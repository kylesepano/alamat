import { ItemBadge } from './ItemBadge'

export function RarityBadge({ rarity }) {
  return <ItemBadge tone="blue">{rarity?.name ?? 'Unknown'}</ItemBadge>
}
