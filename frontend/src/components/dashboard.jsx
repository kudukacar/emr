import React from "react";
import MainNavbar from './main_navbar';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { TOKEN, EXPIRATION } from "../constants";

export const GET_USER = gql`
  {
    user {
      id
      firstName
      lastName
    }
  }
`

const DashBoard = ({ history }) => {
  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(EXPIRATION);
    history.push("/");
  };

  const { error, loading, data } = useQuery(GET_USER);
  if(loading) {
    return <p>Loading...</p>
  }
  if(error) {
    return <p>Please login or signup first.</p>
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