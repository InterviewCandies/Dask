import { stat } from "fs";
import { ActionTypes, INCREMENT, State } from "../types";

const initialState: State = {
  counter: 0,
};

export const reducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case INCREMENT:
      return { counter: state.counter + 1 };
  }
  return state;
};
