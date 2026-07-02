import { ItemCard } from './ItemCard'

export function ItemGrid({ items }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <ItemCard key={item.item_id} item={item} />)}</div>
}
