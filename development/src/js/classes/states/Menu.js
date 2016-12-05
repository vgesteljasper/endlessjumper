import StartPlatform from '../objects/StartPlatform.js';

export default class Menu extends Phaser.State {
  create() {
    this.createBackground();
    this.createTitle();
    this.createStartPlatform();
    this.createKeys();
  }

  createBackground(){
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, 'sky');
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, 'sea');
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, 'clouds');
  }

  createStartPlatform(){
    const startPlatform = new StartPlatform(this.game);
    this.add.existing(startPlatform);
    startPlatform.x = -35;
    startPlatform.y = 180;
  }

  createKeys(){
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  createTitle(){
    this.title = this.add.text(this.world.centerX,235, `the fox game`, {
      font: `60px BigJohn`,
      fill: `white`
    });
    this.title.anchor.setTo(0.5);
  }

  update(){
    // if (this.spaceKey.isDown){
    //   this.state.start('Play');
    // }
  }
}
