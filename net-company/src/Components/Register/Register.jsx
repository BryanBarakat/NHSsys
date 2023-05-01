import React from "react";
import TopNav from "@govuk-react/top-nav";
import Input from "@govuk-react/input";
import Footer from "@govuk-react/footer";
import Button from "@govuk-react/button";
import { Link } from "react-router-dom";
import Label from "@govuk-react/label";
import Select from "@govuk-react/select";
import "./Register.css";

export const Register = () => {
  return (
    <div className="register-container">
      <TopNav></TopNav>
      <div className="registration-input-container">
        <div className="name-registration">
          <div className="first-name-registration">
            <Label htmlFor="first-name-label">First Name</Label>
            <Input id="first-name-label" name="first-name-label"></Input>
          </div>
          <div className="last-name-registration">
            <Label htmlFor="last-name-label">Last Name</Label>
            <Input id="last-name-label" name="last-name-label"></Input>
          </div>
        </div>
        <div className="postcode-number-registration">
          <div className="postcode-register">
            <Label htmlFor="postcode-label">Postcode</Label>
            <Input id="postcode-label" name="postcode-label"></Input>
          </div>
          <p>Or</p>
          <div className="NHS-numb-register">
            <Label htmlFor="NHS-label">NHS Number</Label>
            <Input id="NHS-label" name="NHS-label"></Input>
          </div>
        </div>
        <div className="email-registration">
          <Label htmlFor="email-reg-label">Email Address</Label>
          <Input id="email-reg-label" name="email-reg-label"></Input>
        </div>
        <div className="password-registration">
          <Label htmlFor="pass-reg-label">Password</Label>
          <Input id="pass-reg-label" name="pass-reg-label"></Input>
          <p className="already-a-member-register">
            Already a Member? <Link to="/signin"> Sign In</Link>
          </p>
        </div>
        <div className="submit-registration">
          <Button>Register</Button>
        </div>
      </div>
      <Footer className="footer-register"></Footer>
    </div>
  );
};

export default Register;
