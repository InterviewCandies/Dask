import { ActionTypes, INCREMENT } from "../types";

export function increase(): ActionTypes {
  return {
    type: INCREMENT,
  };
}
