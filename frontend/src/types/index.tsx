export type Message = {
  status?: string;
  message?: string;
  data?: any;
};

export interface User {
  _id?: string;
  email: string;
  photoURL?: string;
}

export interface Board {
  title: string;
  cover?: any;
  members?: User[];
  visibility: Boolean;
  owner?: User;
}

export interface StateTypes {
  authentication: User;
  boards: Board[];
}

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const GET_BOARDS_BY_USER = "GET_BOARDS_BY_USER";
export const UPDATE_BOARDS = "UPDATE_BOARDS";

interface AuthenticateAction {
  type: typeof AUTHENTICATE_USER;
  payload: User;
}

interface GetBoardsByUser {
  type: typeof GET_BOARDS_BY_USER;
  payload: User;
}

interface UpdateBoards {
  type: typeof UPDATE_BOARDS;
  payload: Board[];
}

export type ActionTypes = AuthenticateAction | GetBoardsByUser | UpdateBoards;
