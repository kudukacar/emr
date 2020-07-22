import React from "react";
import MainNavbar from './main_navbar';
import { gql, useQuery } from "@apollo/client";
import { withRouter, Redirect } from "react-router-dom";

export const GET_USER = gql`
  {
    user {
      id
      firstName
      lastName
    }
  }
`

const DashBoard = ({ authenticator }) => {
  const handleLogout = () => {
    authenticator.logout();
  };

  const { error, loading, data } = useQuery(GET_USER);
  if(loading) {
    return <p>Loading...</p>
  }
  if(error) {
    authenticator.logout();
    return <Redirect to="/" />;
  }
  return (
    <>
      <MainNavbar
        mainPage={"Dashboard"}
        authPage={"Logout"}
        handleLogout={handleLogout}
      />
      <div>Welcome {data.user.firstName} to your dashboard</div>
    </>
  );
}

export default withRouter(DashBoard);