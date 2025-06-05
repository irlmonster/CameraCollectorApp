import { MaterialCommunityIcons } from '@expo/vector-icons'; // <-- BYT till MaterialCommunityIcons
import { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import styles from '../styles/styles';

export default function Toast({ message }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message !== '') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (message === '') return null;

  // Nu: SPLITTA 3 delar!
  const parts = message.split('|');
  const type = parts[0];
  const iconName = parts[1];
  const text = parts.slice(2).join('|'); // resten som text

  // Sätt färg beroende på type
  let iconColor = '';

  if (type === 'success') {
    iconColor = '#5faf45';
  } else if (type === 'error') {
    iconColor = '#ff4444';
  } else {
    iconColor = '#aaa';
  }

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <MaterialCommunityIcons name={iconName} size={20} color={iconColor} style={{ marginRight: 8 }} />
      <Text style={styles.toastText}>{text}</Text>
    </Animated.View>
  );
}
