import React from "react";
import TopNav from "@govuk-react/top-nav";
import Input from "@govuk-react/input";
import Footer from "@govuk-react/footer";
import Button from "@govuk-react/button";
import { Link } from "react-router-dom";
import Label from "@govuk-react/label";
import BackLink from "@govuk-react/back-link";
import "./PrivacySecurity.css";

export const PrivacySecurity = () => {
  return (
    <div className="privacy-container">
      <TopNav id="privacy-nav-bar-options">
        <Link to="">Book an Appointment</Link>
        <Link to="">My Profile</Link>
      </TopNav>
      <Link to="" className="back-link-privacy">
        <BackLink color="#303030" id="back-link-privacy"></BackLink>
      </Link>
      <form className="main-content-privacy">
        <div className="privacy-input-container">
          <div className="postcode-number-privacy">
            <div className="postcode-privacys">
              <Label htmlFor="postcode-label">Postcode</Label>
              <Input id="postcode-label" name="postcode-label"></Input>
            </div>
            <p>Or</p>
            <div className="NHS-numb-privacys">
              <Label htmlFor="NHS-label">NHS Number</Label>
              <Input id="NHS-label" name="NHS-label"></Input>
            </div>
          </div>
          <div className="email-privacy">
            <Label htmlFor="email-reg-label">Email Address</Label>
            <Input id="email-reg-label" name="email-reg-label"></Input>
          </div>
          <div className="password-privacy">
            <Label htmlFor="pass-reg-label">Password</Label>
            <Input id="pass-reg-label" name="pass-reg-label"></Input>
          </div>
          <div className="submit-privacy">
            <Button type="submit">Submit Changes</Button>
            <Button type="submit">Delete Registration</Button>
          </div>
        </div>
      </form>
      <Footer className="privacy-footer"></Footer>
    </div>
  );
};

export default PrivacySecurity;
