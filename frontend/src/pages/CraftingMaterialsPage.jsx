import { ItemCodexPage } from './ItemCodexPage'

export function CraftingMaterialsPage() {
  return <ItemCodexPage fixedFilters={{ item_type: 'crafting_material' }} title="Crafting Materials" description="Resources used for crafting, restoration, skill preparation, and future item systems." />
}
