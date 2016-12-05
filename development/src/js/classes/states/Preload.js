export default class Preload extends Phaser.State {
  preload() {
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.animations.add(`preloading`);
    this.asset.animations.play(`preloading`, 30, true);
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.image(`clouds`, `assets/clouds.png`);
    this.load.image(`sky`, `assets/sky.png`);
    this.load.image(`sea`, `assets/sea.png`);

    this.load.atlasJSONHash('platform', 'assets/platform.png', 'assets/platform.json');
    this.load.atlasJSONHash('StartPlatform', 'assets/start_platform.png', 'assets/start_platform.json');

    // this.load.atlasJSONHash('foxTaunt', 'assets/fox_taunt.png', 'assets/fox_taunt.json');
    this.load.atlasJSONHash('foxStill', 'assets/fox_still.png', 'assets/fox_still.json');
    this.load.atlasJSONHash('foxRun', 'assets/fox_run.png', 'assets/fox_run.json');
    this.load.atlasJSONHash('chicken', 'assets/chicken_fly.png', 'assets/chicken_fly.json');

    this.load.atlasJSONHash('icons', 'assets/icons.png', 'assets/icons.json');
    this.load.audio(`sound`, `assets/sound.mp3`);

    // this.load.image(`background`, `assets/bg.png`);
    // this.load.atlasJSONHash('components', 'assets/components.png', 'assets/components.json');
    // this.load.atlasJSONHash('player', 'assets/player.png', 'assets/player.json');
    // this.load.atlasJSONHash('tiles', 'assets/tiles.png', 'assets/tiles.json');
    //
    // this.load.audio(`coin`, `assets/coin.mp3`);
    // this.load.audio(`explosion`, `assets/explosion.wav`);
    // this.load.audio(`jump`, `assets/jump.wav`);
  }
  create() {
    this.state.start('Menu');
  }
}
