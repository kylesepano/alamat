import { useEffect, useMemo, useState } from 'react'
import { NPCService } from '../services/NPCService'

export function useNPCs(filters = {}) {
  const [npcs, setNPCs] = useState([])
  const [loading, setLoading] = useState(true)
  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    NPCService.getNPCs(JSON.parse(filterKey)).then((payload) => {
      if (mounted) {
        setNPCs(payload.data ?? [])
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [filterKey])

  return { npcs, loading }
}

export function useNPC(npcId) {
  const [npc, setNPC] = useState(null)
  useEffect(() => {
    if (!npcId) return
    NPCService.getNPC(npcId).then(setNPC)
  }, [npcId])
  return npc
}

export function useNPCLookups() {
  const [lookups, setLookups] = useState({ categories: [], roles: [], factions: [] })
  useEffect(() => {
    Promise.all([NPCService.getCategories(), NPCService.getRoles(), NPCService.getFactions()]).then(([categories, roles, factions]) => setLookups({ categories, roles, factions }))
  }, [])
  return lookups
}
