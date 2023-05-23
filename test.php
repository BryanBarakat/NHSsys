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
        $data_array = json_decode(file_get_contents('php://input'));
        $data_old = $data_array[0];
        $data = $data_array[1];
        $key_data = $data_array[2];
        $user_type = $data_array[3];
        
        // Check if email is valid and not empty
        if (!isset($data->email_priv_label) || empty(trim($data->email_priv_label)) || !filter_var($data->email_priv_label, FILTER_VALIDATE_EMAIL)) {
            $response = ['status' => 0, 'message' => 'A valid email is required.'];
            echo json_encode($response);
            exit();
        }
        
        // Check if either postcode or NHS number is provided
        if ((!isset($data->postcode_label_priv) || empty(trim($data->postcode_label_priv))) && (!isset($data->NHS_label_priv) || empty(trim($data->NHS_label_priv)))) {
            $response = ['status' => 0, 'message' => 'At least one of postcode or NHS number is required.'];
            echo json_encode($response);
            exit();
        }

        // Check if postcode format is correct
        if (isset($data->postcode_label_priv) && !empty(trim($data->postcode_label_priv)) && $data->postcode_label_priv != "undefined" && (strlen(str_replace(" ","",$data->postcode_label_priv)) < 5 || strlen(str_replace(" ","",$data->postcode_label_priv)) > 7)) {
            $response = ['status' => 0, 'message' => 'Postcode field is in the wrong format'];
            echo json_encode($response);
            exit();
        }

        // Check if NHS number format is correct
        if (empty(trim($data->NHS_label_priv))) {
            $response = ['status' => 0, 'message' => 'NHS number field is required'];
            echo json_encode($response);
            exit();
        }

        // Check if NHS number format is correct
        if (isset($data->NHS_label_priv) && !empty(trim($data->NHS_label_priv)) && strlen(str_replace(" ","",$data->NHS_label_priv)) != 10 && $data->NHS_label_priv != "undefined") {
            $response = ['status' => 0, 'message' => 'NHS field is in the wrong format'];
            echo json_encode($response);
            exit();
        }
        
        // Check if NHS number is numeric
        if (isset($data->NHS_label_priv) && !empty(trim($data->NHS_label_priv)) && !is_numeric($data->NHS_label_priv) && $data->NHS_label_priv != "undefined") {
            $response = ['status' => 0, 'message' => 'NHS number must be a number.'];
            echo json_encode($response);
            exit();
        }
        
        // Check if password is not empty and has at least 10 characters
        if (!isset($data->pass_priv_label) || empty(trim($data->pass_priv_label)) || strlen(trim($data->pass_priv_label)) < 10) {
            $response = ['status' => 0, 'message' => 'Password needs to be 10 characters or more.'];
            echo json_encode($response);
            exit();
        }

        $patient_email = $data_old->email_priv_label;
        $patient_password = $data_old->pass_priv_label;
        $patient_postcode = $data_old->postcode_label_priv;
        $patient_nhs_number = $data_old->NHS_label_priv;
        $patient_id = $key_data;

        $new_email = $data->email_priv_label;
        $new_postcode = $data->postcode_label_priv;
        $new_NHS_number = $data->NHS_label_priv;
        $new_pass = $data->pass_priv_label;

        if($user_type == "patient"){
            // Check if the new email or NHS number is already taken by another patient
            $stmt = $conn->prepare("SELECT * FROM patient WHERE (Email = ? OR NHSNumber = ?) AND patient_id != ?");
            $stmt->bind_param("ssi", $new_email, $new_NHS_number, $patient_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if(mysqli_num_rows($result) > 0){
                // If the new email or NHS number is already taken, return an error response
                $response = ["status" => 0, "message" => "Some Details are already taken."];
                echo json_encode($response);
                exit();
            } elseif($new_pass != $patient_password || $new_postcode != $patient_postcode || $new_email != $patient_email || $new_NHS_number != $patient_nhs_number){
                if($new_pass != $patient_password){
                    // If the new password is different from the old one, hash the new password
                    $new_pass = password_hash($new_pass, PASSWORD_DEFAULT);
                }

                // Update the patient's details in the database
                $insertion = "UPDATE patient
                SET Email = '$new_email', Postcode = '$new_postcode', NHSNumber = '$new_NHS_number', Password = '$new_pass'
                WHERE Email = '$patient_email' ";
                $SQL = mysqli_query($conn, $insertion);

                if($new_NHS_number != $patient_nhs_number){
                    // If the NHS number has changed, update the NHS number in the vaccinations table
                    $stmt = $conn->prepare("UPDATE vaccinations SET NHSNumber = ? WHERE NHSNumber = ?");
                    $stmt->bind_param("ss", $new_NHS_number, $patient_nhs_number);
                    $stmt->execute();
                    $result = $stmt->get_result();
                }

                if($new_email != $patient_email){
                    // If the email has changed, update the email in the appointment table
                    if($user_type == "patient"){
                        $stmt = $conn->prepare("UPDATE appointment SET patient_email = ? WHERE patient_email = ?");
                    } elseif($user_type == "doctor"){
                        $stmt = $conn->prepare("UPDATE appointment SET doctor_email = ? WHERE doctor_email = ?");
                    }
                    $stmt->bind_param("ss", $new_email, $patient_email);
                    $stmt->execute();
                    $result = $stmt->get_result();
                }

                $response = ["status" => 0, "message" => "Changes successfully made!", "patient_email" => $new_email, "patient_nhs_number" => $new_NHS_number, "patient_password" => $new_pass, "patient_postcode" => $new_postcode];
                echo json_encode($response);
                exit();
            }
        } elseif($user_type == "doctor"){
            // Check if the new email is already taken by another doctor
            $stmt = $conn->prepare("SELECT * FROM doctor WHERE (doctor_email = ?) AND doctor_id != ?");
            $stmt->bind_param("si", $new_email, $patient_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if(mysqli_num_rows($result) > 0){
                // If the new email is already taken, return an error response
                $response = ["status" => 0, "message" => "Some Details are already taken.", "patient_email" => $new_email, "patient_nhs_number" => $new_NHS_number, "patient_password" => $new_pass, "patient_postcode" => $new_postcode];
                echo json_encode($response);
                exit();
            } elseif($new_pass != $patient_password || $new_postcode != $patient_postcode || $new_email != $patient_email){
                if($new_pass != $patient_password){
                    // If the new password is different from the old one, hash the new password
                    $new_pass = password_hash($new_pass, PASSWORD_DEFAULT);
                }

                // Update the doctor's details in the database
                $insertion = "UPDATE doctor
                SET doctor_email = '$new_email', doctor_postcode = '$new_postcode', doctor_password = '$new_pass'
                WHERE doctor_email = '$patient_email' ";
                $SQL = mysqli_query($conn, $insertion);

                if($new_email != $patient_email){
                    // If the email has changed, update the email in the appointment table
                    $stmt = $conn->prepare("UPDATE appointment SET doctor_email = ? WHERE doctor_email = ?");
                    $stmt->bind_param("ss", $new_email, $patient_email);
                    $stmt->execute();
                    $result = $stmt->get_result();
                }

                $response = ["status" => 0, "message" => "Changes successfully made!", "patient_email" => $new_email, "patient_nhs_number" => $new_NHS_number, "patient_password" => $new_pass, "patient_postcode" => $new_postcode];
                echo json_encode($response);
                exit();
            }
        } elseif($user_type == "admin"){
            // Check if the new email is already taken by another admin
            $stmt = $conn->prepare("SELECT * FROM admin WHERE (admin_email = ?) AND admin_id != ?");
            $stmt->bind_param("si", $new_email, $patient_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if(mysqli_num_rows($result) > 0){
                // If the new email is already taken, return an error response
                $response = ["status" => 0, "message" => "Some Details are already taken."];
                echo json_encode($response);
                exit();
            } elseif($new_pass != $patient_password || $new_postcode != $patient_postcode || $new_email != $patient_email){
                if($new_pass != $patient_password){
                    // If the new password is different from the old one, hash the new password
                    $new_pass = password_hash($new_pass, PASSWORD_DEFAULT);
                }

                // Update the admin's details in the database
                $insertion = "UPDATE admin
                SET admin_email = '$new_email', admin_postcode = '$new_postcode', admin_password = '$new_pass'
                WHERE admin_email = '$patient_email' ";
                $SQL = mysqli_query($conn, $insertion);

                $response = ["status" => 0, "message" => "Changes successfully made!", "patient_email" => $new_email, "patient_nhs_number" => $new_NHS_number, "patient_password" => $new_pass, "patient_postcode" => $new_postcode];
                echo json_encode($response);
                exit();
            }
        }

        $response = ["status" => 0, "message" => "No Changes made."];
        echo json_encode($response);
        exit();

    case "DELETE":
        // Get the data from the request
        $data_array = json_decode(file_get_contents('php://input'));
        $data = $data_array[0];
        $patient_email = $data->email_priv_label;
        $current_user = $data_array[3];
        $patient_nhs_number = $data_array[4];
    
        if($current_user == "patient"){
            // Delete patient from the database
            $deletion = "DELETE FROM patient WHERE Email = '$patient_email'";
            $SQL = mysqli_query($conn, $deletion);
    
            // Delete appointments associated with the patient
            $stmt = $conn->prepare("DELETE FROM appointment WHERE patient_email = ?");
            $stmt->bind_param("s", $patient_email);
            $stmt->execute();
    
            // Delete vaccinations associated with the patient
            $stmt2 = $conn->prepare("DELETE FROM vaccinations WHERE NHSNumber = ?");
            $stmt2->bind_param("s", $patient_nhs_number);
            $stmt2->execute();
    
            $response = ["status" => 0, "message" => "Changes successfully made!"];
        }
        elseif($current_user == "doctor"){
            // Delete doctor from the database
            $deletion = "DELETE FROM doctor WHERE doctor_email = '$patient_email'";
            $SQL = mysqli_query($conn, $deletion);
    
            // Delete appointments associated with the doctor
            $stmt = $conn->prepare("DELETE FROM appointment WHERE doctor_email = ?");
            $stmt->bind_param("s", $patient_email);
            $stmt->execute();
    
            $response = ["status" => 0, "message" => "Changes successfully made!"];
        }
        else{
            // Delete admin from the database
            $deletion = "DELETE FROM admin WHERE admin_email = '$patient_email'";
            $SQL = mysqli_query($conn, $deletion);
            $response = ["status" => 0, "message" => "Changes successfully made!"];
        }
    
        echo json_encode($response);
        exit();
    
    case "POST":
        // Get the data from the request
        $data_array = json_decode(file_get_contents('php://input'), true);
        $curr_user = $data_array[0];
        $chosen_doctor = $data_array[1];
        $arr_of_docs = $data_array[2];
        $chosen_date = $data_array[4];
        $chosen_time = $data_array[3];
    
        // Fetch the list of doctors from the database
        $stmt = $conn->prepare("SELECT CONCAT(doctor_first_name,' ', doctor_last_name) AS doctor_name FROM doctor");
        $stmt->execute();
        $result = $stmt->get_result();
        $arr = [];
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($arr, $row);
        }
    
        $response = ["status" => 0, "message" => "Doctors successfully fetched!", "array_of_doctors" => $arr, $curr_user, $chosen_doctor, $arr_of_docs];
        echo json_encode($response);
        exit();
    }
    
mysqli_close($conn);
?>
    