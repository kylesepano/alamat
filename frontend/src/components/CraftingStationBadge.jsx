import { ItemBadge } from './ItemBadge'

export function CraftingStationBadge({ station }) {
  return <ItemBadge tone="green">{station?.name ?? 'Any station'}</ItemBadge>
}
