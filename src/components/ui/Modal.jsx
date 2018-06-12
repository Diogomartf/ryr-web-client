import sys from 'system-components';
import { Modal as RebassModal } from 'rebass';

export const Modal = sys({
  is: RebassModal,
  zIndex: '5',
  boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 60vmax, rgba(0, 0, 0, 0.25) 0px 0px 32px'
});

export default Modal;
