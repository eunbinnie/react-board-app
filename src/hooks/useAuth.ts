import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth.constants';

import supabase from '@/utils/supabase';

export default function useAuth() {
  const [cookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);

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
          } catch (error) {
            console.error('세션 복구 실패', error);
          }
        }
      };

      restoreSession();
    }, []);
  };

  return { useAuthSession };
}
