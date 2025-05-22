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
export type Picture = {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description?: string;
};
const App = () => {
  type FetchPictsResult = {
    results: Picture[];
    total_pages: number;
  };
  const [picts, setPicts] = useState<Picture[]>([]);
  const [query, setquery] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const [IsError, setIsError] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<Picture | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (query === '') return;
    const abortController = new AbortController();
    const getPictures = async () => {
      try {
        setloading(true);
        const data: FetchPictsResult = await fetchPicts(
          query,
          page,
          abortController.signal
        );
        const uniqueNewPics = data.results.filter(
          (pic: Picture) =>
            !picts.some((existingPic: Picture) => existingPic.id === pic.id)
        );
        setPicts((prevPics: Picture[]) => [...prevPics, ...uniqueNewPics]);
        // setPicts(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages - 1);
      } catch (error: any) {
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

  const handleChangeQuery = (newQuery: string): void => {
    setquery(newQuery);
    setPage(1);
    setPicts([]);
  };
  const HandleLoadMore = (): void => {
    setPage(page + 1);
  };
  const pagesDiff: number = totalPages - page;
  console.log(totalPages);
  console.log(pagesDiff);
  console.log(page);
  //------------------------------------------//
  const openModal = (image: Picture): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
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
    const handleKeyDown = (event: KeyboardEvent) => {
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
