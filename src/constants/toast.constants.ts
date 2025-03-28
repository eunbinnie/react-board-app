import type { ToastOptions } from 'react-toastify';
import { Slide } from 'react-toastify';

export const TOAST_OPTION: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Slide,
};
