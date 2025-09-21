import { apiSlice } from "./apiSlice";
export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: "/auth/dashboard-stats",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSignoutMutation, useGetUsersQuery, useDeleteUserMutation, useGetDashboardStatsQuery } = authSlice;
