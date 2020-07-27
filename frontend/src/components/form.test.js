import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './form';

class FormValues {
  constructor() {
    this.email = "",
    this.password = "",
    this.firstName = "",
    this.lastName = "",
    this.submitted = false;
  }
  setEmail = (email) => {
    this.email = email;
  }
  setPassword = (password) => {
    this.password = password;
  }
  setFirstName = (firstName) => {
    this.firstName = firstName;
  }
  setLastName = (lastName) => {
    this.lastName = lastName;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.submitted = true;
  }
}

test('renders a login or signup form based on the signup prop', () => {
  const { getByText, rerender } = render(<Form signup={true} />);
  expect(getByText(/First/i)).toBeInTheDocument();
  expect(getByText(/Last/i)).toBeInTheDocument();
  expect(getByText(/Email/i)).toBeInTheDocument();
  expect(getByText(/Password/i)).toBeInTheDocument();
  rerender(<Form signup={false} />)
  expect(screen.queryByText('First')).not.toBeInTheDocument();
  expect(screen.queryByText('Last')).not.toBeInTheDocument();
});

test("renders the forms errors passed as a prop", () => {
  const { getByText } = render(<Form error="Error" />);
  expect(getByText("Error")).toBeInTheDocument();
});

test("records the users first name", () => {
  const formValues = new FormValues();
  const { getByPlaceholderText } = render(<Form signup={true} firstName={formValues.firstName} setFirstName={formValues.setFirstName}/>);
  const input = getByPlaceholderText('First name');
  fireEvent.change(input, { target: { value: 'firstName' }});
  expect(formValues.firstName).toBe("firstName");
});

test("records the users last name", () => {
  const formValues = new FormValues();
  const { getByPlaceholderText } = render(
    <Form
      signup={true}
      lastName={formValues.lastName}
      setLastName={formValues.setLastName}
    />
  );
  const input = getByPlaceholderText("Last name");
  fireEvent.change(input, { target: { value: "lastName" } });
  expect(formValues.lastName).toBe("lastName");
});

test("records the users email", () => {
  const formValues = new FormValues();
  const { getByPlaceholderText } = render(
    <Form
      email={formValues.email}
      setEmail={formValues.setEmail}
    />
  );
  const input = getByPlaceholderText("Email");
  fireEvent.change(input, { target: { value: "email" } });
  expect(formValues.email).toBe("email");
});

test("records the users password", () => {
  const formValues = new FormValues();
  const { getByPlaceholderText } = render(
    <Form password={formValues.password} setPassword={formValues.setPassword} />
  );
  const input = getByPlaceholderText("Password");
  fireEvent.change(input, { target: { value: "password" } });
  expect(formValues.password).toBe("password");
});

test("executes a function upon submit", () => {
  const formValues = new FormValues();
  const { getByLabelText } = render(
    <Form handleSubmit={formValues.handleSubmit} />
  );
  fireEvent.click(getByLabelText("submit"));
  expect(formValues.submitted).toBe(true);
});