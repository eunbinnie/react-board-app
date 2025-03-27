import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    /**
     * @TODO 회원가입 로직 구현
     */
    console.log(data);
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
