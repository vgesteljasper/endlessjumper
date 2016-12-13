export default class ScoreBoard extends Phaser.Group {
  constructor(game) {
    super(game);

    this.create(0, 0, `game_over`);

    this.scoreText = this.game.add.text(50, 100, `score:`, {
      font: `40px BigJohn`,
      fill: `#112024`
    });

    const buttonGroup = this.game.add.group();

    const restartButton = this.game.add.button(0, 0, `button`, this.restartGame, this);
    const restartButtonText = this.game.add.text(90, 22, `restart`, {
      font: `20px BigJohn`,
      fill: `white`
    });
    restartButtonText.anchor.setTo(.5, .5);

    buttonGroup.add(restartButton);
    buttonGroup.add(restartButtonText);

    buttonGroup.x = 50;
    buttonGroup.y = 160;
  }

  restartGame() {
    this.game.state.start(`Play`);
  }

  show(score) {
    this.scoreText.setText(`score: ${Math.floor(score)}m`);
  }
}
