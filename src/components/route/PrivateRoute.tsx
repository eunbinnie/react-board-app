import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import type { RootState } from '@/store/store';

/**
 * 회원만 접근 가능한 라우트 컴포넌트
 * 비회원의 경우 로그인 페이지('/login')로 리다이렉트
 */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <>{children}</> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
