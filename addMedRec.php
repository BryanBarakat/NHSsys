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
        $data_array = json_decode(file_get_contents('php://input'), true);
        $current_user_email = $data_array["data"][0];
        $vacc_array = $data_array["data"][1];

        $get_nhs = $conn->prepare("SELECT NHSNumber FROM patient WHERE Email = ?");
        $get_nhs->bind_param("s", $current_user_email);
        $get_nhs->execute();
        $fetch_nhs = $get_nhs->get_result();
        $row_pat = $fetch_nhs->fetch_assoc();
        $nhs_number = $row_pat["NHSNumber"];

        if(mysqli_num_rows($fetch_nhs) > 0){
            
                // Get the data from $data_array
                $doseNo = $vacc_array['doseNo'];
                $vaccinationDate = $vacc_array['vaccinationDate'];
                $vaccineManufacturer = $vacc_array['vaccineManufacturer'];
                $diseaseTargeted = $vacc_array['diseaseTargeted'];
                $vaccineType = $vacc_array['vaccineType'];
                $product = $vacc_array['product'];
                $vaccineBatchNumber = $vacc_array['vaccineBatchNumber'];
                $countryOfVaccination = $vacc_array['countryOfVaccination'];
                $authority = $vacc_array['authority'];
                $site = $vacc_array['site'];
                $totalSeriesOfDoses = $vacc_array['totalSeriesOfDoses'];
                $displayName = $vacc_array['displayName'];
                $snomedCode = $vacc_array['snomedCode'];
                $dateEntered = $vacc_array['dateEntered'];
                $procedureCode = $vacc_array['procedureCode'];
                $booster = $vacc_array['booster'];

                if (empty($doseNo) &&
                    empty($vaccinationDate) &&
                    empty($vaccineManufacturer) &&
                    empty($diseaseTargeted) &&
                    empty($vaccineType) &&
                    empty($product) &&
                    empty($vaccineBatchNumber) &&
                    empty($countryOfVaccination) &&
                    empty($authority) &&
                    empty($site) &&
                    empty($totalSeriesOfDoses) &&
                    empty($displayName) &&
                    empty($snomedCode) &&
                    empty($dateEntered) &&
                    empty($procedureCode) &&
                    empty($booster)) {
                        $ans = ["status"=> 0 ,"message"=>"No Information has been added"];
                        echo json_encode($ans);
                        exit();
                    }
        
                // Prepare the update query
                $sql = "INSERT INTO vaccinations 
                (NHSNumber,DoseNo, VaccinationDate, VaccineManufacturer, DiseaseTargeted, VaccineType, Product, VaccineBatchNumber, CountryOfVaccination, Authority, Site, TotalSeriesOfDoses, DisplayName, SnomedCode, DateEntered, ProcedureCode, Booster) 
                VALUES ('$nhs_number','$doseNo', '$vaccinationDate', '$vaccineManufacturer', '$diseaseTargeted', '$vaccineType', '$product', '$vaccineBatchNumber', '$countryOfVaccination', '$authority', '$site', '$totalSeriesOfDoses', '$displayName', '$snomedCode', '$dateEntered', '$procedureCode', '$booster')";

        
                // Run the update query
                $result = mysqli_query($conn, $sql);
                if ($result) {
                    $ans = ["status"=> 1 ,"message"=>"Record updated successfully"];
                } else {
                    $ans = ["status"=> 0 ,"message"=>"Record failed to update"];
                }

        }
        else{
            $ans = ["status"=> 0 ,"message"=>"No vaccination history"];
        }
        echo json_encode($ans);
        exit();
}
mysqli_close($conn);
?>
