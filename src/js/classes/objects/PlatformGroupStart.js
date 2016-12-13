import Platform from './Platform';
import Tree from './Tree';

export default class PlatformGroupStart extends Phaser.Group {
  constructor(game) {
    super(game);

    this.platformPart = new Platform(game, 0, 0, `P3_T1`);
    this.platformTree = new Tree(game, 0, 0, `I3_T1`);
    this.platformTree.reset(50, -170);

    this.add(this.platformPart);
    this.add(this.platformTree);
  }
}
