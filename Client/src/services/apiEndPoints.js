export const BASE_URL = import.meta.env.VITE_SERVER_URL;

// write auth routes
const AUTH_VAL = "/api/v1/auth";
export const authApiEndPoints = {
  SIGNUP_API: AUTH_VAL + "/signup",
  LOGIN_API: AUTH_VAL + "/login",
};
