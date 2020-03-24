import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/form">Add User Form</Link>
    </>
  );
};

export default NavBar;
