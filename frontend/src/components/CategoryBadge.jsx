import { ItemBadge } from './ItemBadge'

export function CategoryBadge({ category }) {
  return <ItemBadge tone="green">{category?.name ?? 'Uncategorized'}</ItemBadge>
}
