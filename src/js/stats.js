import * as statsUtils from './functions/stats_utils';
import es6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
es6Promise.polyfill();

const $info = document.getElementsByClassName(`info`)[0];
const $svg = document.getElementsByClassName(`svg`)[0];
const $form = document.getElementById(`form`);
const $startDate = document.getElementById(`startDate`);
const $endDate = document.getElementById(`endDate`);

let gameData;

const init = () => {
  loadItems();
  $form.addEventListener(`submit`, applyFilter);
};

const applyFilter = event => {
  event.preventDefault();
  const start = new Date($startDate.value);
  const end = new Date($endDate.value);

  const filteredData = statsUtils.getFilteredDataBetween(gameData, start, end);

  console.log(filteredData);

  $svg.innerHTML = ``;
  statsUtils.createUsageChart(filteredData, $svg, `${$startDate.value} till ${$endDate.value}`);
};

const loadItems = () => {
  fetch(`index.php?page=stats_get&data=all&t=${Date.now()}`, {
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
    gameData = result;
    $svg.innerHTML = ``;
    statsUtils.createUsageChart(result, $svg, `ALL TIME`);
  })
  .catch(() => {
    $info.innerHTML = `<p>Error retrieving data. Refresh to try again.</p>`;
  });
};

init();
