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
    <?php require("templates/top_bar.php"); ?>
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

    <div id="select-library-location-wrapper" class="row valign-wrapper">
      <div class="col s6 offset-s3 hoverable valign">
        <h4>Your library is empty.</h4>
        <p>Please select a folder containing music to add it.</p>
        <input type="file" id="library-location" name="files[]" webkitdirectory directory multiple>
      </div>
    </div>

    <div id="tracks-container" class="music-container">
      <?php //require("utils/get_tracks.php"); ?>
    </div>

    <div id="albums-container" class="music-container">
      <?php //require("utils/get_albums.php"); ?>
    </div>

    <div id="artists-container" class="music-container">
      <?php //require("utils/get_artists.php"); ?>
    </div>

    <div id="playlists-container" class="music-container">
      <h1>Playlists</h1>
    </div>

    <div id="audio-player" class="cyan darken-2">
      <div class="sm2-bar-ui full-width fixed">

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
                <noscript>
                  <p>JavaScript is required.</p>
                </noscript>
              </div>
            </div>

            <div class="sm2-progress">
              <div class="sm2-row">
                <div class="sm2-inline-time">0:00</div>
                <div class="sm2-progress-bd">
                  <div class="sm2-progress-track">
                    <div class="sm2-progress-bar"></div>
                    <div class="sm2-progress-ball">
                      <div class="icon-overlay"></div>
                    </div>
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

    <noscript>
      <div id="noscript-warning">
        <div class="row">
          <div class="col s6 offset-3">
            <h2>Your browser does not support Javascript.</h2>
            <p>Please enable it to continue.</p>
            <style>
              .music-container {
                display: none;
              }
            </style>
          </div>
        </div>
      </div>
    </noscript>
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
  <script>
    window.jQuery || document.write('<script src="js/jquery.min.js">\x3C/script>')
  </script>
  <script src="js/materialize.min.js"></script>
  <script src="js/id3-minimized.js"></script>
  <script src="js/file-reader.js"></script>
  <script src="js/main.js"></script>
</body>

</html>
