import { Link } from 'react-router-dom'
import { CraftingStationBadge } from './CraftingStationBadge'
import { ItemBadge } from './ItemBadge'

export function RecipeCard({ recipe }) {
  return (
    <Link to={`/economy/recipes/${recipe.slug}`} className="block rounded border border-[#5f4528] bg-[#1a120b] p-4 transition hover:border-[#f7d98b]">
      <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{recipe.recipe_id}</p>
      <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{recipe.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-[#d8c7a3]">{recipe.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <ItemBadge>{recipe.recipe_type.replaceAll('_', ' ')}</ItemBadge>
        <ItemBadge tone="blue">{recipe.output_type}</ItemBadge>
        <CraftingStationBadge station={recipe.station} />
      </div>
    </Link>
  )
}
