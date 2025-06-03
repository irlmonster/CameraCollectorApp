import { CameraView } from 'expo-camera';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';


export default function CameraScreen({ cameraRef, setCameraRef, onCapturePress, onViewImagesPress }) {
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={setCameraRef} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.captureButton, { opacity: 1 }]}
          onPress={onCapturePress}
        >
          <Text style={[styles.captureText, { opacity: 0.7 }]}></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.viewImagesButton, { opacity: 1 }]}
          onPress={onViewImagesPress}
        >
          <Text style={[styles.viewImagesText, { opacity: 0.7 }]}>🗂</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
