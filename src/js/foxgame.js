import Game from './classes/Game';

const $formWrapper = document.getElementsByClassName(`form_wrapper`)[0];
const $form = document.getElementById(`form`);
const $formInput = document.getElementById(`form_input`);

const init = () => {
  if (isWebfontLoaded()) {
    startGame();
    return;
  }
  window.WebFontConfig.active = () => startGame();

  if (!checkSessionStorageForKey(`username`)) {
    $formWrapper.classList.remove(`hidden`);
    $form.addEventListener(`submit`, formHandler);
  }

};

const isWebfontLoaded = () => {
  return document.documentElement.classList.contains(`wf-active`);
};

const startGame = () => {
  new Game();
};

const formHandler = event => {
  event.preventDefault();
  if ($formInput.value !== ``) {
    sessionStorage.setItem(`username`, $formInput.value);
    hideForm();
  }
};

const hideForm = () => {
  $formWrapper.classList.add(`hidden`);
};

const checkSessionStorageForKey = key => {
  if (sessionStorage.getItem(key) !== null) {
    return true;
  } else {
    return false;
  }
};

init();
