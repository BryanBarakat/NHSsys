import React, { useState, useEffect } from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import SearchLogo from "../../assets/searchImg.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorPatientMedRecMain.css";

export const DoctorPatientMedRecMain = () => {
  const key = localStorage.getItem("id_user");
  const current_user = localStorage.getItem("user_type");
  const [apps, setApps] = useState([]);
  let history = useNavigate();

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

  const navigateToUser = () => {
    history(`/doctor-patient-medical-records/${key}`);
  };

  return (
    <div className="doctorsmain-apps-container">
      <NavBarDefault
        children={["Appointments", "Medical Records", "My Profile"]}
        links={[
          `/doctor-appointments-list/${key}`,
          `/doctor-patient-medical-records-main/${key}`,
          `/profile/${key}`,
        ]}
      ></NavBarDefault>
      <div className="doctorsmain-apps-main-content">
        <h1>Appointments</h1>
        <Input
          type="search"
          id="input-search-doctorsmain-apps"
          width="100px"
        ></Input>
        <span>
          <img src={SearchLogo}></img>
        </span>
      </div>
      <TableDefault
        objects={["Patient", "Postcode or NHS number", " "]}
        listOfObjects={
          apps != []
            ? apps.map((el, index) => ({
                patient: `${el.patient_first_name} ${el.patient_last_name}`,
                postcode: `${el.postcode}`,
                NHSnumber: `${el.nhs_number}`,
                cancel: (
                  <React.Fragment>
                    <Button
                      onClick={() => {
                        localStorage.setItem(
                          "chosen_patient_records",
                          el.patient_email
                        );
                        navigateToUser();
                      }}
                      type="button"
                      key={index}
                    >
                      Select
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

export default DoctorPatientMedRecMain;
