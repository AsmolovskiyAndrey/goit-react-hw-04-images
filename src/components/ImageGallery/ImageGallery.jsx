// import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ galleryItems, ...otherProps }) => {
  return (
    <ul className={css.ImageGallery}>
      {galleryItems.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          small_img={webformatURL}
          large_img={largeImageURL}
          {...otherProps}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  galleryItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
