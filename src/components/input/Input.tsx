import { forwardRef, useCallback, useState } from 'react';

import { cn } from '@/utils/cn';

import VisibilityOff from '/icons/visibility-off.svg';
import VisibilityOn from '/icons/visibility-on.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * input 공통 컴포넌트
 * @param type input type
 * @param error 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요)
 * @param errorMessage input 밑에 보여줄 에러 메세지
 * @param className input 커스텀 className
 */
export default forwardRef(function Input(
  {
    type,
    id,
    placeholder,
    error = false,
    errorMessage,
    className,
    ...rest
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const newType = showPassword && isPassword ? 'text' : type;

  // 비밀번호 가시성 아이콘 토글
  const handlePasswordToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className='grid'>
      <div className='relative'>
        <input
          id={id}
          type={newType}
          placeholder={placeholder}
          className={cn(
            'h-9 w-full rounded-md border border-gray-500 px-3 py-1 text-sm leading-[1.6] text-black outline-none placeholder:text-gray-500',
            'focus-visible:ring-1 focus-visible:ring-gray-300',
            isPassword ? 'pr-[42px]' : 'pr-3',
            className,
          )}
          ref={ref}
          {...rest}
        />
        {isPassword && (
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2'
            onClick={handlePasswordToggle}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <img
              src={showPassword ? VisibilityOn : VisibilityOff}
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            />
          </button>
        )}
      </div>
      {error && errorMessage && (
        <span className='text-red-500 mt-2 block pl-2 text-xs leading-[1.3]'>
          {errorMessage}
        </span>
      )}
    </div>
  );
});
