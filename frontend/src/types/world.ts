export type WorldLocation = {
  location_id: string
  slug: string
  name: string
  location_type: string
  description: string
  danger_level?: string
  region?: { name: string; slug: string }
  province?: { name: string; slug: string }
}
