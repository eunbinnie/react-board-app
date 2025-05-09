import { useId } from 'react';

import type { AuthFormInputProps } from '@/types/auth.types';

import Input from '../input/Input';
import InputWrapper from '../input/InputWrapper';

const PasswordInput = <T extends Record<string, any>>({
  register,
  errors,
  name,
}: AuthFormInputProps<T>) => {
  const id = useId();

  return (
    <InputWrapper
      label='비밀번호'
      htmlFor={id}
      error={!!errors[name]}
      errorMessage={errors[name]?.message as string}
    >
      <Input
        type='password'
        id={id}
        placeholder='비밀번호를 입력해 주세요'
        {...register(name, {
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
  );
};

export default PasswordInput;
