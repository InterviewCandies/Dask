import { ActionTypes, AUTHENTICATE_USER, User } from "../types";

export const authenticateUser = (user: User): ActionTypes => {
  return {
    type: AUTHENTICATE_USER,
    payload: user,
  };
};
