import PlatformPart from './PlatformPart.js';

export default class PlatformGroup extends Phaser.Group {
  constructor(game, type) {
    super(game);

    let randomOption;
    let options;

    if (type == `startPlatform`) {
      randomOption = [`P3_T1_T`, `P3_T1_B`];
    } else {
      options = [
        [`P1_T1_T`, `P1_T1_B`],
        [`P2_T1_T`, `P2_T1_B`],
        [`P3_T1_T`, `P3_T1_B`]
      ];
      randomOption = options[Math.floor(Math.random()*options.length)];
    }

    // create platform from platformParts
    this.platformSurface = new PlatformPart(game, 0, 0, randomOption[0]);

    this.platformSurface.scale.setTo(1.7);


    this.platformMass = new PlatformPart(game, 0, 20.4, randomOption[1]);

    game.physics.arcade.enableBody(this.platformMass);
    this.platformMass.body.allowGravity = false;
    this.platformMass.body.immovable = true;

    this.platformMass.scale.setTo(1.7);

    // add parts into group
    this.add(this.platformSurface);
    this.add(this.platformMass);

    this.platformMass.events.onOutOfBounds.add(this.platformOut, this);
  }

  platformOut() {
    this.exists = false;
  }

  // TODO: RESET FUNCTION
}
