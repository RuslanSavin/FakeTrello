import React from 'react';
import {TrelloConsumer} from "../trello-context";

const withTrelloService = () => (Wrapped) => {

  return (props) => {
    return (
      <TrelloConsumer>
        {
          (trelloService) => {
            return (<Wrapped {...props} trelloService={trelloService}/>);
          }
        }
      </TrelloConsumer>
    );
  }
};

export default withTrelloService;