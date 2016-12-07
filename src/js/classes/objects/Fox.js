export default class Fox extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, `foxRun`);

    this.scale.setTo(-1, 1);
    this.animations.add(`run`, Phaser.Animation.generateFrameNames('fox_run', 1, 12, '.png', 2), 20, true, false);
    this.animations.play(`run`);

    game.physics.arcade.enableBody(this);
    this.body.gravity.y = 4000;
    this.body.collideWorldBounds = true;
  }
}
