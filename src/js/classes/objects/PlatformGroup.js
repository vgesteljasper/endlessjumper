import PlatformPart from './PlatformPart.js';

export default class PlatformGroup extends Phaser.Group {
  constructor(game, spriteReference = null) {
    super(game);

    if (!spriteReference) {
      let options = [
        `P1_T1`,
        `P2_T1`,
        `P3_T1`,
        `P4_T1`,
        `P5_T1`,
        `P6_T1`
      ];
      spriteReference = options[Math.floor(Math.random()*options.length)];
    }

    this.platformPart = new PlatformPart(game, 0, 0, spriteReference);
    this.add(this.platformPart);
  }

  kill() {
    this.exists = false;
  }

  reset(x, y) {

    // TODO: CHANGE SPRITE WITH RANDOM PLATFORM SPRITE

    this.exists = true;
    this.x = x;
    this.y = y;
  }

}
