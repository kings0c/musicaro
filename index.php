<?php
    include('php/db_connect.php');
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Musicaro - All your music in one place</title>
        <link rel="stylesheet" type="text/css" href="css/materialize.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>

        <nav>
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo">Musicaro</a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="sass.html"><i class="material-icons">search</i></a></li>
                    <li><a href="badges.html"><i class="material-icons">view_module</i></a></li>
                    <li><a href="collapsible.html"><i class="material-icons">refresh</i></a></li>
                    <li><a href="mobile.html"><i class="material-icons">more_vert</i></a></li>
                </ul>
            </div>
            
        </nav>

        <main>
            <div class="row">
                
                <div class="col s12">
                    <?php
                        /* https://api.discogs.com/database/search?q=Nirvana&key=foo123&secret=bar456 */
                        $key = "KlcXtlqKXAGEMORXXqtZ";
                        $secret = "oUgjEWDmHDCzfGryuYSmtBSfAWYAooZp";

                        
                    ?>
                    <div class="card music-item">
                        <div class="card-image">
                            <img src="img/Awake.jpg">
                            <span class="card-title">Dream Theater - Awake</span>
                        </div>
                        <div class="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                            <a href="#">Listen</a>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </main>

        <footer>

        </footer>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/jquery.min.js">\x3C/script>')</script>
        <script src="js/materialize.min.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>