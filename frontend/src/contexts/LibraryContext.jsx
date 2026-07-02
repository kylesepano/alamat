import { useEffect, useMemo, useState } from 'react'
import { LibraryService } from '../services/LibraryService'
import { LibraryContext } from './libraryContextCore'

export function LibraryProvider({ children }) {
  const [libraries, setLibraries] = useState(null)
  const [source, setSource] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    LibraryService.getLibraries()
      .then((result) => {
        if (isMounted) {
          setLibraries(result.data)
          setSource(result.source)
        }
      })
      .catch((caughtError) => {
        if (isMounted) {
          setError(caughtError)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      libraries,
      source,
      error,
      isLoading: !libraries && !error,
      getLibrary: (key) => libraries?.libraries?.[key] ?? [],
    }),
    [error, libraries, source],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}
