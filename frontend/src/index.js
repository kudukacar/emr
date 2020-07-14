import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import ApolloClient from "apollo-boost";
import { TOKEN } from './constants';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  request: (operation) => {
    const token = sessionStorage.getItem(TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? `JWT ${token}` : "",
      },
    });
  }
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
