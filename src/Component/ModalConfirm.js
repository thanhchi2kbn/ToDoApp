import React from 'react';

const ModalConfirm = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h3>Confirm</h3>
        <p>{message}</p>
        <div className="d-flex justify-content-end mt">
          <button onClick={onConfirm} className='btn btn-danger me-1'>
            Yes
          </button>
          <button onClick={onClose} className='btn btn-secondary'>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
