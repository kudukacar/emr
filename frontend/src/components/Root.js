import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from './App';

const Root = ({ client }) => (
 <ApolloProvider client={client}>
   <BrowserRouter>
    <App/>
   </BrowserRouter>
 </ApolloProvider>
)

export default Root;