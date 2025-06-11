export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    signup: "/auth/signup",
    verifyOtp: "/auth/verify-otp",
    resendOtp: "/auth/resend-otp",
    reset: "/auth/reset",
    account_recovery: "/auth/account-recovery",
  },
  me: "/auth/me",
  notes: {
    base: "/notes",
    one: (id: string) => `/notes/${id}`,
  },
  users: {
    base: "/users",
    one: (id: string) => `/users/${id}`,
  },
};
