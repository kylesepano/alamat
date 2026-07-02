import { useEffect, useMemo, useState } from 'react'
import { QuestService } from '../services/QuestService'

export function useQuests(filters = {}) {
  const [quests, setQuests] = useState([])
  const [loading, setLoading] = useState(true)
  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    QuestService.getQuests(JSON.parse(filterKey)).then((payload) => {
      if (mounted) {
        setQuests(payload.data ?? [])
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [filterKey])

  return { quests, loading }
}

export function useQuest(slug) {
  const [quest, setQuest] = useState(null)
  useEffect(() => {
    if (!slug) return
    QuestService.getQuest(slug).then(setQuest)
  }, [slug])
  return quest
}

export function useQuestCategories() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    QuestService.getCategories().then(setCategories)
  }, [])
  return categories
}

export function useQuestChains() {
  const [chains, setChains] = useState([])
  useEffect(() => {
    QuestService.getChains().then(setChains)
  }, [])
  return chains
}

export function useQuestChain(chainId) {
  const [chain, setChain] = useState(null)
  useEffect(() => {
    if (!chainId) return
    QuestService.getChain(chainId).then(setChain)
  }, [chainId])
  return chain
}
