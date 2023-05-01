import React from "react";
import TopNav from "@govuk-react/top-nav";
import Footer from "@govuk-react/footer";
import Button from "@govuk-react/button";
import { Link } from "react-router-dom";
import BackLink from "@govuk-react/back-link";
import { MedicalRecords } from "../MedicalRecords/MedicalRecords";
import "./DoctorPatientMedRec.css";

export const DoctorPatientMedRec = () => {
  return (
    <div className="doc-patient-med-rec-container">
      <TopNav className="nav-options-doc-patient-med-rec-container">
        <Link to="">Appointments</Link>
        <Link to="">Medical Records</Link>
        <Link to="">My Profile</Link>
      </TopNav>
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
      <Footer className="footer-doc-patient-med-rec"></Footer>
    </div>
  );
};

export default DoctorPatientMedRec;
