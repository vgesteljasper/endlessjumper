export default class Boot extends Phaser.State {
  preload() {
    this.load.image('preloader', 'assets/preloader.gif');
  }
  create() {
    this.state.start('Preload');
  }
}
