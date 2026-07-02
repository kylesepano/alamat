import { DEFAULT_SAVE, SAVE_KEY } from '../config/gameConstants'

export class SaveSystem {
  static load() {
    try {
      const raw = window.localStorage.getItem(SAVE_KEY)
      if (!raw) return structuredClone(DEFAULT_SAVE)
      return { ...structuredClone(DEFAULT_SAVE), ...JSON.parse(raw) }
    } catch {
      return structuredClone(DEFAULT_SAVE)
    }
  }

  static write(save) {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(save))
    return save
  }

  static clear() {
    window.localStorage.removeItem(SAVE_KEY)
  }

  static createCharacter({ name, body, hair, outfit }) {
    const save = structuredClone(DEFAULT_SAVE)
    save.player.name = name.trim() || 'Manlalakbay'
    save.player.appearance = { body, hair, outfit }
    return this.write(save)
  }
}
