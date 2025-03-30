import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth.constants';

/**
 * 회원만 접근 가능한 라우트 컴포넌트
 * 비회원의 경우 로그인 페이지('/login')로 리다이렉트
 */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const isAuth = cookies[ACCESS_TOKEN] || cookies[REFRESH_TOKEN];

  return isAuth ? <>{children}</> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
