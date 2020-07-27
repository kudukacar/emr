import React from 'react';
import { Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  screen,
  wait
} from "@testing-library/react";
import Signup, { CREATEUSER } from './signup';

class AuthenticatorWithOnlyLogin {
  constructor() {
    this.loggedIn = false;
  }

  login = (token, expiration) => {
    this.loggedIn = true;
  };
}

const user = { firstName: "Firstname", id: 1, lastName: "Lastname" };
const payload = {
  email: "firstname@email.com",
  exp: 1595440540,
  origIat: 1595354140,
};
const mocks = [
  {
    request: {
      query: CREATEUSER,
      variables: { firstName: "", lastName: "", email: "", password: "" },
    },
    result: {
      data: {
        createUser: {
          payload,
          token: "token",
          user,
        },
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: CREATEUSER,
      variables: { firstName: "", lastName: "", email: "", password: "" },
    },
    error: new Error("Error: There was an error"),
  },
];

test("renders the signup form with firstname, lastname, email and password", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Signup />
      </Router>
    </MockedProvider>
  );
  expect(getByText("First name")).toBeInTheDocument();
  expect(getByText("Last name")).toBeInTheDocument();
});

test("click on login takes user to login page", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Signup />
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByText(/Login/i));
  expect(history.location.pathname).toBe("/login");
});

test("click on about takes user to home page", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Signup />
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByText(/About/i));
  expect(history.location.pathname).toBe("/");
});

test("click on submit with valid credentials signs up user and redirects to dashboard", async () => {
  const history = createMemoryHistory();
  const authenticator = new AuthenticatorWithOnlyLogin();
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Signup authenticator={authenticator} />
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByLabelText("submit"));
  await wait(() => expect(authenticator.loggedIn).toBe(true), {
    timeout: 1000,
  });
  expect(history.location.pathname).toBe("/dashboard");
});

test("click on submit with duplicate email prevents form submission and displays error", async () => {
  const history = createMemoryHistory({ initialEntries: ["/signup"] });
  const authenticator = new AuthenticatorWithOnlyLogin();
  const { getByLabelText } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <Router history={history}>
        <Signup authenticator={authenticator} />
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByLabelText("submit"));
  await screen.findByText(/error/i);
  expect(authenticator.loggedIn).toBe(false);
  expect(history.location.pathname).toBe("/signup");
});