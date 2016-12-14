import PlatformStart from '../objects/PlatformGroupStart';
import Platform from '../objects/PlatformGroup';
import Cave from '../objects/Cave';
import Fox from '../objects/Fox';
import ScoreBoard from '../objects/Scoreboard';
import localhostRoot from '../../lib/localhostRoot';

export default class Play extends Phaser.State {

  create() {

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 700;

    // variables
    this.speed = 10;
    this.titleLeftPos = this.world.centerX;
    this.isGameOver = false;
    this.startTime = this.time.now;
    this.scoreActive = false;
    this.score = 0;
    this.chickenScore = 0;
    this.currentPlatform;
    this.currentChicken;
    this.chickenDead;

    this.maxPlatformHeight = 210;
    this.minPlatformHeight = 270;

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
    this.speedDelay();

    // extras
    this.keyBindings();
    this.createScore();
    this.prefix = localhostRoot();
    console.log(`current path prefix: ${this.prefix}`);
  }

  createScore() {
    this.scoreText = this.add.text(32, 32, ``, {
      font: `20px BigJohn`,
      fill: `black`
    });
    this.scoreActive = true;
  }

  updateScore() {
    this.score = this.chickenScore + ((this.time.now - this.startTime) / 100);
    this.scoreText.setText(`${Math.floor(this.score)}`);
  }

  createBackground() {
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, `sky`);
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, `sea`);
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, `clouds`);
  }

  createTitle() {
    this.title = this.add.text(this.world.centerX, 230, `outfox the bear`, {
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
    if (!platform) {
      platform = new Platform(this.game);
      this.platforms.add(platform);
    }
    const yPos = this.game.rnd.integerInRange(this.maxPlatformHeight, this.minPlatformHeight);
    const platformWidth = platform.reset(this.world.bounds.width, yPos, this);

    let times;

    switch (this.speed) {
    case 10:
      times = 3.7;
      break;
    case 11:
      times = 3.3;
      break;
    case 12:
      times = 3.3;
      break;
    case 13:
      times = 3.2;
      break;
    case 14:
      times = 3;
      break;
    case 15:
      times = 2.8;
      break;
    case 16:
      times = 2.6;
      break;
    case 17:
      times = 2.5;
      break;
    case 18:
      times = 2.5;
      break;
    case 19:
      times = 2.4;
      break;
    case 20:
      times = 2.4;
      break;
    case 21:
      times = 2.5;
      break;
    case 22:
      times = 2.7;
    }

    const delay = platformWidth * times;

    this.platformDelay(delay);
  }

  platformDelay(delay = 100) {
    // destroy old timer
    if (this.platformDelayTimer) {
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

  goFaster() {
    if (this.speed < 22) {
      // eslint gives error on `this.speed++`
      this.speed = this.speed + 1;
    }
  }

  speedDelay() {
    console.log(`speed delay`);
    this.speedDelayTimer = this.time.events.loop(10000, this.goFaster, this);
    this.speedDelayTimer.timer.start();
  }

  gameOver() {
    this.isGameOver = true;

    this.pushDataToServer();

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
      this.time.events.remove(this.caveDelayTimer);
    }

    const delay = this.game.rnd.integerInRange(5000, 20000);
    this.caveDelayTimer = this.time.events.add(delay, this.spawnCave, this);
    this.caveDelayTimer.timer.start();
  }

  spawnCave() {
    let cave = this.caves.getFirstExists(false);
    if (!cave) {
      cave = new Cave(this, this.world.bounds.width, - 100, `C1`);
      this.caves.add(cave);
    }
    cave.reset(this.world.bounds.width, - 100);

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

  checkChickenCollide() {
    this.currentChicken = this.currentPlatform.chicken;
    if (this.currentChicken.exists) {
      this.physics.arcade.collide(this.fox, this.currentChicken, this.killChicken, null, this);
    }
  }

  killChicken() {
    this.currentChicken.kill();
    this.chickenScore += 1000;
  }

  update() {
    if (this.scoreActive) {
      this.updateScore();
    }

    this.platforms.forEach(platform => {
      if (platform.exists) {

        // collide fox with platforms
        this.currentPlatform = platform;
        this.physics.arcade.collide(this.fox, platform, this.checkChickenCollide, null, this);
      }
    });

    // kill fox if it fell of platform
    if (this.fox.y > 2000 && !this.isGameOver) {
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
    if (this.titleLeftPos > - 400) {
      this.title.position.x = this.titleLeftPos;
    }

    this.checkKeyboard();
  }

  pushDataToServer() {

    // change parth in src/js/lib/localhostRoot.js
    // this file is NOT tracket by git for usability reasons

    const data = new FormData();
    data.append(`action`, `add-stat`);
    data.append(`duration`, `${this.time.now}`);
    data.append(`score`, `${this.score}`);
    data.append(`username`, `anonymous`);

    fetch(`${this.prefix}index.php?page=stats_push&t=${Date.now()}`, {
      headers: new Headers({
        Accept: `application/json`
      }),
      method: `post`,
      body: data
    })
    .then(response => response.json())
    .then(result => {
      if (result.result === `ok`) {
        console.log(`successfully posted stat to server`);
      } else {
        console.log(`failed to post stat to server`);
      }
    });
  }

}
