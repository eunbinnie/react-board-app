import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { PostItem, PostStoreItem } from '@/types/post.types';

/**
 * 게시글 목록 저장 상태 초기값
 * @property data - 게시글 목록 데이터
 */
const initialState: PostStoreItem = {
  data: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostItem[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
