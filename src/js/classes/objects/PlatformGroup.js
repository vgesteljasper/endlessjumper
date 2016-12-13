import PlatformPart from './PlatformPart';
import PlatformTree from './PlatformTree';
import Chicken from './Chicken';

export default class PlatformGroup extends Phaser.Group {

  constructor(game, platformKey = null) {
    super(game);

    if (platformKey == null) {
      platformKey = this.getRandomPlatform();
    }

    let random = this.getRandomNumber();
    if (random < .2) {
      let treeKey = this.getRandomTree();
      this.platformTree = new PlatformTree(game, 0, 0, treeKey);
    }

    if (random < .4) {
      let platformWidthChicken = this.game.cache.getFrameByName(`platform`, platformKey).width - 18;
      let position = this.game.rnd.integerInRange(18, platformWidthChicken);


      this.chicken = new Chicken(game, position, -30);
    }

    this.platformPart = new PlatformPart(game, 0, 0, platformKey);

    this.add(this.platformPart);
    // if (this.platformTree) {
    //   this.add(this.platformTree);
    // }
    if (this.chicken) {
      this.add(this.chicken);
    }

  }

  getRandomPlatform() {
    let options = [
      `P1_T1`, `P2_T1`, `P3_T1`, `P4_T1`, `P5_T1`, `P6_T1`,
      `P1_T2`, `P2_T2`
    ];
    return options[Math.floor(Math.random()*options.length)];
  }

  getRandomTree() {
    let options = [
      `I1_T1`, `I2_T1`, `I3_T1`
    ];
    return options[Math.floor(Math.random()*options.length)];
  }

  getRandomNumber() {
    return Math.random();
  }

  kill() {
    this.exists = false;
  }

  reset(x, y, game) {
    // new platform image
    let platformKey = this.getRandomPlatform();
    this.frame = platformKey;

    // random tree
    let random = this.getRandomNumber();
    if (random < .8) {

      // platform width
      let platformWidthTree =  this.game.cache.getFrameByName(`platform`, platformKey).width - 90;

      // random between 0 and platform width
      let position = this.game.rnd.integerInRange(0, platformWidthTree);

      // new tree
      let treeKey = this.getRandomTree();
      this.platformTree = new PlatformTree(game, position, -170, treeKey);
      this.add(this.platformTree);
    }

    // reset
    this.exists = true;
    this.x = x;
    this.y = y;
  }

}
