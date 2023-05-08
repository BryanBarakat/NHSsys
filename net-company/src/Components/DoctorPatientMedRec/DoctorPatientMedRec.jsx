import React, { useEffect, useState } from "react";
import { FooterDefault } from "../FooterDefault/FooterDefault";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import Button from "@govuk-react/button";
import { Link } from "react-router-dom";
import BackLink from "@govuk-react/back-link";
import { MedicalRecords } from "../MedicalRecords/MedicalRecords";
import axios from "axios";
import "./DoctorPatientMedRec.css";

export const DoctorPatientMedRec = () => {
  const key = localStorage.getItem("id_user");
  const chosen_record_email = localStorage.getItem("chosen_patient_records");
  const current_user = localStorage.getItem("user_type");
  const get_med_rec = localStorage.getItem("med-rec-history");
  const [chosenPerson, setChosenPerson] = useState("");

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
        setChosenPerson(response.data.chosen_person);
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
            <Button onClick={handleEdit}>Edit</Button>
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
      <MedicalRecords></MedicalRecords>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default DoctorPatientMedRec;
