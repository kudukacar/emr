import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { ProtectedRoute } from "./protected_route";

class AuthenticatorWithIsLoginValid {
  constructor(logInValid) {
    this.logInValid = logInValid;
  }
  isLoginValid() {
    return this.logInValid;
  }

  logout() {
    
  }
}

const TestLogin = () => {
  return <div>Login</div>;
};

const TestDashboard = () => {
  return <div>Dashboard</div>;
};

test("when login is valid returns the component", () => {
  const authenticator = new AuthenticatorWithIsLoginValid(true);
  const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
  const { getByText } = render(
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={TestLogin} />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={TestDashboard}
          authenticator={authenticator}
        />
      </Switch>
    </Router>
  );
  expect(getByText(/Dashboard/i)).toBeInTheDocument();
});

test("when login is not valid redirects to login", () => {
  const authenticator = new AuthenticatorWithIsLoginValid(false);
  const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
  const { getByText } = render(
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={TestLogin} />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={TestDashboard}
          authenticator={authenticator}
        />
      </Switch>
    </Router>
  );
  expect(getByText(/Login/i)).toBeInTheDocument();
});