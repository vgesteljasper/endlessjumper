export default class PlatformTile extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'platform', frame);

    this.checkWorldBounds = true;
    this.scale.setTo(1.7);
  }
}
