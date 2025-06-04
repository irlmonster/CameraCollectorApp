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
      showToast(`success|Hittade ${images.length} bilder`, setMessage);
    }
  } catch (err) {
    console.error('Kunde inte läsa bilder:', err);
    if (show) {
      showToast('error|Fel vid laddning av bilder', setMessage);
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

  const deleteSelectedImages = async () => {
  try {
    await deleteImages(selectedImages);
    showToast(`error|Raderade ${selectedImages.length} bilder`, setMessage);
    setSelectedImages([]);
    loadImages(false); // laddar bilder men SKIPPAR toast!
  } catch (err) {
    console.error('❌ Kunde inte radera bilder:', err);
    showToast('error|Radering misslyckades', setMessage);
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
