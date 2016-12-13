export default class Platform extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'platform', frame);

    this.checkWorldBounds = true;
    game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.scale.setTo(1.7);
  }
}
