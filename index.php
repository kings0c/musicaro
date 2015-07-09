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
        <link rel="stylesheet" href="css/bar-ui.css">
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

            <div id="audio-player" class="cyan darken-2">
                <div class="sm2-bar-ui full-width">

                    <div class="bd sm2-main-controls">

                        <div class="sm2-inline-texture"></div>
                        <div class="sm2-inline-gradient"></div>

                        <div class="sm2-inline-element sm2-button-element">
                            <div class="sm2-button-bd">
                                <a href="#play" class="sm2-inline-button play-pause">Play / pause</a>
                            </div>
                        </div>

                        <div class="sm2-inline-element sm2-inline-status">

                            <div class="sm2-playlist">
                                <div class="sm2-playlist-target">
                                    <!-- playlist <ul> + <li> markup will be injected here -->
                                    <!-- if you want default / non-JS content, you can put that here. -->
                                    <noscript><p>JavaScript is required.</p></noscript>
                                </div>
                            </div>

                            <div class="sm2-progress">
                                <div class="sm2-row">
                                    <div class="sm2-inline-time">0:00</div>
                                    <div class="sm2-progress-bd">
                                        <div class="sm2-progress-track">
                                            <div class="sm2-progress-bar"></div>
                                            <div class="sm2-progress-ball"><div class="icon-overlay"></div></div>
                                        </div>
                                    </div>
                                    <div class="sm2-inline-duration">0:00</div>
                                </div>
                            </div>

                        </div>

                        <div class="sm2-inline-element sm2-button-element sm2-volume">
                            <div class="sm2-button-bd">
                                <span class="sm2-inline-button sm2-volume-control volume-shade"></span>
                                <a href="#volume" class="sm2-inline-button sm2-volume-control">volume</a>
                            </div>
                        </div>

                        <div class="sm2-inline-element sm2-button-element">
                            <div class="sm2-button-bd">
                                <a href="#prev" title="Previous" class="sm2-inline-button previous">&lt; previous</a>
                            </div>
                        </div>

                        <div class="sm2-inline-element sm2-button-element">
                            <div class="sm2-button-bd">
                                <a href="#next" title="Next" class="sm2-inline-button next">&gt; next</a>
                            </div>
                        </div>

                        <div class="sm2-inline-element sm2-button-element">
                            <div class="sm2-button-bd">
                                <a href="#repeat" title="Repeat playlist" class="sm2-inline-button repeat">&infin; repeat</a>
                            </div>
                        </div>

                        <!-- not implemented -->
                        <!--
<div class="sm2-inline-element sm2-button-element disabled">
<div class="sm2-button-bd">
<a href="#shuffle" title="Shuffle" class="sm2-inline-button shuffle">shuffle</a>
</div>
</div>
-->

                        <div class="sm2-inline-element sm2-button-element sm2-menu">
                            <div class="sm2-button-bd">
                                <a href="#menu" class="sm2-inline-button menu">menu</a>
                            </div>
                        </div>

                        <div class="bd sm2-playlist-drawer sm2-element">

                            <div class="sm2-inline-texture">
                                <div class="sm2-box-shadow"></div>
                            </div>

                            <!-- playlist content is mirrored here -->

                            <div class="sm2-playlist-wrapper">

                                <ul class="sm2-playlist-bd">

                                    

                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer>

        </footer>
        <script src="js/soundmanager2.js"></script>
        <script src="js/bar-ui.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/jquery.min.js">\x3C/script>')</script>
        <script src="js/materialize.min.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>