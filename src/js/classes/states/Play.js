import PlatformStart from '../objects/PlatformGroupStart';
import CaveBackground from '../objects/CaveBackground';
import Platform from '../objects/PlatformGroup';
import Fox from '../objects/Fox';

export default class Play extends Phaser.State {

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 700;

    this.speed = 10;
    this.titleLeftPos = this.world.centerX;

    this.createBackground();
    this.createTitle();
    this.caves = this.add.group();
    this.createStartPlatform();
    this.addFox();
    this.keyBindings();
    this.platforms = this.add.group();

    this.music = this.add.sound(`sound`);
    //this.music.play();

    this.platformDelay();
    // this.caveDelay();
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
    this.startPlatform = new PlatformStart(this.game, `P3_T1`);
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

    let platformWidth = platform.children[0]._frame.width;

    let yPos = this.game.rnd.integerInRange(210, 270);
    platform.reset(this.world.bounds.width, yPos, this);

    this.platformDelay(platformWidth * 3.8);
  }

  platformDelay(delay = 100) {
    // destroy old timer
    if (this.platformDelayTimer) {
      this.platformDelayTimer.timer.destroy();
    }
    // new timer
    this.platformDelayTimer = this.time.events.add(delay, this.spawnPlatform, this);
    this.platformDelayTimer.timer.start();
  }

  addFox() {
    this.fox = new Fox(this.game, 260, 100);
    this.add.existing(this.fox);
  }

  killScreen() {
    this.state.start('Menu');
  }

  keyBindings() {
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  checkKeyboard() {
    if (this.space.isDown && this.fox.body.wasTouching.down) {
      this.fox.jump();
      this.sound.play(`jump_start`, 1, false);
    }
  }

  caveDelay() {
    if (this.caveDelayTimer) {
      this.caveDelayTimer.timer.destroy();
      console.log(`reuse timer`);
    } else {
      console.log(`create timer`);
    }

    let delay = this.game.rnd.integerInRange(100, 200);
    this.caveDelayTimer = this.time.events.add(delay, this.spawnCave, this);
    this.caveDelayTimer.timer.start();
  }

  spawnCave() {
    let cave = this.caves.getFirstExists(false);
    if (!cave) {
      cave = new CaveBackground(this, this.world.bounds.width, 0, `C1`);
      this.caves.add(cave);
    }

    cave.reset(this.world.bounds.width, -50);

    this.caveDelay();
  }

  update() {

    // collide fox with platforms
    this.platforms.forEach(platform => {
      this.physics.arcade.collide(this.fox, platform, null, null, this);
    });

    // kill fox if it fell of platform
    if (this.fox.y > 2000) {
      this.fox.kill();
      this.killScreen();
    } else if (this.fox.y > 300) {
      this.speed = 0;
      this.fox.fall();
      if (this.platformDelayTimer) {
        this.platformDelayTimer.timer.destroy();
      }
    }

    // move platforms
    this.platforms.forEach(platform => {
      platform.x -= this.speed;
    });

    // move caves
    this.caves.forEach(cave => {
      cave.x -= this.speed;
    });

    // startPlatform
    if (this.startPlatform.exists) {
      this.physics.arcade.collide(this.fox, this.startPlatform, null, null, this);
      this.startPlatform.x -= this.speed;
    }

    // move title away
    this.titleLeftPos -= (this.speed / 2);
    if (this.titleLeftPos > -400) {
      this.title.position.x = this.titleLeftPos;
    }

    this.checkKeyboard();
  }

}
