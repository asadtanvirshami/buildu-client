import Cookies from "js-cookie";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FALIURE,
  USER_PROFILE_UPDATE,
  LOGOUT,
} from "@/redux/constants/user-constant";
import { UserAction } from "../types";

const initialState = {
  user: {},
  error: {},
  isAuthenticated: false,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: {},
        isAuthenticated: true,
      };
    case USER_PROFILE_UPDATE:
      return {
        ...state,
        user: action.payload.user,
        error: {},
        isAuthenticated: true,
      };
    case USER_SIGNIN_FALIURE:
      return {
        ...state,
        user: {},
        error: action.payload.error,
        isAuthenticated: false,
      };
    case LOGOUT:
      Cookies.remove("user");
      Cookies.remove("token");
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
