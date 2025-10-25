import { baseQueryWithAuth } from "@/utils/baseQueryWithAuth";
import { createApi } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    
    fetchMyAddresses: builder.query({
      query: () => '/addresses/my',
      providesTags: ["Address"],
    }),
    
    
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: '/addresses',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { 
  useFetchMyAddressesQuery,
  useAddAddressMutation 
} = addressApi;