import type { PostInputProps } from '@/types/post.types';

import Input from '../input/Input';
import InputWrapper from '../input/InputWrapper';

const PostInput = ({
  id,
  name,
  label,
  placeholder,
  register,
}: PostInputProps) => {
  return (
    <InputWrapper label={label} htmlFor={id}>
      <Input
        type='text'
        id={id}
        placeholder={placeholder}
        {...register(name, { required: '필수 입력 필드입니다.' })}
      />
    </InputWrapper>
  );
};

export default PostInput;
