export default class Chicken extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, `chicken`);

    this.scale.setTo(-1, 1);
    this.animations.add(`move`, Phaser.Animation.generateFrameNames(`chicken_`, 38, 39, `.png`, 2), 12, true, false);
    this.move();
  }

  move() {
    this.animations.play(`move`);
  }
}
