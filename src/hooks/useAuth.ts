import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '@/constants/auth.constants';
import { setAuthUser } from '@/store/authSlice';

import supabase from '@/utils/supabase';

import type { User } from '@/types/user.types';

export default function useAuth() {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);

  /**
   * 쿠키에서 토큰 꺼내서 supabase 세션 복원
   * - supabase는 브라우저 메모리만 보고 있고, 쿠키는 직접 확인 안 함
   */
  const useAuthSession = () => {
    useEffect(() => {
      const restoreSession = async () => {
        const access_token = cookies[ACCESS_TOKEN];
        const refresh_token = cookies[REFRESH_TOKEN];

        if (access_token && refresh_token) {
          try {
            await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            const {
              data: { user },
            } = await supabase.auth.getUser();

            if (user?.email && user.id) {
              dispatch(setAuthUser({ email: user.email, id: user.id }));
            }
          } catch (error) {
            console.error('세션 복구 실패', error);
          }
        } else if (refresh_token && !access_token) {
          try {
            const { data } = await supabase.auth.refreshSession({
              refresh_token,
            });

            if (data.session) {
              // store the new token
              const { access_token, refresh_token, expires_in } = data.session;

              setCookies(ACCESS_TOKEN, access_token, {
                path: '/',
                secure: true,
                maxAge: expires_in,
              });

              setCookies(REFRESH_TOKEN, refresh_token, {
                path: '/',
                secure: true,
                maxAge: REFRESH_TOKEN_EXPIRES_IN,
              });

              const {
                data: { user },
              } = await supabase.auth.getUser();

              if (user?.email && user.id) {
                dispatch(setAuthUser({ email: user.email, id: user.id }));
              }
            }
          } catch (error) {
            console.error('세션 복구 실패', error);
          }
        }
      };

      restoreSession();
    }, []);
  };

  // user 정보 redux에 저장
  const saveUserToStore = (user: User) => {
    dispatch(setAuthUser(user));
  };

  return { useAuthSession, saveUserToStore };
}
