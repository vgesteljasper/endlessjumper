<div class="stats_wrapper">
  <h2>Game Statistics</h2>
  <div class="stats_content">
    <div class="info"></div>
      <?php if (isset($errors) && !empty($errors)) {
        var_dump($errors);
      } ?>
    <div class="phpdata hidden">
      <?php if (isset($items) && !empty($items)) {
        echo json_encode($items);
      } ?>
    </div>
  </div>
  <svg class="svg_js"></svg>
  <svg class="svg_php hidden"></svg>
</div>
