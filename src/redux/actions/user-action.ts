// authActions.js
import { JwtPayload } from "jwt-decode";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FALIURE,
  USER_PROFILE_UPDATE,
  LOGOUT,
} from "@/redux/constants/user-constant";

interface User {
  email: string;
  sub: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const loginSuccess = (user: JwtPayload) => ({
  type: USER_SIGNIN_SUCCESS,
  payload: { user },
});

export const updateSuccess = (user: User) => ({
  type: USER_PROFILE_UPDATE,
  payload: { user },
});

export const loginFailure = (error: Error) => ({
  type: USER_SIGNIN_FALIURE,
  payload: { error },
});

export const logout = () => ({
  type: LOGOUT,
});
