import { api } from "../api-config/baseApi";
import { tagTypes } from "../interface/tag-types";

const base = "auth";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/${base}/get-profile`,
      }),
      providesTags: [tagTypes.users],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/${base}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    tokenCheck: builder.mutation({
      query: () => ({
        url: `/${base}/check-token`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/${base}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `/${base}/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    emailVerify: builder.mutation({
      query: (data) => ({
        url: `/${base}/verify-email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${base}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.users],
    }),

    forgot: builder.mutation({
      query: (data) => ({
        url: `/${base}/forgot`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/${base}/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/${base}/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useDeleteUserMutation,
  useEmailVerifyMutation,
  useForgotMutation,
  useSignUpMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useTokenCheckMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authSlice;
