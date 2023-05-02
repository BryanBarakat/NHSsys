import React from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import BackLink from "@govuk-react/back-link";
import { Link } from "react-router-dom";
import "./PatientAppointments.css";

export const PatientAppointments = () => {
  return (
    <div className="patient-apps-container">
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
      ></NavBarDefault>
      <div className="patient-apps-main-content">
        <h1>Appointments</h1>
        <Link to="/profile">
          <BackLink id="patient-apps-back-link"></BackLink>
        </Link>
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

export default PatientAppointments;
