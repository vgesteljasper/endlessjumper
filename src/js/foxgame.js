import Game from './classes/Game';

let $body,
  $formWrapper,
  $form,
  $input,
  $submit;

const init = () => {

  $body = document.getElementsByTagName(`body`)[0];

  if (isWebfontLoaded()) {
    startGame();
    return;
  }
  window.WebFontConfig.active = () => startGame();

  if (!checkSessionStorageForKey(`username`)) {
    addStartForm();
  }

};

const addStartForm = () => {
  $formWrapper = document.createElement(`div`);
  $formWrapper.classList.add(`form_wrapper`, `centered`);

  $form = document.createElement(`form`);
  $form.id = `form`;
  $form.setAttribute(`action`, `/`);
  $form.setAttribute(`method`, `post`);
  $form.addEventListener(`submit`, formHandler);

  $input = document.createElement(`input`);
  $input.id = `form_input`;
  $input.setAttribute(`type`, `text`);
  $input.setAttribute(`name`, `username`);
  $input.setAttribute(`placeholder`, `choose username`);

  $submit = document.createElement(`input`);
  $submit.setAttribute(`type`, `submit`);
  $submit.setAttribute(`name`, `submit`);
  $submit.setAttribute(`value`, `play`);

  $form.appendChild($input);
  $form.appendChild($submit);
  $formWrapper.appendChild($form);
  $body.appendChild($formWrapper);
};

const isWebfontLoaded = () => document.documentElement.classList.contains(`wf-active`);

const startGame = () => {
  new Game();
};

const formHandler = event => {
  event.preventDefault();
  if ($input.value !== ``) {
    sessionStorage.setItem(`username`, $input.value);
    $body.removeChild($formWrapper);
  }
};

const checkSessionStorageForKey = key => {
  if (sessionStorage.getItem(key) !== null) return true;
  return false;
};

init();
