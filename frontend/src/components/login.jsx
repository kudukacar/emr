import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import './login.css';
import MainNavbar from './main_navbar';
import { withRouter, NavLink } from 'react-router-dom';
import { TOKEN, EXPIRATION } from '../constants';

const LOGIN = gql`
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

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: {
          email: email,
          password: password,
        }
      });
      sessionStorage.setItem(TOKEN, response.data.login.token);
      const expiration = new Date(response.data.login.payload.exp * 1000).toLocaleString();
      sessionStorage.setItem(EXPIRATION, expiration);
      history.push("/dashboard");
    }
    catch(e) {
      setError(e.message.split(": ")[1])
    }
  }

  return (
    <>
      <MainNavbar />
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <div className="login">Access SmartEMR</div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="error">{error}</div>
              <input type="submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
      <div className="signup">
        Don't have an account? <NavLink to="/signup">Sign up</NavLink>
      </div>
    </>
  );
}

export default withRouter(Login);