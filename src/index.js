import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import trelloService from "./services/trello-service";
import ErrorBoundry from "./components/error-boundry";
import { TrelloContext } from "./components/trello-context";
import App from "./components/app";

import "./index.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ErrorBoundry>
      <TrelloContext.Provider value={trelloService}>
        <Router>
          <App />
        </Router>
      </TrelloContext.Provider>
    </ErrorBoundry>
  </Provider>
);
