import avatar from "../assets/img/avatar.jpg";

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
  createdDate?: Date;
  description: string;
  lists?: List[];
}

export interface List {
  _id?: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  _id?: string;
  title: string;
  tags?: [];
  comments?: [];
  members?: [];
  coverURL?: string;
  description?: string;
  files?: [];
  source?: string;
}

export interface StateTypes {
  user: User;
  boards: Board[];
  users: User[];
  lists: List[];
}

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const GET_BOARDS_BY_USER = "GET_BOARDS_BY_USER";
export const UPDATE_BOARDS = "UPDATE_BOARDS";
export const ADD_BOARD = "ADD_BOARD";
export const UPDATE_USERS = "UPDATE_USERS";
export const UPDATE_LISTS = "UPDATE_LISTS";
export const ADD_TO_LISTS = "ADD_TO_LISTS";
export const AUTH_TOKEN = "AUTH_TOKEN";

export const MAXIMUM_MEMBERS_DISPLAYED_PER_CARD = 3;
export const MAXIMUM_MEMBERS_DISPLAYED_PER_BOARD = 2;
export const MAXIMUM_MEMBERS_DISPLAYED_PER_TASK = 1;
export const DEFAULT_AVATAR = avatar;
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

interface UpdateUsers {
  type: typeof UPDATE_USERS;
  payload: User[];
}

interface UpdateLists {
  type: typeof UPDATE_LISTS;
  payload: List[];
}

interface AddToLists {
  type: typeof ADD_TO_LISTS;
  payload: List;
}

export type ActionTypes =
  | AuthenticateAction
  | GetBoardsByUser
  | UpdateBoards
  | AddBoard
  | UpdateUsers
  | UpdateLists
  | AddToLists;
