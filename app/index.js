import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';

export default function Page() {
  // Pulserande logga
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    // HELA skärmen klickbar
    <TouchableOpacity
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#151718' }}
      onPress={() => router.push('/camera')}
      activeOpacity={0.8}
    >
      {/* Pulserande LOGO */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Image
          source={require('../assets/images/recye.png')}
          style={{ width: 230, height: 230, resizeMode: 'contain' }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
