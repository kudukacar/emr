import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { TOKEN, EXPIRATION } from '../constants';

const LoggedInNavbar = ({ history }) => {
  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(EXPIRATION);
    history.push("/");
  }
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
        <NavLink className="navbar-brand" to="/dashboard">
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
              <NavLink className="nav-link" to="/dashboard">
                Dashboard <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <span style={{cursor: "pointer"}} className="nav-link" onClick={handleClick}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(LoggedInNavbar);