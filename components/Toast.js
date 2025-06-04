import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import styles from '../styles/styles'; // eller egna toast-styles

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

  const [type, text] = message.split('|');

  let iconName = '';
  let iconColor = '';

  if (type === 'success') {
    iconName = 'check-circle';
    iconColor = '#5faf45';
  } else if (type === 'error') {
    iconName = 'error';
    iconColor = '#ff4444';
  } else {
    iconName = 'info';
    iconColor = '#aaa';
  }

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <MaterialIcons name={iconName} size={20} color={iconColor} style={{ marginRight: 8 }} />
      <Text style={styles.toastText}>{text}</Text>
    </Animated.View>
  );
}
