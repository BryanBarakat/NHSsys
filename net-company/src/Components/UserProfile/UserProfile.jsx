import React, { useState, useEffect } from "react";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

export const UserProfile = () => {
  const current_user = localStorage.getItem("user_type");
  const k = localStorage.getItem("id_user");

  useEffect(() => {
    axios
      .get(`http://localhost/PHP/enquiry/test.php`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      {current_user == "patient" && (
        <NavBarDefault
          children={["Book an Appointment", "My Profile"]}
          links={[`/patient-appointment-booking/${k}`, `/profile/${k}`]}
        ></NavBarDefault>
      )}
      {current_user == "doctor" && (
        <NavBarDefault
          children={["Appointments", "Medical Records", "My Profile"]}
          links={[
            `/doctor-appointments-list/${k}`,
            `/doctor-patient-medical-records-main/${k}`,
            `/profile/${k}`,
          ]}
        ></NavBarDefault>
      )}
      {current_user == "admin" && (
        <NavBarDefault
          children={["Appointments", "My Profile"]}
          links={[`/admin-appointments-list/${k}`, `/profile/${k}`]}
        ></NavBarDefault>
      )}
      <div className="main-content-user-profile">
        <ul>
          <h1 className="title-profile-setting">Profile Settings</h1>
          <br />
          <Link to={`/privacy/${k}`}>
            <li>Privacy and Security</li>
          </Link>
          {current_user == "patient" && (
            <Link to={`/patient-appointments-list/${k}`}>
              {" "}
              <li>View GP Appointments</li>
            </Link>
          )}
          {current_user == "doctor" && (
            <Link to={`/doctor-appointments-list/${k}`}>
              {" "}
              <li>View GP Appointments</li>
            </Link>
          )}
          {current_user == "admin" && (
            <Link to={`/admin-appointments-list/${k}`}>
              {" "}
              <li>View GP Appointments</li>
            </Link>
          )}
          {current_user == "patient" && (
            <Link to={`/patient-medical-records/${k}`}>
              <li>View Medical Records</li>
            </Link>
          )}
          <Link to={`/signin`}>
            <li>Sign Out</li>
          </Link>
        </ul>
      </div>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default UserProfile;
