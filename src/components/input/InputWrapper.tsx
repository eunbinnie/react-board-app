import type { PropsWithChildren } from 'react';

interface InputWrapperProps extends PropsWithChildren {
  label?: string;
  htmlFor?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * InputWrapper 컴포넌트는 label, input, 에러 메시지를 하나의 블록으로 묶어주는 역할을 합니다.
 *
 * - label과 input을 연결합니다
 * - error 상태일 경우 에러 메시지를 출력합니다
 * - 자식 컴포넌트로 input 요소를 전달받아 사용합니다
 *
 * @param label input에 연결될 라벨 텍스트
 * @param htmlFor label의 htmlFor 속성 값으로, 연결될 input의 id
 * @param error 에러 상태 여부. true일 경우 에러 메시지를 출력
 * @param errorMessage 에러 메시지 텍스트
 * @example
 * ```tsx
 * <InputWrapper label="이메일" htmlFor="email" error={hasError} errorMessage="이메일을 입력해 주세요">
 *   <input id="email" />
 * </InputWrapper>
 * ```
 */
const InputWrapper = ({
  label,
  htmlFor,
  error = false,
  errorMessage,
  children,
}: InputWrapperProps) => {
  return (
    <div className='grid gap-1'>
      {label && (
        <label
          htmlFor={htmlFor}
          className='text-xs font-medium leading-none text-gray-500'
        >
          {label}
        </label>
      )}
      {children}
      {error && errorMessage && (
        <span className='mt-1 block text-xs font-medium leading-[1.7] text-red'>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputWrapper;
