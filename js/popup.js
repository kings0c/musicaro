/*  JS File for popup.htm
 *   Runs popup front-end process for chrome extension
 *   talks to the managers in main.js (LibraryManager, PlaylistManager)
 */

/**
 * Sort tracks, artists and albums given
 * @param   {String}   param title, artist or album
 * @param   {String}   order "asc" or "desc"
 */
function sortCardsBy(param, order) {
    //Add each track to an array so we can sort them
    var containersToSort = "";
    
    //Sort the correct containers, ie cant sort albums by track-title
    if(param == "title") containersToSort = "#tracks-container";
    else if(param == "album") containersToSort = "#tracks-container, #albums-container";
    else if(param == "artist") containersToSort = "#tracks-container, #albums-container, #artists-container";
    
    $(containersToSort).each(function () {
        var cards = [];
        $(this).find(".music-item").each(function () {
            cards.push($(this));
        });

        cards.sort(function (a, b) {
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
        for (var i = 0; i < cards.length; i++) {
            cards[i].css("order", i);
        }
    });
}

/**
 * Sort tracks by duration by specified order
 * @param   {String}   order "asc" or "desc"
 */
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

//Cache JQuery Selectors
//Borrowed from http://ttmm.io/tech/selector-caching-jquery/
function Selector_Cache() {
    var collection = {};

    function get_from_cache( selector ) {
        if ( undefined === collection[ selector ] ) {
            collection[ selector ] = $( selector );
        }

        return collection[ selector ];
    }

    return { get: get_from_cache };
}

var selectors = new Selector_Cache();

$(document).ready(function () {
    
    //Hide the add folder menu
    selectors.get("#add-folder-wrapper").hide(0);
    
    //Enable sort by dropdown
    //***Could probably change this to call correct function by slicing up the dropdown value
    // Likely a waste of time while there's so few options
    selectors.get("#sort-by").change(function () {
        if (selectors.get("#sort-by").val() == 1) sortCardsBy("title", "asc");
        else if (selectors.get("#sort-by").val() == 2) sortCardsBy("title", "desc");
        else if (selectors.get("#sort-by").val() == 3) sortCardsBy("artist", "asc");
        else if (selectors.get("#sort-by").val() == 4) sortCardsBy("artist", "desc");
        else if (selectors.get("#sort-by").val() == 5) sortCardsBy("album", "asc");
        else if (selectors.get("#sort-by").val() == 6) sortCardsBy("album", "desc");
        else if (selectors.get("#sort-by").val() == 7) sortTracksByDuration("asc");
        else if (selectors.get("#sort-by").val() == 8) sortTracksByDuration("desc");
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
         
        selectors.get("#player-controls .player-playpause").click(function (e) {
            if (bgPage.playlistManager.isPlaying) {
                bgPage.playlistManager.pause();
                selectors.get("#player-controls .player-playpause").html('<i class="small material-icons">play_arrow</i>');
            } else {
                bgPage.playlistManager.play();
                selectors.get("#player-controls .player-playpause").html('<i class="small material-icons">pause</i>');
            }
            e.preventDefault();
            return false;
        });

    //Nav add folder button
    $("#library-add-folder").click(function () {
        //Reset values to default
        selectors.get("#folder-location").attr("display", "inline-block");
        $("#add-folder-wrapper .folder-instructions").text("Select a folder containing music to add it to your library.");
        $("#add-folder-wrapper .ajax-spinner").hide(0);
        
        $("#add-folder-wrapper").show(0);
    });

    //Enable file select in #select-library-location-wrapper
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        //Add listener to input
        selectors.get('#library-location')[0].addEventListener('change', selectLibraryHandler, false);
        $('#folder-location')[0].addEventListener('change', addFolderHandler, false);
    } else {
        $("#select-library-location-wrapper").html('The File APIs are not fully supported in this browser.');
    }

    window.popupManager = new PopupManager();
    popupManager.displayTracks(); //Get any already existing tracks from the background
    popupManager.displayAlbums();
    popupManager.displayArtists();
    
    //Check if a track is playing
    //If so set it to playing
    var currentTrackID = bgPage.playlistManager.getCurrentlyPlaying();
    if(currentTrackID != null) {
        console.log("Currently playing track: " + currentTrackID);
        popupManager.setPlaying(currentTrackID);
    }
    
    //Enable nav search bar function
    $("#search").keyup(function () {
        popupManager.search($(this).val());
    });
});

/**
 * Handler for select library location's <input type=file>
 * @param {Object} evt Event
 */
function selectLibraryHandler(evt) {
    var files = evt.target.files; // FileList object

    var backgroundPage = chrome.extension.getBackgroundPage();

    backgroundPage.libManager.handleFileSelect(files);

    selectors.get("#library-location").attr("display", "none");
    $("#select-library-location-wrapper .library-instructions").text("Loading files. This may take a few minutes...");
    $("#select-library-location-wrapper .ajax-spinner").show(0);
}

/**
 * Handler for add folder's <input type=file>
 * @param {Object} evt Event
 */
function addFolderHandler(evt) {
    var files = evt.target.files; // FileList object

    var backgroundPage = chrome.extension.getBackgroundPage();

    backgroundPage.libManager.handleFileSelect(files);

    selectors.get("#folder-location").attr("display", "none");
    $("#add-folder-wrapper .folder-instructions").text("Loading files. This may take a few minutes...");
    $("#add-folder-wrapper .ajax-spinner").show(0);
}

/*  Popup manager class, talks to the background page
 *  Pulls arrays containing tracks/artists/albums
 *  And displays them in the popup
 *  Handles search
 */
function PopupManager() {
    var _this = this;
    this.backgroundPage = chrome.extension.getBackgroundPage();
    this.currentTrack = null;
    
    /**
     * Filter the tracks given an input string (from top search bar)
     * @param {String} searchString The search query
     */
    this.search = function(searchString) {
        searchString = searchString.toLowerCase();
        
            //Hide any .music-item where title album or artist does not match search string
            $(".music-item").each(function () {
                var $currentItem = $(this);
                if(searchString == "") {
                    $currentItem.css("display", "inline-block");
                }
                else {
                    var myTitle = $currentItem.find(".track-title").text().toLowerCase();
                    var myArtist = $currentItem.find(".track-artist").text().toLowerCase();
                    var myAlbum = $currentItem.find(".track-album").text().toLowerCase();

                    $currentItem.css("display", "none");

                    if (myTitle.indexOf(searchString) != -1 || myArtist.indexOf(searchString) != -1 || myAlbum.indexOf(searchString) != -1) {
                        $currentItem.css("display", "inline-block");
                    }
                }
            });
    };
    
    /**
     * Hides the folder select menu's 
     * Called by displayTracks after background is finished
     */
    this.hideFolderSelectMenus = function () {
        $("#select-library-location-wrapper").hide();
        $("#add-folder-wrapper").hide();
    };

    /**
     * Output a card for each item in backgroundPage.libManager.tracks array
     * into #tracks-container via displayTrackCard
     */
    this.displayTracks = function () {
        var backgroundPage = this.backgroundPage;

        if (backgroundPage.libManager.tracks.length) {
            
            this.hideFolderSelectMenus();

            for (var t in backgroundPage.libManager.tracks) {
                var track = backgroundPage.libManager.tracks[t];
                
                //Output a new card with default image
                var $dom = this.displayTrackCard(track.trackID, track.title, track.artist, track.album, track.url);
                
                //And change the image
                $dom.find(".card-image img").attr("src", track.imagesrc);
            }

            this.enablePlayAndQueueLinks();
            this.displayAlbums();
            this.displayArtists();
            this.enableFindTracksLinks();
        }
    };
    
    /**
     * Output a card for each item in backgroundPage.libManager.albums array
     * into #albums-container via displayAlbumCard
     */
    this.displayAlbums = function () {
        var backgroundPage = this.backgroundPage;

        if (backgroundPage.libManager.albums.length) {

            for (var a in backgroundPage.libManager.albums) {
                var album = backgroundPage.libManager.albums[a];

                var dom = this.displayAlbumCard(album.albumID, album.artist, album.album, album.imagesrc);
                $(dom).find(".card-image img").attr("src", album.imagesrc);
            }
            
        }
    };
    
    /**
     * Output a card for each item in backgroundPage.libManager.artists array
     * into #artists-container via displayArtistCard
     */
    this.displayArtists = function () {
        var backgroundPage = this.backgroundPage;

        if (backgroundPage.libManager.artists.length) {

            for (var a in backgroundPage.libManager.artists) {
                var artist = backgroundPage.libManager.artists[a];

                var dom = this.displayArtistCard(artist.artistID, artist.artist, artist.imagesrc);
                $(dom).find(".card-image img").attr("src", artist.imagesrc);
            }
            
        }
    };

    this.displayTrackCard = function (trackID, title, artist, album, url) {
        var container = "#tracks-container";

        var element = $.parseHTML("<div class='card hoverable music-item' data-id='" + trackID + "'>" +
            "<div class='card-image'>" +
            "<img src='image/default.png'>" +
            "</div>" +
            "<div class='card-content'>" +
            "<span class='track-duration right'>" + "</span>" +
            "<span class='track-title'>" + title + "</span>" +
            "<span class='track-artist'>" + artist + "</span>" +
            "<span class='track-album'>" + album + "</span>" +
            "<audio class='track-audio'>" +
            "<source class='track-source' type='audio/mpeg' src='" + url + "'></source>" +
            "</audio>" +
            "</div>" +
            "<div class='card-action'>" +
            "<a class='play-track' href='#' data-url='" + url + "' data-artist='" + artist + "' data-title='" + title +
            "'><i class='material-icons'>play_arrow</i></a>" +
            "<a class='queue-track right' href='#' data-url='" + url + "' data-artist='" + artist + "' data-title='" + title +
            "'><i class='material-icons'>queue_music</i></a>" +
            "</div>" +
            "</div>");
        $(container).append(element);

        //Add an event listener so
        //When the <audio> has loaded track metadata, display the duration
        var $newTrackDOM = $(element);
        $newTrackDOM.find(".track-audio").on("loadedmetadata", function (_event) {

            var duration = Math.round($(this)[0].duration, 2);
            var seconds = duration % 60;
            var minutes = (duration - seconds) / 60;
            if (seconds.toString().length < 2) {
                seconds = "0" + seconds;
            }
            var durationString = Math.round(minutes) + ":" + seconds;

            $(this).parent().find(".track-duration").text(durationString);
        });
        
        return $newTrackDOM;
    };

    this.displayArtistCard = function (artistID, artist, imagesrc) {
        var container = "#artists-container";

        var element = $.parseHTML("<div class='card hoverable music-item' data-id='" + artistID + "'>" +
            "<div class='card-image'>" +
            "<img src='" + imagesrc + "'>" +
            "</div>" +
            "<div class='card-content'>" +
            "<span class='track-artist'>" + artist + "</span>" +
            "</div>" +
            "<div class='card-action'>" +
            "<a class='find-tracks' href='#'>Find Tracks</a>" +
            "</div>" +
            "</div>");

        $(container).append(element);
        return element;
    };

    this.displayAlbumCard = function (albumID, artist, album, imagesrc) {
        var container = "#albums-container";

        var element = $.parseHTML("<div class='card hoverable music-item' data-id='" + albumID + "'>" +
            "<div class='card-image'>" +
            "<img src='" + imagesrc + "'>" +
            "</div>" +
            "<div class='card-content'>" +
            "<span class='track-artist'>" + artist + "</span>" +
            "<span class='track-album'>" + album + "</span>" +
            "</div>" +
            "<div class='card-action'>" +
            "<a class='find-tracks' href='#' data-url='" + "' data-artist='" + artist + "'>Find Tracks</a>" +
            "</div>" +
            "</div>");

        $(container).append(element);
        return element;
    };

    /**
     * Enable play/queue links for each .music-item in #tracks-container
     */
    this.enablePlayAndQueueLinks = function () {
        
        //Enable play links
        $("#tracks-container .music-item .play-track").click(function (e) {
            var $currentPlayLink = $(this); //Cache the selector
            
            var trackID = $currentPlayLink.parent().parent().data("id");
            //If this track is already playing (the icon is pause not play)
            if ($currentPlayLink.find("i").text() == 'pause') {
                chrome.extension.getBackgroundPage().playlistManager.pause();
            } else {

                //Tell the playlist manager in the BG page to play the track
                chrome.extension.getBackgroundPage().playlistManager.playTrack($currentPlayLink.data("url"),
                    $currentPlayLink.data("artist"), $currentPlayLink.data("title"), trackID);
            }
            e.preventDefault();

            return false;

        });

        //Enable queue links
        $("#tracks-container .music-item .queue-track").click(function (e) {
            var $currentQueueLink = $(this); //Cache the selector
            var trackID = $currentQueueLink.parent().parent().data("id");

            //Tell the playlist manager in the BG page to queue the track
            chrome.extension.getBackgroundPage().playlistManager.queueTrack($currentQueueLink.data("url"),
                $currentQueueLink.data("artist"), $currentQueueLink.data("title"), trackID);

            e.preventDefault();

            return false;

        });
    };
    
    /**
     * Enable Find Tracks links in #albums-container and #artists-container
     */
    this.enableFindTracksLinks = function() {
        $("#albums-container .music-item .find-tracks").click(function(e) {
            
            //Grab the album name from .track-album
            var searchString = $(this).parent().parent().find(".track-album").text();
            
            //Switch the tab back to tracks
            $('ul.tabs').tabs('select_tab', 'tracks-container');
            
            //Set the search bar value to our album name so the user knows to clear it
            //if they want all tracks back
            $("#search").val(searchString);
            
            //And finally perform the search
            _this.search(searchString);
            
            e.preventDefault();
            return false;
        });
        
        $("#artists-container .music-item .find-tracks").click(function(e) {
            
            //Grab the album name from .track-album
            var searchString = $(this).parent().parent().find(".track-artist").text();
            
            //Switch the tab back to tracks
            $('ul.tabs').tabs('select_tab', 'tracks-container');
            
            //Set the search bar value to our album name so the user knows to clear it
            //if they want all tracks back
            $("#search").val(searchString);
            
            //And finally perform the search
            _this.search(searchString);
            
            e.preventDefault();
            return false;
        });
    };

    /**
     * Set the currently playing track. Changes the card's play/pause button and the players
     * @param {Integer} trackid Internal track ID to set as playing
     */
    this.setPlaying = function (trackid) {

        this.currentTrack = trackid;
        var trackName = chrome.extension.getBackgroundPage().libManager.tracks[trackid].title;
        var trackArtist = chrome.extension.getBackgroundPage().libManager.tracks[trackid].artist;
        var trackAlbum = chrome.extension.getBackgroundPage().libManager.tracks[trackid].album;

        //Change the currently playing tracks play button in card to pause
        $("#tracks-container .music-item").each(function (e) {
            var $currentTrackCard = $(this); //Cache the selector
            if ($currentTrackCard.data("id") == trackid) {
                $currentTrackCard.find(".play-track i").text('pause');
            } else {
                $currentTrackCard.find(".play-track i").text('play_arrow');
            }
        });
        
        //Update the now playing marquee
        $("#now-playing span").html(trackName + " - " + trackArtist + " - " + trackAlbum);

        //Change player play/pause icon
        $("#player-controls .player-playpause i").text('pause');
    };

    /**
     * Set state to paused. Change all play/pause to paused
     */
    this.setPaused = function () {
        //Change every card's button to the play icon
        $("#tracks-container .music-item").each(function (e) {
            $(this).find(".play-track i").text('play_arrow');
        });

        //Change player play/pause icon
        $("#player-controls .player-playpause i").text('play_arrow');
    };

    /**
     * Update the track-position slider with the current track time
     * @param {Integer} time    Current time in track
     * @param {Integer} maxTime Length of track
     */
    this.updateTime = function (time, maxTime) {
        if (maxTime) { //Make sure maxTime isn't falsey, possible if track metadata isn't available yet
            var percentage = Math.floor((time / maxTime) * 100);
            $(".player-position").val(percentage);
        }
    };
}
