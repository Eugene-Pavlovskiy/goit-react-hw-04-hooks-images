import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './components/Searchbar/Searchbar';
import imagesAPI from './services/images-api';
import LoaderSpinner from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

function App() {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchRequest) {
      return;
    }
    setStatus('pending');
    imagesAPI
      .fetchImages(searchRequest, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.info('No images found');
        }
        setStatus('resolved');
        setImages(prev => [...prev, ...hits]);

        scroll.scrollToBottom();
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, searchRequest]);

  function handleFormSubmit(query) {
    if (query === searchRequest) {
      alert('already loaded');
      return;
    }
    setSearchRequest(query);
    setPage(1);
    setImages([]);
    setError(null);
  }

  function handleLoadMore() {
    setPage(page => page + 1);
    setStatus('pending');
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleImgClick(bigImg, tags) {
    setShowModal(true);
    setBigImg(bigImg);
    setTags(tags);

    // this.setState({ bigImg, tags });
    toggleModal();
  }

  // const { images, error, status, showModal, bigImg, tags } = this.state;

  return (
    <div className="App">
      <SearchBar onSubmit={handleFormSubmit} />

      {status === 'idle' && null}

      {(status === 'resolved' || status === 'pending') && (
        <ImageGallery images={images} showBigImg={handleImgClick} />
      )}

      {status === 'pending' && <LoaderSpinner />}

      {status === 'resolved' && images.length >= 12 && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {status === 'rejected' && <div>{error}</div>}
      {showModal && (
        <Modal onClose={toggleModal} bigImg={bigImg} tags={tags}></Modal>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;