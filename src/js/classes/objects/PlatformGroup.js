import Platform from './Platform';
import Tree from './Tree';
import Chicken from './Chicken';

export default class PlatformGroup extends Phaser.Group {

  constructor(game, platformKey = null) {
    super(game);

    if (platformKey == null) {
      platformKey = this.getRandomPlatform();
    }

    const random = this.getRandomNumber();
    if (random < .2) {
      const treeKey = this.getRandomTree();
      this.platformTree = new Tree(game, 0, 0, treeKey);
    }

    if (random < .35) {
      const platformWidthChicken = this.game.cache.getFrameByName(`platform`, platformKey).width - 18;
      const position = this.game.rnd.integerInRange(18, platformWidthChicken);


      this.chicken = new Chicken(game, position, - 30);
    }

    this.platformPart = new Platform(game, 0, 0, platformKey);

    this.add(this.platformPart);
    if (this.chicken) {
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

  getRandomNumber() {
    return Math.random();
  }

  kill() {
    this.exists = false;
  }

  reset(x, y, game) {
    // new platform image
    const platformKey = this.getRandomPlatform();
    this.frame = platformKey;

    // random tree
    const random = this.getRandomNumber();
    if (random < .8) {

      // platform width
      const platformWidthTree =  this.game.cache.getFrameByName(`platform`, platformKey).width - 90;

      // random between 0 and platform width
      const position = this.game.rnd.integerInRange(0, platformWidthTree);

      // new tree
      const treeKey = this.getRandomTree();
      this.platformTree = new Tree(game, position, - 170, treeKey);
      this.add(this.platformTree);
    }

    // reset
    this.exists = true;
    this.x = x;
    this.y = y;
  }

}
