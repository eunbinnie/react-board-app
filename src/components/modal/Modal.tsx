import { useEffect, useState, type PropsWithChildren } from 'react';

import CloseIcon from '@/assets/icons/ic-close.tsx';

import { cn } from '@/utils/cn';

import Portal from './Portal';

interface IModalProps extends PropsWithChildren {
  active: boolean;
  onClose: () => void;
  className?: string;
}

const Modal = ({ active, children, onClose, className }: IModalProps) => {
  const [visible, setVisible] = useState<boolean>(active);

  useEffect(() => {
    let timer: NodeJS.Timeout | null;

    if (active) {
      setVisible(true);
    } else {
      timer = setTimeout(() => {
        setVisible(false);
      }, 300);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active]);

  return (
    visible && (
      <Portal>
        <div className='fill-mode-forwards fixed inset-0'>
          <div
            className={cn(
              'size-full bg-black/50',
              active ? 'animate-fade-in' : 'animate-fade-out',
            )}
            onClick={onClose}
          />
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 pb-8 pt-6',
              active ? 'animate-fade-in' : 'animate-fade-out',
              className,
            )}
          >
            <button
              onClick={onClose}
              className='ml-auto block aspect-square w-6'
            >
              <CloseIcon />
            </button>
            {children}
          </div>
        </div>
      </Portal>
    )
  );
};

export default Modal;
