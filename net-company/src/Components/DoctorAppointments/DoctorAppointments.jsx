import React, { useState, useEffect } from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import axios from "axios";
import SearchLogo from "../../assets/searchImg.png";
import ErrorSummary from "@govuk-react/error-summary";
import "./DoctorAppointments.css";

export const DoctorAppointments = () => {
  const key = localStorage.getItem("id_user");
  const current_user = localStorage.getItem("user_type");
  const curr_email_user = localStorage.getItem("user_email");
  const [loadContent, setLoadContent] = useState(false);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/view_appointments.php", {
        data: [current_user, curr_email_user],
      })
      .then((response) => {
        if (response.data.appointments) {
          setApps(response.data.appointments);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setLoadContent(true);
    }, 50);
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
    <div className="doctors-apps-container">
      <NavBarDefault
        children={["Appointments", "Medical Records", "My Profile"]}
        links={[
          `/doctor-appointments-list/${key}`,
          `/doctor-patient-medical-records-main/${key}`,
          `/profile/${key}`,
        ]}
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
      {loadContent ? (
        apps.length > 0 ? (
          <TableDefault
            objects={["Patient", "Date and Time", ""]}
            listOfObjects={apps.map((el, index) => ({
              patient: `${el.patient_first_name} ${el.patient_last_name}`,
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
            heading="There are no Appointments scheduled"
            description="Wait for new customers to schedule appointments."
          />
        )
      ) : (
        []
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default DoctorAppointments;
