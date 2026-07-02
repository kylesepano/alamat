import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { gameBridge } from './bridges/ReactPhaserBridge'
import { createPhaserConfig } from './config/phaserConfig'

export function AlamatGame({ save }) {
  const containerRef = useRef(null)
  const gameRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return undefined
    gameBridge.setInitialSave(save)
    gameRef.current = new Phaser.Game(createPhaserConfig(containerRef.current))

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [save])

  return <div ref={containerRef} className="h-[68vh] min-h-[520px] overflow-hidden rounded-lg border border-[#d8b765]/25 bg-[#0d120b]" />
}
