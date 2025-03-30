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
    getPostsByKeyword: builder.query<PostItem[], string>({
      query: (keyword) => `/posts?title=ilike.*${keyword}*`, // 대소문자 무시
    }),
    getPostDetail: builder.query<PostItem, GetPostDetail>({
      query: ({ id }) => `/posts?id=eq.${id}`,
      transformResponse: (res: PostItem[]) => res[0],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts?id=eq.${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostDetailQuery,
  useGetPostsByKeywordQuery,
  useDeletePostMutation,
} = postApi;
