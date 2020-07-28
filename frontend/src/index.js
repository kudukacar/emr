import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { TOKEN } from './constants';
import { setContext } from "@apollo/client/link/context";

let uri;
if (process.env.NODE_ENV === "development") {
  uri = "http://localhost:8000/graphql/";
} else {
  uri = "https://4edmgavrwe.execute-api.us-east-1.amazonaws.com/dev/graphql/";
}
const httpLink = createHttpLink({
  uri
});
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Root client={client}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
