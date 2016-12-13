import Game from './classes/Game';

const init = () => {
  if (isWebfontLoaded()) {
    startGame();
    return;
  }
  window.WebFontConfig.active = () => startGame();
};

const isWebfontLoaded = () => {
  return document.documentElement.classList.contains(`wf-active`);
};

const startGame = () => {
  new Game();
};

init();
