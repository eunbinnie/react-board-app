import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  ACCESS_TOKEN,
  LOGIN_ERROR_MESSAGE,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '@/constants/auth.constants';
import { TOAST_OPTION } from '@/constants/toast.constants';
import useAuthCookies from '@/hooks/useAuthCookies';
import { useLoginMutation } from '@/services/authApi';

import type { LoginForm } from '@/types/auth.types';

import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/button/Button';

import AuthLayout from './AuthLayout';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: 'onChange' });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { setCookies } = useAuthCookies();

  // 로그인 실패 처리
  const handleLoginError = (error: unknown) => {
    const errorMessage =
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string'
        ? LOGIN_ERROR_MESSAGE[(error as any).message] || (error as any).message
        : '로그인 중 오류가 발생했습니다.';

    toast.error(errorMessage, TOAST_OPTION);
    console.error('로그인 실패:', error);
  };

  // 로그인 처리
  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    try {
      const { session, user } = await login(formData).unwrap();

      console.log(session, user);

      if (session && user) {
        setCookies(ACCESS_TOKEN, session.access_token, session.expires_in);
        setCookies(
          REFRESH_TOKEN,
          session.refresh_token,
          REFRESH_TOKEN_EXPIRES_IN,
        );
        navigate('/posts');
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <AuthLayout>
      <div className='grid'>
        <h2 className='text-2xl font-bold'>로그인</h2>
        <div className='mt-8'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              <EmailInput register={register} errors={errors} name='email' />
              <PasswordInput
                register={register}
                errors={errors}
                name='password'
              />
            </div>
            <Button
              type='submit'
              disabled={!isValid}
              isLoading={isLoading}
              className='mt-8'
            >
              로그인
            </Button>
          </form>
        </div>
        <div className='mx-auto mt-3 text-sm text-gray-500'>
          아직 계정이 없으신가요?{' '}
          <Link
            to={'/signup'}
            className='font-medium underline underline-offset-2'
          >
            회원가입하기
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
