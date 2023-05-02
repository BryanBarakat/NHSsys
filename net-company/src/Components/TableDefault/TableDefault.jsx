import React from "react";
import "./TableDefault.css";

export const TableDefault = ({ objects, listOfObjects }) => {
  return (
    <div className="table-default-container">
      <table>
        <tr>
          {objects.map((el, key) => {
            return <th key={key}>{el}</th>;
          })}
        </tr>
        {listOfObjects.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.patient}</td>
              {val.doctor && <td>{val.doctor}</td>}
              {val.DateandTime && <td>{val.DateandTime}</td>}
              {val.postcode && !val.NHSnumber && <td>{val.postcode}</td>}
              {val.NHSnumber && !val.postcode && <td>{val.NHSnumber}</td>}
              <td>{val.cancel}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableDefault;
