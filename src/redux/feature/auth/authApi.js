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
        url: "/verify-otp",
        method: "POST",
        body: otpData,
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

export const { useLoginUserMutation, useRegisterUserMutation,useForgotPasswordMutation,
  useVerifyOtpMutation, useResetPasswordMutation } = authApi;
export default authApi;

































// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getBaseUrl } from "../../../utils/getBaseUrl";

// // query----> get method
// // mutation -----> put, patch, delete,post

// const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl:`${getBaseUrl()}/api/auth`,   
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (newUser) => ({
//         url: "/signup",
//         method: "POST",
//         body: newUser,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
// export default authApi;
