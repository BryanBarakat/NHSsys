import React from "react";
import Warning from "../../assets/warning.png";
import CloseTab from "../../assets/close.png";
import "./ErrorMessage.css";

export const ErrorMessage = ({ message, onClick }) => {
  return (
    <div className="error-msg-container">
      <h1>
        <img src={Warning}></img>
        &nbsp;&nbsp;&nbsp;{message}
      </h1>
      <div className="close-tab">
        <img onClick={onClick} src={CloseTab}></img>
      </div>
    </div>
  );
};

export default ErrorMessage;
