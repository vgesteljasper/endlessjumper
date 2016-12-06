export default class Fox extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, `foxRun`);

    this.anchor.setTo(.5, 1);
    this.scale.setTo(-.8, .8);
    this.animations.add(`run`, Phaser.Animation.generateFrameNames('fox_run', 1, 12, '.png', 2), 30, true, false);
    this.animations.play(`run`);

    this.game.physics.arcade.enableBody(this);
    this.body.gravity.y = 4000;
    this.body.collideWorldBounds = true;
  }
}
