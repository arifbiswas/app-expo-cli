import { api } from "../api-config/baseApi";
import { IUserFetch } from "../interface/interface";
import { tagTypes } from "../interface/tag-types";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IUserFetch, unknown>({
      query: () => ({
        url: `/auth/get-profile`,
      }),
      providesTags: [tagTypes.users],
    }),
    getOthersProfile: builder.query<IUserFetch, any>({
      query: (id) => ({
        url: `/auth/get-other-profile?id=${id}`,
      }),
      providesTags: [tagTypes.users],
    }),

    updateUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    updateLocation: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/location`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.users, tagTypes.post, tagTypes.activities],
    }),
    tokenCheck: builder.mutation<any, any>({
      query: () => ({
        url: `/auth/check-token`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    signUp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    emailVerify: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/verify-email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.users],
    }),

    forgot: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/forgot`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    // changeProfileImage: builder.mutation<any, any>({
    //   query: (photo) => ({
    //     url: `/auth/change-profile-photo`,
    //     method: "POST",
    //     body: photo,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.users],
    // }),

    switchGhost: builder.mutation<any, any>({
      query: () => ({
        url: `/auth/switch-ghost`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    googleLogin: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login/google`,
        method: "POST",
        params: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    googleLoginCode: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login/google/code?code=${data}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    appleLogin: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login/apple`,
        method: "POST",
        params: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    deleteUserAccount: builder.mutation<any, any>({
      query: (password) => ({
        url: `/auth/profile-delete`,
        method: "POST",
        body: password,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useDeleteUserMutation,
  useAppleLoginMutation,
  useEmailVerifyMutation,
  useForgotMutation,
  useSignUpMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useTokenCheckMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
  useDeleteUserAccountMutation,
  useGoogleLoginCodeMutation,
  useSwitchGhostMutation,
  useChangePasswordMutation,
  useGetOthersProfileQuery,
  useUpdateLocationMutation,
} = authSlice;
