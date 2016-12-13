export default class Tree extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, `platform`, frame);

    this.scale.setTo(1.7);
  }
}
