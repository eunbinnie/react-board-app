import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from './baseQueryWithReauth';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({
        url: '/posts',
        method: 'POST',
        body: postData,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postApi;
