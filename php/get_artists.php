<?php
/*  Pull top x tracks from tracks_library table
*   Output as a Materialize.css card with album art
*
*/

include('db_connect.php');
$art_full_dir = "/Users/ings0c/Documents/Websites/musicaro/album-art/";
$art_dir = "album-art/";
if($result = $db->query("SELECT * FROM track_library")) {
    $albumsSoFar = []; //Track unique albums
    while ($track = $result->fetch_assoc()) :
        if( !in_array($track['album'], $albumsSoFar)):
            array_push($albumsSoFar, $track['album']);
?>

<div class="card hoverable music-item">
    <div class="card-image">
        <?php
    if(file_exists($art_full_dir . $track['md5'] . ".jpg")) {
        $albumArtPath = $art_dir . $track['md5'] . ".jpg";
    }
    else if(file_exists($art_full_dir . $track['md5'] . ".png")) {
        $albumArtPath = $art_dir . $track['md5'] . ".png";
    }
    else {
        $albumArtPath = $art_dir . "default.jpg";
    }
        ?>
        <img src="<?php echo $albumArtPath; ?>">
    </div>
    <div class="card-content">
        <span class="track-album"><b><?php echo $track['album']; ?></b></span>
        <span class="track-artist"><?php echo $track['artist']; ?></span>
        <p>Length: <span class="track-duration"><?php echo $track['duration']; ?></span></p>
    </div>
    <div class="card-action">
        <a class="play-track" href="#" data-url="<?php  //Change path from 
                        //http://127.0.0.1/Users/ings0c/Documents/Websites/musicaro/library/Culprate%20-%20Deliverance%20[2014]/01%20Whispers%20(Part%20I).mp3
                        //To library/Culprate....
            $relativePath = explode("musicaro/", $track['path']);
            $relativePath = $relativePath[1];
            echo $relativePath;
        ?>" data-title="<?php echo $track['title']; ?>" data-artist="<?php echo $track['artist']; ?>">Listen</a>
        
        <a class="queue-track right" href="#" data-url="<?php  //Change path from 
                        //http://127.0.0.1/Users/ings0c/Documents/Websites/musicaro/library/Culprate%20-%20Deliverance%20[2014]/01%20Whispers%20(Part%20I).mp3
                        //To library/Culprate....
            $relativePath = explode("musicaro/", $track['path']);
            $relativePath = $relativePath[1];
            echo $relativePath;
        ?>" data-title="<?php echo $track['title']; ?>" data-artist="<?php echo $track['artist']; ?>">Queue</a>
    </div>
</div>

<?php
           endif;
    endwhile;
    /* free result set */
    $result->free();

    /* close connection */
    $db->close();
}
?>