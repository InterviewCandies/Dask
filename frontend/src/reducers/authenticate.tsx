import { ActionTypes, AUTHENTICATE_USER, User } from "../types";

const initialState: User = {
  email: "",
  photoURL: "",
};

export const reducer = (state = initialState, action: ActionTypes): User => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...action.payload };
  }
  return state;
};
