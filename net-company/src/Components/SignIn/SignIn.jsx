import React, { useState, useEffect } from "react";
import TopNav from "@govuk-react/top-nav";
import Input from "@govuk-react/input";
import Button from "@govuk-react/button";
import { Link, useNavigate } from "react-router-dom";
import Label from "@govuk-react/label";
import FooterDefault from "../FooterDefault/FooterDefault";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "axios";
import "./SignIn.css";

export const SignIn = () => {
  const [userId, setUserId] = useState("");

  let history = useNavigate();
  const [Registration, setRegistration] = useState({
    email_label_sign_in: "",
    password_label_sign_in: "",
  });
  const [Warning, setWarning] = useState(false);

  const handleChange = (e) => {
    setRegistration({ ...Registration, [e.target.name]: e.target.value });
  };

  const handleWarning = () => {
    setWarning(false);
  };

  function postUser(e) {
    e.preventDefault();
    const data = {
      email_label_sign_in: Registration.email_label_sign_in,
      password_label_sign_in: Registration.password_label_sign_in,
    };

    if (
      Registration.email_label_sign_in &&
      Registration.password_label_sign_in
    ) {
      axios
        .post("http://localhost/PHP/enquiry/signin.php", data)
        .then((response) => {
          if (response.data.message == "Login successful.") {
            setUserId(response.data.patient_id); // set the user ID here
            localStorage.setItem("id_user", response.data.patient_id);
            localStorage.setItem("user_type", response.data.user_type);
            localStorage.setItem("user_email", response.data.patient_email);
            localStorage.setItem(
              "user_dob",
              response.data.patient_date_of_birth
            );
            localStorage.setItem(
              "user_fullname",
              `${response.data.patient_first_name} ${response.data.patient_last_name}`
            );
            localStorage.setItem(
              "user_nhs_number",
              response.data.patient_nhs_number
            );
            localStorage.setItem(
              "user_postcode",
              response.data.patient_postcode
            );
            localStorage.setItem(
              "user_password",
              response.data.patient_password
            );
            console.log(response);
            history(`/profile/${response.data.patient_id}`); // use the response data directly
          } else {
            console.log(response);
            setWarning(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setWarning(true);
    }
  }

  return (
    <div className="signin-container">
      <TopNav></TopNav>
      <form onSubmit={(e) => postUser(e)} className="inputs-sign-in">
        <div className="email-sign-in">
          <Label htmlFor="email-label-sign-in">Email Address</Label>
          <Input
            id="email-label-sign-in"
            name="email_label_sign_in"
            onChange={(e) => handleChange(e)}
            value={Registration.email_label_sign_in}
          ></Input>
        </div>
        <div className="password-sign-in">
          <Label htmlFor="password-label-sign-in">Password</Label>
          <Input
            type="password"
            id="password-label-sign-in"
            name="password_label_sign_in"
            onChange={(e) => handleChange(e)}
            value={Registration.password_label_sign_in}
          ></Input>
          <p className="not-a-member-sign-in">
            Not a Member? <Link to="/register"> Sign Up</Link>
          </p>
        </div>
        <Input className="patient-type" name="user_type"></Input>
        <div className="confirm-sign-in">
          <Button type="submit" id="sign-in-button">
            Sign In
          </Button>
          {/* <Select id="select-sign-in">
            <option>Patient</option>
            <option>Doctor</option>
            <option>Admin</option>
          </Select> */}
        </div>
      </form>
      {Warning && (
        <ErrorMessage
          onClick={handleWarning}
          message={"Email and password do not match"}
        />
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default SignIn;
