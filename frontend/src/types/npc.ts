export type NPC = {
  npc_id: string
  slug: string
  full_name: string
  nickname?: string
  title?: string
  biography?: string
  recruitable: boolean
  category?: { name: string; slug: string }
  role?: { name: string; slug: string }
  faction?: { name: string; slug: string }
  origin?: { region: string; province?: string; hometown?: string }
}
