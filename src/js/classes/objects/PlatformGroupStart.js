import Platform from './Platform';
import Tree from './Tree';

export default class PlatformGroupStart extends Phaser.Group {
  constructor(game) {
    super(game);

    const platformKey = `P3_T1`;
    const treeKey = `I3_T1`;

    // new platform and tree
    this.platform = new Platform(game, 0, 0, platformKey);
    this.tree = new Tree(game, 0, 0, treeKey);
    this.tree.reset(50, - 170);
    this.add(this.platform);
    this.add(this.tree);

    // set bounds of platform
    const platformSprite = this.game.cache.getFrameByName(`platform`, platformKey);
    const platformWidth = platformSprite.width;
    const platformHeight = platformSprite.height;
    this.platform.body.setSize(platformWidth, platformHeight, - 10, 14);
  }
  
}
