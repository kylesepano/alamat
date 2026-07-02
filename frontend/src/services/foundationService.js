import fallbackFoundation from '../data/game-foundation.json'

export async function getGameFoundation() {
  try {
    const response = await fetch('/api/game-foundation')

    if (!response.ok) {
      throw new Error(`Foundation API returned ${response.status}`)
    }

    const payload = await response.json()

    return {
      data: payload.data,
      source: 'api',
    }
  } catch {
    return {
      data: fallbackFoundation,
      source: 'static',
    }
  }
}
