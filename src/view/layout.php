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
              urls: ['assets/BigJohn/big_john.css', 'assets/DinRegular/din_regular.css', 'assets/DinMedium/din_medium.css']
            }
         };
         (function(d) {
            var wf = d.createElement('script'), s = d.scripts[0];
            wf.async = true;
            wf.src = 'js/webfontloader.js';
            s.parentNode.insertBefore(wf, s);
         })(document);
        </script>
        <?php echo $css; ?>
    </head>
    <body>
        <?php echo $content; ?>
        <?php echo $js; ?>
    </body>
</html>
