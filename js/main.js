//Sort tracks given param and order (eg sortTracksBy("title", "asc") )
function sortTracksBy(param, order) {
    var tracks = [];
    $(".music-item").each(function() {
        tracks.push($(this));
    });

    tracks.sort(function(a, b) {
        if(a.find(".track-" + param).text().toLowerCase() < b.find(".track-" + param).text().toLowerCase()) {
            if(order == "asc") return -1;   
            else return 1;
        }
        if(a.find(".track-" + param).text().toLowerCase() > b.find(".track-" + param).text().toLowerCase()) {
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

    //Enable sort by dropdown
    $("#sort-by").change(function() {
        if($(this).val() == 1) sortTracksBy("title", "asc");
        else if($(this).val() == 2) sortTracksBy("title", "desc");
        else if($(this).val() == 3) sortTracksBy("artist", "asc");
        else if($(this).val() == 4) sortTracksBy("artist", "desc");
        else if($(this).val() == 5) sortTracksBy("album", "asc");
        else if($(this).val() == 6) sortTracksBy("album", "desc");
        else if($(this).val() == 7) sortTracksByDuration("asc");
        else if($(this).val() == 8) sortTracksByDuration("desc");
    });

    soundManager.setup({
        // where to find flash audio SWFs, as needed
        url: 'swf/',
        onready: function() {
            // SM2 is ready to play audio!
            //alert("ready");
        }
    });

    //Enable play links
    $(".play-track").click(function() {

        $(".sm2-playlist-bd").empty(); //Empty the existing playlist
        //Append our track as a <li> element to playlist
        $(".sm2-playlist-bd").append("<li class='selected'><a href='" + $(this).data("url") + "'><b>" + $(this).data("artist") + "</b> - " + $(this).data("title") + "</a></li>");

        //Play the track
        window.sm2BarPlayers[0].actions.play();

        //Fixes bug where 1st track's title did not appear (bit hacky, changed line 105 of bar-ui.js
        window.sm2BarPlayers[0].playlistController.refresh();
        window.sm2BarPlayers[0].dom.setTitle(window.sm2BarPlayers[0].playlistController.getItem(0));

    });

    //Enable queue links
    $(".queue-track").click(function() {
        $(".sm2-playlist-bd").append("<li><a href='" + $(this).data("url") + "'><b>" + $(this).data("artist") + "</b> - " + $(this).data("title") + "</a></li>");
    });

    //Enable refresh (update-library) button
    $("#update-library").click(function() {
        $.ajax({
            url: "php/update_library.php",
            method: "POST"
        }).done(function(html) {
            Materialize.toast(html, 4000)  
        });
    });
    
    $("#update-library").click(function() {
        $('#update-library-modal').openModal();
        $.ajax({
            url: "php/update_library.php",
            method: "POST"
        }).done(function(html) {
            Materialize.toast(html, 4000);
            $('#update-library-modal').closeModal();
        });
    });
});