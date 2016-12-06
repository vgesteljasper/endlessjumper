import StartPlatform from '../objects/StartPlatform';
import Fox from '../objects/Fox';

export default class Play extends Phaser.State {
  create(){
    //this.createPhysics();
    this.createBackground();
    this.createTitle();
    this.createStartPlatform();
    this.addFox();
  }

  // createPhysics(){
  //   this.physics.startSystem(Phaser.Physics.ARCADE);
  //   this.physics.arcade.gravity.y = 600;
  // }

  createBackground(){
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, 'sky');
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, 'sea');
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, 'clouds');
  }

  createTitle(){
    this.title = this.add.text(this.world.centerX,230, `the fox game`, {
      font: `65px BigJohn`,
      fill: `white`
    });
    this.title.anchor.setTo(0.5);
  }

  createStartPlatform(){
    //this.physics.startSystem(Phaser.Physics.ARCADE);
    //this.physics.arcade.gravity.y = 600;

    this.startPlatform = new StartPlatform(this.game);
    this.add.existing(this.startPlatform);
    this.startPlatform.x = -35;
    this.startPlatform.y = 180;
    this.physics.arcade.enable(this.startPlatform);
    this.startPlatform.setAll(`body.velocity.x`, -200);
  }

  addFox(){
    this.fox = new Fox(this.game, 500, 100);
    this.add.existing(this.fox);
  }

  update(){
    this.physics.arcade.collide(this.fox, this.startPlatform, null, null, this);
  }
}
