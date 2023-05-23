//Produced by Bryan Naoum Barakat student w18484023

//import images and dependencies
import React, { useEffect, useState } from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import BackLink from "@govuk-react/back-link";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorSummary from "@govuk-react/error-summary";
import "./PatientAppointments.css";

export const PatientAppointments = () => {
  //constant variables storing localstorage items to get which were initialised when the user logged in
  const key = localStorage.getItem("id_user");
  const current_user = localStorage.getItem("user_type");
  const curr_email_user = localStorage.getItem("user_email");

  //content loading delay
  const [loadContent, setLoadContent] = useState(false);

  //appointments stored in array
  const [apps, setApps] = useState([]);

  //API fetch request to render all appointments made by this specific and unique patient
  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/view_appointments.php", {
        data: [current_user, curr_email_user],
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.appointments) {
          setApps(response.data.appointments);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setLoadContent(true);
    }, 50);
  }, []);

  //API fetch request to delete the selected row's appointment
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
        <Link to={`/profile/${key}`}>
          <BackLink id="patient-apps-back-link"></BackLink>
        </Link>
        <h1>Appointments</h1>
      </div>
      {loadContent ? (
        apps.length > 0 ? (
          <TableDefault
            objects={["Doctor", "Date and Time", ""]}
            listOfObjects={apps.map((el, index) => ({
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
            }))}
          ></TableDefault>
        ) : (
          <ErrorSummary
            id="error-sum"
            heading="You have no Appointments scheduled"
            description="Head onto the 'Book an Appointment' page."
          />
        )
      ) : (
        []
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default PatientAppointments;
