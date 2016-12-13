export default class PlatformTree extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'platform', frame);

    this.scale.setTo(1.7);
  }
}
