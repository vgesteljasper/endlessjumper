export default class Menu extends Phaser.State {
  create() {


    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, 'sky');
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, 'sea');
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, 'clouds');

    this.tiles = this.add.sprite(98, 200, `platform`, `platform_air_1.psd`);
    // this.background = this.add.sprite(0, 0, 'background');
    // this.ground = this.add.tileSprite(0, 400, 335, 112, 'ground');
    // this.ground.autoScroll(-200, 0);
    //
    // this.titleGroup = this.add.group();
    //
    // this.title = this.add.sprite(0,0,'title');
    // this.titleGroup.add(this.title);
    //
    // this.bird = this.add.sprite(200,5,'bird');
    // this.titleGroup.add(this.bird);
    //
    // this.titleGroup.x = 30;
    // this.titleGroup.y = 100;
    //
    // this.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    //
    // this.startButton = this.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    // this.startButton.anchor.setTo(0.5,0.5);
  }
  // startClick() {
  //   this.state.start('Play');
  // }
}
