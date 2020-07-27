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
import Login, { LOGIN } from './login';

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
      query: LOGIN,
      variables: { email: "", password: "" },
    },
    result: { data: { login: {
      payload,
      token: "token",
      user
    }}},
  },
];

const errorMocks = [
  {
    request: {
      query: LOGIN,
      variables: { email: "", password: "" },
    },
    error: new Error("There was an error"),
  },
];

test("renders the login form with email and password", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Login />
      </Router>
    </MockedProvider>
  );
  expect(getByText("Email")).toBeInTheDocument();
  expect(getByText("Password")).toBeInTheDocument();
});

test("click on sign up takes user to signup page", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Login/>
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByText(/Sign/i));
  expect(history.location.pathname).toBe("/signup");
});

test("click on about takes user to home page", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Login/>
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByText(/About/i));
  expect(history.location.pathname).toBe("/");
});

test("click on submit with valid credentials logs in user and redirects to dashboard", async () => {
  const history = createMemoryHistory();
  const authenticator = new AuthenticatorWithOnlyLogin();
  const { getByLabelText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Login authenticator={authenticator}/>
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByLabelText("submit"));
  await wait(() => expect(authenticator.loggedIn).toBe(true), {timeout: 1000});
  expect(history.location.pathname).toBe("/dashboard");
});

test("click on submit with invalid credentials prevents form submission and displays error", async () => {
  const history = createMemoryHistory();
  const authenticator = new AuthenticatorWithOnlyLogin();
  const { getByLabelText } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <Router history={history}>
        <Login authenticator={authenticator} />
      </Router>
    </MockedProvider>
  );
  fireEvent.click(getByLabelText("submit"));
  await screen.findByText(/error/i);
  expect(authenticator.loggedIn).toBe(false);
});