import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth.constants';
import { clearAuthUser } from '@/store/authSlice';
import { store, type RootState } from '@/store/store';

const Header = () => {
  const [, , removeCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const email = user?.email;

  const handleLogout = () => {
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
    store.dispatch(clearAuthUser());
  };

  return (
    <div className='px-4 md:px-6 lg:px-8'>
      <header className='mx-auto flex h-full min-h-[60px] w-full max-w-[1400px] flex-wrap items-center justify-between md:min-h-20'>
        <div className='flex items-center gap-4'>
          <h1>
            <Link to={'/'} className='font-bold'>
              Home
            </Link>
          </h1>
          <Link to={'/posts'} className='font-medium'>
            게시판
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            <p className='flex flex-wrap items-center gap-x-4'>
              {email} 님
              <button
                onClick={handleLogout}
                className='underline underline-offset-2'
              >
                로그아웃
              </button>
            </p>
          ) : (
            <div className='flex items-center gap-4 font-medium'>
              <Link to={'/login'}>로그인</Link>
              <Link to={'/signup'}>회원가입</Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
