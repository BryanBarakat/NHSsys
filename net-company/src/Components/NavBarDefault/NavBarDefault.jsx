import React from "react";
import TopNav from "@govuk-react/top-nav";
import { Link } from "react-router-dom";
import "./NavBarDefault.css";

export const NavBarDefault = ({ children }) => {
  return (
    <div>
      <TopNav id="nav-bar-default-container">
        {children.map((el, index) => {
          return (
            <Link key={index} to="">
              {el}
            </Link>
          );
        })}
      </TopNav>
    </div>
  );
};

export default NavBarDefault;
