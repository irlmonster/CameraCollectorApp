import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import GalleryScreen from '../components/GalleryScreen';
import { loadSavedImages, deleteImages } from '../utils/storage';
import styles from '../styles/styles';

export default function Page() {
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalImageUri, setModalImageUri] = useState(null);
  const [message, setMessage] = useState(''); // <-- Toast state!

  const showToast = (text) => {
    console.log('🔔 Toast:', text);
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const loadImages = async () => {
    try {
      const images = await loadSavedImages();
      setSavedImages(images);
      showToast(`🖼️ Hittade ${images.length} bilder`);
    } catch (err) {
      console.error('Kunde inte läsa bilder:', err);
      showToast('❌ Fel vid laddning av bilder');
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
      showToast(`🗑 Raderade ${selectedImages.length} bilder`);
      setSelectedImages([]);
      loadImages();
    } catch (err) {
      console.error('❌ Kunde inte radera bilder:', err);
      showToast('❌ Radering misslyckades');
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
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}
    </>
  );
}
