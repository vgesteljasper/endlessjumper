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
    <form class="filter" action="/?page=stats" method="post">
      <div class="row">
        <p>show data by month</p>
        <input type="radio" checked name="type" value="month">
        <select class="month" name="month">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div class="row">
        <p>show data between two dates</p>
        <input type="radio" name="type" value="custom">
        <input type="date" name="start_date" value="<?php echo date("Y") . '-' . date("n") . '-01' ?>">
        <span>TILL</span>
        <input type="date" name="end_date" value="<?php echo date("Y") . '-' . date("n") . '-01' ?>">
      </div>
        <input type="submit" name="filter" value="show stats">
    </form>
  </div>
  <div class="info"></div>
  <svg class="svg_js"></svg>
  <svg class="svg_php hidden"></svg>
</section>
