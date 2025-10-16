import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/cart`,
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ product, quantity = 1 }) => ({
        url: "/add",
        method: "POST",
        body: { product, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    // Optional: fetch cart for hydration if needed later
    getCart: builder.query({
      query: () => ({ url: "/", method: "GET" }),
      providesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetCartQuery } = cartApi;
export default cartApi;
