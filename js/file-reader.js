/*
 *   Check for File API support, if supported add a listener to the change event of browse button
 *   Then load ID3 tag reader, for each file object from browse
 *   output a materialize.css card with the title, artist and album art
 */

function LibraryManager() {
  var _this = this;

  //Check for File API support and bind to change event of <input type=file>
  this.init = function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      //Add listener to input
      document.getElementById('library-location').addEventListener('change', this.handleFileSelect, false);
    } else {
      $("#select-library-location-wrapper").html('The File APIs are not fully supported in this browser.');
    }
  };

  //Event listener function, what to do with FileList passed by <input type=file>
  this.handleFileSelect = function(evt) {
    var files = evt.target.files; // FileList object

    //Hide the select folder dialog
    $("#select-library-location-wrapper").hide(1000);

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      var reader = FileAPIReader(f);
      var url = f.urn || f.name;
      var startDate = new Date().getTime();

      var artist;
      var title;
      var album;
      var year;
      var genre;
      var track;
      var lyrics;
      var imagesrc = null;

      ID3.loadTags(url, function() {
        var endDate = new Date().getTime();
        if (typeof console !== "undefined") console.log("Time: " + ((endDate - startDate) / 1000) + "s");
        var tags = ID3.getAllTags(url);
        if (tags) {
          artist = tags.artist || "";
          title = tags.title || "";
          album = tags.album || "";
          year = tags.year || "";
          genre = tags.genre || "";
          track = tags.track || "";
          lyrics = (tags.lyrics || {}).lyrics || "";
          imagesrc = "";
          if ("picture" in tags) {
            var image = tags.picture;
            var base64String = "";
            for (var i = 0; i < image.data.length; i++) {
              base64String += String.fromCharCode(image.data[i]);
            }
            imagesrc = "data:" + image.format + ";base64," + window.btoa(base64String);
          }

          //Now output a new card
          _this.outputNewCard("#tracks-container", title, artist, album, year, imagesrc, url);
        } else {
          console.log("No tags");
        }
      }, {
        tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
        dataReader: reader
      });
    }

    //Now populate other tabs
    _this.populateAlbums();
  };

  this.outputNewCard = function(container, title, artist, album, year, imagesrc, url) {
    $(container).append("<div class='card hoverable music-item'>" +
      "<div class='card-image'>" +
      "<img src='" + imagesrc + "'>" +
      "</div>" +
      "<div class='card-content'>" +
      "<span class='track-title'>" + title + "</span>" +
      "<span class='track-artist'>" + artist + "</span>" +
      "<span class='track-album'>" + album + "</span>" +
      "<span class='track-duration'>" + year + "</span>" +
      "</div>" +
      "<div class='card-action'>" +
      "<a class='play-track' href='#' data-url='" + url + "'>Play</a>" +
      "</div>" +
      "</div>");
  }

  this.populateAlbums = function() {
    var albumsSoFar = [];

    $("#tracks-container .music-item").each(function() {
      var title = $(this).find(".track-title").text();
      var artist = $(this).find(".track-artist").text();
      var album = $(this).find(".track-album").text();
      var year = $(this).find(".track-duration").text();
      var url = $(this).find(".play-track").data("url");
      var imagesrc = $(this).find("img").attr("src");

      if (albumsSoFar.indexOf(album) == -1) {
        albumsSoFar.push(album);

        _this.outputNewCard("#albums-container", title, artist, album, year, imagesrc, url);
      } else {
        console.log("Album already present.")
      }
    });
  }

}

var manager = new LibraryManager();
manager.init();
