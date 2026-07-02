export function ItemRecipePanel({ recipes = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Recipes</h2>
      {recipes.length === 0 ? <p className="text-[#d8c7a3]">No recipes yet.</p> : recipes.map((recipe) => (
        <div key={recipe.recipe_id} className="rounded border border-[#5f4528] bg-[#160f09] p-3">
          <p className="font-semibold text-[#f7d98b]">{recipe.recipe_id}</p>
          <p className="text-sm text-[#d8c7a3]">{recipe.description}</p>
        </div>
      ))}
    </section>
  )
}
