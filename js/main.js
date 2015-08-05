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
 * Make a JSON request to Last.FM API for the Album of the current Track
 * If there's a result, set the imagesrc of Track to the provided image
 */
Track.prototype.getAlbumArtFromLastFM = function () {
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
 * Artist class
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
 * Make a JSON request to Last.FM API for the Artist
 * If there's a result, set the imagesrc of Artist to the provided image
 */
Artist.prototype.getArtistArtFromLastFM = function() {
    var _this = this;

    //Request JSON from Last.fm
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/",
        dataType: "json",
        data: {
            method: "artist.getInfo",
            api_key: "8a25e929a53ad33d8f5c1507ab70b84c",
            artist: _this.artist,
            format: "json"
        }
    }).done(function (result) {

        //If Last.fm brought us an album cover
        if (result.artist) {
            //Find the "large" image
            var imageArray = result.artist.image;
            var imageSrc = "";
            for (var i in imageArray) {
                if (imageArray[i].size == "large") {
                    imageSrc = imageArray[i]["#text"];
                }
            }

            if (imageSrc) {
                console.log("LastFM provided art for artist " + _this.artistID + " " + result.artist.name);
                
                //Update our class variable
                _this.imagesrc = imageSrc;
            }
        }

    });
}

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
 * Library Manager Class
 * Holds each track, artist, and album
 */
function LibraryManager() {

    var _this = this;
    
    this.promises = []; //Array for our promises

    this.tracks = [];
    this.albums = [];
    this.albumNames = [];
    this.artists = [];
    this.artistNames = [];

    
    /**Handle files passed from popup.htm <input type="file">
     * @param {FileList}    files   FileList object from popup.htm
     */
    this.handleFileSelect = function (files) {

        //Hide the select folder dialog
        //**TODO** make this a bit prettier
        $("#select-library-location-wrapper").hide(1000);

        // files is a FileList of File objects. Iterate through each file
        // For each file that is an mp3, load the id3 tags and add the track to tracks[]
        //
        // ID3.loadTags is called async
        // We need to update play / queue after tracks are added
        // So create a promise for each track and resolve it when the ID3 tags have been read

        for (var i = 0; i < files.length; i++) {

            var f = files[i];
            if (f.type == "audio/mp3") { //TODO: more file support
                var reader = new FileAPIReader(f);
                var url = f.urn || f.name;
                var objectURL = window.URL.createObjectURL(f);
                getTagsFromFile(f, reader, objectURL);
            }
            
            /**
             * pull ID3 tags from provided mp3 file
             * and create a new Track in tracks[]
             * @param {File}          f         from FileList provided by popup.htm
             * @param {FileAPIReader} reader    File reader object
             * @param {Blob}          objectURL Path to the file provided by File API blob://xxxx
             */
            function getTagsFromFile(f, reader, objectURL) {
                //Create a new promise
                var promise = new Promise(function (resolve, reject) {
                    ID3.loadTags(objectURL, function () {
                        var tags = ID3.getAllTags(objectURL);
                        if (tags) {
                            var artist = tags.artist || "Unknown";
                            var title = tags.title || "Unknown";
                            var album = tags.album || "Unknown";
                            var imagesrc = "image/default.png"; //Default image
                            
                            //If there's a picture in the ID3 tags, base64 encode it and use that as the tracks imagesrc
                            if ("picture" in tags) {
                                var image = tags.picture;
                                var base64String = "";
                                for (var j = 0; j < image.data.length; j++) {
                                    base64String += String.fromCharCode(image.data[j]);
                                }
                                imagesrc = "data:" + image.format + ";base64," + window.btoa(base64String);
                            } else {
                                //Log to console for debugging
                                console.log("No album art found for track: " + title + " by " + artist + " in ID3 tags. Trying LastFM.");
                            }

                            //Now create a new Track object and display it
                            var newTrack = new Track(_this.tracks.length, title, artist, album, imagesrc, objectURL);
                            _this.tracks.push(newTrack);

                            if (!("picture" in tags)) {
                                //No image in ID3 tags, grab one from Deezer 
                                //Grab album art from deezer
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
                
                //Add the promise to the promises stack
                //So we know when all tracks are done
                _this.promises.push(promise);
            } //End getTagsFromFile
        }//End for


        Promise.all(_this.promises).then(function() {
            afterTracksDone();
        });

        function afterTracksDone() {
            //All tracks have been added
            
            //Populate artists and albums arrays
            _this.populateAlbums();
            _this.populateArtists();
            
            //Trigger refresh on popup
            console.log("Refreshing popup view");
            if(chrome.extension.getViews()[1]) {
                chrome.extension.getViews()[1].popupManager.hideAddMenus();
                chrome.extension.getViews()[1].popupManager.displayTracks();
            }
        }
    };

    /*
     *   Populate the albums tab
     *   Looks through tracks array and creates a new item in albums array
     *   For each unique album
     */
    this.populateAlbums = function () {
        for (var i in this.tracks) {
            var track = this.tracks[i];
            
            var albumExists = false;
            
            for(var j in this.albums) {
                if(this.albums[j].album == track.album && this.albums[j].artist == track.artist) {
                    albumExists = true;   
                }
            }
            
            if (!albumExists) { //If artist is new, add it to our array
                
                console.log("Creating new album " + track.album + " by " + track.artist + " with image " + track.imagesrc);
                var newAlbum = new Album(this.albums.length - 1, track.artist, track.album, track.imagesrc);
                this.albums.push(newAlbum);
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
            
            var artistExists = false;
            
            for(var j in this.artists) {
                if(this.artists[j].artist == track.artist) {
                    artistExists = true;   
                }
            }

            if (!artistExists) { //If artist is new, add it to our list
                this.artistNames.push(track.artist);
                
                var newArtist = new Artist(this.artists.length - 1, track.artist, track.imagesrc);
                this.artists.push(newArtist);
                newArtist.getArtistArtFromLastFM();
            }
        }
    };

    
    /**
     * Save Library to local disk using File API
     */
    this.saveLibrary = function () {

    };
    
    /**
     * Get Library to local disk using File API
     */
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
            _this.updateCurrentTime(e.target.currentTime);
        });


    };

    this.getCurrentTime = function () {
        return _this.currentTime;
    };

    this.playTrack = function (url, artist, title, trackid) {
        $("#playlist").empty(); //Empty the existing playlist

        //Add a new li to the our playlist
        $("#playlist").append("<li class='selected' data-id='" + trackid + "'><a href='" + url + "'><b>" + artist + "</b> - " + title + "</a></li>");
        
        //Set the <audio> <source> to the url
        var source = $('#track1')[0];
        source.src = url;

        this.player.load(); //Load the track
        this.player.play(); //And play

        //Let the popup know we're playing a new song
        this.currentTrackID = trackid;
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.setPlaying(trackid);
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

        this.player.load();
        this.player.play();

        //Let the popup know we're playing a new song
        this.currentTrackID = trackID;
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.setPlaying(trackID);
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

        this.player.load();
        this.player.play();

        //Let the popup.js know we're playing a new song
        this.currentTrackID = trackID;

        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.setPlaying(trackID);
        }
    };

    this.play = function () {
        this.player.play();
        //Let the popup know we've started playing again
        if (chrome.extension.getViews()[1]) {
            chrome.extension.getViews()[1].popupManager.setPlaying(this.currentTrackID);
        }
    };

    this.pause = function () {
        this.player.pause();

        //Let the popup know we've paused
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
    
    this.getCurrentlyPlaying = function() {
        return this.currentTrackID;
    }  
}
