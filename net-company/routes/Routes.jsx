import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../src/Components/SignIn/SignIn";
import Register from "../src/Components/Register/Register";
import Landing from "../src/Components/Landing/Landing";
import PrivacySecurity from "../src/Components/Privacy&Security/PrivacySecurity";
import DoctorPatientMedRec from "../src/Components/DoctorPatientMedRec/DoctorPatientMedRec";
import { UserProfile } from "../src/Components/UserProfile/UserProfile";
import PatientMedRec from "../src/Components/PatientMedRec/PatientMedRec";
import { PatientAppointmentBooking } from "../src/Components/PatientAppointmentBooking/PatientAppointmentBooking";

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/privacy" element={<PrivacySecurity />}></Route>
      <Route path="/profile" element={<UserProfile />}></Route>
      <Route
        path="/patient-appointment-booking"
        element={<PatientAppointmentBooking />}
      ></Route>
      <Route
        path="/doctor-patient-medical-records"
        element={<DoctorPatientMedRec />}
      ></Route>
      <Route
        path="/patient-medical-records"
        element={<PatientMedRec />}
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default routes;
