<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="author" content="Lennert Vloeberghs, Seppe Clijsters, Remco Van Gestel, Jasper Van Gestel">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>The Fox Game</title>
        <script>
         WebFontConfig = {
           custom: {
              families: ['BigJohn', 'DINRegular', 'DINMedium'],
              urls: ['assets/fonts/BigJohn/big_john.css', 'assets/fonts/DinRegular/din_regular.css', 'assets/fonts/DinMedium/din_medium.css']
            }
         };
         (function(d) {
            var wf = d.createElement('script'), s = d.scripts[0];
            wf.async = true;
            wf.src = 'js/vendors/webfontloader.js';
            s.parentNode.insertBefore(wf, s);
         })(document);
        </script>
        <link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/apple-touch-icon.png">
        <link rel="shortcut icon" href="assets/favicons/favicon.ico">
        <?php echo $css; ?>
    </head>
    <body>
      <main class="wrapper">
        <?php echo $content; ?>
        <?php echo $js; ?>
      </main>
    </body>
</html>
