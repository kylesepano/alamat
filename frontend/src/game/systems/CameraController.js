export class CameraController {
  constructor(scene, player) {
    this.scene = scene
    this.player = player
  }

  start() {
    this.scene.cameras.main.startFollow(this.player, true, 0.12, 0.12)
    this.scene.cameras.main.setZoom(1)
    this.scene.cameras.main.setRoundPixels(true)
  }
}
