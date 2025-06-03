import { Stack } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      {/* StatusBar — om du vill kan du sätta style: 'light' */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#393939" // Android bakgrund (StatusBar)
        hidden={true} // sätt true om du vill dölja
      />

      {/* SafeAreaView — detta fixar bakgrund + tar bort vita kanter */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#393939', // bakgrundfärg för hela appen (kan ändras)
          // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,  // en rand längst upp, kommentera ut för att använda
        }}
      >
        {/* Stack — styr navigationen */}
        <Stack
          screenOptions={{
            headerShown: false, // ingen header (du har ju egen design)
            contentStyle: { backgroundColor: 'transparent' }, // så bakgrund går igenom
          }}
        />
      </SafeAreaView>
    </>
  );
}
