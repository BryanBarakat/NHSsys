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

        $sel = $conn->prepare("SELECT * FROM appointment");
        $sel->execute();
        $fetch = $sel->get_result();

        $patient_first_name = '';
        $patient_last_name = '';
        $nhs_number = "";
        $postcode = "";

        $appointments = array();
        while ($row = $fetch->fetch_assoc()) {
            $appointment_date = $row['appointment_date'];
            $appointment_time = $row['appointment_time'];
            $patient_email = $row['patient_email'];
            $doctor_email = $row['doctor_email'];

            $sel_doc = $conn->prepare("SELECT * FROM doctor WHERE doctor_email = ?");
            $sel_doc->bind_param("s", $doctor_email);
            $sel_doc->execute();
            $fetch_doc = $sel_doc->get_result();
            if ($row_doc = $fetch_doc->fetch_assoc()) {
                $doctor_first_name = $row_doc['doctor_first_name'];
                $doctor_last_name = $row_doc['doctor_last_name'];
            }

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

        $result = ["status"=> 1, "message"=> "Records successfully extracted!", "appointments"=> $appointments];
        echo json_encode($result);
        exit();
    case "DELETE":
        $data_array = json_decode(file_get_contents('php://input'),true);
        $current_user = $data_array[0];
        $doctor_first_name = $data_array[1];
        $doctor_last_name = $data_array[2];
        $date = $data_array[3];
        $time = $data_array[4];

        $sel_doc = $conn->prepare("SELECT doctor_email,schedule_time,schedule_date FROM doctor WHERE doctor_first_name = ? AND doctor_last_name = ?");
        $sel_doc->bind_param("ss", $doctor_first_name,$doctor_last_name);
        $sel_doc->execute();
        $fetch_doc = $sel_doc->get_result();
        $row = $fetch_doc->fetch_assoc();

        $doctor_email = $row["doctor_email"];
        $schedule_time = explode(",",$row["schedule_time"]);
        $schedule_date = explode(",",$row["schedule_date"]);

        $deletion = "DELETE FROM appointment WHERE doctor_email = '$doctor_email' AND appointment_date = '$date' AND appointment_time = '$time'";
        $SQL = mysqli_query($conn,$deletion);

        
        for ($i = 0; $i < count($schedule_time) && $i < count($schedule_date); $i++) {
            // check if there is a space in either array at the current index
            if (strpos($schedule_time[$i], ' ') !== false) {
                $schedule_time[$i] = str_replace(' ', '', $schedule_time[$i]);
            }
            if (strpos($schedule_date[$i], ' ') !== false) {
                $schedule_date[$i] = str_replace(' ', '', $schedule_date[$i]);
            }
            // do something with the values at the current index
            if ($schedule_date[$i] == $date && $schedule_time[$i] == $time) {
                unset($schedule_date[$i]);
                unset($schedule_time[$i]);
            }
            
        }

        echo json_encode([$schedule_date,$schedule_time]);

        $schedule_time = implode(",",$schedule_time);
        $schedule_date = implode(",",$schedule_date);

        echo json_encode([$schedule_date,$schedule_time]);

        $deletion2 = "UPDATE doctor SET schedule_date = '$schedule_date',schedule_time = '$schedule_time' WHERE doctor_email = '$doctor_email'";
        $SQL2 = mysqli_query($conn,$deletion2);

        $response = ["status"=> 0, "message"=> "Changes successfully made!"];
        echo json_encode($response);
        exit();
}
mysqli_close($conn);
?>
