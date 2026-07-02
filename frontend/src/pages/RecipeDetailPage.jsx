import { useParams } from 'react-router-dom'
import { CraftingStationBadge } from '../components/CraftingStationBadge'
import { PageHeader } from '../components/PageHeader'
import { PriceModifierPanel } from '../components/PriceModifierPanel'
import { RecipeIngredientList } from '../components/RecipeIngredientList'
import { useRecipe } from '../hooks/useEconomy'

export function RecipeDetailPage() {
  const { recipeId } = useParams()
  const recipe = useRecipe(recipeId)
  if (!recipe) return <p className="text-[#f7d98b]">Loading recipe...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={recipe.recipe_id} title={recipe.name} description={recipe.recipe_type.replaceAll('_', ' ')} />
      <section className="space-y-3">
        <CraftingStationBadge station={recipe.station} />
        <p className="text-[#d8c7a3]">{recipe.description}</p>
        <p className="text-[#b8a986]">{recipe.lore}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#fff5d6]">Ingredients</h2>
        <RecipeIngredientList ingredients={recipe.ingredients} />
      </section>
      <PriceModifierPanel payload={{ success_rate: recipe.success_rate, gold_cost: recipe.gold_cost, time_cost: recipe.time_cost, experience_reward: recipe.experience_reward }} />
    </div>
  )
}
