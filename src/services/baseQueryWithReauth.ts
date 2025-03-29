import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth.constants';
import { clearAuthUser } from '@/store/authSlice';
import { store } from '@/store/store';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

import supabase from '@/utils/supabase';

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

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn('access token 만료, refresh 시도');
    // try to get a new token
    const { data } = await supabase.auth.refreshSession();
    if (data.session) {
      // store the new token
      const { access_token, refresh_token, expires_in } = data.session;

      // 옵션 객체를 명시적으로 생성
      const accessTokenOptions = {
        path: '/',
        secure: true,
        maxAge: expires_in,
      };

      const refreshTokenOptions = {
        path: '/',
        secure: true,
      };

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
