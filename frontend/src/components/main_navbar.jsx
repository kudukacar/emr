import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const MainNavbar = ({ mainPage, authPage, handleLogout }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const closeNavbar = () => {
    if (collapsed !== true) {
      toggleNavbar();
    }
  };

  return (
    <Container>
      <Navbar className="navigation__navbar" light expand="md">
        <NavbarBrand style={{ color: "#429fdd", fontWeight: "bold" }} href={mainPage === "About" ? "/" : "/dashboard"}>
          <img
            src={logo}
            alt="physical therapy EMR"
            style={{ maxWidth: 40, maxHeight: 50, marginRight: "2%" }}
          />
          Smart EMR
        </NavbarBrand>
        <Container>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  onClick={closeNavbar}
                  to={mainPage === "About" ? "/" : "/dashboard"}
                  activeClassName="active"
                  exact
                  style={{ color: "#429fdd" }}
                  tag={RRNavLink}
                >
                  {mainPage}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    closeNavbar();
                    if(authPage === "Logout") {
                      handleLogout();
                    }
                  }}
                  to={authPage === "Login" ? "/login" : "/dashboard"}
                  activeClassName="active"
                  style={{ color: "#429fdd" }}
                  tag={RRNavLink}
                >
                  {authPage}
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Container>
  );

}

export default withRouter(MainNavbar);