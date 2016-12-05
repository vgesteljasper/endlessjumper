import StartPlatform from '../objects/StartPlatform.js';

export default class Menu extends Phaser.State {
  create() {
    this.createBackground();
    this.createTitle();
    this.createStartPlatform();
    this.createText();
    this.createKeys();
  }

  createBackground(){
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, 'sky');
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, 'sea');
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, 'clouds');
  }

  createTitle(){
    this.title = this.add.text(this.world.centerX,230, `the fox game`, {
      font: `60px BigJohn`,
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
    this.game.add.tween(this.text.scale).to({x:0.93, y:0.93}, 900, null, true, 0, -1, true);
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
