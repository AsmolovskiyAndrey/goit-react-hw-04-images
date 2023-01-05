import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import axios from 'axios';

export const App = () => {
  const [subject, setSubject] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (search === '') {
      return;
    }

    const fetchImg = async (search, page) => {
      const URL = 'https://pixabay.com/api';
      const KEY = '31273147-56325c5e652f187dddce9fa62';

      try {
        setLoading(true);

        const newSub = await axios.get(
          `${URL}/?key=${KEY}&per_page=12&q=${search}&page=${page}`
        );

        const images = newSub.data.hits;
        setSubject(prevState => [...prevState, ...images]);

        images.length === 12 ? setLoadMore(true) : setLoadMore(false);

        setLoading(false);

        if (images.length === 0) {
          setNotFound(true);
        }
      } catch {
        setError(true);
      }
    };

    fetchImg(search, page);
  }, [search, page]);

  const searchSubject = event => {
    setSearch(event.toLowerCase().trim());
    setSubject([]);
    setPage(1);
    setNotFound(false);
    setLoadMore(false);
  };

  const loadMoreFunc = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = img => {
    setModalImg(img);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={searchSubject} />
      {loading && <Loader />}
      {notFound && <h2>Nothing found for your search...</h2>}
      {error && <h2>Something went wrong, try reloading the page</h2>}
      {subject && <ImageGallery galleryItems={subject} onClick={openModal} />}
      {loadMore && <Button loadMore={loadMoreFunc} />}

      {modal && <Modal img={modalImg} closeModal={closeModal} />}
    </div>
  );
};

// import { fetchImages } from 'api/ApiSearch';
// import { Component } from 'react';
// import { Searchbar } from './Searchbar/Searchbar';
// import css from './App.module.css';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
// import { Modal } from 'components/Modal/Modal';
// export class App extends Component {
//   state = {
//     subject: [],
//     page: 1,
//     search: '',
//     loading: false,
//     notFound: false,
//     error: false,
//     loadMore: false,
//     modal: false,
//     modalImg: '',
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     try {
//       if (prevState.search !== search || prevState.page !== page) {
//         this.setState({ loading: true });

//         const newSub = await fetchImages(search, page);
//         this.setState(prevState => ({
//           subject: [...prevState.subject, ...newSub],
//         }));

//         newSub.length === 12
//           ? this.setState({ loadMore: true })
//           : this.setState({ loadMore: false });

//         this.setState({ loading: false });

//         if (newSub.length === 0) {
//           this.setState({ notFound: true });
//         }
//       }
//     } catch {
//       this.setState({ error: true });
//     }
//   }

//   searchSubject = event => {
//     const normaliseValue = event.toLowerCase().trim();
//     this.setState({ search: normaliseValue });
//     this.setState({ subject: [] });
//     this.setState({ page: 1 });
//     this.setState({ notFound: false });
//     this.setState({ loadMore: false });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   openModal = img => {
//     this.setState({ modalImg: img });
//     this.setState({ modal: true });
//   };

//   closeModal = () => {
//     this.setState({ modal: false });
//   };

//   render() {
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.searchSubject} />
//         {this.state.loading && <Loader />}
//         {this.state.notFound && <h2>Nothing found for your search...</h2>}
//         {this.state.error && (
//           <h2>Something went wrong, try reloading the page</h2>
//         )}
//         {this.state.subject && (
//           <ImageGallery
//             galleryItems={this.state.subject}
//             onClick={this.openModal}
//           />
//         )}
//         {this.state.loadMore && <Button loadMore={this.loadMore} />}

//         {this.state.modal && (
//           <Modal img={this.state.modalImg} closeModal={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }
