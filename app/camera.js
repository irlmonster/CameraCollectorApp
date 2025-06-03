import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import styles from '../styles/styles';
import CameraScreen from '../components/CameraScreen';
import PreviewScreen from '../components/PreviewScreen';
import { saveImageToLocalStorage } from '../utils/storage';
import { showToast } from '../utils/toast';
import { router } from 'expo-router';

export default function Page() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission) {
    return <View style={styles.center}><Text>Kollar tillstånd...</Text></View>;
  }

  if (!permission.granted) {
    return <View style={styles.center}><Text>Ingen tillgång till kamera</Text></View>;
  }

  return (
    <>
      {photo ? (
        <PreviewScreen
          photo={photo}
          onClassSelect={async (klass) => {
            const path = await saveImageToLocalStorage(photo.uri, klass);
            if (path) {
              showToast(`✅ Bild sparad i "${klass}"`, setMessage);
            } else {
              showToast(`❌ Misslyckades spara bild`, setMessage);
            }
            setPhoto(null);
          }}
          onRetake={() => setPhoto(null)}
        />
      ) : (
        <CameraScreen
          cameraRef={cameraRef}
          setCameraRef={ref => setCameraRef(ref)}
          onCapturePress={async () => {
            const photoData = await cameraRef.takePictureAsync();
            setPhoto(photoData);
          }}
          onViewImagesPress={() => router.push('/gallery')}
        />
      )}

      {/* 🔔 Toast */}
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}
    </>
  );
}
