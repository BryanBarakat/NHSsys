//Produced by Bryan Naoum Barakat student w18484023

//import images and dependencies
import React, { useState } from "react";
import TopNav from "@govuk-react/top-nav";
import Input from "@govuk-react/input";
import FooterDefault from "../FooterDefault/FooterDefault";
import Button from "@govuk-react/button";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "axios";
import Label from "@govuk-react/label";
import "./Register.css";

export const Register = () => {
  //navigation to other pages using useNavigate()
  let history = useNavigate();

  //registration details stored -- its state
  const [Registration, setRegistration] = useState({
    first_name_label: "",
    last_name_label: "",
    email_reg_label: "",
    postcode_label: "",
    NHS_label: "",
    date_of_birth: "",
    pass_reg_label: "",
    patient_gender: "Male",
    patient_type: "patient",
  });

  //warning message state
  const [Warning, setWarning] = useState(false);

  //warning custom message state
  const [warningMessage, setWarningMessage] = useState(
    "Please fill in the required fields"
  );

  //input change handling using event target names and values of HTML tags
  const handleChange = (e) => {
    setRegistration({ ...Registration, [e.target.name]: e.target.value });
  };

  //handle warning state whenever wrong input was inserted
  const handleWarning = () => {
    setWarning(false);
  };

  //post request method to create and register the new user to then add into the database -- on click of submit type button of the form
  function postUser(e) {
    e.preventDefault();
    const data = {
      first_name_label: Registration.first_name_label,
      last_name_label: Registration.last_name_label,
      email_reg_label: Registration.email_reg_label,
      postcode_label: Registration.postcode_label,
      NHS_label: Registration.NHS_label,
      date_of_birth: Registration.date_of_birth.split(" ").reverse().join(" "),
      pass_reg_label: Registration.pass_reg_label,
      patient_gender: Registration.patient_gender,
    };

    if (
      data.first_name_label &&
      data.last_name_label &&
      data.email_reg_label &&
      (data.postcode_label || data.NHS_label) &&
      data.pass_reg_label &&
      data.date_of_birth &&
      data.patient_gender
    ) {
      axios
        .post("http://localhost/PHP/Enquiry/signup.php", data)
        .then((response) => {
          if (response.data.message == "Query Successfully recorded") {
            history("/signin");
            console.log(response);
          } else {
            console.log(response);
            setWarningMessage(response.data.message);
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
    <div className="register-container">
      <TopNav></TopNav>
      <form
        onSubmit={(e) => postUser(e)}
        method="POST"
        className="registration-input-container"
      >
        <div className="name-registration">
          <div className="first-name-registration">
            <Label htmlFor="first_name_label">
              First Name <span>*</span>
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              value={Registration.first_name_label}
              id="first-name-label"
              name="first_name_label"
            ></Input>
          </div>
          <div className="last-name-registration">
            <Label htmlFor="last_name_label">
              Last Name <span>*</span>
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              value={Registration.last_name_label}
              id="last-name-label"
              name="last_name_label"
            ></Input>
          </div>
        </div>
        <div className="postcode-number-registration">
          <div className="postcode-register">
            <Label htmlFor="postcode_label">Postcode</Label>
            <Input
              onChange={(e) => handleChange(e)}
              value={Registration.postcode_label}
              id="postcode-label"
              name="postcode_label"
            ></Input>
          </div>
          <div className="NHS-numb-register">
            <Label htmlFor="NHS_label">
              NHS Number <span>*</span>
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              value={Registration.NHS_label}
              id="NHS-label"
              name="NHS_label"
            ></Input>
          </div>
        </div>
        <div className="date-registration">
          <label htmlFor="date-registration">
            DOB <span>*</span>
          </label>
          <input
            type="date"
            id="date-registration"
            name="date_of_birth"
            onChange={(e) => handleChange(e)}
            value={Registration.date_of_birth}
            min="1900-01-01"
            max="2023-1-1"
          />
        </div>
        <div className="gender-registration">
          <label htmlFor="gender-retrieval">
            Gender <span>*</span>
          </label>
          <select
            onChange={(e) => handleChange(e)}
            value={Registration.patient_gender}
            name="patient_gender"
            id="gender-retrieval"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="email-registration">
          <Label htmlFor="email_reg_label">
            Email Address <span>*</span>
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={Registration.email_reg_label}
            id="email-reg-label"
            name="email_reg_label"
          ></Input>
        </div>
        <div className="password-registration">
          <Label htmlFor="pass_reg_label">
            Password <span>*</span> &nbsp; (10 characters minimum)
          </Label>
          <Input
            type="password"
            id="pass-reg-label"
            name="pass_reg_label"
            onChange={(e) => handleChange(e)}
            value={Registration.pass_reg_label}
          ></Input>
          <p className="already-a-member-register">
            Already a Member? <Link to="/signin"> Sign In</Link>
          </p>
        </div>
        <div className="submit-registration">
          <Button type="submit">Register</Button>
        </div>
      </form>
      {Warning && (
        <ErrorMessage onClick={handleWarning} message={warningMessage} />
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default Register;
