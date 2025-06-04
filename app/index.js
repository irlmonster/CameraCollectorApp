import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

export default function Page() {
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
    <TouchableOpacity
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#151718' }}
      onPress={() => router.push('/camera')}
      activeOpacity={0.8}
    >
      {/* Pulserande LOGO */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 12 }}>
        <Image
          source={require('../assets/images/recye.png')}
          style={{ width: 240, height: 240, resizeMode: 'contain' }}
        />
      </Animated.View>

      {/* Diskret text */}
      <Text style={{ color: '#5faf45', fontSize: 12, opacity: 0.4, fontStyle: 'italic' }}>
        A sustainable chain, where your effort creates value.
      </Text>
    </TouchableOpacity>
  );
}
