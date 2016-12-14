import Platform from './Platform';
import Tree from './Tree';
import Chicken from './Chicken';

export default class PlatformGroup extends Phaser.Group {

  constructor(game, platformKey = null) {
    super(game);

    if (platformKey == null) platformKey = this.getRandomPlatform();
    const treeKey = this.getRandomTree();

    this.platform = new Platform(this.game, 0, 0, platformKey);
    this.tree = new Tree(this.game, 0, 0, treeKey);
    this.chicken = new Chicken(this.game, 0, 0);

    this.add(this.platform);
    this.add(this.tree);
    this.add(this.chicken);

    this.platform.events.onOutOfBounds.add(this.kill, this);
  }

  getRandomPlatform() {
    const options = [`P1_T1`, `P2_T1`, `P3_T1`, `P4_T1`, `P5_T1`, `P6_T1`, `P1_T2`, `P2_T2`];
    return options[Math.floor(Math.random() * options.length)];
  }

  getRandomTree() {
    const options = [`I1_T1`, `I2_T1`, `I3_T1`];
    return options[Math.floor(Math.random() * options.length)];
  }

  getRandomNumber() {
    return Math.random();
  }

  kill() {
    this.exists = false;
    if (this.chicken.exists) {
      this.chicken.kill();
    }
    if (this.tree.exists) {
      this.tree.kill();
    }
  }

  reset(x, y, game) {
    this.game = game;

    // new platform sprite source
    const platformKey = this.getRandomPlatform();
    this.platform.frameName = platformKey;

    // update platform bounds after setting new sprite source
    const platformSprite = this.game.cache.getFrameByName(`platform`, platformKey);
    const platformWidth = platformSprite.width;
    const platformHeight = platformSprite.height;
    this.platform.body.setSize(platformWidth, platformHeight, - 10, 14);

    // generate random number
    const random = this.getRandomNumber();

    // chicken
    if (random < .5) {
      const xPos = this.game.rnd.integerInRange(20, platformWidth - 20);
      this.chicken.revive(xPos, - 40);
    }

    // tree
    if (random < .6) {
      const treeKey = this.getRandomTree();
      const xPos = this.game.rnd.integerInRange(30, platformWidth - 30);
      this.tree.frameName = treeKey;
      this.tree.revive(xPos, - 170);
    }

    // reset platformGroup
    this.exists = true;
    this.x = x;
    this.y = y;

    // return width of new platform to Play state for timer delay
    return platformWidth;
  }

  update() {

    if (this.chicken.exists) {

      // make chicken walk
      const chickenSpeed = .2;
      const direction = this.chicken.getDirection();
      if (direction) this.chicken.x += chickenSpeed;
      else this.chicken.x -= chickenSpeed;
    }

    // collide chicken with platform
    this.game = Phaser.GAMES[0];
    if (this.chicken.exists) {
      this.game.physics.arcade.collide(this.chicken, this.platform, null, null, this);
    }
  }

}
