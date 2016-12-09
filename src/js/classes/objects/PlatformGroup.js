import PlatformPart from './PlatformPart.js';

export default class PlatformGroup extends Phaser.Group {
  constructor(game, spriteReference = null) {
    super(game);

    if (!spriteReference) {
      let options = [
        [`P1_T1_T`, `P1_T1_B`],
        [`P2_T1_T`, `P2_T1_B`],
        [`P3_T1_T`, `P3_T1_B`],
        [`P4_T1_T`, `P4_T1_B`],
        [`P5_T1_T`, `P5_T1_B`],
        [`P6_T1_T`, `P6_T1_B`]
      ];
      spriteReference = options[Math.floor(Math.random()*options.length)];
    }

    // top part
    this.platformSurface = new PlatformPart(game, 0, 0, spriteReference[0]);
    this.platformSurface.events.onOutOfBounds.add(this.kill, this);

    // bottom part
    this.platformMass = new PlatformPart(game, 0, 20.4, spriteReference[1]);
    game.physics.arcade.enableBody(this.platformMass);
    this.platformMass.body.allowGravity = false;
    this.platformMass.body.immovable = true;

    // add to group
    this.add(this.platformSurface);
    this.add(this.platformMass);
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
