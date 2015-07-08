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

        <nav class="cyan darken-1">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo">Musicaro</a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="php/update_library.php"><i class="material-icons">refresh</i></a></li>
                    <li><a href="sass.html"><i class="material-icons">search</i></a></li>
                    <li><a href="badges.html"><i class="material-icons">view_module</i></a></li>
                    <li><a href="collapsible.html"><i class="material-icons">refresh</i></a></li>
                    <li><a href="mobile.html"><i class="material-icons">more_vert</i></a></li>
                </ul>
            </div>

        </nav>

        <main>

            <div id="top-controls">
                <div class="left">

                </div>

                <div class="right">
                    <label>Sort By: </label>
                    <select id="sort-by" class="browser-default">
                        <option value="" disabled selected>Choose your option</option>
                        <option value="1">Title (Asc)</option>
                        <option value="2">Title (Desc)</option>
                        <option value="3">Artist (Asc)</option>
                        <option value="4">Artist (Desc)</option>
                        <option value="5">Album (Asc)</option>
                        <option value="6">Album (Desc)</option>
                        <option value="7">Duration (Asc)</option>
                        <option value="8">Duration (Desc)</option>
                    </select>
                </div>
            </div>

            <div class="music-container">
                <?php include("php/get_tracks.php"); ?>
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