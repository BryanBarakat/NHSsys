import React, { useState, useEffect } from "react";
import "./MedicalRecords.css";

export const MedicalRecords = () => {
  const [array_of_vaccinations, setArrayOfVaccinations] = useState([]);

  // Load the array of vaccinations from localStorage on mount
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("med-rec-history"));
    if (storedArray) {
      setArrayOfVaccinations(storedArray);
    }
  }, []);

  // Update the vaccination object in the array when a td is edited
  const handleTdBlur = (event, index, key) => {
    const newValue = event.target.textContent;
    setArrayOfVaccinations((prevArray) => {
      const newArray = [...prevArray];
      newArray[index][key] = newValue;
      return newArray;
    });
    localStorage.setItem(
      "med-rec-history",
      JSON.stringify(array_of_vaccinations)
    );
  };

  return (
    <div className="medical-recs-container">
      <div className="health-conditions-med-recs">
        <table>
          <thead>
            <tr>
              <th>Dose Number</th>
              <th>Vaccination Date</th>
              <th>Vaccine Manufacturer</th>
              <th>Disease Targeted</th>
              <th>Vaccine Type</th>
              <th>Product</th>
              <th>Vaccine Batch Number</th>
              <th>Country of Vaccination</th>
              <th>Authority</th>
              <th>Site</th>
              <th>Total Series of Doses</th>
              <th>Display Name</th>
              <th>Snomed Code</th>
              <th>Date Entered</th>
              <th>Procedure Code</th>
              <th>Booster</th>
            </tr>
          </thead>
          <tbody>
            {array_of_vaccinations
              ? array_of_vaccinations.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>{el.DoseNo}</td>
                      <td
                        id="editableDiv1"
                        onBlur={(e) =>
                          handleTdBlur(e, index, "vaccinationDate")
                        }
                      >
                        {el.vaccinationDate}
                      </td>
                      <td
                        id="editableDiv2"
                        onBlur={(e) =>
                          handleTdBlur(e, index, "vaccineManufacturer")
                        }
                      >
                        {el.vaccineManufacturer}
                      </td>
                      <td
                        id="editableDiv3"
                        onBlur={(e) =>
                          handleTdBlur(e, index, "diseaseTargeted")
                        }
                      >
                        {el.diseaseTargeted}
                      </td>
                      <td
                        id="editableDiv4"
                        onBlur={(e) => handleTdBlur(e, index, "vaccineType")}
                      >
                        {el.vaccineType}
                      </td>
                      <td
                        id="editableDiv5"
                        onBlur={(e) => handleTdBlur(e, index, "product")}
                      >
                        {el.product}
                      </td>
                      <td
                        id="editableDiv6"
                        onBlur={(e) =>
                          handleTdBlur(e, index, "vaccineBatchNumber")
                        }
                      >
                        {el.vaccineBatchNumber}
                      </td>
                      <td
                        id="editableDiv7"
                        onBlur={(e) =>
                          handleTdBlur(e, index, "countryOfVaccination")
                        }
                      >
                        {el.countryOfVaccination}
                      </td>
                      <td
                        id="editableDiv8"
                        onBlur={(e) => handleTdBlur(e, index, "authority")}
                      >
                        {el.authority}
                      </td>
                      <td
                        id="editableDiv9"
                        onBlur={(e) => handleTdBlur(e, index, "site")}
                      >
                        {el.site}
                      </td>
                      <td
                        id="editableDiv10"
                        onBlur={(e) =>
                          handleTdBlur(e, index, "totalSeriesOfDoses")
                        }
                      >
                        {el.totalSeriesOfDoses}
                      </td>
                      <td
                        id="editableDiv11"
                        onBlur={(e) => handleTdBlur(e, index, "displayName")}
                      >
                        {el.displayName}
                      </td>
                      <td
                        id="editableDiv12"
                        onBlur={(e) => handleTdBlur(e, index, "snomedCode")}
                      >
                        {el.snomedCode}
                      </td>
                      <td
                        id="editableDiv13"
                        onBlur={(e) => handleTdBlur(e, index, "dateEntered")}
                      >
                        {el.dateEntered}
                      </td>
                      <td
                        id="editableDiv14"
                        onBlur={(e) => handleTdBlur(e, index, "procedureCode")}
                      >
                        {el.procedureCode}
                      </td>
                      <td
                        id="editableDiv15"
                        onBlur={(e) => handleTdBlur(e, index, "booster")}
                      >
                        {el.booster}
                      </td>
                    </tr>
                  );
                })
              : []}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRecords;
