import React, { useState, useEffect } from "react";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

export const UserProfile = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/PHP/enquiry/profile.php")
      .then((response) => {
        console.log(response);
        setUserId(response.data.patient_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
      ></NavBarDefault>
      <div className="main-content-user-profile">
        <ul>
          <h1 className="title-profile-setting">Profile Settings</h1>
          <br />
          <Link to={`/privacy/${userId}`}>
            <li>Privacy and Security</li>
          </Link>
          <Link to={`/patient-appointments-lis/${userId}`}>
            {" "}
            <li>View GP Appointments</li>
          </Link>
          <Link to={`/patient-medical-records/${userId}`}>
            <li>View Medical Records</li>
          </Link>
        </ul>
      </div>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default UserProfile;
