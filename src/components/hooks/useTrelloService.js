import { useContext } from "react";
import { TrelloContext } from "../trello-context";

export function useTrelloService() {
  return useContext(TrelloContext);
}
