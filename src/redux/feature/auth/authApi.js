import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/email/verify",
        method: "POST",
        body: otpData,
      }),
      transformResponse: (response) => {
        console.log(' verifyOtp transformResponse:', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(' verifyOtp transformErrorResponse:', response);
        return response;
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),
  }),
});

export const { 
  useLoginUserMutation, 
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation, 
  useResetPasswordMutation,
  useLogoutMutation
} = authApi;
export default authApi;