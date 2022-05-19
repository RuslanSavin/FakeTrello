import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import trelloService from "./services/trello-service";
import ErrorBoundry from "./components/error-boundry";
import { TrelloContext } from "./components/trello-context";
import App from "./components/app";

import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <TrelloContext.Provider value={trelloService}>
        <Router>
          <App />
        </Router>
      </TrelloContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
