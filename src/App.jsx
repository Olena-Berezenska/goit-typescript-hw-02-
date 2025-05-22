import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import Spinner from './components/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { fetchPicts } from './services/apiRequest';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const App = () => {
  const [picts, setPicts] = useState([]);
  const [query, setquery] = useState('');
  const [loading, setloading] = useState(false);
  const [IsError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (query === '') return;
    const abortController = new AbortController();
    const getPictures = async () => {
      try {
        setloading(true);
        const data = await fetchPicts(query, page, abortController.signal);
        const uniqueNewPics = data.results.filter(
          pic => !picts.some(existingPic => existingPic.id === pic.id)
        );
        setPicts(prevPics => [...prevPics, ...uniqueNewPics]);
        // setPicts(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages - 1);
      } catch (error) {
        console.log(error);
        if (error.code !== 'ERR_CANCELED') {
          setIsError(true);
        }
      } finally {
        setloading(false);
      }
    };

    getPictures();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  //--------------------------------//

  const handleChangeQuery = newQuery => {
    setquery(newQuery);
    setPage(1);
    setPicts([]);
  };
  const HandleLoadMore = () => {
    setPage(page + 1);
  };
  const pagesDiff = totalPages - page;
  console.log(totalPages);
  console.log(pagesDiff);
  console.log(page);
  //------------------------------------------//
  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  const modalStyle = {
    content: {
      maxWidth: '800px',
      margin: 'auto',
      padding: '0',
      border: 'none',
      background: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
  };
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);
  //-------------------------------------------//
  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />

      <ImageGallery picts={picts} onImageClick={openModal} />
      <Spinner loading={loading} />
      <LoadMoreBtn
        pagesDiff={pagesDiff}
        OnClickLoadMore={HandleLoadMore}
        loading={loading}
        picts={picts}
      />
      <ErrorMessage IsError={IsError} />
      <ImageModal
        isOpen={isModalOpen}
        onCloseModal={closeModal}
        selectedImage={selectedImage}
        style={modalStyle}
      />
    </>
  );
};

export default App;
