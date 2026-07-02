export interface ItemCategory {
  category_id: string
  name: string
  slug: string
  description: string
  icon: string
  color_hint: string
}

export interface ItemAssetPrompts {
  icon_filename: string
  sprite_filename: string | null
  thumbnail_filename: string | null
  asset_prompt: string
  icon_prompt: string
  design_notes: string
}

export interface Item {
  item_id: string
  name: string
  slug: string
  item_type: string
  category: ItemCategory
  rarity: { name: string; slug: string; color_hint?: string }
  description: string
  lore: string
  effect_summary: string | null
  effect_payload: Record<string, unknown> | null
  assets: ItemAssetPrompts
}
