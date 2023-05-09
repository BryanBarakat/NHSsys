<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

session_start();
include("connect.php");


$sql = "SELECT * FROM patient";
$path = explode('/', $_SERVER['REQUEST_URI']);
$pathItem = str_split($path[4]);
$id_appended;
foreach($pathItem as $p){
    if(is_numeric($p)){
        $id_appended += $p;
    }
    else{
        break;
    }
}
if(isset($path[4]) && is_numeric($id_appended)) {
    $sql .= " WHERE patient_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_appended);
    $stmt->execute();
    $result = $stmt->get_result();
    $users = $result->fetch_all(MYSQLI_ASSOC);

    // find the user object with the specified id
    $user = null;
    foreach($users as $u) {
        if($u['patient_id'] == $id_appended || $u['doctor_id'] == $id_appended || $u['admin_id'] == $id_appended) {
            $user = $id_appended;
            break;
        }
    }
    
    // Retrieve data from patient table
    // echo json_encode($user);
    $patient_query = "SELECT * FROM patient WHERE patient_id = $user";
    $patient_result = mysqli_query($conn, $patient_query);
    $doctor_query = "SELECT * FROM doctor WHERE doctor_id = $user";
    $doctor_result = mysqli_query($conn, $doctore_query);
    $admin_query = "SELECT * FROM admin WHERE admin_id = $user";
    $admin_result = mysqli_query($conn, $admin_query);
    if ($patient_result) {
        $patient_data = mysqli_fetch_assoc($patient_result);
        $first_name =  $patient_data['Forename'];
        $last_name =  $patient_data['Surname'];
        $email = $patient_data['Email'];
        $date_of_birth = $patient_data['PersonDOB'];
        $postcode = $patient_data['Postcode'];
        $nhs_number = $patient_data['NHSNumber'];
        $password = $patient_data['Password'];
    
        $response = [
            'status' => 1,
            'message' => 'Login successful.',
            'patient_id' => $user,
            'patient_first_name' => $first_name,
            'patient_last_name' => $last_name,
            'patient_email' => $email,
            'patient_postcode' => $postcode,
            'patient_nhs_number' => $nhs_number,
            'patient_date_of_birth' => $date_of_birth,
            'patient_password' => $password
        ];
        echo json_encode($response);
        exit();

        }
    elseif($doctor_result){
        $doctor_data = mysqli_fetch_assoc($doctor_result);
        $first_name =  $patient_data['doctor_first_name'];
        $last_name =  $patient_data['doctor_last_name'];
        $email = $patient_data['doctor_email'];
        $postcode = $patient_data['doctor_postcode'];
        $password = $patient_data['doctor_password'];
    
        $response = [
            'status' => 1,
            'message' => 'Login successful.',
            'patient_id' => $user,
            'patient_first_name' => $first_name,
            'patient_last_name' => $last_name,
            'patient_email' => $email,
            'patient_postcode' => $postcode,
            'patient_password' => $password
        ];
        echo json_encode($response);
        exit();
    }
    elseif($admin_result){
        $admin_data = mysqli_fetch_assoc($admin_result);
        $first_name =  $patient_data['admin_first_name'];
        $last_name =  $patient_data['admin_last_name'];
        $email = $patient_data['admin_email'];
        $postcode = $patient_data['admin_postcode'];
        $password = $patient_data['admin_password'];
    
        $response = [
            'status' => 1,
            'message' => 'Login successful.',
            'patient_id' => $user,
            'patient_first_name' => $first_name,
            'patient_last_name' => $last_name,
            'patient_email' => $email,
            'patient_postcode' => $postcode,
            'patient_password' => $password
        ];
        echo json_encode($response);
        exit();
    }
    } 
    else {
    $result = mysqli_query($conn, $sql);
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $user = null; // initialize $user variable
}

$response = ['status' => 1, $user];
echo json_encode($response);
mysqli_close($conn);
?>