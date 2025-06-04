import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    flex: 1,
  },

  preview: {
    flex: 1,
    resizeMode: 'cover',
  },

  text: {
    textAlign: 'center',
    fontSize: 18,
    margin: 12,
    color: '#eee',
    marginTop: 110,
  },

  classList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
    marginTop: 20,
  },

  classButton: {
    backgroundColor: 'rgba(57, 57, 57, 0.7)',
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(95, 175, 69, 0.5)',
    width: '28%',
    aspectRatio: 2.5,
    flexDirection: 'row',
    // gap: 8,  <-- TA BORT gap!!
  },


  classText: {
    fontSize: 16,
    color: '#eee',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },


  captureButton: {
  width: 80,
  height: 80,
  marginBottom: 70,
  borderRadius: 40,
  borderWidth: 5,
  borderColor: 'rgba(95, 175, 69, 0.5)',
  backgroundColor: 'rgba(255,255,255,0.1)',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  },


  captureText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#eee',
    textAlign: 'center',
  },

  viewImagesButton: {
    backgroundColor: 'rgba(57, 57, 57, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(95, 175, 69, 0.5)',
    alignSelf: 'flex-start',
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },


  viewImagesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ccc',
  },

  retakeButton: {
    backgroundColor: 'rgba(57, 57, 57, 0.5)',
    padding: 12,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'rgba(95, 175, 69, 0.5)',
    width: '20%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },

  retakeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#eee',
    textAlign: 'center',
  },

  backButton: {
    backgroundColor: 'rgba(57, 57, 57, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(95, 175, 69, 0.5)',
    alignSelf: 'center',
    marginVertical: 20,
  },

  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(241, 241, 241, 0.8)',
    textAlign: 'center',
  },

  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  imageItem: {
    width: '42%',
    margin: 8,
    alignItems: 'center',
  },

  imageLabel: {
    color: '#888',
    marginBottom: 6,
  },

  imageThumb: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },

  imageThumbSelected: {
    borderWidth: 3,
    borderColor: '#5faf45',
  },

  deleteButton: {
    backgroundColor: '#8b0000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ff5555',
    alignSelf: 'center',
    marginVertical: 16,
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  selectAllButton: {
    backgroundColor: 'rgba(57, 57, 57, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(95, 175, 69, 0.5)',
    alignSelf: 'center',
    marginVertical: 20,
  },

  selectAllText: {
    color: 'rgba(241, 241, 241, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  zoomText: {
    color: 'rgba(241, 241, 241, 0.2)',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },

  modalCloseArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  toast: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },

  toastText: {
    color: 'white',
    fontSize: 14,
  },

  backgroundImage: {
  flex: 1,
  resizeMode: 'cover',
},

overlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // <-- justera transparens här!
  padding: 16,
},






});

export default styles;
