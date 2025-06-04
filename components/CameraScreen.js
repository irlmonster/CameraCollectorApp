import { MaterialIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function CameraScreen({ cameraRef, setCameraRef, onCapturePress, onViewImagesPress }) {
  const [flash, setFlash] = useState('off');

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={setCameraRef}
        flash={flash}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          activeOpacity={0.7}
          onPress={onCapturePress}
        >
          <MaterialIcons name="camera-alt" size={36} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewImagesButton}
          activeOpacity={0.7}
          onPress={onViewImagesPress}
        >
          <MaterialIcons name="photo-library" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Flash toggle button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 8,
        }}
        onPress={() =>
          setFlash(
            flash === 'off'
              ? 'on'
              : 'off'
          )
        }
      >
        <MaterialIcons
          name={flash === 'off' ? 'flash-off' : 'flash-on'}
          size={28}
          color="white"
        />
      </TouchableOpacity>

    </View>
  );
}
