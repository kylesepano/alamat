export function RecipeIngredientList({ ingredients = [] }) {
  return (
    <div className="space-y-2">
      {ingredients.map((ingredient) => (
        <div key={ingredient.ingredient_id ?? `${ingredient.item_id}-${ingredient.equipment_id}`} className="rounded border border-[#5f4528] bg-[#110b07] px-3 py-2 text-sm text-[#d8c7a3]">
          {ingredient.ingredient_type}: {ingredient.item_id ?? ingredient.equipment_id ?? 'payload'} x{ingredient.quantity}
        </div>
      ))}
    </div>
  )
}
