<?php

require './connection/index.php';

$date = date('Y-m-d H:i:s');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    switch($data['type']) {

        case "project-set":

            $id_user       = clean($data['data']['id_user']);
            $user          = clean($data['data']['username']);
            $title_project = clean($data['data']['title_project']);
            $color_project = clean($data['data']['color_project']);
            $icon_project  = clean($data['data']['icon_project']);
            $project_type  = clean($data['data']['project_type']);
            $days_project  = clean($data['data']['days_project']);

            $query = "SELECT * FROM todo_users_tb WHERE id_user = ? AND username = ?";

            $stmt = $conn->prepare($query);
            $stmt->bind_param('is', $id_user, $user);
            $stmt->execute();

            $result = $stmt->get_result();
            $rows   = $result->fetch_assoc();

            if($rows) {
                $insert = $conn->prepare("INSERT INTO todo_projects_tb (title_project,color_project,icon_project,project_type,create_date,id_user,days_project) VALUES (? ,? ,? ,? ,? ,? ,?)");
                $insert->bind_param('sssssii', $title_project,$color_project,$icon_project,$project_type,$date,$id_user,$days_project);
                $insert->execute();
            }
            else {
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
