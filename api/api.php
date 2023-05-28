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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $type = $data['type'];

    switch($type) {

        case "verify"; // Verify user login and update his access

            $user = clean($data['data']['username']);
            $pass = clean($data['data']['password']);

            $hash = password_hash($pass, PASSWORD_DEFAULT);
            $salt = random_bytes(16);

            $query = "SELECT * FROM todo_users_tb AS tu
                      WHERE tu.username = '$user'";

            $result = $conn->query($query);
            $data   = [];

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            if(count($data) > 0) {

                $id   = $data[0]['user_id'];
                $hash = $data[0]['password'];
                $salt = $data[0]['salt'];

                if(password_verify($pass.$salt, $hash))
                {
                    $update = "UPDATE todo_users_tb SET last_access = '".date('Y-m-d H:i:s')."' WHERE user_id = ".$id;
                    $conn->query($update);
    
                    echo json_encode(["value" => $data,"verify" => true]);
                }
                else
                {
                    echo json_encode(false);
                }
            }
            else {
                echo json_encode(false);
            }

        break;

        case "register"; // Register a user

            $user = clean($data['data']['username']);
            $pass = clean($data['data']['password']);

            $insert = "";

            if($conn->query($insert)) {

                echo json_encode(["value" => $data,"verify" => true]);
            }
            else 
            {
                echo json_encode(false);
            }

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
