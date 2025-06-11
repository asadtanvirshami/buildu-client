import { useMutation } from "@tanstack/react-query";
import { sanitizeFlatStrings } from "@/utils/sanitize";
import { apiEndpoints } from "@/api/endpoints";
import api from "@/api/axios";
import { AxiosResponse } from "axios";

export interface LoginInput {
  [key: string]: string;
  email: string;
  password: string;
}

export interface SignupInput {
  [key: string]: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface OtpInput {
  [key: string]: string;
  otp: string;
}

export interface ResetPasswordInput {
  [key: string]: string;
  email: string;
  otp: string;
  newPassword: string;
}
export interface AccountRecoveryInput {
  [key: string]: string;
  email: string;
}
export interface ResendOTPInput {
  [key: string]: string;
  email: string;
}

export const useAuth = () => {
  const login = useMutation({
    mutationFn: (input: LoginInput) =>
      api
        .post(apiEndpoints.auth.login, sanitizeFlatStrings(input))
        .then((res: AxiosResponse) => res.data),
  });

  const signup = useMutation({
    mutationFn: (input: SignupInput) =>
      api
        .post(apiEndpoints.auth.signup, sanitizeFlatStrings(input))
        .then((res: AxiosResponse) => res.data),
  });

  const account_recovery = useMutation({
    mutationFn: (input: AccountRecoveryInput) =>
      api
        .post(apiEndpoints.auth.account_recovery, sanitizeFlatStrings(input))
        .then((res: AxiosResponse) => res.data),
  });

  const verifyOtp = useMutation({
    mutationFn: (input: OtpInput) =>
      api
        .post(apiEndpoints.auth.verifyOtp, sanitizeFlatStrings(input))
        .then((res: AxiosResponse) => res.data),
  });

  const resendOtp = useMutation({
    mutationFn: (input: ResendOTPInput) =>
      api
        .post(apiEndpoints.auth.resendOtp, sanitizeFlatStrings(input))
        .then((res: AxiosResponse) => res.data),
  });

  const resetPassword = useMutation({
    mutationFn: (input: ResetPasswordInput) =>
      api
        .post(apiEndpoints.auth.reset, sanitizeFlatStrings(input))
        .then((res: AxiosResponse) => res.data),
  });

  return {
    login,
    signup,
    verifyOtp,
    resetPassword,
    account_recovery,
    resendOtp,
  };
};
