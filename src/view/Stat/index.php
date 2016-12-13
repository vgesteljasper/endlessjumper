<div class="stats_wrapper">
  <h2>Game Statistics</h2>
  <div class="stats_content">
    <?php
      if (isset($errors) && !empty($errors)) {
        var_dump($errors);
      }
      if (isset($items) && !empty($items)) {
        echo '<table><thead><tr><th>created</th><th>duration</th><th>score</th><th>username</th></tr></thead><tbody>';
        foreach ($items as $item) {
          echo '<tr>';
            echo '<td>' . $item['created'] . '</td>';
            echo '<td>' . round($item['duration']/60000, 2, PHP_ROUND_HALF_UP) . ' min.</td>';
            echo '<td>' . $item['score'] . '</td>';
            echo '<td>' . $item['username'] . '</td>';
          echo '</tr>';
        }
        echo '</tbody></table>';
      }
    ?>
  </div>
</div>
