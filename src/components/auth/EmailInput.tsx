import { useId } from 'react';
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import Input from '../input/Input';
import InputWrapper from '../input/InputWrapper';

interface EmailInputProps<T extends Record<string, any>> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
}

const EmailInput = <T extends Record<string, any>>({
  register,
  errors,
  name,
}: EmailInputProps<T>) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const id = useId();

  return (
    <InputWrapper
      label='이메일'
      htmlFor={id}
      error={!!errors[name]}
      errorMessage={errors[name]?.message as string}
    >
      <Input
        type='email'
        id={id}
        placeholder='이메일을 입력해 주세요'
        {...register(name, {
          required: '이메일을 입력해 주세요',
          pattern: {
            value: EMAIL_REGEX,
            message: '이메일 형식으로 입력해 주세요',
          },
        })}
      />
    </InputWrapper>
  );
};

export default EmailInput;
