<?php
include("db_connect.php");
/*
* Initialize music library
* Drops existing DB rows then
* Scans library folder for mp3|flac
* Pulls album art from echonest then
* Adds track info to library table
*/

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

//Track execution time
$time_pre = microtime(true);

//Truncate existing library
$query = $db->query("TRUNCATE table track_library");

//Now search file system for tracks

$music_dir = "/Users/ings0c/Documents/Websites/musicaro/library";
$foundTracks = rsearch($music_dir, "/^.+\.(mp3|flac)$/i");

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

    /*
    *   Now check if the track's md5 is already in our library
    *   If so, skip it - else add track to library
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
            $key = "RAJWTI0UETKYDZE6R";

            $artistEncoded = urlencode($artist); // make sure to url encode an query parameters
            $titleEncoded = urlencode($title);

            // construct the query with our apikey and the query we want to make
            $endpoint = 'http://developer.echonest.com/api/v4/song/search?api_key=' . $key . '&format=json&results=1&artist=' . $artistEncoded . 
                '&title=' . $titleEncoded . '&bucket=id:7digital-US&bucket=tracks';

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

            $artURL = null;

            if($search_results->response->status->code == 0) { //API returned a successful result
                $artURL = $search_results->response->songs[0]->tracks[0]->release_image;
            }

            if($artURL != null) { //We found the album art
                //To Do - we only grab the 1st returned album art, will lead to same track different album problem

                //Save the album art locally with track md5 as file name
                file_put_contents("../album-art/" . $md5 . ".jpg", file_get_contents($artURL));

            }
        }

        //Add the track to library table
        $stmt = $db->prepare("INSERT INTO track_library(track_id, title, album, artist, duration, md5, path) VALUES (null, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssss', $title, $album, $artist, $duration, $md5, $file);
        $stmt->execute();
        $stmt->close();
        echo "Added track: " . $artist . " - " . $album . " - " . $title . "<br>";
    }
}

$db->close();

$time_post = microtime(true);
$exec_time = $time_post - $time_pre;

echo "Updated library in " . $exec_time . " seconds";
?>