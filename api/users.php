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
    
    $type = $data['type'];

    switch($type) {

        case "verify":

            $user = clean($data['data']['username']);
            $pass = clean($data['data']['password']);
        
            $query = "SELECT * FROM todo_users_tb WHERE username = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('s', $user);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
        
            if ($data) {

                $id   = $data['user_id'];
                $hash = $data['hash'];
                $salt = $data['salt'];

                if (password_verify($pass, $hash)) {

                    $update = "UPDATE todo_users_tb SET last_access = ? WHERE user_id = ?";
                    $stmt = $conn->prepare($update);
                    $stmt->bind_param('si', $date, $id);
                    $stmt->execute();
                    echo json_encode(["value" => $data, "verify" => true]);

                } else {
                    echo json_encode(false);
                }
            } else {
                echo json_encode(false);
            }

        break;
        
        case "register":

            $user = clean($data['data']['username']);
            $pass = clean($data['data']['password']);
            $salt = bin2hex(random_bytes(16));
            $hash = password_hash($pass, PASSWORD_DEFAULT);
        
            $insert = $conn->prepare("INSERT INTO todo_users_tb (username, hash, salt, create_date, last_access) VALUES (?, ?, ?, ?, ?)");
            $insert->bind_param('sssss', $user, $hash, $salt, $date, $date);
        
            if ($insert->execute()) {
                echo json_encode(["value" => $data, "submit" => true]);
            } else {
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
