import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth.constants';

/*
 * 비회원만 접근 가능한 라우트 컴포넌트
 * 회원의 경우 메인 홈('/')으로 리다이렉트
 */
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const isAuth = cookies[ACCESS_TOKEN] || cookies[REFRESH_TOKEN];

  return isAuth ? <Navigate to={'/'} replace /> : <>{children}</>;
};

export default PublicRoute;
