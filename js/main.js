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

    //Enable player control buttons
    $("#player-controls .player-next").click(function (e) {
        window.playlistManager.playNext();
        e.preventDefault();
        return false;
    });

    $("#player-controls .player-prev").click(function (e) {
        window.playlistManager.playPrev();
        e.preventDefault();
        return false;
    });

    //Start library manager
    window.libManager = new LibraryManager();
    window.libManager.init();

    //Start playlist manager.
    window.playlistManager = new PlaylistManager();
    window.playlistManager.init();
});

/*
 *   Music Track Class
 *   
 */

function Track(trackID, title, artist, album, imagesrc, url) {
    this.trackID = trackID;
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.imagesrc = imagesrc;
    this.url = url;
    this.dom = {};
}

Track.prototype.displayCard = function () {
    var container = "#tracks-container";

    var element = $.parseHTML("<div class='card hoverable music-item' data-id='" + this.trackID + "'>" +
        "<div class='card-image'>" +
        "<img src='" + this.imagesrc + "'>" +
        "</div>" +
        "<div class='card-content'>" +
        "<span class='track-duration right'>" + "</span>" +
        "<span class='track-title'>" + this.title + "</span>" +
        "<span class='track-artist'>" + this.artist + "</span>" +
        "<span class='track-album'>" + this.album + "</span>" +
        "<audio class='track-audio'>" +
        "<source class='track-source' type='audio/mpeg' src='" + this.url + "'></source>" +
        "</audio>" +
        "</div>" +
        "<div class='card-action'>" +
        "<a class='play-track' href='#' data-url='" + this.url + "' data-artist='" + this.artist + "' data-title='" + this.title +
        "'><i class='material-icons'>play_arrow</i></a>" +
        "<a class='queue-track right' href='#' data-url='" + this.url + "' data-artist='" + this.artist + "' data-title='" + this.title +
        "'><i class='material-icons'>queue_music</i></a>" +
        "</div>" +
        "</div>");

    this.dom = element;

    $(container).append(element);

    //Add an event listener so
    //When the <audio> has loaded track metadata, display the duration
    $(container).find(".music-item:last-child .track-audio").on("loadedmetadata", function (_event) {

        var duration = Math.round($(this)[0].duration, 2);
        var seconds = duration % 60;
        var minutes = (duration - seconds) / 60;
        if (seconds.toString().length < 2) {
            seconds = "0" + seconds;
        }
        var durationString = Math.round(minutes) + ":" + seconds;

        $(this).parent().find(".track-duration").text(durationString);
    });
};

Track.prototype.getAlbumArtFromDeezer = function () {
    var artistEncoded = escape(this.artist);
    var albumEncoded = escape(this.album);
    var titleEncoded = escape(this.title);
    var ID = this.trackID;
    var _this = this;

    while (ID.toString().length < 5) {
        ID = "0" + ID;
    }

    //Request JSONP from Deezer
    $.ajax({
        url: "https://api.deezer.com/search",
        // The name of the callback parameter as specified by Deezer
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",

        // Tell deezer what we want
        data: {
            q: "artist:%27" + artistEncoded + "%27%20title:%27" + titleEncoded + "%27",
            limit: "2",
            output: "jsonp",
            format: "json",
            myID: ID
        },
        success: function (result) {
            //The library manager object
            var libManager = window.libManager;

            //If Deezer brought us an album cover
            if (result.total > 0) {
                var imageSrc = result.data[0].album.cover_medium;
                if (imageSrc) {

                    if (result.next) { //Make sure all API call results actually have this (maybe not)

                        console.log("Deezer provided image: " + imageSrc + " for track ID " + _this.trackID);

                        //Update our card
                        $(_this.dom).find(".card-image img").attr("src", imageSrc);

                        //And our class variable
                        _this.imagesrc = imageSrc;
                    }
                }

            }
        }
    });
};

/*
 *   Music Artist Class
 *   
 */

function Artist(artistID, artist, imagesrc) {
    this.artistID = artistID;
    this.artist = artist;
    this.imagesrc = imagesrc;
    this.dom = {};
};

Artist.prototype.displayCard = function () {
    var container = "#artists-container";

    var element = $.parseHTML("<div class='card hoverable music-item' data-id='" + this.artistID + "'>" +
        "<div class='card-image'>" +
        "<img src='" + this.imagesrc + "'>" +
        "</div>" +
        "<div class='card-content'>" +
        "<span class='track-artist'>" + this.artist + "</span>" +
        "</div>" +
        "<div class='card-action'>" +
        "<a class='play-track' href='#'>Find Tracks</a>" +
        "</div>" +
        "</div>");

    this.dom = element;

    $(container).append(element);
};

Artist.prototype.getArtistArtFromDeezer = function () {
    var artistEncoded = escape(this.artist);
    var ID = this.artistID;
    var _this = this;

    while (ID.toString().length < 5) {
        ID = "0" + ID;
    }

    //Request JSONP from Deezer
    $.ajax({
        url: "https://api.deezer.com/search",
        // The name of the callback parameter
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",

        // Tell deezer what we want
        data: {
            q: "artist:%27" + artistEncoded + "%27",
            limit: "2",
            output: "jsonp",
            format: "json",
            strict: "on",
            myID: ID
        },
        success: function (result) {
            //A little lazy...
            var libManager = window.libManager;

            //If Deezer brought us an album cover
            if (result.total > 0) {
                var imageSrc = result.data[0].artist.picture_medium;
                if (imageSrc) {
                    console.log("Deezer provided image: " + imageSrc + " for artist ID " + _this.artistID);

                    //Update our card
                    $(_this.dom).find(".card-image img").attr("src", imageSrc);

                    //And our class variable
                    _this.imagesrc = imageSrc;
                }
            }

        }
    });
};

/*
 *   Music Album Class
 *   
 */

function Album(albumID, artist, album, imagesrc) {
    this.albumID = albumID;
    this.artist = artist;
    this.album = album;
    this.imagesrc = imagesrc;
    this.dom = {};
};

Album.prototype.displayCard = function () {
    var container = "#albums-container";

    var element = $.parseHTML("<div class='card hoverable music-item'>" +
        "<div class='card-image'>" +
        "<img src='" + this.imagesrc + "'>" +
        "</div>" +
        "<div class='card-content'>" +
        "<span class='track-artist'>" + this.artist + "</span>" +
        "<span class='track-album'>" + this.album + "</span>" +
        "</div>" +
        "<div class='card-action'>" +
        "<a class='play-album' href='#' data-url='" + this.url + "' data-artist='" + this.artist + "' data-title='" + this.title + "'>Find Tracks</a>" +
        "</div>" +
        "</div>");

    this.dom = element;

    $(container).append(element);
};

/*   Library manager class.
 *   Check for File API support, if supported add a listener to the change event of browse button
 *   Then load ID3 tag reader, for each file object from browse
 *   output a materialize.css card with the title, artist and album art
 */

function LibraryManager() {

    var _this = this;
    this.promises = []; //Array for our promises

    this.tracks = [];
    this.albums = [];
    this.artists = [];

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
        //**TODO** make this a bit prettier
        $("#select-library-location-wrapper").hide(1000);

        // files is a FileList of File objects. Iterate through each file
        // For each file that is an mp3, load the id3 tags and output a card
        // After we've finished, enable the play/queue links
        //
        // ID3.loadTags is called async
        // We need to update play / queue after tracks are added
        // So use deferred/promises

        for (var i = 0; i < files.length; i++) {

            var f = files[i];
            if (f.type == "audio/mp3") {
                var reader = new FileAPIReader(f);
                var url = f.urn || f.name;
                var objectURL = window.URL.createObjectURL(f);
                getTagsFromFile(f, reader, objectURL);
            }

            function getTagsFromFile(f, reader, objectURL) {
                //Create a new deferred and place it on the promises stack.
                var def = new $.Deferred();
                _this.promises.push(def);

                ID3.loadTags(objectURL, function () {
                    var tags = ID3.getAllTags(objectURL);
                    if (tags) {
                        var artist = tags.artist || "Unknown";
                        var title = tags.title || "Unknown";
                        var album = tags.album || "Unknown";
                        var imagesrc = "image/default.png"; //Default image
                        if ("picture" in tags) {
                            var image = tags.picture;
                            var base64String = "";
                            for (var j = 0; j < image.data.length; j++) {
                                base64String += String.fromCharCode(image.data[j]);
                            }
                            imagesrc = "data:" + image.format + ";base64," + window.btoa(base64String);
                        } else {
                            //No image in ID3 tags, grab one from Deezer 
                            //Log to console for debugging
                            console.log("No album art found for track: " + title + " by " + artist + " in ID3 tags. Trying Deezer.");
                        }

                        //Now create a new Track object and display it
                        var newTrack = new Track(_this.tracks.length, title, artist, album, imagesrc, objectURL);
                        _this.tracks.push(newTrack);
                        newTrack.displayCard();

                        if (!("picture" in tags)) {
                            //Grab album art from deezer
                            newTrack.getAlbumArtFromDeezer();
                        }

                        //Resolve the deferred
                        def.resolve();

                    } else {
                        console.log("No tags for current track");
                    }
                }, {
                    tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
                    dataReader: reader
                });
            }
        } //End for

        for (var p = 0; p < _this.promises.length; p++) {
            console.log("Promise state " + _this.promises[p].state());
        }

        $.when.apply($, _this.promises).done(afterTracksDone);

        function afterTracksDone() {
            //Tracks have been added
            //Now enable the play and queue links
            console.log("Enabling play/queue links.");
            _this.enablePlayAndQueueLinks();

            //Now populate other tabs
            console.log("Populating albums tab.");
            _this.populateAlbums();

            console.log("Populating artists tab.");
            _this.populateArtists();
        }
    };

    /*
     *   Populate the albums tab
     *   Looks through tracks tab and creates a new card in album tab
     *   For each unique album
     */
    this.populateAlbums = function () {
        for (var i in this.tracks) {
            var track = this.tracks[i];

            if (this.albums.indexOf(track.album) == -1) { //If artist is new, add it to our list
                this.albums.push(track.album);

                var newAlbum = new Album(this.albums.length - 1, track.artist, track.album, track.imagesrc);
                this.artists.push(newAlbum);
                newAlbum.displayCard();
            }
        }
    };

    /*
     *   Populate the artists tab
     *   Looks through tracks tab and creates a new card in artist tab
     *   For each unique artist
     */
    this.populateArtists = function () {
        for (var i in this.tracks) {
            var track = this.tracks[i];

            if (this.artists.indexOf(track.artist) == -1) { //If artist is new, add it to our list
                this.artists.push(track.artist);

                var newArtist = new Artist(this.artists.length - 1, track.artist, track.imagesrc);
                this.artists.push(newArtist);
                newArtist.displayCard();
                newArtist.getArtistArtFromDeezer();
            }
        }
    };

    //Enable play/queue links for each .music-item
    this.enablePlayAndQueueLinks = function () {

        $(".music-item .play-track").click(function (e) {

            window.playlistManager.playTrack($(this).data("url"), $(this).data("artist"), $(this).data("title"));

            e.preventDefault();

            return false;
        });

        //Enable queue links
        $(".music-item .queue-track").click(function (e) {

            window.playlistManager.queueTrack($(this).data("url"), $(this).data("artist"), $(this).data("title"));

            e.preventDefault();

            return false;

        });

    };

    this.saveLibrary = function () {
        chrome.storage.local.set
    };

    this.loadLibrary = function () {

    };
}

function PlaylistManager() {

    this.init = function () {

        this._this = this;
        this.currentTrackIndex = 0;


        //Listen for end of song, play next in queue when so
        $("#html5-audio")[0].addEventListener("ended", function (e) {
            _this.playNext();
        });


    };

    this.playTrack = function (url, artist, title) {
        $("#playlist").empty(); //Empty the existing playlist

        //Add a new li to the our playlist
        $("#playlist").append("<li class='selected'><a href='" + url + "'><b>" + artist + "</b> - " + title + "</a></li>");

        var audio = $("#html5-audio")[0];
        var source = $('#track1')[0];
        source.src = url;

        audio.load(); //Load the track
        audio.play(); //And play
    }

    this.queueTrack = function (url, artist, title) {
        $("#playlist").append("<li><a href='" + url + "'><b>" + artist + "</b> - " + title + "</a></li>");
    }

    this.playNext = function () {

        if (this.currentTrackIndex < $("#playlist li").length - 1) this.currentTrackIndex++;
        else return false;

        var audio = $("#html5-audio")[0];
        var source = $('#track1')[0];
        var trackURL = $("#playlist li:nth-child(" + (this.currentTrackIndex + 1) + ") a").attr("href");
        source.src = trackURL;

        audio.load(); //call this to just preload the audio without playing
        audio.play(); //call this to play the song right away

    };

    this.playPrev = function () {

        if (this.currentTrackIndex > 0) this.currentTrackIndex--;
        else return false;

        var audio = $("#html5-audio")[0];
        var source = $('#track1')[0];
        var trackURL = $("#playlist li:nth-child(" + (this.currentTrackIndex + 1) + ") a").attr("href");
        source.src = trackURL;

        audio.load(); //call this to just preload the audio without playing
        audio.play(); //call this to play the song right away
    };
}
