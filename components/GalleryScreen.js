import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles/styles';
import { router } from 'expo-router';

export default function GalleryScreen({
  savedImages,
  selectedImages,
  toggleSelectImage,
  deleteSelectedImages,
  setSelectedImages,
  setModalImageUri,
  modalImageUri
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.zoomText, { opacity: 1 }]}>Klicka för att markera / Håll in för zoom</Text>

      <TouchableOpacity
        style={[styles.backButton, { opacity: 1 }]}
        onPress={() => router.back()}
      >
        <Text style={[styles.backButtonText, { opacity: 1 }]}>⬅</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.selectAllButton}
        onPress={() => {
          if (selectedImages.length === savedImages.length) {
            setSelectedImages([]);
          } else {
            const allUris = savedImages.map(img => img.uri);
            setSelectedImages(allUris);
          }
        }}
      >
        <Text style={styles.selectAllText}>
          {selectedImages.length === savedImages.length ? '🚫 Avmarkera' : '✅ Markera alla'}
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.imageGrid}>
        {savedImages.map((img, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => toggleSelectImage(img.uri)}
            onLongPress={() => setModalImageUri(img.uri)}
            style={styles.imageItem}
          >
            <Text style={styles.imageLabel}>{img.klass}</Text>
            <Image
              source={{ uri: img.uri }}
              style={[
                styles.imageThumb,
                selectedImages.includes(img.uri) && styles.imageThumbSelected
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedImages.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteSelectedImages}
        >
          <Text style={styles.deleteButtonText}>🗑 Radera valda</Text>
        </TouchableOpacity>
      )}

      {modalImageUri && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            onPress={() => setModalImageUri(null)}
          >
            <Image source={{ uri: modalImageUri }} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
