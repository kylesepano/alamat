import { useEffect, useState } from 'react'
import { getGameFoundation } from '../services/foundationService'

export function useFoundationData() {
  const [foundation, setFoundation] = useState(null)
  const [source, setSource] = useState('loading')

  useEffect(() => {
    let isMounted = true

    getGameFoundation().then((result) => {
      if (isMounted) {
        setFoundation(result.data)
        setSource(result.source)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return { foundation, source, isLoading: !foundation }
}
