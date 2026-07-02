export type CombatBibleModule =
  | 'skills'
  | 'passives'
  | 'status'
  | 'affinity'
  | 'formulas'
  | 'battlefield'
  | 'ai'
  | 'scaling'
  | 'combos'
  | 'events'
  | 'learning'
  | 'balance'

export type CombatBibleVersion = `${number}.${number}.${number}`

export interface CombatBibleMeta {
  id: number
  uuid: string
  slug: string
  created_at: string
  updated_at: string
  version: CombatBibleVersion
  source: string
  notes: string
}

export interface CombatReference {
  id: string
  kind: string
  required?: boolean
}

export interface CombatSkill extends CombatBibleMeta {
  skill_id: string
  name: string
  category: string
  type: 'physical' | 'magical' | 'spiritual' | 'support' | 'healing' | 'status' | 'summon' | 'field' | 'capture'
  affiliation: string | null
  element: string | null
  power: number
  accuracy: number
  critical_rate: number
  mana_cost: number
  stamina_cost: number
  faith_cost: number
  cooldown: number
  cast_time: number
  range: string
  area_pattern: string
  target_type: string
  priority: number
  animation_id: string
  sound_id: string
  icon: string
  status_effect_id: string | null
  status_chance: number
  can_crit: boolean
  can_miss: boolean
  required_weapon: string | null
  required_class: string | null
  required_affiliation: string | null
  required_weather: string | null
  required_terrain: string | null
  required_time: string | null
  ai_weight: number
  description: string
  lore: string
}

export interface CombatPassive extends CombatBibleMeta {
  passive_id: string
  name: string
  trigger: string
  condition: string
  duration: CombatDuration
  stacking: string
  cooldown: number
  effect_formula: string
  icon: string
  animation: string
  lore: string
}

export interface CombatStatusEffect extends CombatBibleMeta {
  status_effect_id: string
  name: string
  duration: CombatDuration
  stack_limit: number
  priority: number
  damage_formula: string | null
  healing_formula: string | null
  removable: boolean
  dispellable: boolean
  immunity: string[]
  animation: string
  icon: string
  ai_weight: number
  description: string
}

export interface CombatFormula extends CombatBibleMeta {
  formula_id: string
  name: string
  kind: string
  expression: string
  variables: string[]
  clamps: Array<Record<string, unknown>>
  rounding: 'none' | 'floor' | 'ceil' | 'round'
  documentation: string
}

export interface CombatDuration {
  type: 'instant' | 'turns' | 'rounds' | 'battle' | 'permanent'
  value: number
}

export interface CombatBibleManifest {
  version: CombatBibleVersion
  phase: 'Phase D'
  name: string
  generated_at: string
  modules: Array<{
    path: string
    module: CombatBibleModule
    category: string
    id_field: string
  }>
}
