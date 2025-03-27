import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/button/Button';

import AuthLayout from './AuthLayout';

export type SignUpForm = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    /**
     * @TODO 회원가입 로직 구현
     */
    console.log(data);
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
            <Button type='submit' disabled={!isValid} className='mt-8'>
              회원가입
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
