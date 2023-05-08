import React from "react";
import { FooterDefault } from "../FooterDefault/FooterDefault";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import { Link } from "react-router-dom";
import BackLink from "@govuk-react/back-link";
import { MedicalRecords } from "../MedicalRecords/MedicalRecords";
import "./PatientMedRec.css";

export const PatientMedRec = () => {
  const key = localStorage.getItem("id_user");

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
      <MedicalRecords></MedicalRecords>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default PatientMedRec;
