import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import "./main_navbar.css";

const MainNavbar = ({ mainPage, authPage, handleLogout, location }) => {
  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      expand="lg"
      style={{ paddingLeft: "40px", paddingRight: "40px" }}
    >
      <Navbar.Brand
        style={{ color: "#429fdd", fontWeight: "bold" }}
        to={mainPage === "About" ? "/" : "/dashboard"}
        as={NavLink}
      >
        <img
          src={logo}
          alt="physical therapy EMR"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        SmartEMR
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <span className="navbarlink">
            <Nav.Link
              to={mainPage === "About" ? "/" : "/dashboard"}
              style={{ color: "#429fdd" }}
              as={NavLink}
            >
              {mainPage}
            </Nav.Link>
          </span>
          <span className="navbarlink">
            <Nav.Link
              onClick={handleLogout}
              to="/login"
              style={{ color: "#429fdd" }}
              as={NavLink}
            >
              {authPage}
            </Nav.Link>
          </span>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

}

export default withRouter(MainNavbar);