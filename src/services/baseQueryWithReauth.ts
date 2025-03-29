import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '@/constants/auth.constants';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

import supabase from '@/utils/supabase';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SUPABASE_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
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

      Cookies.set(ACCESS_TOKEN, access_token, {
        path: '/',
        secure: true,
        maxAge: expires_in,
      });

      Cookies.set(REFRESH_TOKEN, refresh_token, {
        path: '/',
        secure: true,
        maxAge: REFRESH_TOKEN_EXPIRES_IN,
      });

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('Failed to refresh session');
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(REFRESH_TOKEN);
      window.location.href = '/login';
    }
  }

  return result;
};

export default baseQueryWithReauth;
