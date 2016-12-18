import es6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
es6Promise.polyfill();

export default class Leaderboard extends Phaser.State {

  create() {
    this.createBackground();
    this.addBackButton();
    this.fetchLeaderboard();
  }

  createBackground() {
    this.sky = this.add.tileSprite(0, 0, this.game.width, 304, `sky`);
    this.sea = this.add.tileSprite(0, 304, this.game.width, 500, `sea`);
    this.clouds = this.add.tileSprite(0, 80, this.game.width, 236, `clouds`);
  }

  addBackButton() {
    const buttonGroup = this.game.add.group();

    const restartButton = this.game.add.button(0, 0, `button`, this.restartGame, this, `hover`, `button`);
    const restartButtonText = this.game.add.text(90, 22, `back`, {
      font: `20px BigJohn`,
      fill: `white`
    });
    restartButtonText.anchor.setTo(.5, .5);

    buttonGroup.add(restartButton);
    buttonGroup.add(restartButtonText);

    buttonGroup.x = 50;
    buttonGroup.y = 50;
  }

  showBoard(data) {
    const xPos = 350;
    let yPos = 50;
    let i = 1;

    this.crown = this.add.tileSprite(xPos - 35, yPos + 7, 380, 380, `crown`);
    this.crown.anchor.setTo(.5);
    this.crown.scale.setTo(.1);

    data.forEach(row => {
      this.scoreText = this.add.text(xPos, yPos, `${i}. ${row.username}`, {
        font: `14px BigJohn`,
        fill: `black`
      });
      this.scoreText = this.add.text(xPos + 220, yPos, `${row.highscore}`, {
        font: `14px BigJohn`,
        fill: `black`
      });
      if (i < 10) {
        this.addLine(xPos, yPos + 25, 265);
      }
      i ++;
      yPos += 35;
    });
  }

  addLine(x, y, width) {
    this.line = this.game.add.graphics(x, y);
    this.line.lineStyle(3, 0x000000, 1);
    this.line.lineTo(width, 0);

    return this.line;
  }

  fallBack() {
    this.scoreText = this.add.text(300, 50, `nothing to show here`, {
      font: `14px BigJohn`,
      fill: `black`
    });
  }

  fetchLeaderboard() {
    fetch(`index.php?page=stats_get&data=leaderboard&t=${Date.now()}`, {
      headers: new Headers({
        Accept: `application/json`
      })
    })
    .then(response => response.json())
    .then(result => {
      if (!result || result.length === 0) {
        this.fallBack();
        return;
      }
      this.showBoard(result);
    })
    .catch(() => {
      this.fallBack();
    });
  }

  restartGame() {
    this.game.state.start(`Menu`);
  }

}
