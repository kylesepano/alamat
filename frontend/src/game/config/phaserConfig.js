import Phaser from 'phaser'
import { GAME_HEIGHT, GAME_WIDTH } from './gameConstants'
import { BootScene } from '../scenes/BootScene'
import { PreloadScene } from '../scenes/PreloadScene'
import { UIScene } from '../scenes/UIScene'
import { WorldScene } from '../scenes/WorldScene'

export function createPhaserConfig(parent) {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#12180f',
    pixelArt: false,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, PreloadScene, WorldScene, UIScene],
  }
}
