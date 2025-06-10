import { jwtDecode } from "jwt-decode";

export interface DecodedUserToken {
  email: string;
  sub: string; // user id
  firstName: string;
  lastName: string;
  role: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): DecodedUserToken => {
  return jwtDecode(token);
};
