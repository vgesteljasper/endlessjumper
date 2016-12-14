export default class Chicken extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, `chicken`);

    this.anchor.setTo(.5, 0);
    this.animations.add(`move`, Phaser.Animation.generateFrameNames(`chicken_`, 38, 39, `.png`, 2), 12, true, false);
    game.physics.arcade.enableBody(this);
    this.body.gravity.y = 4000;

    this.kill();
  }

  getRandomNumber() {
    return Math.random();
  }

  setDirection() {
    const random = this.getRandomNumber();
    if (random < .6) {
      this.direction = true;
      this.body.setSize(16, 56, - 12, 0);
      this.scale.setTo(.6, .6);
    } else {
      this.direction = false;
      this.body.setSize(16, 56, 56, 0);
      this.scale.setTo(- .6, .6);
    }
  }

  hasScored() {

  }

  getDirection() {
    return this.direction;
  }

  move() {
    this.animations.play(`move`);
  }

  kill() {
    this.exists = false;
    this.visible = false;
  }

  revive(x, y) {
    this.exists = true;
    this.visible = true;
    this.x = x;
    this.y = y;
    this.move();
    this.setDirection();
  }
}
