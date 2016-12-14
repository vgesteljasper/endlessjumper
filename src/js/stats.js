import chart from './lib/chart';

const $info = document.getElementsByClassName(`info`)[0];
const $svgJS = document.getElementsByClassName(`svg_js`)[0];
const $svgPHP = document.getElementsByClassName(`svg_php`)[0];

const init = () => {

  loadFromPHP();
  loadItems();
  setInterval(loadItems, 60000);
};

const loadItems = () => {
  $svgPHP.classList.add(`hidden`);
  fetch(`/index.php?page=stats&t=${Date.now()}`, {
    headers: new Headers({
      Accept: `application/json`
    })
  })
  .then(response => response.json())
  .then(result => {
    if (!result || result.length === 0) {
      $info.innerHTML = `<p>No Items In Database</p>`;
      return;
    }
    $info.innerHTML = `<p>This chart updates automatically every minute.</p>`;
    $svgJS.innerHTML = ``;
    chart(result, $svgJS, `GAME DURATION IN MINUTES`);
  })
  .catch(() => {
    console.log(`Fetch error. Showing static chart instead of self updating one.`);
    $svgPHP.classList.remove(`hidden`);
  });
};

const loadFromPHP = data => {
  $svgPHP.classList.remove(`hidden`);
  data = document.getElementsByClassName(`phpdata`)[0].innerText;
  if (data !== ``) {
    data = JSON.parse(data);
    chart(data, $svgPHP, `GAME DURATION IN MINUTES`);
  }
};

init();
