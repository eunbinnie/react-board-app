import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RootState } from '@/store/store';

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div className='bg-white px-4 md:px-6 lg:px-8'>
      <header className='mx-auto flex h-[60px] w-full max-w-[1400px] items-center justify-between md:h-20'>
        <h1>
          <Link to={'/'} className='text-2xl font-bold'>
            이사대학
          </Link>
        </h1>
        <div>
          <Link to={'/posts'}>게시판</Link>
          {isAuthenticated ? <div>회원</div> : <div>비회원</div>}
        </div>
      </header>
    </div>
  );
};

export default Header;
