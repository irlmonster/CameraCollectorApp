import { MaterialIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function CameraScreen({ cameraRef, setCameraRef, onCapturePress, onViewImagesPress }) {
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={setCameraRef} />
      <View style={styles.buttonContainer}>

        {/* Capture button */}
        <TouchableOpacity
          style={styles.captureButton}
          activeOpacity={0.7}   // <-- fin "tryck"-effekt
          onPress={onCapturePress}
        >
          {/* Du kan lägga till en ikon här också om du vill, tex en "camera" */}
          <MaterialIcons name="camera-alt" size={36} color="white" />
        </TouchableOpacity>

        {/* View Images button */}
        <TouchableOpacity
          style={styles.viewImagesButton}
          activeOpacity={0.7}   // <-- samma tryck-effekt
          onPress={onViewImagesPress}
        >
          <MaterialIcons name="photo-library" size={32} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );
}
