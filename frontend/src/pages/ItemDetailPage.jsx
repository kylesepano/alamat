import { useParams } from 'react-router-dom'
import { ItemAssetPromptPanel } from '../components/ItemAssetPromptPanel'
import { ItemDetailPanel } from '../components/ItemDetailPanel'
import { ItemDropSourcePanel } from '../components/ItemDropSourcePanel'
import { ItemEffectPanel } from '../components/ItemEffectPanel'
import { ItemRecipePanel } from '../components/ItemRecipePanel'
import { PageHeader } from '../components/PageHeader'
import { useItem } from '../hooks/useItems'

export function ItemDetailPage() {
  const { slug } = useParams()
  const item = useItem(slug)

  if (!item) return <p className="text-[#f7d98b]">Loading item...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={item.item_id} title={item.name} description={item.item_type.replaceAll('_', ' ')} />
      <ItemDetailPanel item={item} />
      <ItemEffectPanel item={item} />
      <ItemRecipePanel recipes={item.recipes} />
      <ItemDropSourcePanel drops={item.drop_sources} />
      <ItemAssetPromptPanel item={item} />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#fff5d6]">JSON Debug</h2>
        <pre className="overflow-auto rounded border border-[#5f4528] bg-[#110b07] p-4 text-xs text-[#d8c7a3]">{JSON.stringify(item, null, 2)}</pre>
      </section>
    </div>
  )
}
