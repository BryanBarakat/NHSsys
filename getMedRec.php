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
        $data_array = json_decode(file_get_contents('php://input'),true);
        $current_user_email = $data_array["data"][0];

        $sel_pat = $conn->prepare("SELECT * FROM patient WHERE Email = ?");
        $sel_pat->bind_param("s", $current_user_email);
        $sel_pat->execute();
        $fetch_pat = $sel_pat->get_result();
        $row = $fetch_pat->fetch_assoc();
        $forename = $row['Forename'];
        $surname = $row['Surname'];
        $email = $row['Email'];
        $postcode = $row['Postcode'];
        $nhs_number = $row['NHSNumber'];
        $person_dob = $row['PersonDOB'];
        $gender_code = $row['GenderCode'];

        $sel_vac = $conn->prepare("SELECT * FROM vaccinations WHERE NHSNumber = ?");
        $sel_vac->bind_param("s", $nhs_number);
        $sel_vac->execute();
        $fetch_vac = $sel_vac->get_result();

        $array_of_vaccinations = array();
        while ($row2 = $fetch_vac->fetch_assoc()) {
            $array_of_vaccinations[] = array(
                "DoseNo" => $row2["DoseNo"],
                "vaccinationDate" => $row2["VaccinationDate"],
                "vaccineManufacturer" => $row2["VaccineManufacturer"],
                "diseaseTargeted" => $row2["DiseaseTargeted"],
                "vaccineType" => $row2["VaccineType"],
                "product" => $row2["Product"],
                "vaccineBatchNumber" => $row2["VaccineBatchNumber"],
                "countryOfVaccination" => $row2["CountryOfVaccination"],
                "authority" => $row2["Authority"],
                "site" => $row2["Site"],
                "totalSeriesOfDoses" => $row2["TotalSeriesOfDoses"],
                "displayName" => $row2["DisplayName"],
                "snomedCode" => $row2["SnomedCode"],
                "dateEntered" => $row2["DateEntered"],
                "procedureCode" => $row2["ProcedureCode"],
                "booster" => $row2["Booster"]
            );
        }

        $response = ["status"=> 1,"message"=> "Records successfully fetched!","array_of_vaccinations" => $array_of_vaccinations, "chosen_person"=> $forename . " " . $surname];
        echo json_encode($response);
        exit();
    case "PUT":
        $data_array = json_decode(file_get_contents('php://input'),true);
        $array_of_vaccinations = $data_array["data"][0];
        $current_user_email =  $data_array["data"][1];
        $dose_number =  $data_array["data"][2];

        $sel_pat = $conn->prepare("SELECT * FROM patient WHERE Email = ?");
        $sel_pat->bind_param("s", $current_user_email);
        $sel_pat->execute();
        $fetch_pat = $sel_pat->get_result();
        $row = $fetch_pat->fetch_assoc();
        $nhs_number = $row['NHSNumber'];

        $stmt = $conn->prepare("UPDATE vaccinations SET VaccinationDate=?, VaccineManufacturer=?, DiseaseTargeted=?, VaccineType=?, Product=?, VaccineBatchNumber=?, CountryOfVaccination=?, Authority=?, Site=?, TotalSeriesOfDoses=?, DisplayName=?, SnomedCode=?, DateEntered=?, ProcedureCode=?, Booster=? WHERE NHSNumber=? AND DoseNo = ?");

        foreach($array_of_vaccinations as $vaccination) {
            // Bind the parameters
            $stmt->bind_param("issssssssssssssss",
            $vaccination['vaccinationDate'], 
            $vaccination['vaccineManufacturer'], 
            $vaccination['diseaseTargeted'], 
            $vaccination['vaccineType'], 
            $vaccination['product'], 
            $vaccination['vaccineBatchNumber'], 
            $vaccination['countryOfVaccination'], 
            $vaccination['authority'], 
            $vaccination['site'], 
            $vaccination['totalSeriesOfDoses'], 
            $vaccination['displayName'], 
            $vaccination['snomedCode'], 
            $vaccination['dateEntered'], 
            $vaccination['procedureCode'], 
            $vaccination['booster'], 
            $nhs_number,
            $dose_number
            );
        
            $stmt->execute();
        }

        $response = [
            'status' => 'success',
            'message' => 'Record updated successfully'
        ];
        echo json_encode($response);
        exit();
}
mysqli_close($conn);
?>
