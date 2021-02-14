export type Message = {
  status?: string;
  message?: string;
  data?: any;
};

export interface User {
  email: string;
  photoURL?: string;
}

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";

interface AuthenticateAction {
  type: typeof AUTHENTICATE_USER;
  payload: User;
}

export type ActionTypes = AuthenticateAction;
