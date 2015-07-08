<?php
/* https://api.discogs.com/database/search?q=Nirvana&key=KlcXtlqKXAGEMORXXqtZ&secret=oUgjEWDmHDCzfGryuYSmtBSfAWYAooZp */
$key = "RAJWTI0UETKYDZE6R";

$q = urlencode('Toy Story'); // make sure to url encode an query parameters

// construct the query with our apikey and the query we want to make
$endpoint = 'http://developer.echonest.com/api/v4/song/search?api_key=' . $key . '&format=json&results=1&artist=radiohead&title=karma%20police';

// setup curl to make a call to the endpoint
$session = curl_init($endpoint);

// indicates that we want the response back
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// exec curl and get the data back
$data = curl_exec($session);

// remember to close the curl session once we are finished retrieveing the data
curl_close($session);

// decode the json data to make it easier to parse the php
$search_results = json_decode($data);
if ($search_results === NULL) die('Error parsing json');

// play with the data!
$movies = $search_results->movies;
echo '<ul>';
foreach ($movies as $movie) {
  echo '<li><a href="' . $movie->links->alternate . '">' . $movie->title . " (" . $movie->year . ")</a></li>";
}
echo '</ul>';

?>
<div class="row">
    <div class="col s12">
        <?php
        


?>

        <div class="card music-item">
            <div class="card-image">
                <img src="img/Awake.jpg">
                <span class="card-title">Dream Theater - Awake</span>
            </div>
            <div class="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
                <a href="#">Listen</a>
            </div>
        </div>

    </div>

</div>