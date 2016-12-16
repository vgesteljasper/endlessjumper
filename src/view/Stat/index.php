<section class="stats_wrapper">
  <h2>Game Statistics</h2>
  <div class="controlls">
    <form class="filter" id="form" action="/?page=stats" method="post">
      <div class="column column_left">
        <svg class="filter_icon centered">
          <path d="M23.7,2.8H1.8c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1h21.9c0.6,0,1.1,0.5,1.1,1.1S24.3,2.8,23.7,2.8z"/>
        	<path d="M20.6,8.1H4.9C4.3,8.1,3.9,7.6,3.9,7c0-0.6,0.5-1.1,1.1-1.1h15.7c0.6,0,1.1,0.5,1.1,1.1C21.7,7.6,21.2,8.1,20.6,8.1z"/>
        	<path d="M18.1,13.4H7.5c-0.6,0-1.1-0.5-1.1-1.1c0-0.6,0.5-1.1,1.1-1.1h10.6c0.6,0,1.1,0.5,1.1,1.1C19.2,12.9,18.7,13.4,18.1,13.4z"/>
          <text x="40" y="13" style="font-family:BigJohn;font-size:1.2rem;color:black">FILTER</text>
        </svg>
      </div>
      <div class="column column_right">
        <div class="row">
          <span>START DATE</span>
          <input type="date" name="start_date" id="startDate" value="<?php echo date("Y") . '-' . date("n") . '-01' ?>">
          <span>END DATE</span>
          <input type="date" name="end_date" id="endDate" value="<?php echo date("Y") . '-' . date("n") . '-01' ?>">
        </div>
        <div class="row">
          <input type="submit" name="filter" value="FILTER STATS">
        </div>
      </div>
    </form>
  </div>
  <div class="info"></div>
  <svg class="svg"></svg>
</section>
