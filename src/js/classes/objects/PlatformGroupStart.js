import PlatformPart from './PlatformPart';
import PlatformTree from './PlatformTree';

export default class PlatformGroupStart extends Phaser.Group {
  constructor(game) {
    super(game);

    this.platformPart = new PlatformPart(game, 0, 0, `P3_T1`);
    this.platformTree = new PlatformTree(game, 0, 0, `I3_T1`);
    this.platformTree.reset(50, -170);

    this.add(this.platformPart);
    this.add(this.platformTree);
  }
}
