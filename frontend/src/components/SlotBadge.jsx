import { ItemBadge } from './ItemBadge'

export function SlotBadge({ slot }) {
  return <ItemBadge tone="green">{slot?.replaceAll('_', ' ') ?? 'slot'}</ItemBadge>
}
