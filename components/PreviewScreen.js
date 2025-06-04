import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CLASSES } from '../constants/classes';
import { CLASS_ICONS } from '../constants/icons';
import styles from '../styles/styles';

export default function PreviewScreen({ photo, onClassSelect, onRetake }) {
  // 👇 Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300, // ms
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[{ flex: 1, opacity: fadeAnim }]}>
      <ImageBackground source={{ uri: photo.uri }} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.text}>Välj en klass:</Text>

          <ScrollView contentContainerStyle={styles.classList}>
            {CLASSES.map((klass, i) => (
              <TouchableOpacity
                key={i}
                style={styles.classButton}
                onPress={() => onClassSelect(klass)}
              >
                <MaterialCommunityIcons
                  name={CLASS_ICONS[klass] || 'help-circle'}
                  size={18}
                  color="#eee"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.classText}>{klass}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.retakeButton} onPress={onRetake}>
            <MaterialCommunityIcons name="refresh" size={32} color="#eee" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
