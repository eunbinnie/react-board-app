import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

  // 로그인 실패 처리
  const handleLoginError = (error: unknown) => {
    console.error('로그인 실패:', error);

    if (error instanceof Error) {
      toast.error(error.message, TOAST_OPTION);
    } else {
      toast.error('로그인 중 오류가 발생했습니다.', TOAST_OPTION);
    }
  };

  // 로그인 처리
  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    try {
      const { data, error } = await login(formData);

      if (data.session && data.user) {
        navigate('/posts');
      } else if (error) {
        handleLoginError(error);
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
            <Button type='submit' disabled={!isValid} className='mt-8'>
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
