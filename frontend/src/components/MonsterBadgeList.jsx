import { TagBadge } from './TagBadge'

export function MonsterBadgeList({ items = [], empty = 'None listed' }) {
  if (!items?.length) {
    return <p className="text-sm text-[#b8a986]">{empty}</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <TagBadge key={item.code ?? item.slug ?? item.name}>{item.name}</TagBadge>
      ))}
    </div>
  )
}
