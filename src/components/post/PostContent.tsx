import { cn } from '@/utils/cn';

import type { PostInputProps } from '@/types/post.types';

import InputWrapper from '../input/InputWrapper';

const PostContent = ({
  id,
  name,
  label,
  placeholder,
  register,
}: PostInputProps) => {
  return (
    <InputWrapper label={label} htmlFor={id}>
      <textarea
        id={id}
        placeholder={placeholder}
        {...register(name, { required: '필수 입력 필드입니다.' })}
        className={cn(
          'h-[300px] w-full resize-none rounded-md border border-gray-500 p-3 text-sm leading-[1.6] text-black outline-none placeholder:text-gray-500',
          'focus-visible:ring-1 focus-visible:ring-gray-300',
        )}
      />
    </InputWrapper>
  );
};

export default PostContent;
