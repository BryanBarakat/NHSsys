//Produced by Bryan Naoum Barakat student w18484023

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../src/Components/SignIn/SignIn";
import Register from "../src/Components/Register/Register";
import Landing from "../src/Components/Landing/Landing";
import PrivacySecurity from "../src/Components/Privacy&Security/PrivacySecurity";
import DoctorPatientMedRec from "../src/Components/DoctorPatientMedRec/DoctorPatientMedRec";
import { UserProfile } from "../src/Components/UserProfile/UserProfile";
import PatientMedRec from "../src/Components/PatientMedRec/PatientMedRec";
import { PatientAppointmentBooking } from "../src/Components/PatientAppointmentBooking/PatientAppointmentBooking";
import DoctorAppointments from "../src/Components/DoctorAppointments/DoctorAppointments";
import PatientAppointments from "../src/Components/PatientAppointments/PatientAppointments";
import AdminAppointments from "../src/Components/AdminAppointments/AdminAppointments";
import DoctorPatientMedRecMain from "../src/Components/DoctorPatientMedRecMain/DoctorPatientMedRecMain";

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/privacy/:id" element={<PrivacySecurity />}></Route>
      <Route path="/profile/:id" element={<UserProfile />}></Route>
      <Route
        path="/doctor-appointments-list/:id"
        element={<DoctorAppointments />}
      ></Route>
      <Route
        path="/patient-appointments-list/:id"
        element={<PatientAppointments />}
      ></Route>
      <Route
        path="/admin-appointments-list/:id"
        element={<AdminAppointments />}
      ></Route>
      <Route
        path="/patient-appointment-booking/:id"
        element={<PatientAppointmentBooking />}
      ></Route>
      <Route
        path="/doctor-patient-medical-records-main/:id"
        element={<DoctorPatientMedRecMain />}
      ></Route>
      <Route
        path="/doctor-patient-medical-records/:id"
        element={<DoctorPatientMedRec />}
      ></Route>
      <Route
        path="/patient-medical-records/:id"
        element={<PatientMedRec />}
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default routes;
