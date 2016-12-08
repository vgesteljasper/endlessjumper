export default class Fox extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, `fox`);

    this.scale.setTo(-1, 1);

    // animations
    this.animations.add(`run`, Phaser.Animation.generateFrameNames(`fox_`, 1, 12, `.png`, 2), 30, true, false);
    this.animations.add(`jump`, Phaser.Animation.generateFrameNames(`fox_`, 14, 40, `.png`, 2), 30, false, false);

    this.run();

    game.physics.arcade.enableBody(this);
    this.body.gravity.y = 4000;
    this.body.collideWorldBounds = true;
  }

  jump() {
    this.body.velocity.y = -1200;
    this.animations.play(`jump`);
  }

  run() {
    this.animations.play(`run`);
  }

}
