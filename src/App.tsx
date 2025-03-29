import { Outlet } from 'react-router-dom';

import useAuth from './hooks/useAuth';

const App = () => {
  const { useAuthSession } = useAuth();
  useAuthSession(); // supabase 세션 복원

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default App;
