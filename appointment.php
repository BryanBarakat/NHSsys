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
    case "POST":
        $data = json_decode(file_get_contents('php://input'),true);
        $curr_user = $data['data'][0];
        $chosen_doctor = $data['data'][1];
        $arr_of_docs = $data['data'][2];
        $chosen_time = $data['data'][3];
        $chosen_date = $data['data'][4];

        if (!$chosen_doctor) {
            $response = ["status"=> 0, "message"=> "Pick a doctor please."];
            echo json_encode($response);
            exit();
        }
        
        elseif (!$chosen_time) {
            $response = ["status"=> 0, "message"=> "Pick a time please."];
            echo json_encode($response);
            exit();
        }

        elseif (!$chosen_date) {
            $response = ["status"=> 0, "message"=> "Pick a date please."];
            echo json_encode($response);
            exit();
        }

        $split_doctor_name = explode(" ", $chosen_doctor);
        $doctor_first_name = $split_doctor_name[0];
        $doctor_last_name = $split_doctor_name[1];
        $sel = $conn->prepare("SELECT doctor_email FROM doctor WHERE doctor_first_name = ? AND doctor_last_name = ?");
        $sel->bind_param("ss", $doctor_first_name, $doctor_last_name);
        $sel->execute();
        $result = $sel->get_result();
        $row = $result->fetch_assoc();
        $doctor_email_now = $row['doctor_email'];

        $stmt = $conn->prepare("INSERT INTO appointment(doctor_email,patient_email,appointment_date,appointment_time) VALUES(?,?,?,?)");
        $stmt->bind_param("ssss", $doctor_email_now, $curr_user, $chosen_date, $chosen_time);

        $new_up = $conn->prepare("UPDATE doctor SET schedule_time = IF(schedule_time IS NULL, ?, CONCAT(schedule_time, ',', ?)), schedule_date = IF(schedule_date IS NULL, ?, CONCAT(schedule_date, ',', ?)) WHERE doctor_first_name = ? AND doctor_last_name = ?");
        $new_up->bind_param("ssssss", $chosen_time, $chosen_time, $chosen_date, $chosen_date, $doctor_first_name, $doctor_last_name);
        $new_up->execute();

        if ($stmt->execute()) {
            $response = ["status"=> 1, "message"=> "Appointment successfully Scheduled!"];
        } else {
            $response = ["status"=> 0, "message"=> "Failed to schedule appointment. Please try again later."];
        }
        echo json_encode($response);
        exit();
}
mysqli_close($conn);
?>
