import Bird from '../objects/Bird';
import Ground from '../objects/Ground';
import PipeGroup from '../objects/PipeGroup';
import Scoreboard from '../objects/Scoreboard';

export default class Play extends Phaser.State {
  create() {
    console.log('play state');
    this.score = 0;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 1200;

    this.background = this.add.sprite(0, 0, 'background');

    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.add.existing(this.bird);

    this.pipes = this.add.group();

    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.add.existing(this.ground);

    this.scoreText = this.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);

    this.scoreSound = this.add.audio('score');
    this.groundHitSound = this.add.audio('groundHit');
    this.pipeHitSound = this.add.audio('pipeHit');

    this.input.onDown.add(this.bird.flap, this.bird);

    this.pipeGenerator = this.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();
  }
  update() {
    this.physics.arcade.collide(this.bird, this.ground, this.groundHitHandler, null, this);
    this.pipes.forEach(pipeGroup => {
      this.checkScore(pipeGroup);
      this.physics.arcade.collide(this.bird, pipeGroup, this.pipeHitHandler, null, this);
    });
  }
  generatePipes() {
    const pipeY = this.rnd.integerInRange(-100, 100);
    let pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
  }
  groundHitHandler() {
    this.groundHitSound.play();
    this.deathHandler();
  }
  pipeHitHandler() {
    this.pipeHitSound.play();
    this.deathHandler();
  }
  deathHandler() {
    this.bird.kill();
    this.pipes.callAll('stop');
    this.pipeGenerator.timer.stop();
    this.ground.stopScroll();

    this.scoreboard = new Scoreboard(this.game);
    this.add.existing(this.scoreboard);
    this.scoreboard.show(this.score);
  }
  checkScore(pipeGroup) {
    if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
      pipeGroup.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
      this.scoreSound.play();
    }
  }
  shutdown() {
    this.bird.destroy();
    this.pipes.destroy();
    this.scoreboard.destroy();
  }
}
