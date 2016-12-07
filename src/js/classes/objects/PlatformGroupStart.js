import PlatformPart from './PlatformPart.js';

export default class PlatformGroupStart extends Phaser.Group {
  constructor(game) {
    super(game);

    this.platformSurface = new PlatformPart(game, 0, 0, `P3_T1_T`);
    this.add(this.platformSurface);

    this.platformMass = new PlatformPart(game, 0, 12,`P3_T1_B`);
    this.add(this.platformMass);

    this.scale.setTo(1.7);
  }
}
