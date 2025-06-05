import { useEffect, useState } from 'react';
import GalleryScreen from '../components/GalleryScreen';
import Toast from '../components/Toast'; // NY
import { deleteImages, loadSavedImages } from '../utils/storage';
import { showToast } from '../utils/toast'; // behåll denna


export default function Page() {
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalImageUri, setModalImageUri] = useState(null);
  const [message, setMessage] = useState('');

  const loadImages = async (show = true) => {
  try {
    const images = await loadSavedImages();
    setSavedImages(images);
    if (show) {
      showToast(`success|folder-multiple-image|Hittade ${images.length} bilder`, setMessage);
    }
  } catch (err) {
    console.error('Kunde inte läsa bilder:', err);
    if (show) {
      showToast('error|alert-circle|Fel vid laddning av bilder', setMessage);
    }
  }
};   

  useEffect(() => {
    loadImages();
  }, []);

  const toggleSelectImage = (uri) => {
    if (selectedImages.includes(uri)) {
      setSelectedImages(prev => prev.filter(p => p !== uri));
    } else {
      setSelectedImages(prev => [...prev, uri]);
    }
  };

  const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural;
};

const deleteSelectedImages = async () => {
  try {
    await deleteImages(selectedImages);

    const count = selectedImages.length;
    const text = `${count} ${pluralize(count, 'bild raderad', 'bilder raderade')}`;

    showToast(`success|trash-can|${text}`, setMessage);

    setSelectedImages([]);
    loadImages(false); // laddar bilder men SKIPPAR toast!
  } catch (err) {
    console.error('❌ Kunde inte radera bilder:', err);
    showToast('error|alert-circle|Radering misslyckades', setMessage);
  }
};



  return (
    <>
      <GalleryScreen
        savedImages={savedImages}
        selectedImages={selectedImages}
        toggleSelectImage={toggleSelectImage}
        deleteSelectedImages={deleteSelectedImages}
        setSelectedImages={setSelectedImages}
        setModalImageUri={setModalImageUri}
        modalImageUri={modalImageUri}
      />

      {/* 🔔 Toast */}
      <Toast message={message} />
    </>
  );
}
