import { ActionTypes, Board } from "../types";

const initialState: Board[] = [];
const reducer = (state = initialState, action: ActionTypes): Board[] => {
  switch (action.type) {
    case "GET_BOARDS_BY_USER":
      return state;
  }
  return state;
};

export default reducer;
