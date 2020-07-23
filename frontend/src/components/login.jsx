import React, { useState } from "react";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import './login.css';
import MainNavbar from './main_navbar';
import { withRouter, NavLink } from 'react-router-dom';
import Form from './form';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
      }
      payload
    }
  }
`;

const Login = ({ authenticator, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.clearStore();
      const response = await login({
        variables: {
          email: email,
          password: password,
        }
      });
      authenticator.login(response.data.login.token, response.data.login.payload.exp);
      history.push("/dashboard");
    }
    catch(e) {
      setError(e.message)
    }
  }

  return (
    <>
      <MainNavbar mainPage={"About"} authPage={"Login"} />
      <div className='loginbackground'>
        <Form
          title="Access SmartEMR"
          signup={false}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleSubmit={handleSubmit}
        />
        <div className="signup">
          Don't have an account? <NavLink className="signuplink" to="/signup">Sign up</NavLink>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);