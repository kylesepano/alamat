import type { Equipment } from './equipment'

export type EquipmentSet = {
  set_id: string
  name: string
  slug: string
  description: string
  lore: string
  set_bonus_payload: Record<string, unknown>
  equipment?: Equipment[]
}
