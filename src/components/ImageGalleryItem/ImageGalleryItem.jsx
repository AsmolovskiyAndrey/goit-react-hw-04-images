import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ small_img, large_img, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={small_img}
        onClick={() => onClick(large_img)}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  small_img: PropTypes.string.isRequired,
  large_img: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
