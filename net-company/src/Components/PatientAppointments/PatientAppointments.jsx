import React, { useEffect, useState } from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import BackLink from "@govuk-react/back-link";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PatientAppointments.css";

export const PatientAppointments = () => {
  const key = localStorage.getItem("id_user");
  const current_user = localStorage.getItem("user_type");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/view_appointments.php")
      .then((response) => {
        console.log(response.data);
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
    <div className="patient-apps-container">
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
        links={[`/patient-appointment-booking/${key}`, `/profile/${key}`]}
      ></NavBarDefault>
      <div className="patient-apps-main-content">
        <h1>Appointments</h1>
        <Link to={`/profile/${key}`}>
          <BackLink id="patient-apps-back-link"></BackLink>
        </Link>
      </div>
      <TableDefault
        objects={["Doctor", "Date and Time", ""]}
        listOfObjects={
          apps != []
            ? apps.map((el, index) => ({
                patient: `${el.doctor_first_name} ${el.doctor_last_name}`,
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

export default PatientAppointments;
