import React from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import SearchLogo from "../../assets/searchImg.png";
import "./DoctorAppointments.css";

export const DoctorAppointments = () => {
  return (
    <div className="doctors-apps-container">
      <NavBarDefault
        children={["Appointments", "Medical Records", "My Profile"]}
      ></NavBarDefault>
      <div className="doctors-apps-main-content">
        <h1>Appointments</h1>
        <Input
          type="search"
          id="input-search-doctors-apps"
          width="100px"
        ></Input>
        <span>
          <img src={SearchLogo}></img>
        </span>
      </div>
      <TableDefault
        objects={["Patient", "Date and Time", " "]}
        listOfObjects={[
          {
            patient: "Bryan Barakat",
            DateandTime: "19:00",
            cancel: (
              <React.Fragment>
                <Button type="submit">Cancel</Button>
              </React.Fragment>
            ),
          },
          {
            patient: "Bahij Khoryo",
            DateandTime: "12:00",
            cancel: (
              <React.Fragment>
                <Button type="submit">Cancel</Button>
              </React.Fragment>
            ),
          },
          {
            patient: "Bahij Khoryo",
            DateandTime: "12:00",
            cancel: (
              <React.Fragment>
                <Button type="submit">Cancel</Button>
              </React.Fragment>
            ),
          },
        ]}
      ></TableDefault>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default DoctorAppointments;
