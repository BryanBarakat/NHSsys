import React from "react";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import DateField from "@govuk-react/date-field";
import Select from "@govuk-react/select";
import Button from "@govuk-react/button";
import "./PatientAppointmentBooking.css";

export const PatientAppointmentBooking = () => {
  return (
    <div>
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
      ></NavBarDefault>
      <div className="patient-appointment-booking-main-content">
        <div className="title-patient-app-booking">Book a GP Appointment</div>
        <br />
        <br />
        <form className="availabilities-patient-apps">
          <div className="available-title-patient-app">
            <h1>Availabilities</h1>
          </div>
          <div className="doctors-date-time">
            <div className="doctors-app">
              <label htmlFor="">Doctor</label>
              <Select id="" name=""></Select>
            </div>
            <div className="date-app">
              <DateField id="date-field" name=""></DateField>
            </div>
            <div className="time-app">
              <label htmlFor="">Time</label>
              <Input type="time" id="" name=""></Input>
            </div>
          </div>
          <div className="registration-appointment">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default PatientAppointmentBooking;
