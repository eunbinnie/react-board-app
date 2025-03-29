import { Outlet } from 'react-router-dom';

import Header from './components/common/Header';
import useAuth from './hooks/useAuth';

const App = () => {
  const { useAuthSession } = useAuth();
  useAuthSession(); // supabase 세션 복원

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
