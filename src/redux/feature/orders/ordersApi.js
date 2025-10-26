import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token = getState()?.auth?.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      } catch {}
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
export default ordersApi;
