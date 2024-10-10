//  write axios method to make api call

import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const axiosCall = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiConnector = async (
  method,
  url,
  data = null,
  headers = {},
  params = null
) => {
  try {
    //  return response
    const respons = await axiosCall({
      method,
      url,
      data: data || null, // Only include data if it's not null
      headers: headers || null,
      params: params || null,
    });

    return respons.data;
  } catch (error) {
    console.log("api call error", error.message);
    throw error;
  }
};
