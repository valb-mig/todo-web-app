<?php

require './connection/index.php';

$date = date('Y-m-d H:i:s');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    switch($data['type']) {

        case "user-verify":

            $user = clean($data['data']['username']);
            $pass = clean($data['data']['password']);
        
            $query = "SELECT * FROM todo_users_tb WHERE username = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('s', $user);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
        
            if ($data) {

                $id   = $data['id_user'];
                $hash = $data['hash'];

                if (password_verify($pass, $hash)) 
                {
                    $update = "UPDATE todo_users_tb SET last_access = ? WHERE id_user = ?";
                    $stmt = $conn->prepare($update);
                    $stmt->bind_param('si', $date, $id);
                    $stmt->execute();
                    echo json_encode(["value" => $data, "verify" => true]);

                } 
                else 
                {
                    echo json_encode(false);
                }

            } 
            else 
            {
                echo json_encode(false);
            }

        break;
        
        case "user-register":

            $user = clean($data['data']['username']);
            $pass = clean($data['data']['password']);
            $hash = password_hash($pass, PASSWORD_DEFAULT);
        
            $insert = $conn->prepare("INSERT INTO todo_users_tb (username, hash, create_date, last_access) VALUES (?, ?, ?, ?)");
            $insert->bind_param('ssss', $user, $hash, $date, $date);
        
            if ($insert->execute()) 
            {
                echo json_encode(["value" => $data, "submit" => true]);
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
