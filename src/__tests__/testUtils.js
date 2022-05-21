import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../redux/store";
import ErrorBoundry from "../components/error-boundry";
import {TrelloContext} from "../components/trello-context";
import trelloService from "../services/trello-service";
import {BrowserRouter} from "react-router-dom";
import React from "react";

export const renderWithProvider = (comp) => {
  render(
    <Provider store={store}>
      <ErrorBoundry>
        <TrelloContext.Provider value={trelloService}>
          <BrowserRouter>
            {comp}
          </BrowserRouter>
        </TrelloContext.Provider>
      </ErrorBoundry>
    </Provider>
  )
}
