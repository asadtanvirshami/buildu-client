export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    signup: "/auth/signup",
    verifyOtp: "/auth/otp",
    reset: "/auth/reset",
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
