import { Action } from "redux";

export interface UserPayload {
  user: {
    email: string;
    sub: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  error: Error;
}

export interface UserAction extends Action<string> {
  payload: UserPayload;
  [key: string]: unknown;
}
