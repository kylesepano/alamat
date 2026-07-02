import { ItemBadge } from './ItemBadge'

export function FactionBadge({ faction }) {
  return <ItemBadge tone="blue">{faction?.name ?? 'Independent'}</ItemBadge>
}
