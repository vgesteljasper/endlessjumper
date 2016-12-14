export default class Fox extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, `fox`);

    this.scale.setTo(- 1, 1);

    // animations
    this.animations.add(`run`, Phaser.Animation.generateFrameNames(`fox_`, 1, 12, `.png`, 2), 30, true, false);
    this.animations.add(`jump`, Phaser.Animation.generateFrameNames(`fox_`, 15, 29, `.png`, 2), 30, false, false);

    this.run();

    game.physics.arcade.enableBody(this);
    this.body.gravity.y = 4000;
    this.body.collideWorldBounds = true;

    this.body.setSize(50, 42, 30, 0);
  }

  jump() {
    this.body.velocity.y = - 1150;
    this.animations.play(`jump`).onComplete.add(this.run, this);
  }

  fall() {
    this.body.collideWorldBounds = false;
  }

  run() {
    this.animations.play(`run`);
  }

}
