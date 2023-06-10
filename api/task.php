<?php

require './connection/index.php';

$date = date('Y-m-d H:i:s');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    switch($data['type']) {

        case "task-get":

        break;
        
        default;
        break;
    }
}

function clean($string) {

    $string = stripslashes($string);
    return $string;
}

$conn->close();
?>
