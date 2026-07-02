import { ItemCodexPage } from './ItemCodexPage'

export function QuestItemsPage() {
  return <ItemCodexPage fixedFilters={{ item_type: 'quest_item' }} title="Quest Items" description="Story items, village objects, shrine pieces, and progression materials." />
}
