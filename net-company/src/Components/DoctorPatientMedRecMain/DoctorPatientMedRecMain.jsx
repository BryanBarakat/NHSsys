import React from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import SearchLogo from "../../assets/searchImg.png";
import { Link } from "react-router-dom";
import "./DoctorPatientMedRecMain.css";

export const DoctorPatientMedRecMain = () => {
  return (
    <div className="doctorsmain-apps-container">
      <NavBarDefault
        children={["Appointments", "Medical Records", "My Profile"]}
      ></NavBarDefault>
      <div className="doctorsmain-apps-main-content">
        <h1>Appointments</h1>
        <Input
          type="search"
          id="input-search-doctorsmain-apps"
          width="100px"
        ></Input>
        <span>
          <img src={SearchLogo}></img>
        </span>
      </div>
      <TableDefault
        objects={["Name", "Postcode or NHS number", " "]}
        listOfObjects={[
          {
            patient: "Bryan Barakat",
            postcode: null,
            NHSnumber: 47829,
            cancel: (
              <React.Fragment>
                <Link to="">
                  <Button type="submit">Select</Button>
                </Link>
              </React.Fragment>
            ),
          },
          {
            patient: "Bahij Khoryo",
            postcode: "WC1N 5K3",
            NHSnumber: null,
            cancel: (
              <React.Fragment>
                <Link to="">
                  <Button type="submit">Select</Button>
                </Link>
              </React.Fragment>
            ),
          },
          {
            patient: "Bahij Khoryo",
            postcode: "WC1N 5KJ3",
            NHSnumber: null,
            cancel: (
              <React.Fragment>
                <Link to="">
                  <Button type="submit">Select</Button>
                </Link>
              </React.Fragment>
            ),
          },
        ]}
      ></TableDefault>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default DoctorPatientMedRecMain;
