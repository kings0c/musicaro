/*
*   Check for File API support, if supported add a listener to the change event of browse button
*   Then load ID3 tag reader, for each file object from browse
*   output a materialize.css card with the title, artist and album art
*/

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object

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
                if (typeof console !== "undefined") console.log("Time: " + ((endDate-startDate)/1000)+"s");
                var tags = ID3.getAllTags(url);
                if(tags) {
                    artist = tags.artist || "";
                    title = tags.title || "";
                    album = tags.album || "";
                    year = tags.year || "";
                    genre = tags.genre || "";
                    track = tags.track || "";
                    lyrics = (tags.lyrics||{}).lyrics || "";
                    imagesrc = "";
                    if( "picture" in tags ) {
                        var image = tags.picture;
                        var base64String = "";
                        for (var i = 0; i < image.data.length; i++) {
                            base64String += String.fromCharCode(image.data[i]);
                        }
                        imagesrc = "data:" + image.format + ";base64," + window.btoa(base64String);
                    }
                    $(".music-container").append("<div class='card hoverable music-item'>" +
                                            "<div class='card-image'>" +
                                                "<img src='" + imagesrc + "'>" +
                                            "</div>" +
                                            "<div class='card-content'>" +
                                                "<span class='track-title'>" + tags.title + "</span>" +
                                                "<span class='track-artist'>" + tags.artist + "</span>" +
                                                "<span class='track-album'>" + tags.album + "</span>" +
                                                "<span class='track-duration'>" + tags.year + "</span>" +
                                            "</div>" +
                                            "<div class='card-action'>" +
                                                "<a class='play-track' href='#' data-url='" + url + "'>Play</a>" +
                                            "</div>" +
                                      "</div>");
                }
                else {
                    console.log("No tags");
                }
            },
                         {tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
                          dataReader: reader});


        }
    }

    document.getElementById('library-location').addEventListener('change', handleFileSelect, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}
