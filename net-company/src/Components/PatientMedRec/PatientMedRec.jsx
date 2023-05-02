import React from "react";
import { FooterDefault } from "../FooterDefault/FooterDefault";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import { Link } from "react-router-dom";
import BackLink from "@govuk-react/back-link";
import { MedicalRecords } from "../MedicalRecords/MedicalRecords";
import "./PatientMedRec.css";

export const PatientMedRec = () => {
  return (
    <div className="patient-med-rec-container">
      <NavBarDefault children={["Appointments", "My Profile"]}></NavBarDefault>
      <div className="title-patient-med-rec">
        <Link to="/profile">
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
