import type { PropsWithChildren } from 'react';

import loadingAnimation from '@/assets/lottie/loading.json';
import Lottie from 'lottie-react';

import { cn } from '@/utils/cn';

interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  isLoading?: boolean;
}

const Button = ({
  type = 'button',
  onClick,
  disabled,
  children,
  className,
  isLoading,
  ...rest
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'relative h-9 w-full overflow-hidden rounded-md bg-black px-4 py-2 text-sm font-bold text-white',
        disabled && 'bg-gray-200',
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <div className='absolute left-0 top-0 flex size-full justify-center'>
          <Lottie animationData={loadingAnimation} loop />
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default Button;
