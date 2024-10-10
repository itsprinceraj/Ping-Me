export const BASE_URL = import.meta.env.VITE_SERVER_URL;

// write auth routes
const BASE_ROUTE = "/api/v1/auth";
export const authApiEndPoints = {
  SIGNUP_API: BASE_ROUTE + "/signup",
  LOGIN_API: BASE_ROUTE + "/login",
};
