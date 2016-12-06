import StartPlatform from '../objects/StartPlatform.js';

export default class Menu extends Phaser.State {
  create() {
    this.createBackground();
    this.createIconLeader();
    this.createTitle();
    this.createStartPlatform();
    this.createText();
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
    this.title = this.add.text(this.world.centerX,230, `outfox the bear`, {
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
    this.game.add.tween(this.text.scale).to({x:0.90, y:0.90}, 350, null, true, 0, -1, true);
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

    const minTop = 250;
    let top = 280;
    if (minTop < top) {
      top -= .8;
      this.title.position.y = top;
      console.log(top);
    }
  }
}
