import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

interface IAuthLayoutProps extends PropsWithChildren {}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  const { useAuthSession } = useAuth();
  useAuthSession(); // supabase 세션 복원

  return (
    <div className='flex min-h-dvh'>
      <div className='hidden bg-slate-950 p-10 lg:block lg:flex-1'>
        <h1>
          <Link to='/' className='text-2xl font-bold text-white'>
            HOME
          </Link>
        </h1>
      </div>
      <div className='flex flex-1 items-center'>
        <div className='mx-auto box-content w-full max-w-[360px] p-6'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
