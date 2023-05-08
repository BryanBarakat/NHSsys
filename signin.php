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
        $data = json_decode(file_get_contents('php://input'));
        
        // Input validation
        if(!isset($data->email_label_sign_in) || empty(trim($data->email_label_sign_in)) || !filter_var($data->email_label_sign_in, FILTER_VALIDATE_EMAIL)) {
            $response = ['status' => 0, 'message' => 'A valid email is required.'];
            echo json_encode($response);
            exit();
        }
        
        if(!isset($data->password_label_sign_in) || empty(trim($data->password_label_sign_in))) {
            $response = ['status' => 0, 'message' => 'Password is required.'];
            echo json_encode($response);
            exit();
        }

        $patient_email = $data->email_label_sign_in;
        $patient_password = $data->password_label_sign_in;

        // Check if user exists
        $stmt = $conn->prepare("SELECT * FROM patient WHERE Email = ?");
        $stmt->bind_param("s", $patient_email);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt2 = $conn->prepare("SELECT * FROM doctor WHERE doctor_email = ?");
        $stmt2->bind_param("s", $patient_email);
        $stmt2->execute();
        $result2 = $stmt2->get_result();

        $stmt3 = $conn->prepare("SELECT * FROM admin WHERE admin_email = ?");
        $stmt3->bind_param("s", $patient_email);
        $stmt3->execute();
        $result3 = $stmt3->get_result();

        if ($result->num_rows === 0 && $result2->num_rows === 0 && $result3->num_rows === 0) {
            // User does not exist
            $response = ['status' => 0, 'message' => 'Invalid login credentials.'];
            echo json_encode($response);
            exit();
        } else {
            if($result->num_rows != 0){
                $row = $result->fetch_assoc();
                $stored_password = $row['Password'];
                $_SESSION['patient_id'] = $row['patient_id'];
                $_SESSION['patient_password'] = $row['Password'];
                $_SESSION['patient_first_name'] = $row['Forename'];
                $_SESSION['patient_first_name'] = $row['Forename'];
                $_SESSION['patient_last_name'] = $row['Surname'];
                $_SESSION['patient_email'] = $row['Email'];
                $_SESSION['patient_date_of_birth'] = $row['PersonDOB'];
                $_SESSION['user_type'] = $row['user_type'];
                $response = ['status' => 1, 'message' => 'Login successful.', 'patient_id' => $_SESSION['patient_id'], 'patient_first_name' => $row['Forename'],
                'patient_last_name' => $_SESSION['patient_last_name'],
                'patient_email' => $_SESSION['patient_email'],'patient_postcode' => $row['Postcode'],'patient_nhs_number' => $row['NHSNumber'],
                'patient_date_of_birth' => $row['PersonDOB'],'patient_password' => $row['Password'], 'user_type' => $_SESSION["user_type"]];
            }
            elseif($result2->num_rows != 0){
                $row = $result2->fetch_assoc();
                $stored_password = $row['doctor_password'];
                $_SESSION['doctor_id'] = $row['doctor_id'];
                $_SESSION['doctor_first_name'] = $row['doctor_first_name'];
                $_SESSION['doctor_last_name'] = $row['doctor_last_name'];
                $_SESSION['doctor_email'] = $row['doctor_email'];
                $_SESSION['user_type'] = $row['user_type'];
                $response = ['status' => 1, 'message' => 'Login successful.', 'patient_id' => $row['doctor_id'], 'patient_first_name' => $row['doctor_first_name'],
                'patient_last_name' => $row['doctor_last_name'],
                'patient_email' => $row['doctor_email'],'patient_password' => $row['doctor_password'], 'user_type' => $_SESSION["user_type"]];
            }
            elseif($result3->num_rows != 0){
                $row = $result3->fetch_assoc();
                $stored_password = $row['admin_password'];
                $_SESSION['admin_id'] = $row['admin_id'];
                $_SESSION['admin_first_name'] = $row['admin_first_name'];
                $_SESSION['admin_last_name'] = $row['admin_last_name'];
                $_SESSION['admin_email'] = $row['admin_email'];
                $_SESSION['user_type'] = $row['user_type'];
                $response = ['status' => 1, 'message' => 'Login successful.', 'patient_id' => $row['admin_id'], 'patient_first_name' => $row['admin_first_name'],
                'patient_last_name' => $row['admin_last_name'],
                'patient_email' => $row['admin_email'],'patient_password' => $row['admin_password'], 'user_type' => $_SESSION["user_type"]];
            }
            // Verify password
            if (($result -> num_rows != 0 && !password_verify($patient_password,$stored_password)) || (($result2-> num_rows != 0 || $result3-> num_rows != 0) && $patient_password != $stored_password)) {
                // Incorrect password
                $response = ['status' => 0, 'message' => 'Invalid login credentials.'];
                session_destroy();
            }
            echo json_encode($response);
            break;
        }
    }
mysqli_close($conn);
?>
