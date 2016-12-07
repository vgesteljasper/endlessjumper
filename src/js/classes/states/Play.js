import PlatformGroup from '../objects/PlatformGroup';
import Fox from '../objects/Fox';

export default class Play extends Phaser.State {

  create() {

    this.physics.startSystem(Phaser.Physics.ARCADE);

    // game speed
    this.speed = 200;

    // game gravity
    this.physics.arcade.gravity.y = 600;

    //this.createPhysics();
    this.createBackground();
    this.createTitle();
    this.createStartPlatform();
    this.addFox();

    // title animation variables
    this.titleLeftPos = this.world.centerX;
  }

  // createPhysics() {
  //   this.physics.startSystem(Phaser.Physics.ARCADE);
  //   this.physics.arcade.gravity.y = 600;
  // }

  createBackground() {
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, 'sky');
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, 'sea');
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, 'clouds');
  }

  createTitle() {
    this.title = this.add.text(this.world.centerX,230, `outfox the bear`, {
      font: `65px BigJohn`,
      fill: `white`
    });
    this.title.anchor.setTo(0.5);
  }

  createStartPlatform() {
    this.startPlatform = new PlatformGroup(this.game);
    this.add.existing(this.startPlatform);
    this.startPlatform.x = 0;
    this.startPlatform.y = 240;
  }

  addFox() {
    this.fox = new Fox(this.game, 260, 100);
    this.add.existing(this.fox);
  }

  update() {
    this.physics.arcade.collide(this.fox, this.startPlatform, null, null, this);

    this.game.debug.body(this.fox);

    this.startPlatform.x -= this.speed / 40;

    // move title away
    this.titleLeftPos -= (this.speed / 80);
    if (this.titleLeftPos > -400) {
      this.title.position.x = this.titleLeftPos;
    }
  }
}
