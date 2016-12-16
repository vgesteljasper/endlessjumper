export default class Preload extends Phaser.State {
  preload() {
    this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, `preloader`);
    this.asset.animations.add(`preloading`);
    this.asset.animations.play(`preloading`, 30, true);
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.image(`clouds`, `assets/images/clouds.png`);
    this.load.image(`sky`, `assets/images/sky.png`);
    this.load.image(`sea`, `assets/images/sea.png`);
    this.load.image(`game_over`, `assets/images/game_over.png`);
    this.load.image(`button`, `assets/images/button.png`);
    this.load.image(`button_hover`, `assets/images/button_hover.png`);
    this.load.image(`crown`, `assets/images/crown.png`);

    this.load.atlasJSONHash(`platform`, `assets/images/platform_sprite.png`, `assets/data/platform_sprite.json`);
    this.load.atlasJSONHash(`cave`, `assets/images/cave_sprite.png`, `assets/data/cave_sprite.json`);
    this.load.atlasJSONHash(`icons`, `assets/images/icons.png`, `assets/data/icons.json`);
    this.load.atlasJSONHash(`fox`, `assets/images/fox.png`, `assets/data/fox.json`);
    this.load.atlasJSONHash(`chicken`, `assets/images/chicken.png`, `assets/data/chicken.json`);

    this.load.audio(`music`, `assets/sounds/music.mp3`);
    this.load.audio(`game_over`, `assets/sounds/game_over.wav`);
    this.load.audio(`jump_start`, `assets/sounds/jump_start.wav`);
    this.load.audio(`chicken_catch`, `assets/sounds/chicken_catch.wav`);
  }
  create() {
    this.music = this.add.sound(`music`);
    this.music.play();

    this.state.start(`Menu`);
  }
}
