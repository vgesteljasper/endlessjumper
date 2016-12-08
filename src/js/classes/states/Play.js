import Platform from '../objects/PlatformGroup';
import Fox from '../objects/Fox';

export default class Play extends Phaser.State {

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 700;

    this.speed = 200;
    this.titleLeftPos = this.world.centerX;

    this.createBackground();
    this.createTitle();
    this.createStartPlatform();
    this.addFox();
    this.keyBindings();

    this.platforms = this.add.group();
    this.platformDelay();

    // FIXME:
    // FIXME: PLATFORMS DON'T SPAWN AFTER FOX JUMP!!!
    // FIXME: 
  }

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
    this.startPlatform = new Platform(this.game, `startPlatform`);
    this.add.existing(this.startPlatform);
    this.startPlatform.x = 0;
    this.startPlatform.y = 240;
  }

  spawnPlatform() {
    let platform = this.platforms.getFirstExists(false);
    if( !platform ) {
      platform = new Platform(this.game);
      this.platforms.add(platform);
    }

    // TODO: RESET PLATFORM

    this.platformDelay();
  }

  platformDelay() {
    console.log(`generate delay`);
    // destroy old timer
    if (this.platformDelayTimer) {
      this.platformDelayTimer.timer.destroy();
    }
    // new timer
    this.platformDelayTimer = this.time.events.loop(/*this.game.rnd.integerInRange(500, 4000)*/ Phaser.Timer.SECOND, this.spawnPlatform, this);
    this.platformDelayTimer.timer.start();
  }

  addFox() {
    this.fox = new Fox(this.game, 260, 100);
    this.add.existing(this.fox);
  }

  update() {

    // collide fox with platforms
    // TODO: COLLIDE FOX WITH __ALL__ PLATFORMS
    this.physics.arcade.collide(this.fox, this.startPlatform, null, null, this);

    // move platforms
    // TODO: MOVE __ALL__ PLATFORMS
    this.startPlatform.x -= this.speed / 600;

    // move title away
    this.titleLeftPos -= (this.speed / 50);
    if (this.titleLeftPos > -400) {
      this.title.position.x = this.titleLeftPos;
    }

    this.checkKeyboard();
  }


  keyBindings() {
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  checkKeyboard() {
    if (this.space.isDown && this.fox.body.wasTouching.down) {
      this.fox.jump();

      this.jumpTimer = this.time.events.add(Phaser.Timer.SECOND / 2.6, this.foxRun, this);
      this.jumpTimer.timer.start();
    }
  }

  foxRun() {
    this.jumpTimer.timer.stop();
    this.fox.run();
  }
}
