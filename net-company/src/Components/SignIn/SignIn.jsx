import React from "react";
import TopNav from "@govuk-react/top-nav";
import Input from "@govuk-react/input";
import Footer from "@govuk-react/footer";
import Button from "@govuk-react/button";
import { Link } from "react-router-dom";
import Label from "@govuk-react/label";
import Select from "@govuk-react/select";
import FooterDefault from "../FooterDefault/FooterDefault";
import "./SignIn.css";

export const SignIn = () => {
  return (
    <div className="signin-container">
      <TopNav></TopNav>
      <form className="inputs-sign-in">
        <div className="email-sign-in">
          <Label htmlFor="email-label-sign-in">Email Address</Label>
          <Input id="email-label-sign-in" name="email-label-sign-in"></Input>
        </div>
        <div className="password-sign-in">
          <Label htmlFor="password-label-sign-in">Password</Label>
          <Input
            type="password"
            id="password-label-sign-in"
            name="password-label-sign-in"
          ></Input>
          <p className="not-a-member-sign-in">
            Not a Member? <Link to="/register"> Sign Up</Link>
          </p>
        </div>
        <div className="confirm-sign-in">
          <Button type="submit" id="sign-in-button">
            Sign In
          </Button>
          <Select id="select-sign-in">
            <option>Patient</option>
            <option>Doctor</option>
            <option>Admin</option>
          </Select>
        </div>
      </form>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default SignIn;
