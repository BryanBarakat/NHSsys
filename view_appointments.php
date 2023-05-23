<?php
// Enable error reporting and display errors
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set the content type to JSON
header('Content-Type: application/json');

// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Start the session
session_start();

// Include the database connection file
include("connect.php");

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle different request methods
switch($method) {
    case "POST":
        // Handle POST request

        // Get the data from the request body and decode it as an associative array
        $data_array_info = json_decode(file_get_contents('php://input'), true);

        // Get the current user type
        $current_user_type = $data_array_info['data'][0];

        if($current_user_type == "patient"){
            // If the current user is a patient, retrieve appointments associated with their email
            $curr_user_email = $data_array_info['data'][1];
            $sel = $conn->prepare("SELECT * FROM appointment WHERE patient_email = '$curr_user_email'");
        }
        elseif($current_user_type == "doctor"){
            // If the current user is a doctor, retrieve appointments associated with their email
            $curr_user_email = $data_array_info['data'][1];
            $sel = $conn->prepare("SELECT * FROM appointment WHERE doctor_email = '$curr_user_email'");
        }
        else{
            // If the current user type is not specified, retrieve all appointments
            $sel = $conn->prepare("SELECT * FROM appointment");
        }

        // Execute the query
        $sel->execute();

        // Get the query results
        $fetch = $sel->get_result();

        // Initialize variables
        $patient_first_name = '';
        $patient_last_name = '';
        $nhs_number = "";
        $postcode = "";
        $patient_first_name = '';
        $patient_last_name = '';
        $nhs_number = '';
        $postcode = '';
        $doctor_first_name = "";
        $doctor_last_name = "";

        // Create an array to store appointments
        $appointments = array();

        // Iterate through each appointment in the results
        while ($row = $fetch->fetch_assoc()) {
            $appointment_date = $row['appointment_date'];
            $appointment_time = $row['appointment_time'];
            $patient_email = $row['patient_email'];
            $doctor_email = $row['doctor_email'];

            // Retrieve doctor information
            $sel_doc = $conn->prepare("SELECT * FROM doctor WHERE doctor_email = ?");
            $sel_doc->bind_param("s", $doctor_email);
            $sel_doc->execute();
            $fetch_doc = $sel_doc->get_result();
            if ($row_doc = $fetch_doc->fetch_assoc()) {
                $doctor_first_name = $row_doc['doctor_first_name'];
                $doctor_last_name = $row_doc['doctor_last_name'];
            }

            // Retrieve patient information
            $sel_patient = $conn->prepare("SELECT * FROM patient WHERE Email = ?");
            $sel_patient->bind_param("s", $patient_email);
            $sel_patient->execute();
            $fetch_patient = $sel_patient->get_result();
            if ($row_patient = $fetch_patient->fetch_assoc()) {
                $patient_first_name = $row_patient['Forename'] ?? '';
                $patient_last_name = $row_patient['Surname'] ?? '';
                $nhs_number = $row_patient['NHSNumber'] ?? '';
                $postcode = $row_patient['Postcode'] ?? '';
            }

            // Add appointment details to the appointments array
            $appointments[] = array(
                "appointment_date" => $appointment_date,
                "appointment_time" => $appointment_time,
                "patient_email" => $patient_email,
                "patient_first_name" => $patient_first_name,
                "patient_last_name" => $patient_last_name,
                "doctor_email" => $doctor_email,
                "doctor_first_name" => $doctor_first_name,
                "doctor_last_name" => $doctor_last_name,
                "nhs_number"=> $nhs_number,
                "postcode" => $postcode
            );
        }

        // Create a response array
        $result = ["status"=> 1, "message"=> "Records successfully extracted!", "appointments"=> $appointments];

        // Encode the response array as JSON and output it
        echo json_encode($result);
        exit();

    case "DELETE":
        // Handle DELETE request

        // Get the data from the request body and decode it as an array
        $data_array = json_decode(file_get_contents('php://input'), true);

        // Extract the data from the array
        $current_user = $data_array[0];
        $doctor_first_name = $data_array[1];
        $doctor_last_name = $data_array[2];
        $date = $data_array[3];
        $time = $data_array[4];

        // Retrieve doctor information
        $sel_doc = $conn->prepare("SELECT doctor_email, schedule_time, schedule_date FROM doctor WHERE doctor_first_name = ? AND doctor_last_name = ?");
        $sel_doc->bind_param("ss", $doctor_first_name, $doctor_last_name);
        $sel_doc->execute();
        $fetch_doc = $sel_doc->get_result();
        $row = $fetch_doc->fetch_assoc();

        $doctor_email = $row["doctor_email"];
        $schedule_time = explode(",", $row["schedule_time"]);
        $schedule_date = explode(",", $row["schedule_date"]);

        // Delete the appointment from the database
        $deletion = "DELETE FROM appointment WHERE doctor_email = '$doctor_email' AND appointment_date = '$date' AND appointment_time = '$time'";
        $SQL = mysqli_query($conn, $deletion);

        // Remove the appointment from the schedule arrays
        for ($i = 0; $i < count($schedule_time) && $i < count($schedule_date); $i++) {
            // Check if there is a space in either array at the current index
            if (strpos($schedule_time[$i], ' ') !== false) {
                $schedule_time[$i] = str_replace(' ', '', $schedule_time[$i]);
            }
            if (strpos($schedule_date[$i], ' ') !== false) {
                $schedule_date[$i] = str_replace(' ', '', $schedule_date[$i]);
            }

            // Do something with the values at the current index
            if ($schedule_date[$i] == $date && $schedule_time[$i] == $time) {
                unset($schedule_date[$i]);
                unset($schedule_time[$i]);
            }
        }

        // Update the schedule arrays in the database
        $schedule_time = implode(",", $schedule_time);
        $schedule_date = implode(",", $schedule_date);

        $deletion2 = "UPDATE doctor SET schedule_date = '$schedule_date', schedule_time = '$schedule_time' WHERE doctor_email = '$doctor_email'";
        $SQL2 = mysqli_query($conn, $deletion2);

        // Create a response array
        $response = ["status"=> 0, "message"=> "Changes successfully made!"];

        // Encode the response array as JSON and output it
        echo json_encode($response);
        exit();
}

// Close the database connection
mysqli_close($conn);
?>
