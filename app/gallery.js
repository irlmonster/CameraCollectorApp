import { MaterialIcons } from '@expo/vector-icons'; // <-- Lägg till!
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import GalleryScreen from '../components/GalleryScreen';
import styles from '../styles/styles';
import { deleteImages, loadSavedImages } from '../utils/storage';

export default function Page() {
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalImageUri, setModalImageUri] = useState(null);
  const [message, setMessage] = useState(''); // Toast state!

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
      showToast(`success|Hittade ${images.length} bilder`);
    } catch (err) {
      console.error('Kunde inte läsa bilder:', err);
      showToast('error|Fel vid laddning av bilder');
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
      showToast(`success|Raderade ${selectedImages.length} bilder`);
      setSelectedImages([]);
      loadImages();
    } catch (err) {
      console.error('❌ Kunde inte radera bilder:', err);
      showToast('error|Radering misslyckades');
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
      {message !== '' && (() => {
        const [type, text] = message.split('|');

        let iconName = '';
        let iconColor = '';

        if (type === 'success') {
          iconName = 'check-circle';
          iconColor = '#5faf45';
        } else if (type === 'error') {
          iconName = 'error';
          iconColor = '#ff4444';
        } else {
          iconName = 'info';
          iconColor = '#aaa';
        }

        return (
          <View style={styles.toast}>
            <MaterialIcons name={iconName} size={20} color={iconColor} style={{ marginRight: 8 }} />
            <Text style={styles.toastText}>{text}</Text>
          </View>
        );
      })()}
    </>
  );
}
