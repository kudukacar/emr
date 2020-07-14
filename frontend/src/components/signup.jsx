import React, { useState } from "react";
import MainNavbar from './main_navbar';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import './login.css';
import { withRouter } from 'react-router-dom';
import { TOKEN, EXPIRATION } from '../constants';

const CREATEUSER = gql`
  mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
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

const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [createUser] = useMutation(CREATEUSER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      });
      sessionStorage.setItem(TOKEN, response.data.createUser.token);
      const expiration = new Date(response.data.createUser.payload.exp * 1000).toLocaleString();
      sessionStorage.setItem(EXPIRATION, expiration);
      history.push("/dashboard"); 
    }
    catch(e) {
      setError(e.message.split(": ")[2]);
    }
  }
  return (
    <>
      <MainNavbar />
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <div className="login">Start using SmartEMR</div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
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
                  minLength="8"
                />
              </div>
              <div className="error">{error}</div>
              <input type="submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Signup);