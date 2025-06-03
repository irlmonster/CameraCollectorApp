import * as FileSystem from 'expo-file-system';
import { CLASSES } from '../constants/classes';

export const saveImageToLocalStorage = async (photoUri, className) => {
  try {
    const BASE_PATH = FileSystem.documentDirectory + 'bilder/';
    const classDir = `${BASE_PATH}${className}/`;

    const dirInfo = await FileSystem.getInfoAsync(classDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(classDir, { intermediates: true });
    }

    const fileName = `image_${Date.now()}.jpg`;
    const newPath = `${classDir}${fileName}`;

    await FileSystem.copyAsync({
      from: photoUri,
      to: newPath,
    });

    console.log(`✅ Bild sparad i ${newPath}`);
    return newPath;
  } catch (err) {
    console.error('❌ Kunde inte spara bild:', err);
    return '';
  }
};

export const loadSavedImages = async () => {
  try {
    const images = [];

    for (const klass of CLASSES) {
      const dir = FileSystem.documentDirectory + `bilder/${klass}/`;
      const exists = await FileSystem.getInfoAsync(dir);
      if (exists.exists) {
        const files = await FileSystem.readDirectoryAsync(dir);
        files.forEach(file => {
          images.push({
            uri: dir + file,
            klass,
          });
        });
      }
    }

    return images;
  } catch (err) {
    console.error('Kunde inte läsa bilder:', err);
    return [];
  }
};

export const deleteImages = async (imageUris) => {
  try {
    for (const path of imageUris) {
      await FileSystem.deleteAsync(path);
    }
  } catch (err) {
    console.error('❌ Kunde inte radera bilder:', err);
  }
};
