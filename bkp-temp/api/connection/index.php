<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Origin, Content-Type");
    header('Content-Type: application/json');

    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        die('Database connection failed: ' . $conn->connect_error);
    }

    $requestBody = file_get_contents('php://input');
    $data        = json_decode($requestBody, true);
?>
