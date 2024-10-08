import React from 'react';
import './UploadModal.scss';

const UploadModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <h2 className='modal__content-title'>Upload Successful!</h2>
        <p className='modal__content-text'>Your video has been uploaded successfully. Do you want to go to the home page?</p>
        <div className="modal__buttons">
          <button className="modal__button-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal__button-confirm" onClick={onConfirm}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
