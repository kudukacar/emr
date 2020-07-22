import React, { useState } from "react";
import MainNavbar from './main_navbar';
import { gql, useMutation, useApolloClient } from "@apollo/client";
import './login.css';
import { withRouter } from 'react-router-dom';
import Form from './form';

export const CREATEUSER = gql`
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

const Signup = ({ history, authenticator }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [createUser] = useMutation(CREATEUSER);
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.clearStore();
      const response = await createUser({
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      });
      authenticator.login(response.data.createUser.token, response.data.createUser.payload.exp);
      history.push("/dashboard"); 
    }
    catch(e) {
      setError(e.message.split(": ")[1]);
    }
  }
  return (
    <>
      <MainNavbar mainPage={"About"} authPage={"Login"} />
      <div className='loginbackground'>
        <Form
          signup={true}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default withRouter(Signup);