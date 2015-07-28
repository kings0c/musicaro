/*  JS File for popup.htm
*   Runs popup front-end process for chrome extension
*   talks to the managers in main.js (LibraryManager, PlaylistManager)
*/

//Sort tracks given param and order
//Param can be one of title / artists / album
//Order must be either "asc" or "desc"
function sortTracksBy(param, order) {
    //Add each track to an array so we can sort them
    $("#tracks-container, #albums-container, #artists-container").each(function() {
        var tracks = [];
        $(this).find(".music-item").each(function () {
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
    });
}

//Sort tracks by duration by specified order
//Order must be either "asc" or "desc"
function sortTracksByDuration(order) {
    //Add each track to an array so we can sort them
    var tracks = [];
    $("#tracks-container .music-item").each(function () {
        tracks.push($(this));
    });

    tracks.sort(function (a, b) {
        //Split the duration text up around : (eg 3:10 goes to [[0] => 3, [1] => 10]
        //Convert it to seconds and sort
        var time1secs = a.find(".track-duration").text().toLowerCase().split(":");
        time1secs = 60 * parseInt(time1secs[0]) + parseInt(time1secs[1]);

        var time2secs = b.find(".track-duration").text().toLowerCase().split(":");
        time2secs = 60 * parseInt(time2secs[0]) + parseInt(time2secs[1]);
        
        //console.log(a.find(".track-title")

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

    var bgPage = chrome.extension.getBackgroundPage();

    //Enable player control buttons
    //Next
    $("#player-controls .player-next").click(function (e) {
        bgPage.playlistManager.playNext();
        e.preventDefault();
        return false;
    });
    //Prev
    $("#player-controls .player-prev").click(function (e) {
        bgPage.playlistManager.playPrev();
        e.preventDefault();
        return false;
    });
    //PlayPause
    $("#player-controls .player-playpause").click(function (e) {
        if (bgPage.playlistManager.isPlaying) {
            bgPage.playlistManager.pause();
            $("#player-controls .player-playpause").html('<i class="small material-icons">play_arrow</i>');
        } else {
            bgPage.playlistManager.play();
            $("#player-controls .player-playpause").html('<i class="small material-icons">pause</i>');
        }
        e.preventDefault();
        return false;
    });

    //Nav add folder button
    $("#library-add-folder").click(function () {
        $("#select-library-location-wrapper").show(0);
    });

    //Enable file select
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        //Add listener to input
        $('#library-location')[0].addEventListener('change', fileSelectHandler, false);
    } else {
        $("#select-library-location-wrapper").html('The File APIs are not fully supported in this browser.');
    }

    window.bgInterface = new BackgroundInterface();
    bgInterface.getTracks();    //Get any already existing tracks from the background
});

function fileSelectHandler(evt) {
    var files = evt.target.files; // FileList object

    var backgroundPage = chrome.extension.getBackgroundPage();

    backgroundPage.libManager.handleFileSelect(files);

    $("#library-location").remove();
    $(".library-instructions").text("Loading files. This may take a few minutes...");
    $(".ajax-spinner").show(0);
}

/*  Object to interface with background page
 *
 *
 */

function BackgroundInterface() {
    var _this = this;
    this.backgroundPage = chrome.extension.getBackgroundPage();
    this.currentTrack = null;

    this.getTracks = function () {
        var backgroundPage = this.backgroundPage;

        if (backgroundPage.libManager.tracks.length) {
            $("#select-library-location-wrapper").hide();

            $("#tracks-container").html($(backgroundPage.document.body).find("#tracks-container").html());
            $("#artists-container").html($(backgroundPage.document.body).find("#artists-container").html());
            $("#albums-container").html($(backgroundPage.document.body).find("#albums-container").html());

            _this.enablePlayAndQueueLinks();
        }
    }

    //Enable play/queue links for each .music-item
    this.enablePlayAndQueueLinks = function () {

        $(".music-item .play-track").click(function (e) {
            var trackID = $(this).parent().parent().data("id");
            //If this track is already playing (the icon is pause not play)
            if ($(this).find("i").text() == 'pause') {
                chrome.extension.getBackgroundPage().playlistManager.pause();
            } else {

                //Tell the playlist manager in the BG page to play the track
                chrome.extension.getBackgroundPage().playlistManager.playTrack($(this).data("url"),
                    $(this).data("artist"), $(this).data("title"), trackID);
            }
            e.preventDefault();

            return false;

        });

        //Enable queue links
        $(".music-item .queue-track").click(function (e) {
            var trackID = $(this).parent().parent().data("id");

            //Tell the playlist manager in the BG page to queue the track
            chrome.extension.getBackgroundPage().playlistManager.queueTrack($(this).data("url"),
                $(this).data("artist"), $(this).data("title"), trackID);

            e.preventDefault();

            return false;

        });
    };

    this.startedPlaying = function (trackid) {

        //Set current track var
        _this.currentTrack = trackid;

        //Change the currently playing tracks play button in card to pause
        $(".music-item").each(function (e) {
            if ($(this).data("id") == trackid) {
                $(this).find(".play-track i").text('pause');
            } else {
                $(this).find(".play-track i").text('play_arrow');
            }
        });

        //Change player play/pause icon
        $("#player-controls .player-playpause i").text('pause');
    };

    this.paused = function () {
        //Change every card's button to the play icon
        $(".music-item").each(function (e) {
            $(this).find(".play-track i").text('play_arrow');
        });

        //Change player play/pause icon
        $("#player-controls .player-playpause i").text('play_arrow');
    };
    
    this.updateTime = function(time, maxTime) {
        if(maxTime) { //Make sure maxTime isn't null, possible if track metadata isn't available yet
            var percentage = Math.floor((time / maxTime) * 100);
            $(".player-position").val(percentage);
        }
    };
}
