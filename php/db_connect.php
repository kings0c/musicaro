<?php

$db = new mysqli('localhost', 'musicaro', 'WqHb6e3vxZTLcYLX', 'musicaro');

if($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}

?>