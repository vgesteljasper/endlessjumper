export default class CaveBackground extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'cave', frame);

    this.checkWorldBounds = true;
    this.scale.setTo(2);
  }

  getRandomCave() {
    let options = [`C1`, `C2`];
    return options[Math.floor(Math.random()*options.length)];
  }

  reset(x, y) {
    this.x = x;
    this.y = y;

    this.frame = this.getRandomCave();
  }
}
