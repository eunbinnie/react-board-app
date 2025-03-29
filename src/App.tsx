import { Outlet } from 'react-router-dom';

import Header from './components/common/Header';
import useAuth from './hooks/useAuth';

const App = () => {
  const { useAuthSession } = useAuth();
  useAuthSession(); // supabase 세션 복원

  return (
    <>
      <Header />
      <main className='my-10 px-4 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-[1400px]'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
