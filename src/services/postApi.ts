import { createApi } from '@reduxjs/toolkit/query/react';

import type { GetPostDetail, GetPostsParams } from '@/types/post.types';
import { type PostItem } from '@/types/post.types';

import baseQueryWithReauth from './baseQueryWithReauth';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // 게시글 작성 API
    createPost: builder.mutation({
      query: (postData) => ({
        url: '/posts',
        method: 'POST',
        body: postData,
      }),
    }),

    // 게시글 목록 조회 API
    getPosts: builder.query<PostItem[], GetPostsParams | void>({
      query: (params) => {
        const keyword = params?.keyword || '';
        const sort = encodeURIComponent(params?.sort || 'created_at.desc');

        const searchQuery = keyword
          ? `title=ilike.*${encodeURIComponent(keyword)}*&`
          : '';

        return {
          url: `/posts?${searchQuery}order=${sort}`,
        };
      },
      keepUnusedDataFor: 0,
    }),

    // 게시글 상세 조회 API
    getPostDetail: builder.query<PostItem, GetPostDetail>({
      query: ({ id }) => `/posts?id=eq.${id}`,
      transformResponse: (res: PostItem[]) => res[0],
    }),

    // 게시글 삭제 API
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
