import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/**
 * input 공통 컴포넌트
 * @param type input type
 * @param className input 커스텀 className
 */
export default forwardRef(function Input(
  { type, className, ...rest }: InputProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  return (
    <div className='grid'>
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'w-full rounded border border-solid border-gray-500 px-5 py-4 leading-[1.6] text-black outline-none placeholder:text-gray-500',
            className,
          )}
          ref={ref}
          {...rest}
        />
      </div>
    </div>
  );
});
