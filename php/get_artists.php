<?php
/*  Pull top x tracks from tracks_library table
*   Output as a Materialize.css card with album art
*
*/

include('db_connect.php');
$art_full_dir = "/Users/ings0c/Documents/Websites/musicaro/artist-art/";
$art_dir = "artist-art/";

if($result = $db->query("SELECT * FROM artist_library")) {
    while ($artist = $result->fetch_assoc()) :
        $name_md5 = md5($artist['name']);
?>

<div class="card hoverable music-item">
    <div class="card-image">
        <?php
    if(file_exists($art_full_dir . $name_md5 . ".jpg")) {
        $albumArtPath = $art_dir . $name_md5 . ".jpg";
    }
    else if(file_exists($art_full_dir . $name_md5 . ".png")) {
        $albumArtPath = $art_dir . $name_md5 . ".png";
    }
    else {
        $albumArtPath = $art_dir . "default.jpg";
    }
        ?>
        <img src="<?php echo $albumArtPath; ?>">
    </div>
    <div class="card-content">
        <span class="track-artist"><?php echo $artist['name']; ?></span>
    </div>
    <div class="card-action">
        
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