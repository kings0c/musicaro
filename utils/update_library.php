<?php
include("db_connect.php");
/*
* Initialize music library
* Truncates tracks_library and artists_library
* Scans library folder for mp3|flac
* Pulls album art from id3 data, failing that - Deezer
* Repopulates both tables
*/

/* Provides progress info as shown here http://www.htmlgoodies.com/beyond/php/show-progress-report-for-long-running-php-scripts.html */
header('Content-Type: text/event-stream');
// recommended to prevent caching of event data.
header('Cache-Control: no-cache');

function send_message($id, $message, $progress) {
    $d = array('message' => $message , 'progress' => $progress);
      
    echo "id: $id" . PHP_EOL;
    echo "data: " . json_encode($d) . PHP_EOL;
    echo PHP_EOL;
      
    ob_flush();
    flush();
}

require '../vendor/autoload.php';
require_once('../getID3-master/getid3/getid3.php');
use PhpId3\Id3TagsReader;


/* Resursively search a directory and it's subdirectories for a given regex pattern in filename
* returns an array containing the file paths
*/
function rsearch($folder, $pattern) {
    $dir = new RecursiveDirectoryIterator($folder);
    $ite = new RecursiveIteratorIterator($dir);
    $files = new RegexIterator($ite, $pattern, RecursiveRegexIterator::GET_MATCH);
    $fileList = array();
    foreach($files as $fileName => $value) {
        array_push($fileList, $fileName);
    }
    return $fileList;
}

//Track script execution time
$time_pre = microtime(true);

//Truncate existing libraries
$query = $db->query("TRUNCATE table track_library");
$query = $db->query("TRUNCATE table artist_library");

//Now search file system for tracks
$music_dir = "/Users/ings0c/Documents/Websites/musicaro/library";
$foundTracks = rsearch($music_dir, "/^.+\.(mp3|flac)$/i");

$i = 0;

foreach($foundTracks as $file) {

    // Initialize getID3 engine
    $getID3 = new getID3;

    // Analyze file and store returned data in $ThisFileInfo
    $ThisFileInfo = $getID3->analyze($file);

    /*
     Optional: copies data from all subarrays of [tags] into [comments] so
     metadata is all available in one location for all tag formats
     metainformation is always available under [tags] even if this is not called
    */
    getid3_lib::CopyTagsToComments($ThisFileInfo);

    $md5 = md5_file($file);
    $artist = $ThisFileInfo['comments_html']['artist'][0];
    $title = $ThisFileInfo['comments_html']['title'][0];
    $album = $ThisFileInfo['comments_html']['album'][0];
    $duration = $ThisFileInfo['playtime_string'];
    
    //Send message regarding progress to client
    $i++;
    send_message($i, 'Added track ' . $i . ' of ' . sizeof($foundTracks), round(($i/sizeof($foundTracks))*100), 2);

    /*
    *   Now check if the track's md5 is already in our library
    *   !If so, skip it - else add track to library
    */

    $query = "SELECT * FROM track_library WHERE md5 = '$md5'";
    $result = $db->query($query);
    $resultRow = $result->fetch_assoc();

    if(sizeof($resultRow) == 0) {
        //Track is not in library
        //Get album art for it 

        //First check ID3 tags
        //If there's an image save it to album-art folder
        $OldThisFileInfo = $getID3->analyze($file);
        if(isset($OldThisFileInfo['comments']['picture'][0])) {
            $data = 'data:' . $OldThisFileInfo['comments']['picture'][0]['image_mime'] . ';base64,' . 
                base64_encode($OldThisFileInfo['comments']['picture'][0]['data']);
            list($type, $data) = explode(';', $data);
            list(, $data)      = explode(',', $data);
            $data = base64_decode($data);
            
            list(, $fileExtension) = explode("/" , $OldThisFileInfo['comments']['picture'][0]['image_mime']);
            if($fileExtension == "jpeg") $fileExtension = "jpg";
            file_put_contents($music_dir . "/../album-art/" . $md5 . "." . $fileExtension, $data);
        }
        else {
            //No image in ID3, lets try get one from Deezer

            $artistEncoded = urlencode($artist); // make sure to url encode an query parameters
            $titleEncoded = urlencode($title);
            $albumEncoded = urlencode($album);

            // construct the query for deezer eg:
            //"http://api.deezer.com/search?q=artist:%27dream%20theater%27%20album:%27images%20and%20words%27&limit=2&output=json";
            
            $endpoint = "http://api.deezer.com/search?q=artist:%27" . $artistEncoded . "%27%20album:%27" .
                                                                    $albumEncoded . "%27&limit=2&output=json";

            // setup curl to make a call to the endpoint
            $session = curl_init($endpoint);

            // indicates that we want the response back
            curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

            // exec curl and get the data back
            $data = curl_exec($session);

            // remember to close the curl session once we are finished retrieving the data
            curl_close($session);
            
            // decode the json data to make it easier to parse the php
            $search_results = json_decode($data);
            
            //Maybe we should just skip this track rather than killing the script?
            if ($search_results === NULL) die('Error parsing json'); 

            $artURL = null;

            if($search_results->total > 0) { //API returned a successful result, grab the url for album art
                $artURL = $search_results->data[0]->album->cover;
            }

            if($artURL != null) { //We found the album art
                //To Do - we only grab the 1st returned album art, will lead to same track different album problem

                //Save the album art locally with track md5 as file name
                file_put_contents("../album-art/" . $md5 . ".jpg", file_get_contents($artURL));
            }
        }
        
        //Now check if artist has already been added to artist_library
        if($stmt = $db->prepare("SELECT name FROM artist_library WHERE name = ?")) {
            $stmt->bind_param("s", $artist);
            $stmt->execute();
            $stmt->store_result();
            $artistExists = false;
            if($stmt->num_rows > 0) {
                $artistExists = true;
            }
            $stmt->close();
            
            //Add the artist to library
            if(!$artistExists) {
                if($stmt2 = $db->prepare("INSERT INTO artist_library(artist_id, name) VALUES (null, ?)")) {
                    $stmt2->bind_param("s", $artist);
                    $stmt2->execute();
                    $stmt2->close();
                }
            }
            sleep(1); //Sleep so Deezer doesn't lock us out
            //Now grab the artist image from Deezer
            $artistEncoded = urlencode($artist);
            //Two stages, first search for artist to get ID
            //Then search artist ID to get image
            $endpoint = "http://api.deezer.com/search?q=artist:%27" . $artistEncoded . "&limit=2&output=json";

            // setup curl to make a call to the endpoint
            $session = curl_init($endpoint);

            // indicates that we want the response back
            curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

            // exec curl and get the data back
            $data = curl_exec($session);

            // remember to close the curl session once we are finished retrieving the data
            curl_close($session);
            
            // decode the json data to make it easier to parse the php
            $search_results = json_decode($data);
            
            if ($search_results === NULL) die('Error parsing json');

            $artistID = null;

            if($search_results->total > 0) { //API returned a successful result
                $artistID = $search_results->data[0]->artist->id;
            }

            if($artURL != null) { //We found the artist ID
                //Now find the image
                
                $endpoint = "http://api.deezer.com/artist/" . $artistEncoded . "&limit=2&output=json";

                // setup curl to make a call to the endpoint
                $session = curl_init($endpoint);

                // indicates that we want the response back
                curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

                // exec curl and get the data back
                $data = curl_exec($session);

                // remember to close the curl session once we are finished retrieving the data
                curl_close($session);

                // decode the json data to make it easier to parse the php
                $search_results = json_decode($data);

                if ($search_results === NULL) die('Error parsing json');

                $artistImage = null;

                $artistImage = $search_results->picture;
                
                $md5ArtistName = md5($artist);
                
                //Save the album art locally with md5 of artist name as file name
                if($artistImage != null) {
                    file_put_contents("../artist-art/" . $md5ArtistName . ".jpg", file_get_contents($artistImage));
                }
            }
        }

        //Add the track to library table
        $stmt = $db->prepare("INSERT INTO track_library(track_id, title, album, artist, duration, md5, path) VALUES (null, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssss', $title, $album, $artist, $duration, $md5, $file);
        $stmt->execute();
        $stmt->close();
        //echo "Added track: " . $artist . " - " . $album . " - " . $title . "<br>";
    }
}

$db->close();

$time_post = microtime(true);
$exec_time = $time_post - $time_pre;

send_message('CLOSE', "Added " . sizeof($foundTracks) . " tracks in " . round($exec_time, 2) . " seconds.");
?>