import { useCookies } from 'react-cookie';

export default function useAuthCookies() {
  const [, setCookie] = useCookies();

  const setCookies = (key: string, value: string, maxAge?: number) => {
    setCookie(key, value, {
      path: '/',
      secure: true,
      maxAge,
    });
  };

  return { setCookies };
}
