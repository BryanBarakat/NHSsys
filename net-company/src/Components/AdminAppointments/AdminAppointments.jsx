import React from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import SearchLogo from "../../assets/searchImg.png";
import "./AdminAppointments.css";

export const AdminAppointments = () => {
  return (
    <div className="patients-apps-container">
      <NavBarDefault children={["Appointments", "My Profile"]}></NavBarDefault>
      <div className="patients-apps-main-content">
        <h1>Appointments</h1>
        <Input
          type="search"
          id="input-search-patients-apps"
          width="100px"
        ></Input>
        <span>
          <img src={SearchLogo}></img>
        </span>
      </div>
      <TableDefault
        objects={["Patient", "Doctor", "Date and Time", " "]}
        listOfObjects={[
          {
            patient: "Bryan Barakat",
            doctor: "Khornos",
            DateandTime: "19:00",
            cancel: (
              <React.Fragment>
                <Button type="submit">Cancel</Button>
              </React.Fragment>
            ),
          },
          {
            patient: "Bahij Khoryo",
            doctor: "Khornos",
            DateandTime: "12:00",
            cancel: (
              <React.Fragment>
                <Button type="submit">Cancel</Button>
              </React.Fragment>
            ),
          },
          {
            patient: "Bahij Khoryo",
            doctor: "Khornos",
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

export default AdminAppointments;
