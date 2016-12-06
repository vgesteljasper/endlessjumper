import Boot from './states/Boot';
import Preload from './states/Preload';
import Menu from './states/Menu';
import Play from './states/Play';
import Leaderboard from './states/Leaderboard';

export default class Game extends Phaser.Game {
  constructor() {
    super(800, 400, Phaser.AUTO, `game_wrapper`, null, false, false, null);
    this.state.add('Boot', Boot);
    this.state.add('Preload', Preload);
    this.state.add('Menu', Menu);
    this.state.add('Play', Play);
    this.state.add('Leaderboard', Leaderboard);

    this.state.start('Boot');
  }
}
