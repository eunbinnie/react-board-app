import { createApi } from '@reduxjs/toolkit/query/react';

import type { GetPostDetail, GetPostsParams } from '@/types/post.types';
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
    getPosts: builder.query<PostItem[], GetPostsParams | void>({
      query: (params) => {
        const keyword = params?.keyword || '';
        const sort = params?.sort || 'created_at.desc';

        const searchQuery = keyword
          ? `title=ilike.*${encodeURIComponent(keyword)}*&`
          : '';

        return `/posts?${searchQuery}order=${sort}`;
      },
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
  useDeletePostMutation,
} = postApi;
