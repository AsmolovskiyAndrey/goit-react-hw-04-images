import { fetchImages } from 'api/ApiSearch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    subject: [],
    page: 1,
    search: '',
    loading: false,
    notFound: false,
    error: false,
    loadMore: false,
    modal: false,
    modalImg: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    try {
      if (prevState.search !== search || prevState.page !== page) {
        this.setState({ loading: true });

        const newSub = await fetchImages(search, page);
        this.setState(prevState => ({
          subject: [...prevState.subject, ...newSub],
        }));

        newSub.length === 12
          ? this.setState({ loadMore: true })
          : this.setState({ loadMore: false });

        this.setState({ loading: false });

        if (newSub.length === 0) {
          this.setState({ notFound: true });
        }
      }
    } catch {
      this.setState({ error: true });
    }
  }

  searchSubject = event => {
    const normaliseValue = event.toLowerCase().trim();
    this.setState({ search: normaliseValue });
    this.setState({ subject: [] });
    this.setState({ page: 1 });
    this.setState({ notFound: false });
    this.setState({ loadMore: false });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = img => {
    this.setState({ modalImg: img });
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.searchSubject} />
        {this.state.loading && <Loader />}
        {this.state.notFound && <h2>Nothing found for your search...</h2>}
        {this.state.error && (
          <h2>Something went wrong, try reloading the page</h2>
        )}
        {this.state.subject && (
          <ImageGallery
            galleryItems={this.state.subject}
            onClick={this.openModal}
          />
        )}
        {this.state.loadMore && <Button loadMore={this.loadMore} />}

        {this.state.modal && (
          <Modal img={this.state.modalImg} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
