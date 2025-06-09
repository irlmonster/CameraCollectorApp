import { MaterialIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler'; // Lägg till State här
import { Colors } from '../constants/Colors';
import styles from '../styles/styles';

export default function CameraScreen({
  cameraRef,
  setCameraRef,
  onCapturePress,
  onViewImagesPress,
  flash,
  setFlash,
}) {
  const [zoom, setZoom] = useState(0);
  const baseZoom = useRef(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isZooming, setIsZooming] = useState(false);

  // 1) Hantera själva “skruva zoom”-värdet
  const handlePinchGesture = (event) => {
    const scale = event.nativeEvent.scale;

    // Visa progressbar först när scale är "riktig pinch"
    if (scale > 1.02 || scale < 0.98) {
      if (!isZooming) {
        setIsZooming(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }

    // Räkna ut nytt zoomvärde
    let newZoom = Math.min(
      Math.max((scale - 1) * 0.3 + baseZoom.current, 0),
      1
    );
    setZoom(newZoom);
  };

  // 2) Hantera när pinchgesturen börjar/slutar (fade in/out)
  const handlePinchStateChange = (event) => {
    const { state, oldState } = event.nativeEvent;

    if (oldState === State.ACTIVE && state === State.END) {
      baseZoom.current = zoom;

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsZooming(false);
      });
    }
  };

  return (
    <View style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={handlePinchGesture}
        onHandlerStateChange={handlePinchStateChange}
      >
        <View style={{ flex: 1 }}>
          <CameraView
            style={styles.camera}
            ref={setCameraRef}
            flash={flash}
            zoom={zoom}
          />
        </View>
      </PinchGestureHandler>
      

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          activeOpacity={0.7}
          onPress={onCapturePress}
        >
          <MaterialIcons name="camera-alt" size={36} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.viewImagesButton, { opacity: 0.5 }]}
          activeOpacity={0.7}
          onPress={onViewImagesPress}
        >
          <MaterialIcons name="photo-library" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Flash-toggle */}
      <TouchableOpacity
        style={styles.flashButton}
        onPress={() => {
          if (flash === 'off') {
            setFlash('on');
          } else if (flash === 'on') {
            setFlash('auto');
          } else {
            setFlash('off');
          }
        }}
      >
        <MaterialIcons
          name={
            flash === 'off'
              ? 'flash-off'
              : flash === 'on'
              ? 'flash-on'
              : 'flash-auto'
          }
          size={28}
          color={
            flash === 'off'
              ? 'white'
              : flash === 'on'
              ? 'yellow'
              : Colors.light.primary
          }
        />
      </TouchableOpacity>

      {/* Zoom-text + progressbar */}
      <Animated.View style={[styles.zoomTextContainer, { opacity: fadeAnim }]}>
        <Text style={styles.zoomText}>{(1 + zoom * 4).toFixed(1)}x</Text>
      </Animated.View>

      <Animated.View style={[styles.progressContainer, { opacity: fadeAnim }]}>
        <View style={[styles.progressBar, { width: `${zoom * 100}%` }]} />
      </Animated.View>
    </View>
  );
}
