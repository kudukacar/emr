import React from "react";
import LoggedInNavbar from './loggedin_navbar';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

export const GET_USER = gql`
  {
    user {
      id
      firstName
      lastName
    }
  }
`

const DashBoard = () => {
  const { error, loading, data } = useQuery(GET_USER);
  if(loading) {
    return <p>Loading...</p>
  }
  if(error) {
    return <p>Please login or signup first.</p>
  }
  return (
    <>
      <LoggedInNavbar/>
      <div>Welcome {data.user.firstName} to your dashboard</div>
    </>
  );
}

export default withRouter(DashBoard);