import StartPlatform from '../objects/StartPlatform.js';

export default class Menu extends Phaser.State {
  create() {
    this.createBackground();
    this.createIconLeader();
    this.createTitle();
    this.createStartPlatform();
    this.createText();
    this.createFox();
    this.createChicken();
    this.createSound();
    this.createKeys();
  }

  createBackground(){
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, 'sky');
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, 'sea');
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, 'clouds');
  }

  createIconLeader(){
    const leaderboardBtn = this.add.button(20, 15, `icons`, this.leaderboardClicked, this, `leaderboard`, `leaderboard`, `leaderboard`);
    leaderboardBtn.scale.setTo(0.1, 0.1);

    this.text = this.add.text(70, 26, `LEADERBOARD`, {
      font: `15px DINMedium`,
      fill: `white`
    });
  }

  leaderboardClicked(){
    this.state.start('Leaderboard');
  }

  createTitle(){
    this.title = this.add.text(this.world.centerX,230, `the fox game`, {
      font: `65px BigJohn`,
      fill: `white`
    });
    this.title.anchor.setTo(0.5);
  }

  createStartPlatform(){
    const startPlatform = new StartPlatform(this.game);
    this.add.existing(startPlatform);
    startPlatform.x = -35;
    startPlatform.y = 180;
  }

  createText(){
    this.text = this.add.text(this.world.centerX,335, `press space to start`, {
      font: `20px DINRegular`,
      fill: `white`
    });
    this.text.anchor.setTo(0.5);
    this.game.add.tween(this.text.scale).to({x:0.95, y:0.95}, 900, null, true, 0, -1, true);
  }

  createFox(){
    this.fox = this.add.sprite(410, 240, `foxStill`, `fox_still.psd`);
    // this.fox = this.add.sprite(405, 240, `foxTaunt`);
    // this.fox.animations.add(`taunt`, Phaser.Animation.generateFrameNames('fox_jump', 29, 68, '.png', 2), 30, true, false);
    // this.fox.animations.play(`taunt`);
    this.fox.anchor.setTo(0.5);
    this.fox.scale.setTo(-0.8, 0.8);
  }

  createChicken(){
    this.chicken = this.add.sprite(700, 242, `chicken`);
    this.chicken.animations.add(`walk`, Phaser.Animation.generateFrameNames('chicken_fly', 1, 42, '.png', 2), 10, true, false);
    this.chicken.animations.play(`walk`);
    this.chicken.anchor.setTo(0.5);
    this.chicken.scale.setTo(0.5, 0.5);
  }

  createSound(){
    this.sound = this.add.audio('sound',1,true);
    //this.sound.play();
  }

  createKeys(){
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update(){
    if (this.spaceKey.isDown){
      this.state.start('Play');
    }
  }
}
