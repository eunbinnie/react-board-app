import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { ToastOptions } from 'react-toastify';
import { Slide, toast } from 'react-toastify';

import { useSignUpMutation } from '@/services/authApi';

import type { SignUpForm } from '@/types/auth.types';

import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/button/Button';

import AuthLayout from './AuthLayout';

// 토스트 메시지 옵션
const TOAST_OPTION: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Slide,
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({ mode: 'onChange' });
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  // 회원가입 실패 처리
  const handleSignupError = (error: unknown) => {
    console.error('회원가입 실패:', error);

    if (error instanceof Error) {
      toast.error(error.message, TOAST_OPTION);
    } else {
      toast.error('회원가입 중 오류가 발생했습니다.', TOAST_OPTION);
    }
  };

  // 회원가입 처리
  const onSubmit: SubmitHandler<SignUpForm> = async (formData) => {
    try {
      const { data, error } = await signUp(formData);

      if (data.session) {
        toast.success('회원가입이 완료되었습니다!', TOAST_OPTION);
        navigate('/posts');
      } else if (error) {
        handleSignupError(error);
      }
    } catch (error) {
      handleSignupError(error);
    }
  };

  return (
    <AuthLayout>
      <div className='grid'>
        <h2 className='text-2xl font-bold'>회원가입</h2>
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
              회원가입
            </Button>
          </form>
        </div>
        <div className='mx-auto mt-3 text-sm text-gray-500'>
          이미 계정이 있으신가요?{' '}
          <Link
            to={'/login'}
            className='font-medium underline underline-offset-2'
          >
            로그인하기
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
