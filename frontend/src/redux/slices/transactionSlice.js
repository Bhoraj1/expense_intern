import { apiSlice } from "./apiSlice";
export const transactionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: (credentials) => ({
        url: "/transaction",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["transaction"],
    }),
    getTransactions: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return {
          url: params ? `/transaction?${params}` : "/transaction",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["transaction"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/transaction/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = transactionSlice;
