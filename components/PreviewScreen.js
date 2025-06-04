import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
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
  return (
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
  );
}
