import PlatformTile from './PlatformTile.js';

export default class StartPlatform extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);

    this.platform_1 = new PlatformTile(this.game, 0, 0, `platform_1.psd`);
    this.add(this.platform_1);

    this.tree = new PlatformTile(this.game, 30, -37, `boom.psd`);
    this.add(this.tree);

    this.bridge = new PlatformTile(this.game, 720, 75, `bridge.psd`);
    this.add(this.bridge);

    this.platform_2 = new PlatformTile(this.game, 835, 63, `platform_2.psd`);
    this.add(this.platform_2);
  }


}
