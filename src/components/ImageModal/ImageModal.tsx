import React from 'react';
import Modal from 'react-modal';
import { Picture } from '../../App';
type Style = {
  content?: React.CSSProperties;
  overlay?: React.CSSProperties;
};
type Props = {
  onCloseModal: () => void;
  selectedImage: Picture | null;
  isOpen: boolean;
  style?: Style;
};
const ImageModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  selectedImage,
  style,
}) => {
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
