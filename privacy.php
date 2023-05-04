<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

session_start();
include("connect.php");

$id = null;
if ($_SESSION['patient_id']) {
    $id = $_SESSION['patient_id'];
}

if ($id !== null) {
    // Retrieve data from patient table
    $patient_query = "SELECT * FROM patient WHERE patient_id = $id";
    $patient_result = mysqli_query($conn, $patient_query);
    if ($patient_result) {
        $patient_data = mysqli_fetch_assoc($patient_result);
        $first_name =  $patient_data['patient_first_name'];
        $last_name =  $patient_data['patient_last_name'];
        $email = $patient_data['patient_email'];
        $date_of_birth = $patient_data['patient_date_of_birth'];
        $postcode = $patient_data['patient_postcode'];
        $nhs_number = $patient_data['patient_nhs_number'];
        $password = $patient_data['patient_password'];

        $response = [
            'status' => 1,
            'message' => 'Login successful.',
            'patient_id' => $id,
            'patient_first_name' => $first_name,
            'patient_last_name' => $last_name,
            'patient_email' => $email,
            'patient_postcode' => $postcode,
            'patient_nhs_number' => $nhs_number,
            'patient_date_of_birth' => $date_of_birth,
            'patient_password' => $password
        ];
    } else {
        $response = ['status' => 0, 'message' => 'User not found.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'User ID not provided.'];
}

echo json_encode($response);
mysqli_close($conn);
?>
