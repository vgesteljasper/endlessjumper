<section class="stats_wrapper">
  <h2>Game Statistics</h2>
  <div class="stats_content">
      <?php if (isset($errors) && !empty($errors)) {
        var_dump($errors);
      } ?>
    <div class="phpdata hidden">
      <?php if (isset($items) && !empty($items)) {
        echo json_encode($items);
      } ?>
    </div>
  </div>
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
  <svg class="svg_js"></svg>
  <svg class="svg_php hidden"></svg>
</section>
