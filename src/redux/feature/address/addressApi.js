import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

const singleAddressApi = createApi({
  reducerPath: "singleAddressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: "include",
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
   fetchUserAddressesById: builder.query({
  query: (userId) => ({
    url: `/addresses/${userId}`,
    method: "GET",
  }),
  providesTags: ["Address"],
}),
  }),
});

export const { useFetchUserAddressesByIdQuery } = singleAddressApi;
export default singleAddressApi;
