import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';
import { Picture } from '../../App';

type Props = {
  onImageClick: (image: Picture) => void;
  picts: Picture[];
};
const ImageGallery: React.FC<Props> = ({ picts, onImageClick }) => {
  return (
    <div>
      <ul className={s.galaryList}>
        {picts.map((pict: Picture) => (
          <ImageCard key={pict.id} picture={pict} onImageClick={onImageClick} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
