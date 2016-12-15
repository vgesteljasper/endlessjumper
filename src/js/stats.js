import chart from './lib/chart';
import * as statsUtils from './functions/stats_utils';
import localhostRoot from './lib/localhostRoot';
import es6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
es6Promise.polyfill();

const $info = document.getElementsByClassName(`info`)[0];
const $svgJS = document.getElementsByClassName(`svg_js`)[0];
const $svgPHP = document.getElementsByClassName(`svg_php`)[0];
const $form = document.getElementById(`form`);
const $startDate = document.getElementById(`startDate`);
const $endDate = document.getElementById(`endDate`);
const prefix = localhostRoot();

let data;

const init = () => {
  loadFromPHP();
  loadItems();
  setInterval(loadItems, 60000);
  $form.addEventListener(`submit`, applyFilter);
};

const applyFilter = event => {
  event.preventDefault();
  const start = new Date($startDate.value);
  const end = new Date($endDate.value);

  const filteredData = statsUtils.getFilteredDataBetween(data, start, end);

  $svgJS.innerHTML = ``;
  $svgPHP.innerHTML = ``;
  chart(filteredData, $svgJS, `between ${$startDate.value} and ${$endDate.value}`);
  chart(filteredData, $svgPHP, `between ${$startDate.value} and ${$endDate.value}`);
};

const loadItems = () => {
  $svgPHP.classList.add(`hidden`);
  fetch(`${prefix}index.php?page=stats&t=${Date.now()}`, {
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
    data = result;
    $svgJS.classList.remove(`hidden`);
    $info.innerHTML = `<p>This chart updates automatically every minute.</p>`;
    $svgJS.innerHTML = ``;
    chart(result, $svgJS, `ALL TIME`);
  })
  .catch(() => {
    console.log(`Fetch error. Showing static chart instead of self updating one.`);
    $svgPHP.classList.remove(`hidden`);
  });
};

const loadFromPHP = () => {
  $svgPHP.classList.remove(`hidden`);
  $svgJS.classList.add(`hidden`);
  data = document.getElementsByClassName(`phpdata`)[0].innerText;
  if (data !== ``) {
    data = JSON.parse(data);
    chart(data, $svgPHP, `ALL TIME`);
  }
};

init();
