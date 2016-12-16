<section class="stats_wrapper">

  <!--
  // USED FETCH POLYFILL TO SUPPORT FETCH ON ALL DEVICED
  // NO NEED FOR PHP FALLBACK
  -->

  <h2>Game Statistics</h2>

  <div class="controlls">
    <form class="filter" id="form" action="/?page=stats" method="post">
      <p>show data between two dates</p>
      <input type="date" name="start_date" id="startDate" value="<?php echo date("Y") . '-' . date("n") . '-01' ?>">
      <span>TILL</span>
      <input type="date" name="end_date" id="endDate" value="<?php echo date("Y") . '-' . date("n") . '-01' ?>">
      <input type="submit" name="filter" value="show stats">
    </form>
  </div>

  <div class="info"></div>
  <svg class="svg"></svg>

</section>
