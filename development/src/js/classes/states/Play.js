import StartPlatform from '../objects/StartPlatform.js';

export default class Play extends Phaser.State {
  create() {
    this.createPhysics();
    this.createBackground();
    this.createStartPlatform();
    this.createFox();

  }

  createPhysics(){
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 1200;
  }

  createBackground(){
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, 'sky');
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, 'sea');
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, 'clouds');
  }

  createStartPlatform(){
    const secondPlatform = new StartPlatform(this.game);
    this.add.existing(secondPlatform);
    secondPlatform.x = -35;
    secondPlatform.y = 180;
    this.physics.arcade.enable(secondPlatform);
    // secondPlatform.body.velocity.x = -200;
  }

  createFox(){
    // this.fox = this.add.sprite(405, 240, `foxRun`);
    // this.fox.animations.add(`run`, Phaser.Animation.generateFrameNames('fox_run_1', 1, 12, '.png', 2), 30, true, false);
    // this.fox.animations.play(`run`);
    // this.fox.anchor.setTo(0.5);
    // this.fox.scale.setTo(-0.8, 0.8);
  }

  update() {

  }
}
