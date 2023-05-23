<?php

// Cross-origin and general error handling
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Session start
session_start();

// Database connection
include("connect.php");

// Check request method (POST-SELECT-UPDATE-DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Switch statement with cases depending on $method variable
switch($method) {
    case "POST":
        // Retrieve data from the request
        $data = json_decode(file_get_contents('php://input'), true);
        $curr_user = $data['data'][0];
        $chosen_doctor = $data['data'][1];
        $arr_of_docs = $data['data'][2];
        $chosen_time = $data['data'][3];
        $chosen_date = $data['data'][4];

        // Check if a doctor is chosen
        if (!$chosen_doctor) {
            $response = ["status"=> 0, "message"=> "Pick a doctor, please."];
            echo json_encode($response);
            exit();
        }
        
        // Check if a time is chosen
        elseif (!$chosen_time) {
            $response = ["status"=> 0, "message"=> "Pick a time, please."];
            echo json_encode($response);
            exit();
        }

        // Check if a date is chosen
        elseif (!$chosen_date) {
            $response = ["status"=> 0, "message"=> "Pick a date, please."];
            echo json_encode($response);
            exit();
        }

        // Split the doctor's name into first name and last name
        $split_doctor_name = explode(" ", $chosen_doctor);
        $doctor_first_name = $split_doctor_name[0];
        $doctor_last_name = $split_doctor_name[1];

        // Retrieve the doctor's email using their first name and last name
        $sel = $conn->prepare("SELECT doctor_email FROM doctor WHERE doctor_first_name = ? AND doctor_last_name = ?");
        $sel->bind_param("ss", $doctor_first_name, $doctor_last_name);
        $sel->execute();
        $result = $sel->get_result();
        $row = $result->fetch_assoc();
        $doctor_email_now = $row['doctor_email'];

        // Insert the appointment into the database
        $stmt = $conn->prepare("INSERT INTO appointment(doctor_email,patient_email,appointment_date,appointment_time) VALUES(?,?,?,?)");
        $stmt->bind_param("ssss", $doctor_email_now, $curr_user, $chosen_date, $chosen_time);

        // Update the doctor's schedule with the new appointment time and date
        $new_up = $conn->prepare("UPDATE doctor SET schedule_time = IF(schedule_time IS NULL, ?, CONCAT(schedule_time, ',', ?)), schedule_date = IF(schedule_date IS NULL, ?, CONCAT(schedule_date, ',', ?)) WHERE doctor_first_name = ? AND doctor_last_name = ?");
        $new_up->bind_param("ssssss", $chosen_time, $chosen_time, $chosen_date, $chosen_date, $doctor_first_name, $doctor_last_name);
        $new_up->execute();

        // Check if the appointment was successfully scheduled
        if ($stmt->execute()) {
            $response = ["status"=> 1, "message"=> "Appointment successfully scheduled!"];
        } else {
            $response = ["status"=> 0, "message"=> "Failed to schedule appointment. Please try again later."];
        }
        echo json_encode($response);
        exit();
}

// Close the database connection
mysqli_close($conn);
?>
