<?php
require '../vendor/autoload.php';
require_once('../getID3-master/getid3/getid3.php');
use PhpId3\Id3TagsReader;

$file = $_POST["file"];

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

$artist = $ThisFileInfo['comments_html']['artist'][0];
$title = $ThisFileInfo['comments_html']['title'][0];
$album = $ThisFileInfo['comments_html']['album'][0];
$duration = $ThisFileInfo['playtime_string'];
$imageData = null;
$imageURL = null;

//First check ID3 tags
//If there's an image save it to album-art folder
$OldThisFileInfo = $getID3->analyze($file);
if(isset($OldThisFileInfo['comments']['picture'][0])) {
    $imageData = 'data:' . $OldThisFileInfo['comments']['picture'][0]['image_mime'] . ';base64,' . 
        base64_encode($OldThisFileInfo['comments']['picture'][0]['data']);
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

    if($search_results->total > 0) { //API returned a successful result, grab the url for album art
        $imageURL = $search_results->data[0]->album->cover;
    }
}

$result = [
     $file, $artist, $title, $album, $duration, $imageData || $imageURL
];

echo json_encode($result);
?>
