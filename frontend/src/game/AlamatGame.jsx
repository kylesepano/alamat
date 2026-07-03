import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { gameBridge } from './bridges/ReactPhaserBridge'
import { createPhaserConfig } from './config/phaserConfig'

export function AlamatGame({ save }) {
  const containerRef = useRef(null)
  const gameRef = useRef(null)
  const initialSaveRef = useRef(save)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return undefined
    gameBridge.setInitialSave(initialSaveRef.current)
    gameRef.current = new Phaser.Game(createPhaserConfig(containerRef.current))

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="h-[78vh] min-h-[640px] overflow-hidden rounded-lg border border-[#d8b765]/25 bg-[#0d120b]" />
}
