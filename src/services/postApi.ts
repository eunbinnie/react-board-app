import { createApi } from '@reduxjs/toolkit/query/react';

import type { GetPostDetail } from '@/types/post.types';
import { type PostItem } from '@/types/post.types';

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
    getPosts: builder.query<PostItem[], void>({
      query: () => '/posts',
    }),
    getPostDetail: builder.query<PostItem, GetPostDetail>({
      query: ({ id }) => `/posts?id=eq.${id}`,
      transformResponse: (res: PostItem[]) => res[0],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostDetailQuery,
} = postApi;
