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

        <nav>
            <?php include("templates/top-bar.php"); ?>
        </nav>

        <main>

            <div id="top-controls">
                <div class="row">
                    <div class="col s6">
                        <ul class="tabs">
                            <li class="tab col s3"><a class="active" href="#tracks-container">Tracks</a></li>
                            <li class="tab col s3"><a href="#albums-container">Albums</a></li>
                            <li class="tab col s3"><a href="#artists-container">Artists</a></li>
                            <li class="tab col s3"><a href="#playlists-container">Playlists</a></li>
                        </ul>
                    </div>
                    <div class="col s6">
                        <div class="right">
                            <select id="sort-by" class="browser-default">
                                <option value="" disabled selected>Sort By</option>
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
                </div>
            </div>
            <input type="file" id="library-location" name="files[]" webkitdirectory directory multiple>
            <div class="music-container">
            </div>

        </main>

        <footer>

        </footer>

        <!-- Modal Structure -->
        <div id="update-library-modal" class="modal">
            <div class="modal-content">
                <h4>Updating library</h4>
                <br>
                <br>
                <p>This might take a few minutes...</p>
                <br>
                <div id="progress-wrapper">
                    <progress id='progressor' value="0" max='100' style=""></progress>
                    <span id="progress-status"></span>
                </div>
            </div>
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        </div>

        <script src="js/soundmanager2.js"></script>
        <script src="js/bar-ui.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/jquery.min.js">\x3C/script>')</script>
        <script src="js/materialize.min.js"></script>
        <script src="js/id3-minimized.js"></script>
        <script src="js/file-reader.js"></script>
    </body>
</html>