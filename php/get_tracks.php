<?php
/*  Pull top x tracks from tracks_library table
*   Output as a Materialize.css card with album art
*
*/

include('db_connect.php');
$art_full_dir = "/Users/ings0c/Documents/Websites/musicaro/album-art/";
$art_dir = "album-art/";
if($result = $db->query("SELECT * FROM track_library")) {

    while ($track = $result->fetch_assoc()) :
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
        <span class="track-title"><?php echo $track['title']; ?></span>
        <span class="track-artist"><?php echo $track['artist']; ?></span>
        <p>Album: <span class="track-album"><?php echo $track['album']; ?></span></p>
        <p>Length: <span class="track-duration"><?php echo $track['duration']; ?></span></p>
    </div>
    <div class="card-action">
        <a href="#">Listen</a>
    </div>
</div>

<?php
    endwhile;
    /* free result set */
    $result->free();

    /* close connection */
    $db->close();
}
?>