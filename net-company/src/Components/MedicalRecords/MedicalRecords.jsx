import React from "react";
import Input from "@govuk-react/input";
import "./MedicalRecords.css";

export const MedicalRecords = () => {
  return (
    <div className="medical-recs-container">
      <div className="input-med-recs">
        <div className="full-name-med-recs">
          <label htmlFor="full-name-med-recs">Full Name</label>
          <Input id="full-name-med-recs" name="full-name-med-recs"></Input>
        </div>
        <div className="DOB-med-recs">
          <label htmlFor="DOB-med-recs">DOB</label>
          <Input id="DOB-med-recs" name="DOB-med-recs"></Input>
        </div>
        <div className="Postcode-NHSnumber-recs">
          <label htmlFor="Postcode-NHSnumber-recs">
            Postcode <span>or</span> NHS number
          </label>
          <Input
            id="Postcode-NHSnumber-recs"
            name="Postcode-NHSnumber-recs"
          ></Input>
        </div>
      </div>
      <div className="health-conditions-med-recs">
        <h3>
          Health conditions and Allergies <br /> <br />
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            sit asperiores autem fugit qui, eos incidunt debitis vel in. Dolore,
            perferendis explicabo voluptatem voluptates sint labore optio eum
            minima. Corrupti.
          </span>
        </h3>
      </div>
    </div>
  );
};

export default MedicalRecords;
