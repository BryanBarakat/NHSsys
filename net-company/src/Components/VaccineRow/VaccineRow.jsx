import React, { useState } from "react";
import Button from "@govuk-react/button";
import { Input } from "govuk-react";
import CloseTab from "../../assets/close.png";
import axios from "axios";
import "./VaccineRow.css";

export const VaccineRow = ({ onClick }) => {
  const [Warning, setWarning] = useState(false);
  const [warningMesssage, setWarningMessage] = useState("");
  const [vaccine, setVaccine] = useState({
    doseNo: "",
    vaccinationDate: "",
    vaccineManufacturer: "",
    diseaseTargeted: "",
    vaccineType: "",
    product: "",
    vaccineBatchNumber: "",
    countryOfVaccination: "",
    authority: "",
    site: "",
    totalSeriesOfDoses: "",
    displayName: "",
    snomedCode: "",
    dateEntered: "",
    procedureCode: "",
    booster: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost/PHP/enquiry/addMedRec.php", {
        data: [chosen_record_email, vaccine],
      })
      .then((response) => {
        setWarningMessage(response.data.message);
        setWarning(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="vaccine-row-container">
      <form onSubmit={(e) => handleSubmit(e)} method="POST">
        <div className="row">
          <label htmlFor="doseNo">Dose Number:</label>
          <Input
            type="text"
            id="doseNo"
            name="doseNo"
            onChange={(e) => setVaccine({ ...vaccine, doseNo: e.target.value })}
          />
          <label htmlFor="vaccinationDate">&nbsp;&nbsp;&nbsp;Vacc. Date:</label>
          <Input
            type="text"
            id="vaccinationDate"
            name="vaccinationDate"
            onChange={(e) =>
              setVaccine({ ...vaccine, vaccinationDate: e.target.value })
            }
          />
        </div>
        <div className="row">
          <label htmlFor="vaccineManufacturer">Vacc. Manufacturer:</label>
          <Input
            type="text"
            id="vaccineManufacturer"
            name="vaccineManufacturer"
            onChange={(e) =>
              setVaccine({ ...vaccine, vaccineManufacturer: e.target.value })
            }
          />
          <label htmlFor="diseaseTargeted">
            &nbsp;&nbsp;&nbsp;Disease Targeted:
          </label>
          <Input
            type="text"
            id="diseaseTargeted"
            name="diseaseTargeted"
            onChange={(e) =>
              setVaccine({ ...vaccine, diseaseTargeted: e.target.value })
            }
          />
        </div>
        <div className="row">
          <label htmlFor="vaccineType">Vaccine Type:</label>
          <Input
            type="text"
            id="vaccineType"
            name="vaccineType"
            onChange={(e) =>
              setVaccine({ ...vaccine, vaccineType: e.target.value })
            }
          />
          <label htmlFor="product">&nbsp;&nbsp;&nbsp;Product:</label>
          <Input
            type="text"
            id="product"
            name="product"
            onChange={(e) =>
              setVaccine({ ...vaccine, product: e.target.value })
            }
          />
        </div>
        <div className="row">
          <label htmlFor="vaccineBatchNumber">Vaccine Batch Number:</label>
          <Input
            type="text"
            id="vaccineBatchNumber"
            name="vaccineBatchNumber"
            onChange={(e) =>
              setVaccine({ ...vaccine, vaccineBatchNumber: e.target.value })
            }
          />
          <label htmlFor="countryOfVaccination">
            &nbsp;&nbsp;&nbsp;Country of Vaccination:
          </label>
          <Input
            type="text"
            id="countryOfVaccination"
            name="countryOfVaccination"
            onChange={(e) =>
              setVaccine({ ...vaccine, countryOfVaccination: e.target.value })
            }
          />
        </div>
        <div className="row">
          <label htmlFor="authority">Authority:</label>
          <Input
            type="text"
            id="authority"
            name="authority"
            onChange={(e) =>
              setVaccine({ ...vaccine, authority: e.target.value })
            }
          />
          <label htmlFor="site">&nbsp;&nbsp;&nbsp;Site:</label>
          <Input
            type="text"
            id="site"
            name="site"
            onChange={(e) => setVaccine({ ...vaccine, site: e.target.value })}
          />
        </div>
        <div className="row">
          <label htmlFor="totalSeriesOfDoses">Total Series of Doses:</label>
          <Input
            type="text"
            id="totalSeriesOfDoses"
            name="totalSeriesOfDoses"
            onChange={(e) =>
              setVaccine({ ...vaccine, totalSeriesOfDoses: e.target.value })
            }
          />
          <label htmlFor="displayName">&nbsp;&nbsp;&nbsp;Display Name:</label>
          <Input
            type="text"
            id="displayName"
            name="displayName"
            onChange={(e) =>
              setVaccine({ ...vaccine, displayName: e.target.value })
            }
          />
        </div>

        <div className="row">
          <label htmlFor="snomedCode">Snomed Code:</label>
          <Input
            type="text"
            id="snomedCode"
            name="snomedCode"
            onChange={(e) =>
              setVaccine({ ...vaccine, snomedCode: e.target.value })
            }
          />
          <label htmlFor="dateEntered">&nbsp;&nbsp;&nbsp;Date Entered:</label>
          <Input type="text" id="dateEntered" name="dateEntered" />
        </div>

        <div className="row">
          <label htmlFor="procedureCode">Procedure Code:</label>
          <Input
            type="text"
            id="procedureCode"
            name="procedureCode"
            onChange={(e) =>
              setVaccine({ ...vaccine, procedureCode: e.target.value })
            }
          />
          <label htmlFor="booster">&nbsp;&nbsp;&nbsp;Booster:</label>
          <Input
            type="text"
            id="booster"
            name="booster"
            onChange={(e) =>
              setVaccine({ ...vaccine, booster: e.target.value })
            }
          />
        </div>
        <Button className="submit-vacc" type="submit">
          Add Vaccine
        </Button>
      </form>
      <div className="close-tab-vacc">
        <img onClick={onClick} src={CloseTab}></img>
      </div>
    </div>
  );
};

export default VaccineRow;
