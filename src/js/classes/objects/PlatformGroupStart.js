import PlatformPart from './PlatformPart.js';

export default class PlatformGroupStart extends Phaser.Group {
  constructor(game) {
    super(game);

    this.platformSurface = new PlatformPart(game, 0, 0, `P3_T1`);
    this.add(this.platformSurface);
  }
}
