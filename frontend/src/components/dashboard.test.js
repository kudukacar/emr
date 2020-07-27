import React from 'react';
import { render, screen, fireEvent, waitForDomChange } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Dashboard, { GET_USER } from './dashboard';
import { Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

class AuthenticatorWithOnlyLogout {
  constructor() {
    this.loggedOut = false;
  }

  logout = () => {
    this.loggedOut = true;
  }
}

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        user: { id: "1", firstName: "Firstname", lastName: "Lastname" },
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      errors: ["There was an error"],
    },
  },
];

test('renders the loading state initially', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Dashboard />
      </Router>
    </MockedProvider>
  );
  expect(getByText("Loading...")).toBeInTheDocument();
});

test("renders the user's dashboard", async () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Dashboard />
      </Router>
    </MockedProvider>
  );
  await screen.findByText(/FirstName/i);
  expect(getByText("Logout")).toBeInTheDocument();
});

test("clicking logout logsout user", async () => {
  const history = createMemoryHistory();
  const authenticator = new AuthenticatorWithOnlyLogout();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Dashboard authenticator={authenticator} />
      </Router>
    </MockedProvider>
  );
  await screen.findByText(/FirstName/i);
  fireEvent.click(getByText("Logout"));
  expect(authenticator.loggedOut).toBe(true);
});

test("with an error logsout user and redirects to home page", async () => {
  const history = createMemoryHistory();
  const authenticator = new AuthenticatorWithOnlyLogout();
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <Router history={history}>
        <Dashboard authenticator={authenticator} />
      </Router>
    </MockedProvider>
  );
  await waitForDomChange(() => expect(authenticator.loggedOut).toBe(true));
  expect(history.location.pathname).toBe("/");
});