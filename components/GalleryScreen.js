import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';


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
        <MaterialCommunityIcons name="chevron-left" size={32} color="#eee" />
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            name={selectedImages.length === savedImages.length ? 'close-circle-outline' : 'checkbox-multiple-marked-outline'}
            size={24}
            color="#eee"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.selectAllText}>
            {selectedImages.length === savedImages.length ? 'Avmarkera' : 'Markera alla'}
          </Text>
        </View>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.deleteButtonText}>Radera valda</Text>
          </View>
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
