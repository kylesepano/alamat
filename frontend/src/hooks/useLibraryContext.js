import { useContext } from 'react'
import { LibraryContext } from '../contexts/libraryContextCore'

export function useLibraryContext() {
  const context = useContext(LibraryContext)

  if (!context) {
    throw new Error('useLibraryContext must be used inside LibraryProvider')
  }

  return context
}
