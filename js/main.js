function sortTracksByTitle(order) {
    var tracks = [];
    $(".music-item").each(function() {
        tracks.push($(this));
    });

    tracks.sort(function(a, b) {
        if(a.find(".track-title").text().toLowerCase() < b.find(".track-title").text().toLowerCase()) {
            if(order == "asc") return -1;   
            else return 1;
        }
        if(a.find(".track-title").text().toLowerCase() > b.find(".track-title").text().toLowerCase()) {
            if(order == "asc") return 1;   
            else return -1;
        }
        return 0;
    });

    for(var i=0; i < tracks.length; i++) {
        tracks[i].css("order", i);   
    }
}

function sortTracksByArtist(order) {
    var tracks = [];
    $(".music-item").each(function() {
        tracks.push($(this));
    });

    tracks.sort(function(a, b) {
        if(a.find(".track-artist").text().toLowerCase() < b.find(".track-artist").text().toLowerCase()) {
            if(order == "asc") return -1;   
            else return 1;
        }
        if(a.find(".track-artist").text().toLowerCase() > b.find(".track-artist").text().toLowerCase()) {
            if(order == "asc") return 1;   
            else return -1;
        }
        return 0;
    });

    for(var i=0; i < tracks.length; i++) {
        tracks[i].css("order", i);   
    }
}

function sortTracksByAlbum(order) {
    var tracks = [];
    $(".music-item").each(function() {
        tracks.push($(this));
    });

    tracks.sort(function(a, b) {
        if(a.find(".track-album").text().toLowerCase() < b.find(".track-album").text().toLowerCase()) {
            if(order == "asc") return -1;   
            else return 1;
        }
        if(a.find(".track-album").text().toLowerCase() > b.find(".track-album").text().toLowerCase()) {
            if(order == "asc") return 1;   
            else return -1;
        }
        return 0;
    });

    for(var i=0; i < tracks.length; i++) {
        tracks[i].css("order", i);   
    }
}

function sortTracksByDuration(order) {
    var tracks = [];
    $(".music-item").each(function() {
        tracks.push($(this));
    });

    tracks.sort(function(a, b) {
        var time1secs = a.find(".track-duration").text().toLowerCase().split(":");
        time1secs = 60*parseInt(time1secs[0]) + parseInt(time1secs[1]);
        
        var time2secs = b.find(".track-duration").text().toLowerCase().split(":");
        time2secs = 60*parseInt(time2secs[0]) + parseInt(time2secs[1]);
        
        if(time1secs < time2secs) {
            if(order == "asc") return -1;   
            else return 1;
        }
        if(time1secs > time2secs) {
            if(order == "asc") return 1;   
            else return -1;
        }
        return 0;
    });

    for(var i=0; i < tracks.length; i++) {
        tracks[i].css("order", i);   
    }
}

$(document).ready(function() {

    $("#sort-by").change(function() {
        if($(this).val() == 1) sortTracksByTitle("asc");
        else if($(this).val() == 2) sortTracksByTitle("desc");
        else if($(this).val() == 3) sortTracksByArtist("asc");
        else if($(this).val() == 4) sortTracksByArtist("desc");
        else if($(this).val() == 5) sortTracksByAlbum("asc");
        else if($(this).val() == 6) sortTracksByAlbum("desc");
        else if($(this).val() == 7) sortTracksByDuration("asc");
        else if($(this).val() == 8) sortTracksByDuration("desc");
    });

});