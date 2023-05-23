import React, { useState } from "react";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import Input from "@govuk-react/input";
import Button from "@govuk-react/button";
import FooterDefault from "../FooterDefault/FooterDefault";
import { Link, useNavigate } from "react-router-dom";
import Label from "@govuk-react/label";
import BackLink from "@govuk-react/back-link";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./PrivacySecurity.css";

export const PrivacySecurity = () => {
  const current_user = localStorage.getItem("user_type");
  const user_email = localStorage.getItem("user_email");
  const user_nhs_number = localStorage.getItem("user_nhs_number");
  const user_postcode = localStorage.getItem("user_postcode");
  const user_password = localStorage.getItem("user_password");
  const k = localStorage.getItem("id_user");

  let history = useNavigate();
  const [currButton, setCurrButton] = useState("");

  const [Warning, setWarning] = useState(false);

  let oldItems = {
    postcode_label_priv: user_postcode,
    NHS_label_priv: user_nhs_number,
    email_priv_label: user_email,
    pass_priv_label: user_password,
  };

  const [items, setItems] = useState({
    postcode_label_priv: user_postcode,
    NHS_label_priv: user_nhs_number,
    email_priv_label: user_email,
    pass_priv_label: user_password,
  });

  const [warningMessage, setWarningMessage] = useState(
    "Please fill in the required fields"
  );

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleWarning = () => {
    setWarning(false);
  };

  function putUser(e) {
    e.preventDefault();
    const data = {
      postcode_label_priv: items.postcode_label_priv,
      NHS_label_priv: items.NHS_label_priv,
      email_priv_label: items.email_priv_label,
      pass_priv_label: items.pass_priv_label,
    };

    axios
      .put("http://localhost/PHP/enquiry/test.php", [
        oldItems,
        data,
        k,
        current_user,
      ])
      .then((response) => {
        if (response.data.message == "Changes successfully made!") {
          localStorage.setItem("user_email", response.data.patient_email);
          localStorage.setItem(
            "user_nhs_number",
            response.data.patient_nhs_number
          );
          localStorage.setItem("user_postcode", response.data.patient_postcode);
          localStorage.setItem("user_password", response.data.patient_password);
          console.log(response);
        } else {
          console.log(response);
        }
        setWarning(true);
        setWarningMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser(e) {
    e.preventDefault();
    axios
      .delete("http://localhost/PHP/enquiry/test.php", {
        data: [items, currButton, k, current_user, user_nhs_number],
      })
      .then((response) => {
        console.log(response);
        if (response.data.message == "Changes successfully made!") {
          history("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="privacy-container">
      {current_user == "patient" && (
        <NavBarDefault
          children={["Book an Appointment", "My Profile"]}
          links={[`/patient-appointment-booking/${k}`, `/profile/${k}`]}
        ></NavBarDefault>
      )}
      {current_user == "doctor" && (
        <NavBarDefault
          children={["Appointments", "Medical Records", "My Profile"]}
          links={[
            `/doctor-appointments-list/${k}`,
            `/doctor-patient-medical-records-main/${k}`,
            `/profile/${k}`,
          ]}
        ></NavBarDefault>
      )}
      {current_user == "admin" && (
        <NavBarDefault
          children={["Appointments", "My Profile"]}
          links={[`/admin-appointments-list/${k}`, `/profile/${k}`]}
        ></NavBarDefault>
      )}
      <Link to={`/profile/${k}`} className="back-link-privacy">
        <BackLink color="#303030" id="back-link-privacy"></BackLink>
      </Link>
      <form
        onSubmit={(e) => {
          currButton == "submit_changes" ? putUser(e) : deleteUser(e);
        }}
        method="PUT"
        className="main-content-privacy"
      >
        <div className="privacy-input-container">
          <div className="postcode-number-privacy">
            <div className="postcode-privacys">
              <Label htmlFor="postcode-label">Postcode</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={items.postcode_label_priv}
                id="postcode-label"
                name="postcode_label_priv"
              ></Input>
            </div>
            {current_user == "patient" && (
              <div className="NHS-numb-privacys">
                <Label htmlFor="NHS-label">NHS Number</Label>
                <Input
                  onChange={(e) => handleChange(e)}
                  value={items.NHS_label_priv}
                  id="NHS-label"
                  name="NHS_label_priv"
                ></Input>
              </div>
            )}
          </div>
          <div className="email-privacy">
            <Label htmlFor="email-reg-label">Email Address</Label>
            <Input
              onChange={(e) => handleChange(e)}
              value={items.email_priv_label}
              id="email-reg-label"
              name="email_priv_label"
            ></Input>
          </div>
          <div className="password-privacy">
            <Label htmlFor="pass-reg-label">Password</Label>
            <Input
              onChange={(e) => handleChange(e)}
              value={items.pass_priv_label}
              id="pass-reg-label"
              name="pass_priv_label"
              type="password"
            ></Input>
          </div>
          <div className="submit-privacy">
            <Button
              onClick={() => setCurrButton("submit_changes")}
              name="submit_changes"
              type="submit"
            >
              Submit Changes
            </Button>
            <Button
              onClick={() => setCurrButton("delete_account")}
              name="delete_account"
              type="submit"
            >
              Delete Registration
            </Button>
          </div>
        </div>
      </form>
      {Warning && (
        <ErrorMessage onClick={handleWarning} message={warningMessage} />
      )}
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default PrivacySecurity;
