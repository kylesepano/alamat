export type QuestBranch = {
  branch_id: string
  branch_name: string
  moral_alignment?: string
  condition_payload?: Record<string, unknown>
  result_payload?: Record<string, unknown>
}
