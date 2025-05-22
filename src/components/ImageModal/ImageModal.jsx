import React from 'react';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, onCloseModal, selectedImage, style }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseModal} style={style}>
      {selectedImage && (
        <img
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description || 'Selected'}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
