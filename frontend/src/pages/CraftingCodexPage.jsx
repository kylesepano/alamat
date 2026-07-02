import { useEffect, useState } from 'react'
import { EconomyEventBanner } from '../components/EconomyEventBanner'
import { PageHeader } from '../components/PageHeader'
import { RecipeCard } from '../components/RecipeCard'
import { StatBadge } from '../components/StatBadge'
import { useRecipes } from '../hooks/useEconomy'
import { EconomyService } from '../services/EconomyService'

export function CraftingCodexPage({ fixedFilters = {}, title = 'Crafting Codex', description = 'Browse ALAMAT recipes for cooking, herbalism, forging, ritual craft, enchanting, monster care, and festival crafting.' }) {
  const [filters] = useState(fixedFilters)
  const [summary, setSummary] = useState(null)
  const { recipes, loading } = useRecipes(filters)

  useEffect(() => { EconomyService.getSummary().then(setSummary) }, [])

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase J" title={title} description={description} />
      <EconomyEventBanner title="Crafting and economy data is source-of-truth JSON driven." />
      <div className="flex flex-wrap gap-2">
        <StatBadge label="Recipes" value={summary?.recipes ?? 0} />
        <StatBadge label="Stations" value={summary?.stations ?? 0} />
        <StatBadge label="Shops" value={summary?.shops ?? 0} />
        <StatBadge label="Currencies" value={summary?.currencies ?? 0} />
      </div>
      {loading ? <p className="text-[#f7d98b]">Loading recipes...</p> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{recipes.map((recipe) => <RecipeCard key={recipe.recipe_id} recipe={recipe} />)}</div>}
    </div>
  )
}
