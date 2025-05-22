import React from 'react';
import st from './ImageCard.module.css';

const ImageCard = ({ picture, onImageClick }) => {
  const handleClick = e => {
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
