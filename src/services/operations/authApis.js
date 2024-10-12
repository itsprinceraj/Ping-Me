import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authApiEndPoints } from "@/services/apiEndPoints";

const { SIGNUP_API, LOGIN_API } = authApiEndPoints;
import { setToken, setUser } from "../../redux/slices/authSlice";

//  signup api call;
export const signupApi = async (email, password, navigate, dispatch) => {
  let response;
  const toastId = toast.loading("Loading...");
  try {
    response = await apiConnector(
      "POST",
      SIGNUP_API,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    // console.log(response);

    //  show toast and set data;
    if (!response?.success) {
      toast.error(response?.message);
    }
    toast.success(response?.message);
    dispatch(setToken(response?.token));
    dispatch(setUser(response?.user));
    localStorage.setItem("token", JSON.stringify(response?.token));
    localStorage.setItem("user", JSON.stringify(response?.user));
    navigate("/profile");
  } catch (err) {
    console.log(err.message);
  }
  toast.dismiss(toastId);
  return response;
};

//  login api call;
export const loginApi = async (email, password, navigate, dispatch) => {
  let response;
  const toastId = toast.loading("Loading...");
  try {
    response = await apiConnector(
      "POST",
      LOGIN_API,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    console.log(response);

    //  show toast
    if (!response?.success) {
      toast.error(response?.message);
    } else {
      toast.success(response?.message);
      dispatch(setToken(response?.token));
      dispatch(setUser(response?.user));
      localStorage.setItem("token", JSON.stringify(response?.token));
      localStorage.setItem("user", JSON.stringify(response?.user));

      //  if profile Setup is false , then show profile page else chat page;
      if (response?.user?._id) {
        if (response?.user?.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  }
  toast.dismiss(toastId);
  return response;
};
