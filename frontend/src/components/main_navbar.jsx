import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const MainNavbar = ({ authElement }) => {
  return (
    <div>
      <nav
        className={"navbar navbar-expand-lg navbar-light"}
        style={{
          backgroundColor: "#87CEEB",
          paddingRight: "100px",
          paddingLeft: "100px",
        }}
      >
        <NavLink className="navbar-brand" to="/">
          SmartEMR
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                About <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              {authElement}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );

}

export default withRouter(MainNavbar);