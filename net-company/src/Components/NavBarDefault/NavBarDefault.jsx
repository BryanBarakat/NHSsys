import React from "react";
import TopNav from "@govuk-react/top-nav";
import { Link } from "react-router-dom";
import "./NavBarDefault.css";

export const NavBarDefault = ({ children, links }) => {
  return (
    <div>
      {links && (
        <TopNav id="nav-bar-default-container">
          {children.map((el, index) => {
            const link_ = links[index];
            return (
              <Link key={index} to={link_}>
                {el}
              </Link>
            );
          })}
        </TopNav>
      )}
      {!links && (
        <TopNav id="nav-bar-default-container">
          {children.map((el, index) => {
            return (
              <Link key={index} to="">
                {el}
              </Link>
            );
          })}
        </TopNav>
      )}
    </div>
  );
};

export default NavBarDefault;
