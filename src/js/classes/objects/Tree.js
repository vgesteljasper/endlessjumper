export default class Tree extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, `platform`, frame);

    this.scale.setTo(1.7);
    this.anchor.setTo(.5, 0);
    this.kill();
  }

  kill() {
    this.exists = false;
  }

  revive(x, y) {
    this.exists = true;
    this.x = x;
    this.y = y;
  }
}
