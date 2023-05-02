import React from "react";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import { Link } from "react-router-dom";
import "./UserProfile.css";

export const UserProfile = () => {
  return (
    <div>
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
      ></NavBarDefault>
      <div className="main-content-user-profile">
        <ul>
          <h1 className="title-profile-setting">Profile Settings</h1>
          <br />
          <Link to="/privacy">
            <li>Privacy and Security</li>
          </Link>
          <Link to="/patient-appointments-lis">
            {" "}
            <li>View GP Appointments</li>
          </Link>
          <Link to="/patient-medical-records">
            <li>View Medical Records</li>
          </Link>
        </ul>
      </div>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default UserProfile;
