import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import LandingPage from './landing_page';
import { Router } from "react-router-dom";

test('renders the landing page', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <LandingPage />
    </Router>
  );
  expect(getByText(/HIPAA/i)).toBeInTheDocument();
});

test("click on login takes user to login page", () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const { getByText } = render(
    <Router history={history}>
      <LandingPage />
    </Router>
  );
  fireEvent.click(getByText("Login"));
  expect(history.location.pathname).toBe("/login");
});

test("click on start using smartemr takes user to signup page", () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const { getByText } = render(
    <Router history={history}>
      <LandingPage />
    </Router>
  );
  fireEvent.click(getByText(/Start/i));
  expect(history.location.pathname).toBe("/signup");
});

