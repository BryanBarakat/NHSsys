//Produced by Bryan Naoum Barakat student w18484023

import React, { useEffect, useState } from "react";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Button from "@govuk-react/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./PatientAppointmentBooking.css";

export const PatientAppointmentBooking = () => {
  const key = localStorage.getItem("id_user");
  const user_email = localStorage.getItem("user_email");

  let history = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [chosenDoctor, setChosenDoctor] = useState("");
  const [timing, setTiming] = useState("");
  const [date, setDate] = useState("");
  const [takenTimings, setTakenTimings] = useState([]);
  const [takenDate, setTakenDates] = useState([]);

  const [Warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState(
    "Please fill in the required fields"
  );

  const timing_options = [];

  for (let hour = 9; hour <= 17; hour++) {
    timing_options.push(`${hour}:00`);
    timing_options.push(`${hour}:30`);
  }

  const handleWarning = () => {
    setWarning(false);
  };

  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/test.php", [
        user_email,
        chosenDoctor,
        doctor,
        timing,
        date,
      ])
      .then((response) => {
        setDoctor(response.data.array_of_doctors);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .put("http://localhost/PHP/enquiry/getDoctorApps.php", {
        data: [user_email, chosenDoctor, doctor, timing, date],
      })
      .then((response) => {
        if (response.data.apps) {
          setTakenTimings(response.data.apps.filter((el) => el != ""));
        }
        setTakenDates(response.data.takenDates.filter((el) => el != ""));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chosenDoctor]);

  function createAppointment(e) {
    e.preventDefault();
    axios
      .post("http://localhost/PHP/enquiry/appointment.php", {
        data: [user_email, chosenDoctor, doctor, timing, date],
      })
      .then((response) => {
        if (response.data.message == "Appointment successfully Scheduled!") {
          history(`/patient-appointments-list/${key}`);
        } else {
          setWarningMessage(response.data.message);
          setWarning(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      {console.log(takenTimings, takenDate)}
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
        links={[`/patient-appointment-booking/${key}`, `/profile/${key}`]}
      ></NavBarDefault>
      <div className="patient-appointment-booking-main-content">
        <div className="title-patient-app-booking">Book a GP Appointment</div>
        <br />
        <br />
        <form
          method="POST"
          onSubmit={(e) => createAppointment(e)}
          className="availabilities-patient-apps"
        >
          <div className="available-title-patient-app">
            <h1>Availabilities</h1>
          </div>
          <div className="doctors-date-time">
            <div className="doctors-app">
              <label htmlFor="doctor_names_app">Doctor</label>
              <select
                onChange={(e) => setChosenDoctor(e.target.value)}
                name="doctor_names_app"
              >
                <option>Choose a Doctor</option>
                {doctor.map((el, index) => {
                  return <option key={index}>{el.doctor_name}</option>;
                })}
              </select>
            </div>
            <div className="date-app">
              <label htmlFor="date-field">Date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="date-field"
                name="date-field"
                min="2023-05-08"
              ></input>
            </div>
            <div className="time-app">
              <label htmlFor="time-choose-app">Time</label>
              <select
                name="time-choose-app"
                onChange={(e) => setTiming(e.target.value)}
                className="time-app"
              >
                <option value="">Select Hour</option>
                {takenTimings
                  ? timing_options.map((el, index) => {
                      if (takenTimings.includes(el)) {
                        let index_timing = takenTimings.indexOf(el);
                        if (takenDate[index_timing] == date) {
                          return;
                        }
                      }
                      return (
                        <option key={index} value={el}>
                          {el}
                        </option>
                      );
                    })
                  : timing_options.map((el, index) => (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    ))}
              </select>
            </div>
          </div>
          <div className="registration-appointment">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
      <div className="propa-booking">
        <section>
          <span>Book an appointment now !</span> <br /> <br />
          <span>
            Note that some hours may not be visible due to the doctor's
            availability.
          </span>
          <br />
          <br />
          <Link to={`/profile/${key}`}>
            <Button>Back to Profile</Button>
          </Link>
        </section>
      </div>
      {Warning && (
        <ErrorMessage onClick={handleWarning} message={warningMessage} />
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default PatientAppointmentBooking;
