import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';



import store from './store';
import TrelloService from "./services/trello-service";
import ErrorBoundry from "./components/error-boundry";
import {TrelloProvider} from "./components/trello-context";
import App from "./components/app";

const trelloService = new TrelloService();



ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <TrelloProvider value={trelloService}>
        <Router>
          <App />
        </Router>
      </TrelloProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);


