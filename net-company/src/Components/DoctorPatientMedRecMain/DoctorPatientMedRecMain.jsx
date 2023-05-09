import React, { useState, useEffect } from "react";
import { TableDefault } from "../TableDefault/TableDefault";
import Button from "@govuk-react/button";
import NavBarDefault from "../NavBarDefault/NavBarDefault";
import FooterDefault from "../FooterDefault/FooterDefault";
import Input from "@govuk-react/input";
import SearchLogo from "../../assets/searchImg.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorSummary from "@govuk-react/error-summary";
import "./DoctorPatientMedRecMain.css";

export const DoctorPatientMedRecMain = () => {
  const key = localStorage.getItem("id_user");
  const current_user = localStorage.getItem("user_type");
  const curr_email_user = localStorage.getItem("user_email");
  const [apps, setApps] = useState([]);
  const chosen_record_email = localStorage.getItem("chosen_patient_records");
  const [clickedItem, setClickedItem] = useState(false);
  let history = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/view_appointments.php", {
        data: [current_user, curr_email_user],
      })
      .then((response) => {
        if (response.data.appointments) {
          setApps(response.data.appointments);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost/PHP/enquiry/getMedRec.php", {
        data: [chosen_record_email],
      })
      .then((response) => {
        localStorage.setItem(
          "med-rec-history",
          JSON.stringify(response.data.array_of_vaccinations)
        );
        localStorage.setItem("chosen_person", response.data.chosen_person);
        // setChosenPerson(response.data.chosen_person);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clickedItem]);

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
      {apps.length > 0 ? (
        <TableDefault
          objects={["Patient", "Postcode or NHS number", " "]}
          listOfObjects={apps.map((el, index) => ({
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
                    setClickedItem(true);
                  }}
                  type="button"
                  key={index}
                >
                  Select
                </Button>
              </React.Fragment>
            ),
          }))}
        ></TableDefault>
      ) : (
        <ErrorSummary
          id="error-sum"
          heading="There are no Appointments scheduled"
          description="Wait for new customers to sign up."
        />
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default DoctorPatientMedRecMain;
