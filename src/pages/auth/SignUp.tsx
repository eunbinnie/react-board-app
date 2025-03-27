import { useId } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import InputWrapper from '@/components/input/InputWrapper';

import AuthLayout from './AuthLayout';

type SignUpForm = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const emailId = useId();
  const passwordId = useId();
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
              <InputWrapper
                label='이메일'
                htmlFor={emailId}
                error={!!errors.email}
                errorMessage={errors.email?.message}
              >
                <Input
                  type='email'
                  id={emailId}
                  placeholder='이메일을 입력해 주세요'
                  {...register('email', {
                    required: '이메일을 입력해 주세요',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '이메일 형식으로 입력해 주세요',
                    },
                  })}
                />
              </InputWrapper>
              <InputWrapper
                label='비밀번호'
                htmlFor={passwordId}
                error={!!errors.password}
                errorMessage={errors.password?.message}
              >
                <Input
                  type='password'
                  id={passwordId}
                  placeholder='비밀번호를 입력해 주세요'
                  {...register('password', {
                    required: '비밀번호를 입력해 주세요',
                    minLength: {
                      value: 8,
                      message: '비밀번호는 8자 이상으로 입력해 주세요',
                    },
                    maxLength: {
                      value: 16,
                      message: '비밀번호는 16자 이하로 입력해 주세요',
                    },
                  })}
                />
              </InputWrapper>
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
