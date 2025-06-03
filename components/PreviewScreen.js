import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/styles';
import { CLASSES } from '../constants/classes';
import { CLASS_ICONS } from '../constants/icons';

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
                size={20}
                color="#eee"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.classText}>{klass}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.retakeButton} onPress={onRetake}>
          <Text style={styles.retakeText}>↺</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
