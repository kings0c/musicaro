/*  JS File for background.htm
 *   Runs background process for chrome extension
 *   popup.js talks to the managers in this file (LibraryManager, PlaylistManager)
 */

$(document).ready(function () {

    //Start library manager
    window.libManager = new LibraryManager();

    //Start playlist manager.
    window.playlistManager = new PlaylistManager();
    window.playlistManager.init();

    /*convertImgToBase64URL("http://userserve-ak.last.fm/serve/174s/59987371.jpg", function(base64Data) {
        console.log(base64Data);
    });*/

});


/**
 * Music Track object
 * @param {Integer} trackID  Internal track ID
 * @param {String}  title    Title of the track
 * @param {String}  artist   Artist name
 * @param {String}  album    Album name
 * @param {String}  imagesrc path to album art or base64 encoded image
 * @param {String}  url      Path to blob provided by HTML file API 
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


/**
 * Output a new card for the track in #tracks-container
 */
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
    $(this.dom).find(".track-audio").on("loadedmetadata", function (_event) {

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


/**
 * Get album art from deezer API, on success change the <img src>
 */
Track.prototype.getAlbumArtFromDeezer = function () {
    var artistEncoded = escape(this.artist);
    var albumEncoded = escape(this.album);
    var titleEncoded = escape(this.title);
    var ID = this.trackID;
    var _this = this;

    while (ID.toString().length < 5) {
        ID = "0" + ID;
    }

    //Request JSON from Deezer
    $.ajax({
        url: "https://api.deezer.com/search",
        // The name of the callback parameter as specified by Deezer
        jsonp: "callback",

        // Tell jQuery we're expecting JSON
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

/**
 * Convert an image 
 * to a base64 url
 * @param  {String}   url         
 * @param  {Function} callback    
 * @param  {String}   [outputFormat=image/png]           
 */
function convertImgToBase64URL(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

/**
 * Request album art from Last.FM API, on success change the <img src>
 */
Track.prototype.getAlbumArtFromLastFM = function () {
    var artistEncoded = escape(this.artist);
    var albumEncoded = escape(this.album);
    var titleEncoded = escape(this.title);
    var ID = this.trackID;
    var _this = this;

    //Request JSON from Last.fm
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/",
        dataType: "json",
        data: {
            method: "album.getInfo",
            api_key: "8a25e929a53ad33d8f5c1507ab70b84c",
            artist: _this.artist,
            album: _this.album,
            format: "json"
        }
    }).done(function (result) {

        //If Last.fm brought us an album cover
        if (result.album) {
            //Find the "large" image
            var imageArray = result.album.image;
            var imageSrc = "";
            for (var i in imageArray) {
                if (imageArray[i].size == "large") {
                    imageSrc = imageArray[i]["#text"];
                }
            }

            if (imageSrc) {
                console.log("LastFM provided art for track " + _this.trackID + " - " + result.album.name + " by " + result.album.artist);
                
                //Update our class variable
                _this.imagesrc = imageSrc;
            }
        }

    });
};

/**
 * Artist object
 * @param {Integer} artistID Internal artist ID
 * @param {String}  artist   Name of artist
 * @param {String}  imagesrc Path to artist art or base 64 encoded image
 */
function Artist(artistID, artist, imagesrc) {
    this.artistID = artistID;
    this.artist = artist;
    this.imagesrc = imagesrc;
    this.dom = {};
};


/**
 * Display a card for the artist in #artists-container
 */
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


/**
 * Get the artist art from the Deezer API and update the card <img src>
 */
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

        // Tell jQuery we're expecting JSONP
        dataType: "json",

        // Tell deezer what we want
        data: {
            q: "artist:%27" + artistEncoded + "%27",
            limit: "2",
            output: "json",
            format: "json",
            strict: "on",
            timeout: 3000,
            myID: ID
        }
    }).done(function (result) {
        //A little lazy...
        var libManager = window.libManager;

        //If Deezer brought us an album cover
        if (result.total > 0) {
            var imageSrc = result.data[0].artist.picture_medium;
            if (imageSrc) {
                console.log("Deezer provided image: " + imageSrc + " for artist ID " + _this.artistID);

                //Update our card
                //$(_this.dom).find(".card-image img").attr("src", imageSrc);

                var img = $("<img />").attr('src', imageSrc)
                    .load(function () {
                        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                            $(_this.dom).find(".card-image").html("<span>Broken Image</span>");
                        } else {
                            $(_this.dom).find(".card-image").html(img);
                        }
                    });

                //And our class variable
                _this.imagesrc = imageSrc;
            }
        }

    });
};


/**
 * Album object
 * @param {Integer} albumID  Internal album ID
 * @param {String}  artist   name of artist
 * @param {String}  album    name of album
 * @param {String}  imagesrc Path to album art or base64 encoded image
 */
function Album(albumID, artist, album, imagesrc) {
    this.albumID = albumID;
    this.artist = artist;
    this.album = album;
    this.imagesrc = imagesrc;
    this.dom = {};
};


/**
 * Display a card for the artist in #albums-container
 */
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

    //What to do with FileList passed by <input type=file>
    this.handleFileSelect = function (files) {
        //var files = evt.target.files; // FileList object

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
                //Create a new promise and place it on the promises stack.
                var promise = new Promise(function (resolve, reject) {
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
                                console.log("No album art found for track: " + title + " by " + artist + " in ID3 tags. Trying LastFM.");
                            }

                            //Now create a new Track object and display it
                            var newTrack = new Track(_this.tracks.length, title, artist, album, imagesrc, objectURL);
                            _this.tracks.push(newTrack);
                            newTrack.displayCard();

                            if (!("picture" in tags)) {
                                //Grab album art from deezer, deferred is resolved here
                                newTrack.getAlbumArtFromLastFM();
                            }

                        } else {
                            console.log("No tags for current track");
                        }

                        resolve();
                    }, {
                        tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
                        dataReader: reader
                    });
                });
                _this.promises.push(promise);
            } //End getTagsFromFile
        }//End for


        Promise.all(_this.promises).then(function() {
            afterTracksDone();
        });

        function afterTracksDone() {
            //Tracks have been added

            //Trigger refresh on popup
            console.log("Refreshing popup view");
            if(chrome.extension.getViews()[1]) {
                chrome.extension.getViews()[1].popupManager.getTracks();
            }
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
                newArtist.getArtistArtFromDeezer();
            }
        }
    };

    this.saveLibrary = function () {

    };

    this.loadLibrary = function () {

    };
}

/*  PlaylistManager object
 *   Controls playlist functions eg prev/next, play/pause, play new track, and queue track
 *
 */

function PlaylistManager() {

    var _this = this;

    this.player = null;
    this.currentTrackID = null;
    this.currentTrackIndex = null;
    this.currentTime = null;
    this.isPlaying = false;

    this.init = function () {
        this.player = $("#html5-audio")[0];
        this.currentTrackIndex = 0;

        //Listen for start of playing, set isPlaying
        $("#html5-audio")[0].addEventListener("playing", function (e) {
            _this.isPlaying = true;
            //chrome.extension.getViews()[1].popupManager.startedPlaying();
        });

        //Listen for pause, set isPlaying
        $("#html5-audio")[0].addEventListener("pause", function (e) {
            _this.isPlaying = false;
        });

        //Listen for end of song, play next in queue when so
        $("#html5-audio")[0].addEventListener("ended", function (e) {
            _this.isPlaying = false;
            _this.playNext();
        });

        //Listen for time change and update our currentTime
        $("#html5-audio")[0].addEventListener("timeupdate", function (e) {
            //_this.currentTime = e.target.currentTime;
            _this.updateCurrentTime(e.target.currentTime);
        });


    };

    this.getCurrentTime = function () {

    };

    this.playTrack = function (url, artist, title, trackid) {
        $("#playlist").empty(); //Empty the existing playlist

        //Add a new li to the our playlist
        $("#playlist").append("<li class='selected' data-id='" + trackid + "'><a href='" + url + "'><b>" + artist + "</b> - " + title + "</a></li>");

        var source = $('#track1')[0];
        source.src = url;

        this.player.load(); //Load the track
        this.player.play(); //And play

        //Let the popup.js know we're playing a new song
        this.currentTrackID = trackid;
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.startedPlaying(trackid);
        }

    };

    this.queueTrack = function (url, artist, title, trackid) {
        $("#playlist").append("<li data-id='" + trackid + "'><a href='" + url + "'><b>" + artist + "</b> - " + title + "</a></li>");
    };

    this.playNext = function () {

        if (this.currentTrackIndex < $("#playlist li").length - 1) this.currentTrackIndex++;
        else return false;

        var source = $('#track1')[0];
        var trackID = $("#playlist li:nth-child(" + (this.currentTrackIndex + 1) + ")").data("id");
        var trackURL = $("#playlist li:nth-child(" + (this.currentTrackIndex + 1) + ") a").attr("href");
        source.src = trackURL;

        this.player.load(); //call this to just preload the audio without playing
        this.player.play(); //call this to play the song right away

        //Let the popup.js know we're playing a new song
        this.currentTrackID = trackID;
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.startedPlaying(trackID);
        }
    };

    this.playPrev = function () {

        if (this.currentTrackIndex > 0) this.currentTrackIndex--;
        else return false;

        var audio = $("#html5-audio")[0];
        var source = $('#track1')[0];
        var trackID = $("#playlist li:nth-child(" + (this.currentTrackIndex + 1) + ")").data("id");
        var trackURL = $("#playlist li:nth-child(" + (this.currentTrackIndex + 1) + ") a").attr("href");
        source.src = trackURL;

        this.player.load(); //call this to just preload the audio without playing
        this.player.play(); //call this to play the song right away

        //Let the popup.js know we're playing a new song
        this.currentTrackID = trackID;

        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.startedPlaying(trackID);
        }
    };

    this.play = function () {
        this.player.play();
        //Let the popup.js know we've started playing again
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.startedPlaying(this.currentTrackID);
        }
    };

    this.pause = function () {
        this.player.pause();

        //Let the popup.js know we've paused
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.setPaused();
        }
    };

    this.updateCurrentTime = function (time, maxTime) {
        this.currentTime = time;
        //Let the popup.js know we've changed time
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.updateTime(time, this.player.duration);
        }
    };
}
