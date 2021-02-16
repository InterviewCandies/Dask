export type Message = {
  status?: string;
  message?: string;
  data?: any;
};

export interface User {
  email: string;
  photoURL?: string;
}

export interface Board {
  title: string;
  _id: string;
  coverURL?: string;
  members?: User[];
  visibility: Boolean;
  owner?: string | undefined;
}

export interface StateTypes {
  authentication: User;
  boards: Board[];
}

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const GET_BOARDS_BY_USER = "GET_BOARDS_BY_USER";
export const UPDATE_BOARDS = "UPDATE_BOARDS";
export const ADD_BOARD = "ADD_BOARD";
export const AUTH_TOKEN = "AUTH_TOKEN";
export const DEFAULT_BOARD_COVER =
  "https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
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

interface AddBoard {
  type: typeof ADD_BOARD;
  payload: Board;
}

export type ActionTypes =
  | AuthenticateAction
  | GetBoardsByUser
  | UpdateBoards
  | AddBoard;
