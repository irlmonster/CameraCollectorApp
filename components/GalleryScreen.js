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
      {/* Top Row */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,   
        paddingVertical: 0,      
        marginTop: 10,           
      }}>
        <TouchableOpacity
          style={[styles.backButton, { opacity: 1 }]}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="chevron-left" size={32} color="#eee" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectAllButton, { minWidth: 175 }]}
          onPress={() => {
            if (selectedImages.length === savedImages.length) {
              setSelectedImages([]);
            } else {
              const allUris = savedImages.map(img => img.uri);
              setSelectedImages(allUris);
            }
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
      </View>

      {/* Text under knappar */}
      <View style={{ alignItems: 'center', margin: 0}}>
        <Text style={[styles.zoomText, { opacity: 0.7 }]}>
          Klicka för att markera / Håll in för zoom
        </Text>
      </View>

      {/* Bildgrid */}
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

  {/* Delete-knapp längst ner */}
  {selectedImages.length > 0 && (
    <View style={{
      position: 'absolute',
      bottom: 60,
      left: '50%',
      transform: [{ translateX: -100 }],
      width: 200,
      alignItems: 'center',
    }}>
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
    </View>
  )}



      {/* Modal för bild */}
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
