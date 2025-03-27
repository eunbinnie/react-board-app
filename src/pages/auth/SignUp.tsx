import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useSignUpMutation } from '@/services/authApi';
import type { AuthError } from '@supabase/supabase-js';

import type { SignUpForm } from '@/types/auth.types';

import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/button/Button';

import AuthLayout from './AuthLayout';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({ mode: 'onChange' });
  const [signUp, { isLoading, error }] = useSignUpMutation();

  useEffect(() => {
    if (error) {
      console.error('회원가입 실패 데이터', error);
    }
  }, [error]);

  const onSubmit: SubmitHandler<SignUpForm> = async (formData) => {
    try {
      const { data, error } = await signUp(formData);

      if (error) {
        console.error('회원가입 실패', error);
        setError('email', { message: (error as AuthError).message });

        return;
      }
      console.log('회원가입 성공', data);
    } catch (error) {
      console.error('회원가입 실패', error);
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
              disabled={!isValid || !!error}
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
