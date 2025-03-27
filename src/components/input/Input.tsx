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
  { type, id, error = false, errorMessage, className, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const isPassword = type === 'password';
  const newType = passwordToggle && isPassword ? 'text' : type;

  // 비밀번호 가시성 아이콘 토글
  const handlePasswordToggle = useCallback(() => {
    setPasswordToggle((prev) => !prev);
  }, []);

  return (
    <div className='grid'>
      <div className='relative'>
        <input
          id={id}
          type={newType}
          className={cn(
            'w-full rounded border border-solid border-gray-500 px-5 py-4 leading-[1.6] text-black outline-none placeholder:text-gray-500',
            isPassword ? 'pr-[54px]' : 'pr-5',
            className,
          )}
          ref={ref}
          {...rest}
        />
        {isPassword && (
          <button
            type='button'
            className='absolute right-5 top-1/2 -translate-y-1/2'
            onClick={handlePasswordToggle}
            aria-label={passwordToggle ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <img
              src={passwordToggle ? VisibilityOn : VisibilityOff}
              alt={passwordToggle ? '비밀번호 숨기기' : '비밀번호 보기'}
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
