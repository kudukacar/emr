import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import MainNavbar from './main_navbar';

class HandleLogout {
  constructor() {
    this.loggedOut = false;
  }

  logout = () => {
    this.loggedOut = true;
  }
}

test('clicking on logout logs out the user and redirects to login', () => {
  const history = createMemoryHistory();
  const handlelogout = new HandleLogout();
  const { getByText } = render(
    <Router history={history}>
      <MainNavbar handleLogout={handlelogout.logout} authPage={"Logout"}/>
    </Router>
  );
  fireEvent.click(getByText("Logout"));
  expect(handlelogout.loggedOut).toBe(true);
  expect(history.location.pathname).toBe("/login");
})

test("clicking on login redirects to login", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <MainNavbar authPage={"Login"} />
    </Router>
  );
  fireEvent.click(getByText("Login"));
  expect(history.location.pathname).toBe("/login");
});

test("clicking on about redirects to the home page", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <MainNavbar mainPage={"About"} />
    </Router>
  );
  fireEvent.click(getByText("About"));
  expect(history.location.pathname).toBe("/");
});

test("clicking on dashboard redirects to the dashboard", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <MainNavbar mainPage={"Dashboard"} />
    </Router>
  );
  fireEvent.click(getByText("Dashboard"));
  expect(history.location.pathname).toBe("/dashboard");
});

test("clicking on smartEMR redirects to the main page", () => {
  const history = createMemoryHistory();
  const { getByText, rerender } = render(
    <Router history={history}>
      <MainNavbar mainPage={"About"} />
    </Router>
  );
  fireEvent.click(getByText("SmartEMR"));
  expect(history.location.pathname).toBe("/");
  rerender(
    <Router history={history}>
      <MainNavbar mainPage={"Dashboard"} />
    </Router>
  );
  fireEvent.click(getByText("SmartEMR"));
  expect(history.location.pathname).toBe("/dashboard");
});