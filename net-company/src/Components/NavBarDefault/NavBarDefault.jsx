//Produced by Bryan Naoum Barakat student w18484023

//import images and dependencies
import React from "react";
import TopNav from "@govuk-react/top-nav";
import { Link } from "react-router-dom";
import "./NavBarDefault.css";

//map through all props values to render navigation bar options
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
