const init = () => {

  loadItems();
  setInterval(loadItems, 30000);
}

const loadItems = () => {
  fetch(`/index.php?page=stats&t=${Date.now()}`, {
    headers: new Headers({
      Accept: `application/json`
    })
  })
  .then(response => response.json())
  .then(result => {
    const $statsWrapper = document.getElementsByClassName(`stats_content`)[0];
    if(!result || result.length === 0) {
      $statsWrapper.innerHTML = `<p>No Items In Database</p>`;
      return;
    }
    let date = new Date();
    let resultHTML = `<p>This list automatically refreshed every 30 seconds.<br><span>last refresh: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span></p>
    <table>
      <thead>
        <tr>
          <th>created</th>
          <th>duration</th>
          <th>score</th>
          <th>username</th>
        </tr>
      </thead>
      <tbody>`;
      console.log(result);
    result.forEach(item => {
      let duration = item.duration/60000;
      resultHTML += `
      <tr>
        <td>${item.created}</td>
        <td>${duration.toFixed(2)} min.</td>
        <td>${item.score}</td>
        <td>${item.username}</td>
      </tr>`;
    });
    resultHTML += `
    </tbody>
  </table>`;
    $statsWrapper.innerHTML = resultHTML;
  });
};

init();
