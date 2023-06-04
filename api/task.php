<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');

$host     = 'localhost:5000';
$username = 'root';
$password = '';
$database = 'todo_base';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

$requestBody = file_get_contents('php://input');
$data        = json_decode($requestBody, true);

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
