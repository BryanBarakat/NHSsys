import React from "react";
import { FooterDefault } from "../FooterDefault/FooterDefault";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import Button from "@govuk-react/button";
import { Link } from "react-router-dom";
import BackLink from "@govuk-react/back-link";
import { MedicalRecords } from "../MedicalRecords/MedicalRecords";
import "./DoctorPatientMedRec.css";

export const DoctorPatientMedRec = () => {
  return (
    <div className="doc-patient-med-rec-container">
      <NavBarDefault
        children={["Appointments", "Medical Records", "My Profile"]}
      ></NavBarDefault>
      <div className="title-doc-patient-med-rec">
        <Link to="">
          <BackLink></BackLink>
        </Link>
        <div className="title-doc-patient-med-rec-header">
          {/* The points are the clicked person's name -- PHP dynamic rendering @backend-team */}
          <h1>............'s Medical Records</h1>
        </div>
        <div className="title-doc-patient-med-rec-buttons">
          <Button>Edit</Button>
        </div>
      </div>
      <MedicalRecords></MedicalRecords>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default DoctorPatientMedRec;
