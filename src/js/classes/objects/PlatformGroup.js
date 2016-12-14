import Platform from './Platform';
import Tree from './Tree';
import Chicken from './Chicken';

export default class PlatformGroup extends Phaser.Group {

  constructor(game, platformKey = null) {
    super(game);

    if (platformKey == null) {
      platformKey = this.getRandomPlatform();
    }

    this.platformPart = new Platform(game, 0, 0, platformKey);

    this.add(this.platformPart);

    const random = this.getRandomNumber();

    //random chicken
    if (random < .4) {
      // platform width
      const chickenWidth = 60;
      const platformWidthChicken = this.game.cache.getFrameByName(`platform`, platformKey).width - chickenWidth;

      //random between 0 and platform width
      const position = this.game.rnd.integerInRange(0, platformWidthChicken) + (chickenWidth / 2);

      // new chicken
      this.chicken = new Chicken(game, position, 25);
      this.add(this.chicken);
    }

  }

  getRandomPlatform() {
    const options = [
      `P1_T1`, `P2_T1`, `P3_T1`, `P4_T1`, `P5_T1`, `P6_T1`,
      `P1_T2`, `P2_T2`
    ];

    return options[Math.floor(Math.random() * options.length)];
  }

  getRandomTree() {
    const options = [
      `I1_T1`, `I2_T1`, `I3_T1`
    ];

    return options[Math.floor(Math.random() * options.length)];
  }

  getRandomTreeAnchor(tree) {
    let anchor = 0;

    switch (tree) {
    case `I1_T1`:
      anchor = .5;
      break;
    case `I2_T1`:
      anchor = .4;
      break;
    case `I3_T1`:
      anchor = .6;
      break;
    default:
      anchor = .5;
    }

    return anchor;
  }

  getRandomNumber() {
    return Math.random();
  }

  kill() {
    this.exists = false;
  }

  reset(x, y, game) {
    // new platform image
    const platformKey = this.getRandomPlatform();

    const random = this.getRandomNumber();

    //random tree
    if (random < .4) {

      // platform width
      const treeMaxWidth = 300;
      const platformWidthTree =  this.game.cache.getFrameByName(`platform`, platformKey).width - treeMaxWidth;

      // random between 0 and platform width
      const position = this.game.rnd.integerInRange(0, platformWidthTree) + (treeMaxWidth / 2);

      // new tree
      const treeKey = this.getRandomTree();
      const treeAnchor = this.getRandomTreeAnchor(treeKey);
      this.platformTree = new Tree(game, position, 20, treeKey);
      this.platformTree.anchor.setTo(treeAnchor, 1);
      this.add(this.platformTree);
    }

    // //random chicken
    // if (random < .3) {
    //   // platform width
    //   const chickenWidth = 60;
    //   const platformWidthChicken = this.game.cache.getFrameByName(`platform`, platformKey).width - chickenWidth;
    //
    //   //random between 0 and platform width
    //   const position = this.game.rnd.integerInRange(0, platformWidthChicken) + (chickenWidth / 2);
    //
    //   // new chicken
    //   this.chicken = new Chicken(game, position, 0);
    //   this.add(this.chicken);
    // }

    // reset
    this.exists = true;
    this.x = x;
    this.y = y;
  }

}
