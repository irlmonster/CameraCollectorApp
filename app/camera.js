import { useCameraPermissions } from 'expo-camera';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CameraScreen from '../components/CameraScreen';
import PreviewScreen from '../components/PreviewScreen';
import Toast from '../components/Toast';
import styles from '../styles/styles';
import { saveImageToLocalStorage } from '../utils/storage';
import { showToast } from '../utils/toast';


export default function Page() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(true); 
  const [flash, setFlash] = useState('off');


  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  // NYTT → useFocusEffect för att hantera aktiv kamera
  useFocusEffect(
    useCallback(() => {
      console.log('📸 CameraScreen ACTIVE');
      setCameraActive(true);
      return () => {
        console.log('📸 CameraScreen INACTIVE');
        setCameraActive(false);
      };
    }, [])
  );

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
              showToast(`success|Bild sparad i "${klass}"`, setMessage);
            } else {
              showToast(`error|Misslyckades spara bild`, setMessage);
            }
            setPhoto(null);
          }}
          onRetake={() => setPhoto(null)}
        />

      ) : (
        cameraActive && ( // NYTT → visa CameraScreen bara om aktiv!
          <CameraScreen
            cameraRef={cameraRef}
            setCameraRef={ref => setCameraRef(ref)}
            onCapturePress={async () => {
              const photoData = await cameraRef.takePictureAsync();
              setPhoto(photoData);
            }}
            onViewImagesPress={() => router.push('/gallery')}
            flash={flash}           // <--- lägg till detta
            setFlash={setFlash}     // <--- lägg till detta
          />
        )
      )}

      <Toast message={message} />

    </>
  );
}
