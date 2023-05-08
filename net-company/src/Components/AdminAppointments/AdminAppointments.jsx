import React, { useState, useEffect } from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import SearchLogo from "../../assets/searchImg.png";
import axios from "axios";
import "./AdminAppointments.css";

export const AdminAppointments = () => {
  const key = localStorage.getItem("id_user");
  const current_user = localStorage.getItem("user_type");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/view_appointments.php")
      .then((response) => {
        setApps(response.data.appointments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (doctor_first_name, doctor_last_name, date, time) => {
    axios
      .delete("http://localhost/PHP/enquiry/view_appointments.php", {
        data: [current_user, doctor_first_name, doctor_last_name, date, time],
      })
      .then((response) => {
        console.log(response);
        setApps(apps.filter((el) => el.appointment_time !== time));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="patients-apps-container">
      <NavBarDefault
        children={["Appointments", "My Profile"]}
        links={[`/admin-appointments-list/${key}`, `/profile/${key}`]}
      ></NavBarDefault>
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
        objects={["Patient", "Doctor", "Date and Time", ""]}
        listOfObjects={
          apps != []
            ? apps.map((el, index) => ({
                patient: `${el.patient_first_name} ${el.patient_last_name}`,
                doctor: `${el.doctor_first_name} ${el.doctor_last_name}`,
                DateandTime: `${el.appointment_date}  at  ${el.appointment_time}`,
                cancel: (
                  <React.Fragment>
                    <Button
                      type="button"
                      key={index}
                      onClick={() =>
                        handleSubmit(
                          `${el.doctor_first_name}`,
                          `${el.doctor_last_name}`,
                          `${el.appointment_date}`,
                          `${el.appointment_time}`
                        )
                      }
                    >
                      Cancel
                    </Button>
                  </React.Fragment>
                ),
              }))
            : ["NO appointments at the moment"]
        }
      ></TableDefault>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default AdminAppointments;
