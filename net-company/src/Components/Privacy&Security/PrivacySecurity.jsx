import React, { useState, useEffect } from "react";
import { NavBarDefault } from "../NavBarDefault/NavBarDefault";
import Input from "@govuk-react/input";
import Button from "@govuk-react/button";
import FooterDefault from "../FooterDefault/FooterDefault";
import { Link } from "react-router-dom";
import Label from "@govuk-react/label";
import BackLink from "@govuk-react/back-link";
import axios from "axios";
import "./PrivacySecurity.css";

export const PrivacySecurity = () => {
  const [userId, setUserId] = useState(0);
  const [items, setItems] = useState({
    postcode_label_priv: "",
    NHS_label_priv: "",
    email_priv_label: "",
    pass_priv_label: "",
  });

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost/PHP/enquiry/profile.php/}`)
      .then((response) => {
        console.log(response);
        setUserId(response.data.patient_id);
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    //   .post(`http://localhost/PHP/enquiry/profile.php?patient_id=${userId}`)
    //   .then((response) => {
    //     console.log(response);
    //     setUserId(response.data.patient_id);
    //     setItems({
    //       postcode_label_priv: response.data.patient_postcode,
    //       NHS_label_priv: response.data.patient_nhs_number,
    //       email_priv_label: response.data.patient_email,
    //       pass_priv_label: response.data.patient_password,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <div className="privacy-container">
      <NavBarDefault
        children={["Book an Appointment", "My Profile"]}
      ></NavBarDefault>
      <Link to={`/profile/${userId}`} className="back-link-privacy">
        <BackLink color="#303030" id="back-link-privacy"></BackLink>
      </Link>
      <form method="POST" className="main-content-privacy">
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
            <p>Or</p>
            <div className="NHS-numb-privacys">
              <Label htmlFor="NHS-label">NHS Number</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={items.NHS_label_priv}
                id="NHS-label"
                name="NHS_label_priv"
              ></Input>
            </div>
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
            ></Input>
          </div>
          <div className="submit-privacy">
            <Button type="submit">Submit Changes</Button>
            <Button type="submit">Delete Registration</Button>
          </div>
        </div>
      </form>
      <FooterDefault></FooterDefault>
    </div>
  );
};

export default PrivacySecurity;
