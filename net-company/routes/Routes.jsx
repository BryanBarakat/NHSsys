import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../src/Components/SignIn/SignIn";
import Register from "../src/Components/Register/Register";
import Landing from "../src/Components/Landing/Landing";
import PrivacySecurity from "../src/Components/Privacy&Security/PrivacySecurity";
import DoctorPatientMedRec from "../src/Components/DoctorPatientMedRec/DoctorPatientMedRec";

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/privacy" element={<PrivacySecurity />}></Route>
      <Route
        path="/doctor-patient-medical-records"
        element={<DoctorPatientMedRec />}
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default routes;
