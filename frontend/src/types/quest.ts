export type Quest = {
  quest_id: string
  slug: string
  title: string
  quest_type: string
  region: string
  province?: string
  short_description: string
  category?: { name: string; slug: string }
}
