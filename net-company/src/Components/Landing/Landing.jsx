import React from "react";
import TopNav from "@govuk-react/top-nav";
import Footer from "@govuk-react/footer";
import Button from "@govuk-react/Button";
import { Link } from "react-router-dom";
import "./Landing.css";

export const Landing = () => {
  return (
    <div className="landing-container">
      <TopNav></TopNav>
      <div className="main-landing-content">
        <h1>
          Welcome to GOV.UK <br />
          <span>Powered by NetCompany</span>
        </h1>
        <h2>The best place to find government services and information</h2>
        <h3>Simpler, clearer, faster</h3>
        <Link to="/register">
          <Button>Register Now</Button>
        </Link>
      </div>
      <Footer id="footer-landing"></Footer>
    </div>
  );
};

export default Landing;
