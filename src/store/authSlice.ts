import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthState, User } from '@/types/user.types';

/**
 * 인증 상태 초기값
 * @property user - 인증 사용자 정보
 * @property isAuthenticated - 인증 상태
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
