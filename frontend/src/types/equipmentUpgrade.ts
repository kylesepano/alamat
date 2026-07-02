import type { Equipment } from './equipment'

export type EquipmentUpgrade = {
  upgrade_id: string
  upgrade_level: number
  required_items: Array<{ item_id: string; quantity: number }>
  required_gold: number
  required_station?: string
  success_rate: number
  description: string
  upgraded_equipment?: Equipment
}
