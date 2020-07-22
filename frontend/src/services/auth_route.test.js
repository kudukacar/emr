import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { AuthRoute } from './auth_route';

class AuthenticatorWithIsLoggedIn {
  constructor(loggedIn) {
    this.loggedIn = loggedIn
  }
  isLoggedIn() {
    return this.loggedIn;
  }
}

const TestLogin = () => {
  return <div>Login</div>
}

const TestDashboard = () => {
  return <div>Dashboard</div>
}

test('when not logged in returns the component', () => {
  const authenticator = new AuthenticatorWithIsLoggedIn(false);
  const history = createMemoryHistory({initialEntries: ["/login"]});
  const { getByText } = render(
    <Router history={history}>
      <Switch>
        <AuthRoute
          exact
          path="/login"
          component={TestLogin}
          authenticator={authenticator}
        />
        <Route exact path="/dashboard" component={TestDashboard} />
      </Switch>
    </Router>
  );
  expect(getByText(/Login/i)).toBeInTheDocument();
});

test("when logged in returns the dashboard", () => {
  const authenticator = new AuthenticatorWithIsLoggedIn(true);
  const history = createMemoryHistory({ initialEntries: ["/login"] });
  const { getByText } = render(
    <Router history={history}>
      <Switch>
        <AuthRoute
          exact
          path="/login"
          component={TestLogin}
          authenticator={authenticator}
        />
        <Route exact path="/dashboard" component={TestDashboard} />
      </Switch>
    </Router>
  );
  expect(getByText(/Dashboard/i)).toBeInTheDocument();
});