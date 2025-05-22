import React from 'react';
import st from './ImageCard.module.css';
import { Picture } from '../../App';
type Props = {
  onImageClick: (image: Picture) => void;
  picture: Picture;
};
const ImageCard: React.FC<Props> = ({ picture, onImageClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onImageClick(picture);
  };

  return (
    <li className={st.card}>
      <a
        className={st.gallerylink}
        href={picture.urls.regular}
        onClick={handleClick}
      >
        <img src={picture.urls.small} alt="photo" className={st.galleryimage} />
      </a>
    </li>
  );
};

export default ImageCard;
