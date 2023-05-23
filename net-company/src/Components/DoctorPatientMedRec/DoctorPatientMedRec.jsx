import React, { useEffect, useState } from "react";
import { FooterDefault } from "../FooterDefault/FooterDefault";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import Button from "@govuk-react/button";
import { Link, useNavigate } from "react-router-dom";
import BackLink from "@govuk-react/back-link";
import { MedicalRecords } from "../MedicalRecords/MedicalRecords";
import { Input } from "govuk-react";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CloseTab from "../../assets/close.png";
import ErrorSummary from "@govuk-react/error-summary";
import "./DoctorPatientMedRec.css";
import "../VaccineRow/VaccineRow.css";

export const DoctorPatientMedRec = () => {
  let directory = useNavigate();
  const key = localStorage.getItem("id_user");
  const chosen_record_email = localStorage.getItem("chosen_patient_records");
  const current_user = localStorage.getItem("user_type");
  const get_med_rec = localStorage.getItem("med-rec-history");
  const chosenPerson = localStorage.getItem("chosen_person");
  const [rowAddition, setRowAddition] = useState(false);
  const [Warning, setWarning] = useState(false);
  const [warningMesssage, setWarningMessage] = useState("");

  const handleWarning = () => {
    setWarning(false);
  };

  const [vaccine, setVaccine] = useState({
    doseNo: "",
    vaccinationDate: "",
    vaccineManufacturer: "",
    diseaseTargeted: "",
    vaccineType: "",
    product: "",
    vaccineBatchNumber: "",
    countryOfVaccination: "",
    authority: "",
    site: "",
    totalSeriesOfDoses: "",
    displayName: "",
    snomedCode: "",
    dateEntered: "",
    procedureCode: "",
    booster: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost/PHP/enquiry/addMedRec.php", {
        data: [chosen_record_email, vaccine],
      })
      .then((response) => {
        directory(`/doctor-patient-medical-records-main/${key}`);
        // setWarningMessage(response.data.message);
        // setWarning(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/getMedRec.php", {
        data: [chosen_record_email],
      })
      .then((response) => {
        localStorage.setItem(
          "med-rec-history",
          JSON.stringify(response.data.array_of_vaccinations)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function putInfo(e) {
    e.preventDefault();
    axios
      .put("http://localhost/PHP/enquiry/getMedRec.php", {
        data: [
          JSON.parse(localStorage.getItem("med-rec-history")),
          chosen_record_email,
          JSON.parse(get_med_rec)[0]["DoseNo"],
        ],
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleEdit = () => {
    let divArray = [
      document.getElementById("editableDiv1"),
      document.getElementById("editableDiv2"),
      document.getElementById("editableDiv3"),
      document.getElementById("editableDiv4"),
      document.getElementById("editableDiv5"),
      document.getElementById("editableDiv6"),
      document.getElementById("editableDiv7"),
      document.getElementById("editableDiv8"),
      document.getElementById("editableDiv9"),
      document.getElementById("editableDiv10"),
      document.getElementById("editableDiv11"),
      document.getElementById("editableDiv12"),
      document.getElementById("editableDiv13"),
      document.getElementById("editableDiv14"),
      document.getElementById("editableDiv15"),
    ];
    for (let i = 0; i <= divArray.length; i++) {
      divArray[i].contentEditable = true;
    }
  };

  function addRow() {
    setRowAddition(true);
  }

  return (
    <div className="doc-patient-med-rec-container">
      <NavBarDefault
        children={["Appointments", "Medical Records", "My Profile"]}
        links={[
          `/doctor-appointments-list/${key}`,
          `/doctor-patient-medical-records-main/${key}`,
          `/profile/${key}`,
        ]}
      ></NavBarDefault>
      <div className="title-doc-patient-med-rec">
        <Link to={`/doctor-patient-medical-records-main/${key}`}>
          <BackLink></BackLink>
        </Link>
        <div className="title-doc-patient-med-rec-header">
          <h1>{chosenPerson}'s Medical Records</h1>
        </div>
        {current_user == "doctor" && (
          <div className="title-doc-patient-med-rec-buttons">
            <div className="edit-changes-doc">
              <Button onClick={handleEdit}>Edit</Button>
            </div>
            <Button onClick={addRow}>Add a Vaccine</Button>
            <form
              onSubmit={(e) => putInfo(e)}
              method="PUT"
              className="submit-changes-med-rec-neo"
            >
              <Button type="submit">Submit Changes</Button>
            </form>
          </div>
        )}
      </div>
      {rowAddition && (
        <div className="vaccine-row-container">
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="row">
              <label htmlFor="doseNo">Dose Number:</label>
              <Input
                type="text"
                id="doseNo"
                name="doseNo"
                onChange={(e) =>
                  setVaccine({ ...vaccine, doseNo: e.target.value })
                }
              />
              <label htmlFor="vaccinationDate">
                &nbsp;&nbsp;&nbsp;Vacc. Date:
              </label>
              <Input
                type="text"
                id="vaccinationDate"
                name="vaccinationDate"
                onChange={(e) =>
                  setVaccine({ ...vaccine, vaccinationDate: e.target.value })
                }
              />
            </div>
            <div className="row">
              <label htmlFor="vaccineManufacturer">Vacc. Manufacturer:</label>
              <Input
                type="text"
                id="vaccineManufacturer"
                name="vaccineManufacturer"
                onChange={(e) =>
                  setVaccine({
                    ...vaccine,
                    vaccineManufacturer: e.target.value,
                  })
                }
              />
              <label htmlFor="diseaseTargeted">
                &nbsp;&nbsp;&nbsp;Disease Targeted:
              </label>
              <Input
                type="text"
                id="diseaseTargeted"
                name="diseaseTargeted"
                onChange={(e) =>
                  setVaccine({ ...vaccine, diseaseTargeted: e.target.value })
                }
              />
            </div>
            <div className="row">
              <label htmlFor="vaccineType">Vaccine Type:</label>
              <Input
                type="text"
                id="vaccineType"
                name="vaccineType"
                onChange={(e) =>
                  setVaccine({ ...vaccine, vaccineType: e.target.value })
                }
              />
              <label htmlFor="product">&nbsp;&nbsp;&nbsp;Product:</label>
              <Input
                type="text"
                id="product"
                name="product"
                onChange={(e) =>
                  setVaccine({ ...vaccine, product: e.target.value })
                }
              />
            </div>
            <div className="row">
              <label htmlFor="vaccineBatchNumber">Vaccine Batch Number:</label>
              <Input
                type="text"
                id="vaccineBatchNumber"
                name="vaccineBatchNumber"
                onChange={(e) =>
                  setVaccine({ ...vaccine, vaccineBatchNumber: e.target.value })
                }
              />
              <label htmlFor="countryOfVaccination">
                &nbsp;&nbsp;&nbsp;Country of Vaccination:
              </label>
              <Input
                type="text"
                id="countryOfVaccination"
                name="countryOfVaccination"
                onChange={(e) =>
                  setVaccine({
                    ...vaccine,
                    countryOfVaccination: e.target.value,
                  })
                }
              />
            </div>
            <div className="row">
              <label htmlFor="authority">Authority:</label>
              <Input
                type="text"
                id="authority"
                name="authority"
                onChange={(e) =>
                  setVaccine({ ...vaccine, authority: e.target.value })
                }
              />
              <label htmlFor="site">&nbsp;&nbsp;&nbsp;Site:</label>
              <Input
                type="text"
                id="site"
                name="site"
                onChange={(e) =>
                  setVaccine({ ...vaccine, site: e.target.value })
                }
              />
            </div>
            <div className="row">
              <label htmlFor="totalSeriesOfDoses">Total Series of Doses:</label>
              <Input
                type="text"
                id="totalSeriesOfDoses"
                name="totalSeriesOfDoses"
                onChange={(e) =>
                  setVaccine({ ...vaccine, totalSeriesOfDoses: e.target.value })
                }
              />
              <label htmlFor="displayName">
                &nbsp;&nbsp;&nbsp;Display Name:
              </label>
              <Input
                type="text"
                id="displayName"
                name="displayName"
                onChange={(e) =>
                  setVaccine({ ...vaccine, displayName: e.target.value })
                }
              />
            </div>

            <div className="row">
              <label htmlFor="snomedCode">Snomed Code:</label>
              <Input
                type="text"
                id="snomedCode"
                name="snomedCode"
                onChange={(e) =>
                  setVaccine({ ...vaccine, snomedCode: e.target.value })
                }
              />
              <label htmlFor="dateEntered">
                &nbsp;&nbsp;&nbsp;Date Entered:
              </label>
              <Input type="text" id="dateEntered" name="dateEntered" />
            </div>

            <div className="row">
              <label htmlFor="procedureCode">Procedure Code:</label>
              <Input
                type="text"
                id="procedureCode"
                name="procedureCode"
                onChange={(e) =>
                  setVaccine({ ...vaccine, procedureCode: e.target.value })
                }
              />
              <label htmlFor="booster">&nbsp;&nbsp;&nbsp;Booster:</label>
              <Input
                type="text"
                id="booster"
                name="booster"
                onChange={(e) =>
                  setVaccine({ ...vaccine, booster: e.target.value })
                }
              />
            </div>
            <Button className="submit-vacc" type="submit">
              Add Vaccine
            </Button>
          </form>
          <div className="close-tab-vacc">
            <img onClick={() => setRowAddition(false)} src={CloseTab}></img>
          </div>
        </div>
      )}
      {console.log(get_med_rec)}
      {get_med_rec != "[]" ? (
        <MedicalRecords></MedicalRecords>
      ) : (
        <ErrorSummary
          id="error-sum"
          heading="No vaccination history"
          description="Head onto the 'Book an Appointment' page to schedule your first vaccine."
        />
      )}
      {Warning && (
        <ErrorMessage onClick={handleWarning} message={warningMesssage} />
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default DoctorPatientMedRec;
