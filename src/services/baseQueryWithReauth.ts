import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth.constants';
import { clearAuthUser } from '@/store/authSlice';
import { store } from '@/store/store';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

import supabase from '@/utils/supabase';

/**
 * 헤더 토큰 삽입 베이스 쿼리 함수
 */
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
  prepareHeaders: (headers) => {
    const token = Cookies.get(ACCESS_TOKEN);
    const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (apiKey) {
      headers.set('apiKey', apiKey);
    }

    return headers;
  },
});

/**
 * 토큰 갱신 쿼리 함수
 */
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn('access token 만료, refresh 시도');
    // 토큰 확인 후 재발급급
    const { data } = await supabase.auth.refreshSession();
    if (data.session) {
      const { access_token, refresh_token, expires_in } = data.session;

      const baseTokenOptions = {
        path: '/',
        secure: true,
      };

      const accessTokenOptions = {
        ...baseTokenOptions,
        maxAge: expires_in,
      };

      const refreshTokenOptions = baseTokenOptions;

      // 엑세스 토큰 저장
      Cookies.set(ACCESS_TOKEN, String(access_token), accessTokenOptions);
      // 리프레시 토큰 저장
      Cookies.set(REFRESH_TOKEN, String(refresh_token), refreshTokenOptions);

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('Failed to refresh session');
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(REFRESH_TOKEN);
      store.dispatch(clearAuthUser());
      window.location.href = '/login';
    }
  }

  return result;
};

export default baseQueryWithReauth;
