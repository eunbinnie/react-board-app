import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import type { RootState } from '@/store/store';

/**
 * 비회원만 접근 가능한 라우트 컴포넌트
 * 회원의 경우 메인 홈('/')으로 리다이렉트
 */
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <Navigate to={'/'} replace /> : <>{children}</>;
};

export default PublicRoute;
