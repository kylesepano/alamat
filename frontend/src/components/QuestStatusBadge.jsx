import { ItemBadge } from './ItemBadge'

export function QuestStatusBadge({ quest }) {
  const label = quest.flags?.hidden ? 'hidden' : quest.flags?.repeatable ? 'repeatable' : quest.flags?.time_limited ? 'timed' : 'standard'
  return <ItemBadge tone={quest.flags?.hidden ? 'blue' : 'neutral'}>{label}</ItemBadge>
}
