//Sort tracks given param and order
//Param can be one of title / artists / album
//Order must be either "asc" or "desc"
function sortTracksBy(param, order) {
    //Add each track to an array so we can sort them
    var tracks = [];
    $(".music-item").each(function () {
        tracks.push($(this));
    });

    tracks.sort(function (a, b) {
        //Numerically compare the lowercase version of each strings
        if (a.find(".track-" + param).text().toLowerCase() < b.find(".track-" + param).text().toLowerCase()) {
            if (order == "asc") return -1;
            else return 1;
        }
        if (a.find(".track-" + param).text().toLowerCase() > b.find(".track-" + param).text().toLowerCase()) {
            if (order == "asc") return 1;
            else return -1;
        }
        return 0;
    });

    //Now set the flexbox order property according to their order in the array
    for (var i = 0; i < tracks.length; i++) {
        tracks[i].css("order", i);
    }
}

//Sort tracks by duration by specified order
//Order must be either "asc" or "desc"
function sortTracksByDuration(order) {
    //Add each track to an array so we can sort them
    var tracks = [];
    $(".music-item").each(function () {
        tracks.push($(this));
    });

    tracks.sort(function (a, b) {
        //Split the duration text up around : (eg 3:10 goes to [[0] => 3, [1] => 10]
        //Convert it to seconds and sort
        var time1secs = a.find(".track-duration").text().toLowerCase().split(":");
        time1secs = 60 * parseInt(time1secs[0]) + parseInt(time1secs[1]);

        var time2secs = b.find(".track-duration").text().toLowerCase().split(":");
        time2secs = 60 * parseInt(time2secs[0]) + parseInt(time2secs[1]);

        if (time1secs < time2secs) {
            if (order == "asc") return -1;
            else return 1;
        }
        if (time1secs > time2secs) {
            if (order == "asc") return 1;
            else return -1;
        }
        return 0;
    });

    //Now set the flexbox order property according to their order in the array
    for (var i = 0; i < tracks.length; i++) {
        tracks[i].css("order", i);
    }
}

$(document).ready(function () {

    //Enable sort by dropdown

    //***Could probably change this to call correct function by slicing up the dropdown value
    // Likely a waste of time while there's so few options
    $("#sort-by").change(function () {
        if ($(this).val() == 1) sortTracksBy("title", "asc");
        else if ($(this).val() == 2) sortTracksBy("title", "desc");
        else if ($(this).val() == 3) sortTracksBy("artist", "asc");
        else if ($(this).val() == 4) sortTracksBy("artist", "desc");
        else if ($(this).val() == 5) sortTracksBy("album", "asc");
        else if ($(this).val() == 6) sortTracksBy("album", "desc");
        else if ($(this).val() == 7) sortTracksByDuration("asc");
        else if ($(this).val() == 8) sortTracksByDuration("desc");
    });

    //Set up soundManager so we can play audio
    //http://www.schillmania.com/projects/soundmanager2/
    soundManager.setup({
        // where to find flash audio SWFs, as needed
        url: 'swf/',
        onready: function () {
            // SM2 is ready to play audio!
            // We should disable the listen buttons until soundmanager is ready
        }
    });

    //Enable nav refresh (update-library) button in nav bar
    //Shows modal #update-library-modal with progress bar and info
    $("nav #update-library").click(function () {
        $('#update-library-modal').openModal();

        //Listen for events from our php script so we can show progress
        //http://www.htmlgoodies.com/beyond/php/show-progress-report-for-long-running-php-scripts.html
        es = new EventSource('utils/update_library.php');

        //a message is received
        es.addEventListener('message', function (e) {
            var result = JSON.parse(e.data);

            $("#progress-status").text(result.message);

            if (e.lastEventId == 'CLOSE') {
                $("#progress-status").text(result.message);
                es.close();
                var pBar = document.getElementById('progressor');
                pBar.value = pBar.max; //max out the progress bar
                setTimeout(function () {

                    //Display a toast
                    Materialize.toast("Library update complete", 4000);

                    //Close the modal
                    $('#update-library-modal').closeModal();

                    //Now grab the updated library via AJAX and output to screen
                    $.ajax({
                        url: "utils/get_tracks.php",
                        method: "POST"
                    }).done(function (html) {
                        $("#tracks-container").html(html); //Load returned data into tracks (needs other tabs too)
                    });
                }, 3000);
            } else {
                var pBar = document.getElementById('progressor');
                pBar.value = result.progress;
            }
        });
    });

    //Enable nav search bar function
    $("nav form input").keyup(function () {
        var searchString = $(this).val().toLowerCase();

        //Remove any .music-item where title album or artist does not match search string
        $(".music-item").each(function () {
            var myTitle = $(this).find(".track-title").text().toLowerCase();
            var myArtist = $(this).find(".track-artist").text().toLowerCase();
            var myAlbum = $(this).find(".track-album").text().toLowerCase();

            $(this).css("display", "none");

            if (myTitle.indexOf(searchString) != -1 || myArtist.indexOf(searchString) != -1 || myAlbum.indexOf(searchString) != -1) {
                $(this).css("display", "inline-block");
            }
        });
    });

    //Enable mobile side nav button
    $(".button-collapse").sideNav();

    //Start library manager
    window.manager = new LibraryManager();
    window.manager.init();
});

/*   Library manager class.
 *   Check for File API support, if supported add a listener to the change event of browse button
 *   Then load ID3 tag reader, for each file object from browse
 *   output a materialize.css card with the title, artist and album art
 */

function LibraryManager() {
    var _this = this;

    //Check for File API support and bind to change event of <input type=file>
    this.init = function () {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //Add listener to input
            document.getElementById('library-location').addEventListener('change', this.handleFileSelect, false);
        } else {
            $("#select-library-location-wrapper").html('The File APIs are not fully supported in this browser.');
        }
    };

    //Event listener function, what to do with FileList passed by <input type=file>
    this.handleFileSelect = function (evt) {
        var files = evt.target.files; // FileList object

        //Hide the select folder dialog
        $("#select-library-location-wrapper").hide(1000);

        // files is a FileList of File objects. List some properties.
        for (var i = 0; i < files.length; i++) {
            function first() {
                var f = files[i];
                if (f.type == "audio/mp3") {
                    var reader = new FileAPIReader(f);
                    var url = f.urn || f.name;
                    var objectURL = window.URL.createObjectURL(f);
                    second(f, reader, objectURL);
                }
            }

            function second(f, reader, objectURL) {
                ID3.loadTags(objectURL, function () {
                    var tags = ID3.getAllTags(objectURL);
                    if (tags) {
                        var artist = tags.artist || "";
                        var title = tags.title || "";
                        var album = tags.album || "";
                        var year = tags.year || "";
                        console.log("Loaded " + title);
                        var imagesrc = "";
                        if ("picture" in tags) {
                            var image = tags.picture;
                            var base64String = "";
                            for (var i = 0; i < image.data.length; i++) {
                                base64String += String.fromCharCode(image.data[i]);
                            }
                            imagesrc = "data:" + image.format + ";base64," + window.btoa(base64String);
                        }

                        //Now output a new card
                        _this.outputNewCard("track", "#tracks-container", title, artist, album, year, imagesrc, objectURL);

                        //Now enable the play and queue links
                        console.log("Enabling play/queue links.");
                        _this.enablePlayAndQueueLinks();

                        //Now populate other tabs
                        console.log("Populating albums tab.");
                        _this.populateAlbums();
                    } else {
                        console.log("No tags for current track");
                    }
                }, {
                    tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
                    dataReader: reader
                });
            }

            first();
        }
    };

    this.outputNewCard = function (type, container, title, artist, album, year, imagesrc, url) {
        if (type == "track") {
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
                "<a class='play-track' href='#' data-url='" + url + "' data-artist='" + artist + "' data-title='" + title + "'>Play</a>" +
                "<a class='queue-track right' href='#' data-url='" + url + "' data-artist='" + artist + "' data-title='" + title + "'>Queue</a>" +
                "</div>" +
                "</div>");
        } else if (type == "album") {
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
                "<a class='play-track' href='#' data-url='" + url + "' data-artist='" + artist + "' data-title='" + title + "'>Play</a>" +
                "<a class='queue-track right' href='#' data-url='" + url + "' data-artist='" + artist + "' data-title='" + title + "'>Queue</a>" +
                "</div>" +
                "</div>");
        }
    }

    this.populateAlbums = function () {
        var albumsSoFar = [];

        $("#tracks-container .music-item").each(function () {
            var title = $(this).find(".track-title").text();
            var artist = $(this).find(".track-artist").text();
            var album = $(this).find(".track-album").text();
            var year = $(this).find(".track-duration").text();
            var url = $(this).find(".play-track").data("url");
            var imagesrc = $(this).find("img").attr("src");

            if (albumsSoFar.indexOf(album) == -1) {
                albumsSoFar.push(album);

                _this.outputNewCard("#albums-container", album, artist, "", year, imagesrc, url);
            } else {
                console.log("Album already present.")
            }
        });
    }

    this.enablePlayAndQueueLinks = function () {
        //Enable play links for each track
        $(".music-item .play-track").click(function (e) {

            /*$(".sm2-playlist-bd").empty(); //Empty the existing playlist

            //Append our track as a <li> element to playlist
            $(".sm2-playlist-bd").append("<li class='selected'><a href='" + $(this).data("url") + "'><b>" + $(this).data("artist") + "</b> - " + $(this).data("title") + "</a></li>");*/

            var audio = document.getElementById('html5-audio');
            $("#html5-audio").append("<source id='track1' src='' type='audio/mpeg'></source>");
            var source = document.getElementById('track1');
            source.src = $(this).data("url");

            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song right away

            e.preventDefault();

            return false;
        });

        //Enable queue links
        $(".music-item .queue-track").click(function () {
            $(".sm2-playlist-bd").append("<li><a href='" + $(this).data("url") + "'><b>" + $(this).data("artist") + "</b> - " + $(this).data("title") + "</a></li>");
        });
    }

}
