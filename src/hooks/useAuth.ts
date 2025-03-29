import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import supabase from '@/utils/supabase';

export default function useAuth() {
  const [cookies] = useCookies(['access_token', 'refresh_token']);

  /**
   * 쿠키에서 토큰 꺼내서 supabase 세션 복원
   * - supabase는 브라우저 메모리만 보고 있고, 쿠키는 직접 확인 안 함
   */

  const useAuthSession = () => {
    useEffect(() => {
      const restoreSession = async () => {
        const access_token = cookies['access_token'];
        const refresh_token = cookies['refresh_token'];

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
