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

export interface GooginSigninInput {
  [key: string]: string;
  token: string;
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
