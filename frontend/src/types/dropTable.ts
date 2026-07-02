export interface DropTable {
  monster_id: string
  item_id: string
  drop_rate: string
  min_quantity: number
  max_quantity: number
  condition: string | null
  is_guaranteed: boolean
}
