import { useEffect, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps extends PropsWithChildren {
  id?: string;
}

const Portal = ({ children, id = '__portal' }: IPortalProps) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
    setContainer(el);

    return () => {
      el.remove();
    };
  }, [id]);

  return container && createPortal(children, container);
};

export default Portal;
