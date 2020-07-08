import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ modalClosed, show, children, title = '' }) => {
  return (
    <>
      <Backdrop onClickBackdrop={modalClosed} show={show}>
        {' '}
      </Backdrop>
      <div
        className={classes.modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}>
        <h2 style={{ textAlign: 'center' }}>{title}</h2>
        {children}
      </div>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  show: PropTypes.any,
  modalClosed: PropTypes.func,
  title: PropTypes.string,
};

const shouldComponentUpdate = (prevProps, nextProps) => {
  return (
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
  );
};

// React.memo is used here in a functional component to replace shouldComponentUpdate lifecycle hook
// we can provide to MEMO our own function to check whether this component should update,
// but the logic is the opposite to that from the lifecycle hook,
// so we are checking if nextProps are the same as prevProps
// export default Modal;
export default React.memo(Modal, shouldComponentUpdate);
