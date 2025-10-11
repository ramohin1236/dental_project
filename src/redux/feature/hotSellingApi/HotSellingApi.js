import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const hotSellingApi = createApi({
  reducerPath: "hotSellingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products/hot`,
  }),
  endpoints: (builder) => ({
    fetchAllHotSelling: builder.query({
      query: () => "/",
      transformResponse: (response) => {
        // যদি API সরাসরি array দেয়, তখন এটাকেই return করবো
        if (Array.isArray(response)) return response;

        // যদি object হয় এবং data key থাকে, তখন return response.data
        return response?.data || [];
      },
    }),
  }),
});

export const { useFetchAllHotSellingQuery } = hotSellingApi;
export default hotSellingApi 