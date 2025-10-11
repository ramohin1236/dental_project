import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getBaseUrl } from "./getBaseUrl";


export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
