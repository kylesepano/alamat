class ReactPhaserBridge {
  constructor() {
    this.events = new EventTarget()
    this.initialSave = null
  }

  setInitialSave(save) {
    this.initialSave = save
  }

  getInitialSave() {
    return this.initialSave
  }

  emit(eventName, detail = {}) {
    this.events.dispatchEvent(new CustomEvent(eventName, { detail }))
  }

  on(eventName, handler) {
    const listener = (event) => handler(event.detail)
    this.events.addEventListener(eventName, listener)
    return () => this.events.removeEventListener(eventName, listener)
  }
}

export const gameBridge = new ReactPhaserBridge()
