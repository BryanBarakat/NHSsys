import React, { useEffect, useState } from "react";
import { FooterDefault } from "../FooterDefault/FooterDefault";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import { Link } from "react-router-dom";
import BackLink from "@govuk-react/back-link";
import axios from "axios";
import { MedicalRecords } from "../MedicalRecords/MedicalRecords";
import ErrorSummary from "@govuk-react/error-summary";
import "./PatientMedRec.css";

export const PatientMedRec = () => {
  const key = localStorage.getItem("id_user");
  const chosen_record_email = localStorage.getItem("user_email");
  const [showContent, setShowContent] = useState("");
  const get_med_rec = localStorage.getItem("med-rec-history");

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
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  }, []);

  return (
    <div className="patient-med-rec-container">
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
        links={[`/patient-appointment-booking/${key}`, `/profile/${key}`]}
      ></NavBarDefault>
      <div className="title-patient-med-rec">
        <Link to={`/profile/${key}`}>
          <BackLink></BackLink>
        </Link>
        <div className="title-patient-med-rec-header">
          <h1>My Medical Records</h1>
        </div>
      </div>
      {showContent ? (
        get_med_rec != "[]" ? (
          <MedicalRecords></MedicalRecords>
        ) : (
          <ErrorSummary
            id="error-sum"
            heading="No vaccination history"
            description="Head onto the 'Book an Appointment' page to schedule your first vaccine."
          />
        )
      ) : (
        []
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default PatientMedRec;
