export type EquipmentStatBlock = {
  hp: number
  mana: number
  faith: number
  stamina: number
  attack: number
  magic: number
  defense: number
  spirit_defense: number
  speed: number
  luck: number
}

export type Equipment = {
  equipment_id: string
  name: string
  slug: string
  slot_type: string
  description: string
  lore: string
  stats: EquipmentStatBlock
  category?: { category_id: string; name: string; slug: string }
  rarity?: { code: string; name: string; slug: string }
}
