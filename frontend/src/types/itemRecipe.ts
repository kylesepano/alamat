export interface ItemRecipe {
  recipe_id: string
  output_quantity: number
  recipe_type: string
  ingredients: Array<{ item_id: string; quantity: number }>
  success_rate: string
  gold_cost: number
  description: string
}
