import { useCookies } from 'react-cookie';

/**
 * 인증 쿠키 관리
 */
const useAuthCookies = () => {
  const [, setCookie] = useCookies();

  const setCookies = (key: string, value: string, maxAge: number) => {
    setCookie(key, value, {
      path: '/',
      secure: true,
      maxAge,
    });
  };

  return { setCookies };
};

export default useAuthCookies;
