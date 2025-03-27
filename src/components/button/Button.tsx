import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

const Button = ({
  type = 'button',
  onClick,
  disabled,
  children,
  className,
  ...rest
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-secondary w-full rounded-xl p-4 text-lg font-bold text-white',
        disabled && 'bg-gray-200',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
