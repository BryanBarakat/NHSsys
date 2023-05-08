<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

session_start();
include("connect.php");

$id = $_GET["patient_id"];
// if ($_SESSION['patient_id']) {
//     $id = $_SESSION['patient_id'];
// }
$response = ['status' => 1, 'patient_id' => $id];
echo json_encode($response);
mysqli_close($conn);
?>
