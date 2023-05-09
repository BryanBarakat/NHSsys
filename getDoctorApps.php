<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

session_start();
include("connect.php");

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "PUT":
        $data = json_decode(file_get_contents('php://input'),true);
        $curr_user = $data['data'][0];
        $chosen_doctor = $data['data'][1];
        $arr_of_docs = $data['data'][2];
        $chosen_time = $data['data'][3];
        $chosen_date = $data['data'][4];

        if(!empty($chosen_doctor)){
            $doc_full_name = explode(" ",$chosen_doctor);
            $doctor_first_name = $doc_full_name[0];
            $doctor_last_name = $doc_full_name[1];
    
            $sql = $conn->prepare("SELECT schedule_time,schedule_date FROM doctor WHERE doctor_first_name = ? AND doctor_last_name = ?");
            $sql->bind_param("ss", $doctor_first_name,$doctor_last_name);
            $sql->execute();
            $result = $sql->get_result();
            $row = $result->fetch_assoc();
            if ($row['schedule_time'] !== null) {
                $schedule_time = explode(",", $row['schedule_time']);
            } else {
                $schedule_time = array();
            }
            
            if ($row['schedule_date'] !== null) {
                $schedule_date = explode(",", $row['schedule_date']);
            } else {
                $schedule_date = array();
            }
                    
            $response = ["status"=> 1, "message"=>"Schedule successfully updated!","apps"=>$schedule_time,"takenDates"=>$schedule_date];        
            echo json_encode($response);
            exit();
                
        }
        else{
            $response = ["status"=> 0, "message"=>"Fields not chosen",];
            echo json_encode($response);
            exit();
        }
    }
mysqli_close($conn);
?>