import './index.css';

import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App.tsx';
import LoginPage from './pages/auth/Login.tsx';
import SignUpPage from './pages/auth/SignUp.tsx';
import HomePage from './pages/Home.tsx';
import PostListPage from './pages/posts/Posts.tsx';
import { store } from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/posts', element: <PostListPage /> },
    ],
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </CookiesProvider>,
);
