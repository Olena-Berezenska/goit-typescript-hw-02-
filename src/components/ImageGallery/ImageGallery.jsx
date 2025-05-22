import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ picts, onImageClick }) => {
  return (
    <div>
      <ul className={s.galaryList}>
        {picts.map(pict => (
          <ImageCard key={pict.id} picture={pict} onImageClick={onImageClick} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
