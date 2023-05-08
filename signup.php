<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include("connect.php");

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        $data = json_decode(file_get_contents('php://input'));
        
        // Input validation
        if(!isset($data->first_name_label) || empty(trim($data->first_name_label))) {
            $response = ['status' => 0, 'message' => 'First name is required.'];
            echo json_encode($response);
            exit();
        }
        
        if(!isset($data->last_name_label) || empty(trim($data->last_name_label))) {
            $response = ['status' => 0, 'message' => 'Last name is required.'];
            echo json_encode($response);
            exit();
        }
        
        if(!isset($data->email_reg_label) || empty(trim($data->email_reg_label)) || !filter_var($data->email_reg_label, FILTER_VALIDATE_EMAIL)) {
            $response = ['status' => 0, 'message' => 'A valid email is required.'];
            echo json_encode($response);
            exit();
        }
        
        if((!isset($data->postcode_label) || empty(trim($data->postcode_label))) && (!isset($data->NHS_label) || empty(trim($data->NHS_label)))) {
            $response = ['status' => 0, 'message' => 'At least one of postcode or NHS number is required.'];
            echo json_encode($response);
            exit();
        }

        if((isset($data->postcode_label) && (strlen(str_replace(" ","",$data->postcode_label)) < 5 || strlen(str_replace(" ","",$data->postcode_label)) > 7)) || (isset($data->NHS_label) && strlen(str_replace(" ","",$data->NHS_label)) != 10)) {
            $response = ['status' => 0, 'message' => 'Fields are in the wrong format'];
            echo json_encode($response);
            exit();
        }

        
        if(isset($data->NHS_label) && !is_numeric($data->NHS_label)) {
            $response = ['status' => 0, 'message' => 'NHS number must be a number.'];
            echo json_encode($response);
            exit();
        }
        
        if(!isset($data->pass_reg_label) || empty(trim($data->pass_reg_label)) || strlen(trim($data->pass_reg_label)) < 10) {
            $response = ['status' => 0, 'message' => 'Password is required.'];
            echo json_encode($response);
            exit();
        }
        
        if(!isset($data->date_of_birth) || empty(trim($data->date_of_birth))) {
            $response = ['status' => 0, 'message' => 'Date of birth is required.'];
            echo json_encode($response);
            exit();
        }

        if(isset($data->date_of_birth) && (intval(substr(trim($data->date_of_birth),0,4)) > 2022 || intval(substr(trim($data->date_of_birth),0,4)) < 1900)) {
            $response = ['status' => 0, 'message' => 'Date field is in the wrong format'];
            echo json_encode($response);
            exit();
        }

        $patient_first_name = $data->first_name_label;
        $patient_last_name = $data->last_name_label;
        $patient_email = $data->email_reg_label;
        $patient_postcode = isset($data->postcode_label) ? $data->postcode_label : null;
        $patient_nhs_number = isset($data->NHS_label) ? $data->NHS_label : null;
        $patient_password = password_hash($data->pass_reg_label, PASSWORD_DEFAULT);
        $patient_date_of_birth = $data->date_of_birth;

        $check_nhs_number_and_email= ("SELECT patient_id FROM patient WHERE patient_nhs_number = '$patient_nhs_number' OR patient_email = '$patient_email'");
        $run_check_nhs_number_and_email = (mysqli_query($conn, $check_nhs_number_and_email));

        if (mysqli_num_rows($run_check_nhs_number_and_email) > 0) {
            // Patient NHS number already exists in database, return error message
            $response = ['status' => 0, 'message' => 'Patient with some of these info already exists'];
            echo json_encode($response);
            exit();
        }
        
        $insertion = "INSERT INTO patient(patient_first_name, patient_last_name, patient_email, patient_postcode, patient_nhs_number, patient_password, patient_date_of_birth) VALUES('$patient_first_name', '$patient_last_name', '$patient_email', '$patient_postcode', '$patient_nhs_number', '$patient_password', '$patient_date_of_birth')";
        $SQL = mysqli_query($conn,$insertion);
        $response = ['status' => 1, 'message' => 'Query Successfully recorded'];
        echo json_encode($response);
        break;
}

mysqli_close($conn);
?>