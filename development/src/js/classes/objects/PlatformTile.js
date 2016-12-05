export default class PlatformTile extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'StartPlatform', frame);

    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = true;
  }
}
