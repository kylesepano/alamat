import { useEffect, useState } from 'react'
import { StoryService } from '../services/StoryService'

const EMPTY_OBJECT = {}
const EMPTY_ARRAY = []
const EMPTY_LORE = { books: [], folk_tales: [], songs: [], poems: [] }
const EMPTY_GRAPH = { nodes: [], edges: [] }

function useStoryQuery(loader, fallback) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    loader().then((payload) => {
      if (mounted) {
        setData(payload ?? fallback)
        setLoading(false)
      }
    }).catch(() => {
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [loader, fallback])

  return { data, loading }
}

export function useStorySummary() { return useStoryQuery(StoryService.getSummary, EMPTY_OBJECT) }
export function useStoryActs() { return useStoryQuery(StoryService.getActs, EMPTY_ARRAY) }
export function useStoryChapters() { return useStoryQuery(StoryService.getChapters, EMPTY_ARRAY) }
export function useStoryScenes() { return useStoryQuery(StoryService.getScenes, EMPTY_ARRAY) }
export function useStoryDialogues() { return useStoryQuery(StoryService.getDialogues, EMPTY_ARRAY) }
export function useStoryTimeline() { return useStoryQuery(StoryService.getTimeline, EMPTY_ARRAY) }
export function useStoryLore() { return useStoryQuery(StoryService.getLore, EMPTY_LORE) }
export function useStoryEndings() { return useStoryQuery(StoryService.getEndings, EMPTY_ARRAY) }
export function useStoryMythology() { return useStoryQuery(StoryService.getMythology, EMPTY_ARRAY) }
export function useStoryRelationships() { return useStoryQuery(StoryService.getRelationships, EMPTY_GRAPH) }
