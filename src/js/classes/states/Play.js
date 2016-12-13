import PlatformStart from '../objects/PlatformGroupStart';
import CaveBackground from '../objects/CaveBackground';
import Platform from '../objects/PlatformGroup';
import ScoreBoard from '../objects/Scoreboard';
import Fox from '../objects/Fox';

export default class Play extends Phaser.State {

  create() {

    const button = this.cache.getImage(`button`);
    console.log(button.width);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 700;

    // variables
    this.speed = 10;
    this.titleLeftPos = this.world.centerX;
    this.isGameOver = false;
    this.startTime = this.time.now;
    this.scoreActive = false;
    this.score = 0;

    // add items
    this.createBackground();
    this.createTitle();
    this.caves = this.add.group();
    this.createStartPlatform();
    this.platforms = this.add.group();
    this.addFox();

    // music
    this.music = this.add.sound(`sound`);
    //this.music.play();

    // timers
    this.platformDelay();
    this.caveDelay();

    // extras
    this.keyBindings();
    this.createScore();
  }

  createScore() {
    this.scoreText = this.add.text(32,32, ``, {
      font: `20px BigJohn`,
      fill: `black`
    });
    this.scoreActive = true;
  }

  updateScore() {
    this.score = (this.time.now - this.startTime) / 400;
    this.scoreText.setText(`${Math.floor(this.score)}m`);
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
      // this.platformDelayTimer.timer.destroy();
      this.time.events.remove(this.platformDelayTimer);
    }
    // new timer
    this.platformDelayTimer = this.time.events.add(delay, this.spawnPlatform, this);
    this.platformDelayTimer.timer.start();
  }

  addFox() {
    this.fox = new Fox(this.game, 260, 100);
    this.add.existing(this.fox);
  }

  gameOver() {
    this.isGameOver = true;

    this.fox.kill();
    this.scoreboard = new ScoreBoard(this);
    this.scoreboard.show(this.score);
    this.add.existing(this.scoreboard);
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
      // this.caveDelayTimer.timer.destroy();
      this.time.events.remove(this.caveDelayTimer);
    }

    let delay = this.game.rnd.integerInRange(5000, 20000);
    this.caveDelayTimer = this.time.events.add(delay, this.spawnCave, this);
    this.caveDelayTimer.timer.start();
  }

  spawnCave() {
    let cave = this.caves.getFirstExists(false);
    if (!cave) {
      cave = new CaveBackground(this, this.world.bounds.width, -100, `C1`);
      this.caves.add(cave);
    }
    cave.reset(this.world.bounds.width, -100);

    this.caveDelay();
  }

  foxFall() {
    this.scoreActive = false;
    this.speed = 0;
    this.fox.fall();
    if (this.platformDelayTimer) {
      this.platformDelayTimer.timer.destroy();
    }
  }

  update() {

    if (this.scoreActive) {
      this.updateScore();
    }

    // collide fox with platforms
    this.platforms.forEach(platform => {
      this.physics.arcade.collide(this.fox, platform, null, null, this);
    });

    // kill fox if it fell of platform
    if (this.fox.y > 2000) {
      this.gameOver();
    } else if (this.fox.y > 300) {
      this.foxFall();
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

  render() {
    // this.game.debug.text(`time: ${this.time.now - this.startTime}`, 32, 32);
    // this.game.debug.text(`cave: ${this.caveDelayTimer.tick}`, 32, 64);
  }

}
