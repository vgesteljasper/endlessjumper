export default class Scoreboard extends Phaser.Group {
  constructor(game) {
    super(game);

    this.create(0, 0, `game_over`);

    this.scoreText = this.game.add.text(50, 100, `score:`, {
      font: `40px BigJohn`,
      fill: `#112024`
    });

    const buttonGroup = this.game.add.group();

    const restartButton = this.game.add.button(0, 0, `button`, this.restartGame, this, `button_hover`);
    const restartButtonText = this.game.add.text(90, 22, `restart`, {
      font: `20px BigJohn`,
      fill: `white`
    });
    restartButtonText.anchor.setTo(.5, .5);

    buttonGroup.add(restartButton);
    buttonGroup.add(restartButtonText);

    buttonGroup.x = 50;
    buttonGroup.y = 160;

    this.createIconLeader();
  }

  createIconLeader() {
    const leaderboardBtn = this.game.add.button(20, 15, `icons`, this.leaderboardClicked, this, `leaderboard`, `leaderboard`, `leaderboard`);
    leaderboardBtn.scale.setTo(0.1, 0.1);

    this.text = this.game.add.text(70, 26, `LEADERBOARD`, {
      font: `15px DINMedium`,
      fill: `white`
    });
  }

  leaderboardClicked() {
    this.game.state.start(`Leaderboard`);
  }

  restartGame() {
    this.game.state.start(`Play`);
  }

  show(score) {
    this.scoreText.setText(`score: ${Math.floor(score)}`);
  }
}
