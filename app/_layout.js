import { Stack, usePathname, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { SafeAreaView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const timerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      // Navigera till index bara om vi inte redan är på index
      if (pathname !== '/') {
        router.push('/');
      }
    }, 60000); // 60 sek 
  };

  const handleUserActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname]); 

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#393939"
        hidden={true}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handleUserActivity} onTouchStart={handleUserActivity}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#393939',
            }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
                animation: 'slide_from_left',
              }}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </>
  );
}
